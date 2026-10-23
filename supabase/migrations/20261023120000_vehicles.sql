-- Mega Cars — vehicle stock and photos (KARAR-DEFTERI 23.10.2026, section 1).
-- Row Level Security: everyone reads only vehicles that are visible and not archived;
-- writing is reserved for the administrators listed in admin_users. The same rule
-- protects the photo bucket (public read, admin write).

-- ---------------------------------------------------------------- administrators
create table if not exists public.admin_users (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  note       text,
  created_at timestamptz not null default now()
);
alter table public.admin_users enable row level security;

-- a signed-in person may check their own row; nobody writes this table through the API
create policy "own admin row" on public.admin_users
  for select to authenticated using (user_id = auth.uid());

create or replace function public.is_admin()
returns boolean
language sql stable security definer
set search_path = public
as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated, service_role;

-- ---------------------------------------------------------------- vehicles
create table if not exists public.vehicles (
  id                 uuid primary key default gen_random_uuid(),
  legacy_id          text unique,                      -- id in data/inventory.json (migration key)
  slug               text not null unique,
  make               text not null,
  make_slug          text not null,
  model              text not null,
  version            text,
  price              integer not null check (price >= 0),
  mileage            integer not null check (mileage >= 0),
  first_registration date not null,                    -- first day of the month
  power_kw           integer check (power_kw > 0),
  power_ps           integer check (power_ps > 0),
  fuel               text check (fuel in ('benzin', 'diesel', 'hybrid', 'elektro')),
  transmission       text check (transmission in ('automatik', 'schaltgetriebe')),
  body               text check (body in ('limousine', 'kombi', 'cabrio', 'coupe', 'suv', 'van', 'kleinwagen')),
  drive              text check (drive in ('allrad', 'heck', 'front')),
  seats              smallint check (seats between 1 and 9),
  doors              smallint check (doors between 2 and 6),
  gears              smallint check (gears between 1 and 12),
  cylinders          smallint check (cylinders between 1 and 16),
  displacement_ccm   integer check (displacement_ccm > 0),
  weight_kg          integer check (weight_kg > 0),
  emission_class     text,
  consumption_l      numeric(4, 1) check (consumption_l >= 0),
  co2                integer check (co2 >= 0),
  color              text,                              -- key of the colour list, or the listing's word
  color_manufacturer text,                              -- paint name of the manufacturer (proper name)
  interior_color     text,
  interior_material  text,
  service_book       boolean,
  non_smoker         boolean,
  previous_owners    smallint check (previous_owners >= 0),
  last_service       text,
  accident_free      boolean not null default false,
  first_owner        boolean not null default false,
  warranty           boolean not null default false,
  inspection_new     boolean not null default false,
  vat_note           text not null default 'unknown' check (vat_note in ('unknown', 'incl', 'margin')),
  equipment          text[] not null default '{}',      -- keys of data/equipment.json
  source_url         text,
  spin               jsonb,                             -- 360° showroom data, null until a shoot exists
  status             text not null default 'for_sale' check (status in ('for_sale', 'reserved', 'sold')),
  visible            boolean not null default true,
  featured           boolean not null default false,
  featured_order     integer not null default 0,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  archived_at        timestamptz
);

create index if not exists vehicles_public_idx on public.vehicles (created_at desc) where visible and archived_at is null;
create index if not exists vehicles_featured_idx on public.vehicles (featured_order, created_at desc) where featured and visible and archived_at is null;
create index if not exists vehicles_archived_idx on public.vehicles (archived_at desc) where archived_at is not null;

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end
$$;
drop trigger if exists vehicles_updated_at on public.vehicles;
create trigger vehicles_updated_at before update on public.vehicles
  for each row execute function public.set_updated_at();

alter table public.vehicles enable row level security;

create policy "public reads visible vehicles" on public.vehicles
  for select to anon, authenticated using (visible and archived_at is null);
create policy "admins read every vehicle" on public.vehicles
  for select to authenticated using (public.is_admin());
create policy "admins insert vehicles" on public.vehicles
  for insert to authenticated with check (public.is_admin());
create policy "admins update vehicles" on public.vehicles
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins delete vehicles" on public.vehicles
  for delete to authenticated using (public.is_admin());

-- ---------------------------------------------------------------- photos
create table if not exists public.vehicle_photos (
  id         uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references public.vehicles (id) on delete cascade,
  position   integer not null default 0,
  is_cover   boolean not null default false,
  path       text not null,                             -- "<vehicle>/<photo>" in the "vehicles" bucket
  ext        text not null default 'webp' check (ext in ('webp', 'jpg')),
  width      integer not null check (width > 0),       -- of the large (1600 px) file
  height     integer not null check (height > 0),
  blur       text not null,                             -- 16 px data URL for the blur-up placeholder
  created_at timestamptz not null default now()
);

create index if not exists vehicle_photos_vehicle_idx on public.vehicle_photos (vehicle_id, position);
create unique index if not exists vehicle_photos_cover_key on public.vehicle_photos (vehicle_id) where is_cover;

alter table public.vehicle_photos enable row level security;

create policy "public reads photos of visible vehicles" on public.vehicle_photos
  for select to anon, authenticated
  using (exists (select 1 from public.vehicles v where v.id = vehicle_id and v.visible and v.archived_at is null));
create policy "admins read every photo" on public.vehicle_photos
  for select to authenticated using (public.is_admin());
create policy "admins insert photos" on public.vehicle_photos
  for insert to authenticated with check (public.is_admin());
create policy "admins update photos" on public.vehicle_photos
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins delete photos" on public.vehicle_photos
  for delete to authenticated using (public.is_admin());

-- ---------------------------------------------------------------- privileges
-- The project was created with "automatically expose new tables" switched off, so the
-- API roles receive their table privileges here, explicitly. Row Level Security above
-- decides which rows each role may touch; these grants only open the tables.
grant usage on schema public to anon, authenticated, service_role;
grant select on public.admin_users to authenticated;
grant all on public.admin_users to service_role;
grant select on public.vehicles, public.vehicle_photos to anon, authenticated;
grant insert, update, delete on public.vehicles, public.vehicle_photos to authenticated;
grant all on public.vehicles, public.vehicle_photos to service_role;

-- ---------------------------------------------------------------- storage
-- Public read: the site embeds the photo addresses in static pages, so they must open
-- without a token. Paths contain two random UUIDs and are linked nowhere once a vehicle
-- is hidden; a fully private bucket would need signed addresses on every page.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('vehicles', 'vehicles', true, 6291456, array['image/webp', 'image/jpeg'])
on conflict (id) do nothing;

create policy "public reads vehicle photos" on storage.objects
  for select to anon, authenticated using (bucket_id = 'vehicles');
create policy "admins upload vehicle photos" on storage.objects
  for insert to authenticated with check (bucket_id = 'vehicles' and public.is_admin());
create policy "admins replace vehicle photos" on storage.objects
  for update to authenticated using (bucket_id = 'vehicles' and public.is_admin()) with check (bucket_id = 'vehicles' and public.is_admin());
create policy "admins delete vehicle photos" on storage.objects
  for delete to authenticated using (bucket_id = 'vehicles' and public.is_admin());
