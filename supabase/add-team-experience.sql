-- Run this once if team-cms.sql was already applied to the Supabase project.
alter table public.team_members
  add column if not exists experience text not null default '' check (char_length(experience) <= 600);

notify pgrst, 'reload schema';
