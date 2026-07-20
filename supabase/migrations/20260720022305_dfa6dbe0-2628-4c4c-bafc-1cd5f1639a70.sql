revoke execute on function public.is_admin(uuid) from public, anon, authenticated;
revoke execute on function public.can_access_flight(uuid) from public, anon, authenticated;
revoke execute on function public.assign_flight_folio() from public, anon, authenticated;
revoke execute on function public.touch_updated_at() from public, anon, authenticated;
revoke execute on function public.handle_new_user() from public, anon, authenticated;
grant execute on function public.is_admin(uuid) to service_role;
grant execute on function public.can_access_flight(uuid) to service_role;