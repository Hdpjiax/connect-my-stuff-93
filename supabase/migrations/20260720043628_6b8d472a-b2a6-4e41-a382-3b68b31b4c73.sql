
-- Storage policies for flight-files bucket
-- Path convention: {user_id}/flights/{flight_id}/...
create policy "flight-files: owner read"
on storage.objects for select to authenticated
using (bucket_id = 'flight-files' and (auth.uid()::text = (storage.foldername(name))[1] or public.is_admin()));

create policy "flight-files: owner insert"
on storage.objects for insert to authenticated
with check (bucket_id = 'flight-files' and (auth.uid()::text = (storage.foldername(name))[1] or public.is_admin()));

create policy "flight-files: owner update"
on storage.objects for update to authenticated
using (bucket_id = 'flight-files' and (auth.uid()::text = (storage.foldername(name))[1] or public.is_admin()));

create policy "flight-files: owner delete"
on storage.objects for delete to authenticated
using (bucket_id = 'flight-files' and (auth.uid()::text = (storage.foldername(name))[1] or public.is_admin()));

-- Enable realtime for notifications
alter publication supabase_realtime add table public.notifications;
alter table public.notifications replica identity full;
