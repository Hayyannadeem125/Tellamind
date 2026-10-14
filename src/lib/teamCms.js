const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, '');
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const sessionKey = 'tellamind-admin-session';

export const teamCmsConfigured = Boolean(supabaseUrl && supabaseKey);

function readSession() {
  try { return JSON.parse(localStorage.getItem(sessionKey) || 'null'); }
  catch { return null; }
}

function saveSession(session) {
  if (session) localStorage.setItem(sessionKey, JSON.stringify(session));
  else localStorage.removeItem(sessionKey);
}

async function authRequest(path, body) {
  const response = await fetch(`${supabaseUrl}/auth/v1/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', apikey: supabaseKey },
    body: JSON.stringify(body),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.msg || result.message || result.error_description || 'Authentication failed.');
  return result;
}

async function validSession() {
  let session = readSession();
  if (!session?.refresh_token) return null;
  if (session.expires_at && session.expires_at < Date.now() + 60_000) {
    const refreshed = await authRequest('token?grant_type=refresh_token', { refresh_token: session.refresh_token });
    session = { ...refreshed, expires_at: Date.now() + (refreshed.expires_in || 3600) * 1000 };
    saveSession(session);
  }
  return session;
}

async function api(path, options = {}) {
  if (!teamCmsConfigured) throw new Error('Admin portal needs Supabase configuration first.');
  const session = await validSession();
  const response = await fetch(`${supabaseUrl}${path}`, {
    ...options,
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${session?.access_token || supabaseKey}`,
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...options.headers,
    },
  });
  if (!response.ok) {
    const result = await response.json().catch(() => ({}));
    throw new Error(result.message || result.msg || `Request failed (${response.status}).`);
  }
  if (response.status === 204) return null;
  return response.json();
}

export async function signInAdmin(email, password) {
  const result = await authRequest('token?grant_type=password', { email, password });
  const session = { ...result, expires_at: Date.now() + (result.expires_in || 3600) * 1000 };
  saveSession(session);
  try {
    const adminRows = await api(`/rest/v1/team_admins?select=user_id&user_id=eq.${result.user.id}&limit=1`);
    if (!adminRows.length) throw new Error('Admin access is not enabled for this account.');
  } catch (error) {
    saveSession(null);
    throw new Error('This account is not enabled as a TellaMind admin.');
  }
  return result.user;
}

export async function currentAdmin() {
  const session = await validSession();
  if (!session?.access_token) return null;
  try {
    const user = await api('/auth/v1/user');
    const adminRows = await api(`/rest/v1/team_admins?select=user_id&user_id=eq.${user.id}&limit=1`);
    if (!adminRows.length) throw new Error('Admin access is not enabled for this account.');
    return user;
  } catch {
    saveSession(null);
    return null;
  }
}

export async function signOutAdmin() {
  const session = readSession();
  try {
    if (session?.access_token) await fetch(`${supabaseUrl}/auth/v1/logout`, { method: 'POST', headers: { apikey: supabaseKey, Authorization: `Bearer ${session.access_token}` } });
  } finally { saveSession(null); }
}

export function listPublicTeam() {
  return api('/rest/v1/team_members?select=id,name,role,bio,experience,photo_url,sort_order&is_published=eq.true&order=sort_order.asc,name.asc');
}

export function listAdminTeam() {
  return api('/rest/v1/team_members?select=*&order=sort_order.asc,name.asc');
}

export function saveTeamMember(member) {
  const isUpdate = Boolean(member.id);
  return api(`/rest/v1/team_members${isUpdate ? `?id=eq.${member.id}` : ''}`, {
    method: isUpdate ? 'PATCH' : 'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify(member),
  });
}

export function deleteTeamMember(id) {
  return api(`/rest/v1/team_members?id=eq.${id}`, { method: 'DELETE' });
}

export async function uploadTeamPhoto(file) {
  const safeName = `${crypto.randomUUID()}-${file.name.toLowerCase().replace(/[^a-z0-9.-]+/g, '-')}`;
  const response = await api(`/storage/v1/object/team-photos/${safeName}`, {
    method: 'POST',
    body: file,
    headers: { 'Content-Type': file.type || 'application/octet-stream', 'x-upsert': 'false' },
  });
  return `${supabaseUrl}/storage/v1/object/public/team-photos/${encodeURIComponent(safeName)}`;
}
