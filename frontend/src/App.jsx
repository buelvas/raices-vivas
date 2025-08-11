import { useEffect } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { authMe, authLogout } from './utils/api'
import { useAuth } from './context/AuthContext'

export default function App() {
  const { user, setUser } = useAuth()
  const navigate = useNavigate();

  useEffect(() => {
      (async () => {
        try {
          const me = await authMe()
          setUser(me.user)
        } catch {
          setUser(null)
          navigate('/')
        }
      })()
    }, [])

  return (<div className="container">
    <header className="nav">
      <div className="brand"><span className="dot"></span><span>Raíces Vivas</span></div>
      <nav style={{ display: 'flex', gap: 8 }}>
        <Link className="btn" to="/">Inicio</Link>
        {!user && <Link className="btn" to="/login">Login</Link>}
        {!user && <Link className="btn primary" to="/registro">Registro</Link>}
        {user && <Link className="btn primary" to="/panel">Panel</Link>}
        {user && <button className="btn" onClick={async() => { await authLogout(); setUser(null); navigate('/login') }}>Cerrar sesión</button>}
      </nav>
    </header>
    <Outlet />
    <footer style={{ marginTop: 24, paddingTop: 12, borderTop: '1px solid var(--border)', color: 'var(--muted)' }}>© 2025 Raíces Vivas </footer>
  </div>)
}