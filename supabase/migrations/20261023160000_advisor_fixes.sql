-- Findings of the Supabase security advisor after the first migration (23.10.2026):
-- 1. set_updated_at() had a mutable search_path.
-- 2. is_admin() was SECURITY DEFINER and callable by anon through /rest/v1/rpc. It only
--    needs to see the caller's own admin_users row, which the "own admin row" policy
--    already allows, so it runs as the caller (SECURITY INVOKER) and anon loses EXECUTE.
-- 3. rls_auto_enable() (created by the project option "enable automatic RLS") was
--    callable by anon and authenticated through /rest/v1/rpc; it is an event-trigger
--    function and needs no API caller.

alter function public.set_updated_at() set search_path = public;

create or replace function public.is_admin()
returns boolean
language sql stable security invoker
set search_path = public
as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;
revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated, service_role;

revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
