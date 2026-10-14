import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, LogOut, Plus, Save, Trash2, Users } from 'lucide-react';
import { currentAdmin, deleteTeamMember, listAdminTeam, saveTeamMember, signInAdmin, signOutAdmin, teamCmsConfigured, uploadTeamPhoto } from '../lib/teamCms.js';

const blankMember = { name: '', role: '', bio: '', experience: '', photo_url: '', sort_order: 0, is_published: false };

export function AdminTeamPage() {
  const [admin, setAdmin] = React.useState(null);
  const [members, setMembers] = React.useState([]);
  const [member, setMember] = React.useState(blankMember);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [busy, setBusy] = React.useState(false);

  const refresh = React.useCallback(async () => setMembers(await listAdminTeam()), []);
  React.useEffect(() => {
    if (!teamCmsConfigured) return;
    currentAdmin().then((user) => { if (user) { setAdmin(user); refresh().catch((error) => setMessage(error.message)); } });
  }, [refresh]);

  async function handleLogin(event) {
    event.preventDefault(); setBusy(true); setMessage('');
    try { const user = await signInAdmin(email, password); setAdmin(user); setPassword(''); await refresh(); }
    catch (error) { setMessage(error.message); }
    finally { setBusy(false); }
  }

  async function handlePhoto(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setMessage('Choose an image file.'); return; }
    if (file.size > 5 * 1024 * 1024) { setMessage('Please choose an image smaller than 5 MB.'); return; }
    setBusy(true); setMessage('Uploading photo…');
    try { const photo_url = await uploadTeamPhoto(file); setMember((current) => ({ ...current, photo_url })); setMessage('Photo uploaded. Save the profile to publish the change.'); }
    catch (error) { setMessage(error.message); }
    finally { setBusy(false); event.target.value = ''; }
  }

  async function handleSave(event) {
    event.preventDefault(); setBusy(true); setMessage('');
    try { await saveTeamMember({ ...member, sort_order: Number(member.sort_order) || 0 }); await refresh(); setMember(blankMember); setMessage('Team profile saved.'); }
    catch (error) { setMessage(error.message); }
    finally { setBusy(false); }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this team profile?')) return;
    setBusy(true);
    try { await deleteTeamMember(id); await refresh(); if (member.id === id) setMember(blankMember); setMessage('Team profile deleted.'); }
    catch (error) { setMessage(error.message); }
    finally { setBusy(false); }
  }

  async function handleLogout() {
    await signOutAdmin(); setAdmin(null); setMembers([]); setMember(blankMember);
  }

  return <main className="team-admin-page">
    <div className="team-admin-shell">
      <Link className="team-admin-back" to="/team"><ArrowLeft size={15}/> Back to Team page</Link>
      <header className="team-admin-heading"><span><Users size={18}/> TELLA MIND CONTENT ADMIN</span><h1>Team profiles</h1><p>Add real member details and photos. Published profiles appear on the public Team page.</p></header>
      {!teamCmsConfigured ? <section className="team-admin-notice"><b>Portal needs a database connection</b><p>Set <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> in your local <code>.env</code> and hosting environment, then run the setup SQL in <code>supabase/team-cms.sql</code>. Create an admin account in Supabase Auth and insert its user ID into <code>team_admins</code>.</p><p>After setup, sign in here at <code>/admin</code>. The public anon key is safe for browser use only when the included row-level security rules are active. Never put a service-role key in the website.</p></section>
        : !admin ? <form className="team-admin-login" onSubmit={handleLogin}><h2>Admin sign in</h2><label>Email<input type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)}/></label><label>Password<input type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)}/></label><button className="button button-dark" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>{message && <p className="team-admin-message" role="status">{message}</p>}</form>
        : <>
          <div className="team-admin-toolbar"><span>Signed in as {admin.email}</span><button className="team-admin-logout" onClick={handleLogout}><LogOut size={15}/> Sign out</button></div>
          <div className="team-admin-grid">
            <form className="team-admin-editor" onSubmit={handleSave}>
              <div className="team-admin-editor-title"><h2>{member.id ? 'Edit profile' : 'Add a team member'}</h2><button type="button" onClick={() => setMember(blankMember)} aria-label="New member"><Plus size={17}/></button></div>
              <label>Full name<input required maxLength="90" value={member.name} onChange={(event) => setMember({ ...member, name: event.target.value })}/></label>
              <label>Job title<input required maxLength="100" placeholder="Founder & Product Lead" value={member.role} onChange={(event) => setMember({ ...member, role: event.target.value })}/></label>
              <label>Short bio<textarea required maxLength="320" rows="4" placeholder="A short, accurate introduction." value={member.bio} onChange={(event) => setMember({ ...member, bio: event.target.value })}/></label>
              <label>Work experience<textarea maxLength="600" rows="3" placeholder="Relevant years, roles, industries, or specialties." value={member.experience || ''} onChange={(event) => setMember({ ...member, experience: event.target.value })}/></label>
              <label>Photo<input type="file" accept="image/*" onChange={handlePhoto} disabled={busy}/></label>
              {member.photo_url && <img className="team-admin-photo-preview" src={member.photo_url} alt="Profile preview"/>}
              <label>Display order<input type="number" min="0" value={member.sort_order} onChange={(event) => setMember({ ...member, sort_order: event.target.value })}/></label>
              <label className="team-admin-publish"><input type="checkbox" checked={member.is_published} onChange={(event) => setMember({ ...member, is_published: event.target.checked })}/> Show this profile on the public site</label>
              <button className="button button-dark" disabled={busy}><Save size={15}/>{busy ? 'Saving…' : 'Save profile'}</button>
              {message && <p className="team-admin-message" role="status">{message}</p>}
            </form>
            <section className="team-admin-list"><h2>Team directory <span>{members.length}</span></h2>{members.length ? members.map((item) => <article className="team-admin-row" key={item.id}>{item.photo_url ? <img src={item.photo_url} alt=""/> : <div className="team-admin-avatar">{item.name.slice(0, 1)}</div>}<div><b>{item.name}</b><span>{item.role}</span><small>{item.is_published ? 'Published' : 'Draft'}</small></div><button onClick={() => { setMember(item); setMessage(''); }} aria-label={`Edit ${item.name}`}>Edit</button><button className="team-admin-delete" onClick={() => handleDelete(item.id)} aria-label={`Delete ${item.name}`}><Trash2 size={15}/></button></article>) : <p>No team profiles yet. Add one with the form.</p>}</section>
          </div>
        </>}
    </div>
  </main>;
}
