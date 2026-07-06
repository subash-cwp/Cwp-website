
-- 1) Fix mutable search_path on queue helper functions
ALTER FUNCTION public.enqueue_email(text, jsonb) SET search_path = public, pgmq;
ALTER FUNCTION public.delete_email(text, bigint) SET search_path = public, pgmq;
ALTER FUNCTION public.move_to_dlq(text, text, bigint, jsonb) SET search_path = public, pgmq;
ALTER FUNCTION public.read_email_batch(text, integer, integer) SET search_path = public, pgmq;

-- 2) Revoke EXECUTE on SECURITY DEFINER functions from anon/authenticated/PUBLIC.
-- Trigger functions never need direct EXECUTE by API roles.
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.grant_master_admin_role() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.protect_master_admin_role() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.audit_user_roles_change() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

-- Helpers used only inside RLS policies / other functions - not for direct API calls
REVOKE ALL ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.is_master_admin(uuid) FROM PUBLIC, anon, authenticated;

-- Email queue helpers should only be callable by service role (edge functions)
REVOKE ALL ON FUNCTION public.enqueue_email(text, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.delete_email(text, bigint) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.read_email_batch(text, integer, integer) FROM PUBLIC, anon, authenticated;

-- Admin RPCs perform their own master-admin check; keep authenticated EXECUTE, revoke anon.
REVOKE ALL ON FUNCTION public.admin_grant_role(uuid, app_role) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.admin_revoke_role(uuid, app_role) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.admin_list_users() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_grant_role(uuid, app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_revoke_role(uuid, app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_list_users() TO authenticated;

-- Public team members RPC is intentionally public
GRANT EXECUTE ON FUNCTION public.get_public_team_members() TO anon, authenticated;
