import { useEffect } from 'react'
import { authMe, authLogout } from '../utils/api'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Panel() {
  const { user, setUser } = useAuth()
  const nav = useNavigate()

  useEffect(() => {
    (async () => {
      try {
        const me = await authMe()
        setUser(me.user)
      } catch {
        nav('/login')
      }
    })()
  }, [])


    if(!user) return null 

  const cards = [
    { t:'Minga por el río', img:'/img/panel/rio_photo.jpg', d:'Limpieza, señalización y educación ambiental.' },
    { t:'Ruta de oficios', img:'/img/panel/oficios_photo.jpg', d:'Visitas a talleres de carpintería y artesanía.' },
    { t:'Huertas urbanas', img:'/img/panel/huertas_photo.jpg', d:'Siembra colaborativa y trueque de cosechas.' },
  ]

  return (
    <section style={{ padding: '16px 0' }}>
      <div className="hero" style={{ gridTemplateColumns: '1.2fr .8fr' }}>
        <div>
          <p className="kicker">Panel privado</p>
          <h1>Hola, {user.name || 'vecina/vecino'} 👋</h1>
          <p>Rol: <strong>{user.role}</strong> · Sesión iniciada: {new Date(user.startedAt).toLocaleString()}</p>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <Link className="btn" to="/">Explorar Home</Link>
            <button className="btn" onClick={async() => { await authLogout(); setUser(null); nav('/login') }}>Cerrar sesión</button>
          </div>
        </div>
        <img src="/img/panel/header.svg" alt="Tecnología y territorio"
          style={{ width: '100%', borderRadius: 18, border: '1px solid var(--border)' }} />
      </div>

      <div className="grid" style={{ marginTop: 16 }}>
        {cards.map((c, i) => (
          <article key={i} className="card">
            <div style={{ position:'relative' }}>
              <img src={c.img} alt={c.t}
                style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 12, border: '1px solid var(--border)' }} />
              <span style={{
                position:'absolute', left:12, top:12, background:'#ffffffd9', border:'1px solid var(--border)',
                padding:'4px 10px', borderRadius:999, fontSize:12
              }}>Comunidad</span>
            </div>
            <h3 style={{ margin: '8px 0 4px' }}>{c.t}</h3>
            <p style={{ color: 'var(--muted)', margin:'0 0 8px' }}>{c.d}</p>
            <div style={{ display:'flex', gap:8, alignItems:'center', fontSize:12, color:'var(--muted)' }}>
              <span>⏱️ 3–4 h</span>
              <span>•</span>
              <span>📍 Local</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
