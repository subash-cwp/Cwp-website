
-- 1. Helper: is this user the master admin?
CREATE OR REPLACE FUNCTION public.is_master_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = _user_id
      AND lower(email) = 'subashkanagamani3107@gmail.com'
  );
$$;

-- 2. Trigger to auto-grant admin role to the master email (verified only)
CREATE OR REPLACE FUNCTION public.grant_master_admin_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.email_confirmed_at IS NOT NULL
     AND lower(NEW.email) = 'subashkanagamani3107@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created_grant_master ON auth.users;
CREATE TRIGGER on_auth_user_created_grant_master
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.grant_master_admin_role();

DROP TRIGGER IF EXISTS on_auth_user_confirmed_grant_master ON auth.users;
CREATE TRIGGER on_auth_user_confirmed_grant_master
AFTER UPDATE OF email_confirmed_at ON auth.users
FOR EACH ROW
WHEN (OLD.email_confirmed_at IS NULL AND NEW.email_confirmed_at IS NOT NULL)
EXECUTE FUNCTION public.grant_master_admin_role();

-- Backfill: if master user already exists & confirmed, grant
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users
WHERE lower(email) = 'subashkanagamani3107@gmail.com'
  AND email_confirmed_at IS NOT NULL
ON CONFLICT (user_id, role) DO NOTHING;

-- 3. Guard: prevent anyone from removing the master admin's admin role
CREATE OR REPLACE FUNCTION public.protect_master_admin_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    IF OLD.role = 'admin' AND public.is_master_admin(OLD.user_id) THEN
      RAISE EXCEPTION 'Cannot remove admin role from master admin';
    END IF;
    RETURN OLD;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.role = 'admin' AND public.is_master_admin(OLD.user_id)
       AND NEW.role <> 'admin' THEN
      RAISE EXCEPTION 'Cannot change master admin role';
    END IF;
    RETURN NEW;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS protect_master_admin_role_trg ON public.user_roles;
CREATE TRIGGER protect_master_admin_role_trg
BEFORE UPDATE OR DELETE ON public.user_roles
FOR EACH ROW EXECUTE FUNCTION public.protect_master_admin_role();

-- 4. Replace RLS policies on user_roles: only master admin may write
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only master admin can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only master admin can update roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only master admin can delete roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users view own roles" ON public.user_roles;

CREATE POLICY "Users view own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id OR public.is_master_admin(auth.uid()));

CREATE POLICY "Only master admin can insert roles"
ON public.user_roles FOR INSERT
TO authenticated
WITH CHECK (public.is_master_admin(auth.uid()));

CREATE POLICY "Only master admin can update roles"
ON public.user_roles FOR UPDATE
TO authenticated
USING (public.is_master_admin(auth.uid()))
WITH CHECK (public.is_master_admin(auth.uid()));

CREATE POLICY "Only master admin can delete roles"
ON public.user_roles FOR DELETE
TO authenticated
USING (public.is_master_admin(auth.uid()));
