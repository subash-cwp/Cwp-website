
-- Revoke broad EXECUTE on all SECURITY DEFINER helpers, then grant back only where needed.
DO $$
DECLARE fn text;
BEGIN
  FOR fn IN SELECT unnest(ARRAY[
    'public.update_updated_at_column()',
    'public.handle_new_user()',
    'public.has_role(uuid, public.app_role)',
    'public.enqueue_email(text, jsonb)',
    'public.read_email_batch(text, integer, integer)',
    'public.delete_email(text, bigint)',
    'public.move_to_dlq(text, text, bigint, jsonb)',
    'public.grant_master_admin_role()',
    'public.is_master_admin(uuid)',
    'public.protect_master_admin_role()',
    'public.admin_grant_role(uuid, public.app_role)',
    'public.admin_revoke_role(uuid, public.app_role)',
    'public.admin_list_users()',
    'public.audit_user_roles_change()',
    'public.email_queue_wake()',
    'public.email_queue_dispatch()',
    'public.get_public_team_members()'
  ])
  LOOP
    EXECUTE format('REVOKE ALL ON FUNCTION %s FROM PUBLIC, anon, authenticated', fn);
  END LOOP;
END $$;

-- Re-grant only the functions that must be callable from the client / RLS.
GRANT EXECUTE ON FUNCTION public.get_public_team_members() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_master_admin(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_grant_role(uuid, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_revoke_role(uuid, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_list_users() TO authenticated;
