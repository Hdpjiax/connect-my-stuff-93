create extension if not exists pgcrypto;

create type public.app_role as enum ('user', 'admin');

create type public.flight_status as enum (
  'pendiente_revision','esperando_pago','pago_subido','pago_confirmado',
  'pendiente_qr','qr_enviado','completado','cancelado'
);

create type public.attachment_category as enum ('vuelo','comprobante_pago','qr','otro');

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text not null default '',
  role public.app_role not null default 'user',
  phone text,
  company_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.flights (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  flight_folio text,
  flight_type text not null default 'sencillo',
  flight_date date not null,
  flight_time time not null,
  return_flight_date date,
  return_flight_time time,
  passengers jsonb not null default '[]'::jsonb,
  fare_type text not null,
  total_amount numeric(12,2) not null default 0,
  payment_percentage numeric(5,2) not null default 100,
  amount_to_pay numeric(12,2) not null default 0,
  extras jsonb not null default '{}'::jsonb,
  flight_image_path text,
  status public.flight_status not null default 'pendiente_revision',
  admin_notes text,
  user_cancel_reason text,
  cancelled_at timestamptz,
  cancelled_by uuid references public.profiles(id) on delete set null,
  provider_cost_amount numeric(12,2) not null default 0,
  admin_commission_amount numeric(12,2) not null default 0,
  profit_amount numeric(12,2) not null default 0,
  financial_status text not null default 'pendiente',
  financial_notes text,
  financial_updated_at timestamptz,
  financial_updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint flights_flight_type_check check (flight_type in ('sencillo','redondo')),
  constraint flights_round_trip_return_required_check check (
    flight_type <> 'redondo' or (return_flight_date is not null and return_flight_time is not null)
  ),
  constraint flights_payment_percentage_range_check check (payment_percentage > 0 and payment_percentage <= 100),
  constraint flights_financial_status_check check (financial_status in ('pendiente','revisar','liquidado'))
);

create table if not exists public.flight_messages (
  id uuid primary key default gen_random_uuid(),
  flight_id uuid not null references public.flights(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  receiver_id uuid references public.profiles(id) on delete set null,
  message text not null,
  message_type text not null default 'texto',
  created_at timestamptz not null default now()
);

create table if not exists public.flight_attachments (
  id uuid primary key default gen_random_uuid(),
  flight_id uuid not null references public.flights(id) on delete cascade,
  uploaded_by uuid not null references public.profiles(id) on delete cascade,
  file_path text not null,
  file_name text not null,
  file_type text not null,
  category public.attachment_category not null default 'otro',
  created_at timestamptz not null default now()
);

create table if not exists public.bank_accounts (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid not null references public.profiles(id) on delete cascade,
  bank_name text not null,
  account_holder text not null,
  clabe text not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  flight_id uuid references public.flights(id) on delete cascade,
  title text not null,
  body text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.app_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_by uuid references public.profiles(id) on delete set null,
  updated_at timestamptz not null default now()
);

create table if not exists public.flight_internal_notes (
  id uuid primary key default gen_random_uuid(),
  flight_id uuid not null references public.flights(id) on delete cascade,
  admin_id uuid not null references public.profiles(id) on delete cascade,
  note text not null,
  created_at timestamptz not null default now()
);

create sequence if not exists public.flight_folio_seq;

-- Indexes
create index if not exists profiles_role_idx on public.profiles(role);
create index if not exists profiles_email_idx on public.profiles(email);
create index if not exists flights_user_id_idx on public.flights(user_id);
create index if not exists flights_status_idx on public.flights(status);
create index if not exists flights_date_idx on public.flights(flight_date);
create index if not exists flights_created_at_idx on public.flights(created_at desc);
create index if not exists flights_status_date_idx on public.flights(status, flight_date);
create index if not exists flights_user_status_date_idx on public.flights(user_id, status, flight_date);
create unique index if not exists flights_folio_unique_idx on public.flights(flight_folio) where flight_folio is not null;
create index if not exists messages_flight_id_idx on public.flight_messages(flight_id);
create index if not exists flight_messages_flight_created_idx on public.flight_messages(flight_id, created_at desc);
create index if not exists attachments_flight_id_idx on public.flight_attachments(flight_id);
create index if not exists flight_attachments_category_created_idx on public.flight_attachments(category, created_at desc);
create index if not exists notifications_user_id_idx on public.notifications(user_id);
create index if not exists notifications_user_read_idx on public.notifications(user_id, read);
create index if not exists notifications_created_at_idx on public.notifications(created_at desc);
create index if not exists audit_logs_action_idx on public.audit_logs(action);
create index if not exists audit_logs_created_at_idx on public.audit_logs(created_at desc);
create index if not exists flight_internal_notes_flight_created_idx on public.flight_internal_notes(flight_id, created_at desc);

-- Functions
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at before update on public.profiles
for each row execute function public.touch_updated_at();

drop trigger if exists flights_touch_updated_at on public.flights;
create trigger flights_touch_updated_at before update on public.flights
for each row execute function public.touch_updated_at();

drop trigger if exists bank_accounts_touch_updated_at on public.bank_accounts;
create trigger bank_accounts_touch_updated_at before update on public.bank_accounts
for each row execute function public.touch_updated_at();

drop trigger if exists app_settings_touch_updated_at on public.app_settings;
create trigger app_settings_touch_updated_at before update on public.app_settings
for each row execute function public.touch_updated_at();

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, coalesce(new.raw_user_meta_data ->> 'full_name',''),'user')
  on conflict (id) do update set email = excluded.email, full_name = excluded.full_name;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.is_admin(check_user_id uuid default auth.uid())
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = check_user_id and role = 'admin');
$$;

create or replace function public.can_access_flight(check_flight_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.flights where id = check_flight_id
    and (user_id = auth.uid() or public.is_admin()));
$$;

create or replace function public.assign_flight_folio()
returns trigger language plpgsql set search_path = public as $$
begin
  if new.flight_folio is null or trim(new.flight_folio) = '' then
    new.flight_folio := 'VP-' || to_char(now(),'YYYY') || '-' || lpad(nextval('public.flight_folio_seq')::text,6,'0');
  end if;
  return new;
end; $$;

drop trigger if exists flights_assign_folio_before_insert on public.flights;
create trigger flights_assign_folio_before_insert before insert on public.flights
for each row execute function public.assign_flight_folio();

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.flights enable row level security;
alter table public.flight_messages enable row level security;
alter table public.flight_attachments enable row level security;
alter table public.bank_accounts enable row level security;
alter table public.notifications enable row level security;
alter table public.audit_logs enable row level security;
alter table public.app_settings enable row level security;
alter table public.flight_internal_notes enable row level security;

-- Policies
create policy profiles_select_own_or_admin on public.profiles for select to authenticated
using (id = auth.uid() or public.is_admin());
create policy profiles_update_admin_only on public.profiles for update to authenticated
using (public.is_admin()) with check (public.is_admin());
create policy profiles_update_own on public.profiles for update to authenticated
using (id = auth.uid()) with check (id = auth.uid() and role = (select role from public.profiles where id = auth.uid()));

create policy flights_select_own_or_admin on public.flights for select to authenticated
using (user_id = auth.uid() or public.is_admin());
create policy flights_insert_own_pending on public.flights for insert to authenticated
with check (user_id = auth.uid() and status = 'pendiente_revision');
create policy flights_update_admin_only on public.flights for update to authenticated
using (public.is_admin()) with check (public.is_admin());
create policy flights_user_upload_payment_update on public.flights for update to authenticated
using (user_id = auth.uid() and status = 'esperando_pago')
with check (user_id = auth.uid() and status = 'pago_subido');
create policy flights_delete_admin_only on public.flights for delete to authenticated
using (public.is_admin());

create policy messages_select_by_flight_access on public.flight_messages for select to authenticated
using (public.can_access_flight(flight_id));
create policy messages_insert_by_flight_access on public.flight_messages for insert to authenticated
with check (sender_id = auth.uid() and public.can_access_flight(flight_id));

create policy attachments_select_by_flight_access on public.flight_attachments for select to authenticated
using (public.can_access_flight(flight_id));
create policy attachments_insert_by_flight_access on public.flight_attachments for insert to authenticated
with check (uploaded_by = auth.uid() and public.can_access_flight(flight_id));
create policy attachments_delete_admin_only on public.flight_attachments for delete to authenticated
using (public.is_admin());

create policy bank_accounts_admin_all on public.bank_accounts for all to authenticated
using (public.is_admin()) with check (public.is_admin());
create policy bank_accounts_user_read_active on public.bank_accounts for select to authenticated
using (active = true and exists (
  select 1 from public.flights f where f.user_id = auth.uid()
    and f.status in ('esperando_pago','pago_subido','pago_confirmado','pendiente_qr','qr_enviado','completado')
));

create policy notifications_select_own on public.notifications for select to authenticated
using (user_id = auth.uid() or public.is_admin());
create policy notifications_update_own on public.notifications for update to authenticated
using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy notifications_insert_admin_only on public.notifications for insert to authenticated
with check (public.is_admin());
create policy notifications_delete_admin_only on public.notifications for delete to authenticated
using (public.is_admin());

create policy audit_logs_select_admin_only on public.audit_logs for select to authenticated
using (public.is_admin());
create policy audit_logs_insert_authenticated on public.audit_logs for insert to authenticated
with check (user_id = auth.uid() or public.is_admin());

create policy app_settings_select_public_production on public.app_settings for select to anon, authenticated
using (key = 'production');
create policy app_settings_select_authenticated_safe on public.app_settings for select to authenticated
using (public.is_admin() or key in ('operations','production'));
create policy app_settings_admin_all on public.app_settings for all to authenticated
using (public.is_admin()) with check (public.is_admin());

create policy flight_internal_notes_admin_select on public.flight_internal_notes for select to authenticated
using (public.is_admin());
create policy flight_internal_notes_admin_insert on public.flight_internal_notes for insert to authenticated
with check (public.is_admin() and admin_id = auth.uid());
create policy flight_internal_notes_admin_delete on public.flight_internal_notes for delete to authenticated
using (public.is_admin());

-- GRANTS
grant select, insert, update, delete on public.profiles to authenticated;
grant all on public.profiles to service_role;
grant select, insert, update, delete on public.flights to authenticated;
grant all on public.flights to service_role;
grant select, insert, update, delete on public.flight_messages to authenticated;
grant all on public.flight_messages to service_role;
grant select, insert, update, delete on public.flight_attachments to authenticated;
grant all on public.flight_attachments to service_role;
grant select, insert, update, delete on public.bank_accounts to authenticated;
grant all on public.bank_accounts to service_role;
grant select, insert, update, delete on public.notifications to authenticated;
grant all on public.notifications to service_role;
grant select, insert on public.audit_logs to authenticated;
grant all on public.audit_logs to service_role;
grant select, insert, update, delete on public.app_settings to authenticated;
grant select on public.app_settings to anon;
grant all on public.app_settings to service_role;
grant select, insert, update, delete on public.flight_internal_notes to authenticated;
grant all on public.flight_internal_notes to service_role;
grant usage on sequence public.flight_folio_seq to authenticated;

-- Seed app_settings
insert into public.app_settings (key, value) values
  ('operations', jsonb_build_object(
    'support_email','','support_whatsapp','',
    'default_bank_note','Después de realizar el pago, sube tu comprobante en el detalle del vuelo.',
    'qr_delivery_note','Los QR se enviarán en cuanto el pago quede confirmado.',
    'urgent_window_days', 3)),
  ('production', jsonb_build_object(
    'site_url','','support_escalation_email','','legal_notice','',
    'public_registration_enabled', true,'max_upload_mb', 8,
    'cleanup_read_notifications_days', 45))
on conflict (key) do nothing;