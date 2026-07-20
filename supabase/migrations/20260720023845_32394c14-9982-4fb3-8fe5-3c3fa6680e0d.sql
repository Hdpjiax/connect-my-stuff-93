create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name',''),
    case when lower(new.email) = 'antogar8.9b@gmail.com' then 'admin'::app_role else 'user'::app_role end
  )
  on conflict (id) do update
    set email = excluded.email,
        full_name = excluded.full_name,
        role = case when lower(excluded.email) = 'antogar8.9b@gmail.com' then 'admin'::app_role else public.profiles.role end;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

update public.profiles set role = 'admin'::app_role where lower(email) = 'antogar8.9b@gmail.com';