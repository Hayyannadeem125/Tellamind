-- Run once in Supabase SQL Editor.
-- Create the admin user in Authentication first; then insert that user's UUID
-- into public.team_admins (example at the bottom of this file).

create table if not exists public.team_admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 90),
  role text not null check (char_length(role) between 1 and 100),
  bio text not null check (char_length(bio) between 1 and 320),
  experience text not null default '' check (char_length(experience) <= 600),
  photo_url text not null default '',
  sort_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.team_members
  add column if not exists experience text not null default '' check (char_length(experience) <= 600);

create or replace function public.is_tellamind_team_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.team_admins where user_id = auth.uid()
  );
$$;

revoke all on function public.is_tellamind_team_admin() from public;
grant execute on function public.is_tellamind_team_admin() to anon, authenticated;

alter table public.team_admins enable row level security;
alter table public.team_members enable row level security;

create policy "Admins can read their own admin record"
  on public.team_admins for select to authenticated
  using (user_id = auth.uid());

create policy "Public can view published team members"
  on public.team_members for select to anon, authenticated
  using (is_published or public.is_tellamind_team_admin());

create policy "Admins can add team members"
  on public.team_members for insert to authenticated
  with check (public.is_tellamind_team_admin());

create policy "Admins can update team members"
  on public.team_members for update to authenticated
  using (public.is_tellamind_team_admin())
  with check (public.is_tellamind_team_admin());

create policy "Admins can delete team members"
  on public.team_members for delete to authenticated
  using (public.is_tellamind_team_admin());

grant select on public.team_members to anon, authenticated;
grant insert, update, delete on public.team_members to authenticated;
grant select on public.team_admins to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('team-photos', 'team-photos', true, 5242880, array['image/jpeg','image/png','image/webp','image/avif'])
on conflict (id) do update set public = true, file_size_limit = 5242880,
  allowed_mime_types = array['image/jpeg','image/png','image/webp','image/avif'];

create policy "Public can view team photos"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'team-photos');

create policy "Admins can upload team photos"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'team-photos' and public.is_tellamind_team_admin());

create policy "Admins can update team photos"
  on storage.objects for update to authenticated
  using (bucket_id = 'team-photos' and public.is_tellamind_team_admin())
  with check (bucket_id = 'team-photos' and public.is_tellamind_team_admin());

create policy "Admins can delete team photos"
  on storage.objects for delete to authenticated
  using (bucket_id = 'team-photos' and public.is_tellamind_team_admin());

-- After creating your admin user in Supabase Auth, add their UUID:
-- insert into public.team_admins (user_id) values ('YOUR-AUTH-USER-UUID');
