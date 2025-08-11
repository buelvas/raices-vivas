export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api';

export async function apiFetch(path, opts = {}) {
  const res = await fetch(API_BASE + path, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(opts.headers || {}),
    },
    ...opts,
  });
  if (!res.ok) {
    let msg = '';
    try { msg = await res.text(); } catch {}
    throw new Error(msg || `Error ${res.status}`);
  }
  const ct = res.headers.get('content-type') || '';
  return ct.includes('application/json') ? res.json() : res.text();
}

// ---- Auth endpoints (server) ----
export async function authRegister({ name, email, password, phone, city, country, role, terms }) {
  return apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, phone, city, country, role, terms })
  });
}

export async function authLogin(email, password) {
  // Sets httpOnly cookie on success
  return apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function authLogout() {
  return apiFetch('/auth/logout', { method: 'POST' });
}

export async function authMe() {
  return apiFetch('/auth/me', { method: 'GET' });
}



// export async function apiFetch(path, opts = {}) {
//   const res = await fetch(API_BASE + path, { credentials: 'include', headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) }, ...opts })
//   if (!res.ok) { const msg = await res.text().catch(() => ''); throw new Error(msg || `Error ${res.status}`) }
//   const ct = res.headers.get('content-type') || ''; return ct.includes('application/json') ? res.json() : res.text()
// }
export const Demo = {
  usersKey: 'rv_users', sessionKey: 'rv_session',
  loadUsers() { try { return JSON.parse(localStorage.getItem(this.usersKey) || '[]') } catch { return [] } },
  saveUsers(u) { localStorage.setItem(this.usersKey, JSON.stringify(u)) },
  hash(s) { let h = 0; for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0; return (h >>> 0).toString(16) },
  register(d) { 
    const users = this.loadUsers(); 
    if (users.find(u => u.email.toLowerCase() === d.email.toLowerCase())) 
      throw new Error('El correo ya está registrado.'); 
    users.push({ ...d, password: this.hash(d.password) }); 
    this.saveUsers(users); 
    return { ok: true } },
  login(email, pw) { const u = this.loadUsers().find(u => u.email.toLowerCase() === email.toLowerCase()); if (!u) throw new Error('Usuario no encontrado'); if (u.password !== this.hash(pw)) throw new Error('Contraseña incorrecta'); const s = { email: u.email, name: u.name, role: u.role, startedAt: new Date().toISOString() }; localStorage.setItem(this.sessionKey, JSON.stringify(s)); return s },
  getSession() { try { return JSON.parse(localStorage.getItem(this.sessionKey) || 'null') } catch { return null } },
  logout() { localStorage.removeItem(this.sessionKey) }
}