# TellaMind team editor setup

The editor lives at `/admin`. It uses Supabase Auth, Postgres, and Storage so changes made there can appear on the deployed Team page.

## One-time setup

1. Create a Supabase project.
2. In **SQL Editor**, run [`team-cms.sql`](./team-cms.sql).
   If you already ran the earlier version of that script before the work-experience field was added, run [`add-team-experience.sql`](./add-team-experience.sql) instead. Do not rerun the main script; its access policies are created once.
3. In **Authentication → Users**, create your own email/password admin account. Copy its user UUID.
4. In SQL Editor, run `insert into public.team_admins (user_id) values ('YOUR-AUTH-USER-UUID');` with that UUID.
5. In the Supabase project settings, copy the Project URL and public anon/publishable key. Add them to the local `.env`:

   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-public-anon-key
   ```

6. Restart `npm run dev`, then open `http://localhost:5173/admin` (use the port Vite prints if it differs).
7. Add the same two variables to the production host's environment-variable settings and redeploy. The deployed editor will be at `https://your-domain/admin`.

The admin form supports name, role, bio, work experience, photo, display order, and draft/published status. A saved published profile appears on `/team`. Open the portal directly at `/admin` or use the small lock icon at the far right of the footer. Sign-in is restricted by the `team_admins` table and database row-level security. Never use a Supabase service-role key in this React app or a `VITE_` variable.

The `.env` file must stay local and uncommitted. Only add an account you control to `team_admins`.
