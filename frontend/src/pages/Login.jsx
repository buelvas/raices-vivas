import { useState } from 'react'
import { authLogin, authMe } from '../utils/api'
import { useNavigate, Link } from 'react-router-dom'
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const nav = useNavigate()

  async function onSubmit(e) {
    e.preventDefault(); setErr('')
    if (!email || !password) { 
      setErr('Completa correo y contraseña'); 
      return 
    }
    try {
      await authLogin(email, password) // sets httpOnly cookie
      const me = await authMe()
      sessionStorage.setItem('rv_user', JSON.stringify(me.user))
      nav('/panel')
    } catch (ex) { setErr(ex.message) }
  }
  return (<section style={{ padding: '16px 0' }}><h2>Iniciar sesión</h2><form className="card" onSubmit={onSubmit} style={{ maxWidth: 520 }}>
    <div><label>Correo</label><input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} /></div>
    <div style={{ marginTop: 10 }}><label>Contraseña</label><input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} /></div>
    {err && <p className="help" style={{ color: '#b91c1c' }}>{err}</p>}
    <div style={{ display: 'flex', gap: 8, marginTop: 12 }}><button className="btn primary">Entrar</button><Link className="btn" to="/registro">Crear cuenta</Link></div>
  </form></section>)
}