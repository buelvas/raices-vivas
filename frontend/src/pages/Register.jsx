import { useState } from 'react'
import { authRegister } from '../utils/api'
import { useNavigate, Link } from 'react-router-dom'

export default function Register() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', phone: '', city: '', country: '', role: '', terms: false
  })
  const [err, setErr] = useState(''); 
  const [serverErrors, setServerErrors] = useState([]) // array de errores del backend
  const [ok, setOk] = useState(false)
  const nav = useNavigate()

  function normalizeBackendError(message){
    // El apiFetch lanza Error(msg) donde msg puede ser JSON o texto.
    try {
      const data = JSON.parse(message)
      if (Array.isArray(data?.errors)) {
        // express-validator: errors: [{ msg, path, ...}]
        return { errors: data.errors.map(e => e.msg || 'Error de validación') }
      }
      if (typeof data?.error === 'string') {
        return { errors: [data.error] }
      }
    } catch { /* no es JSON */ }
    return { errors: [message || 'Ocurrió un error'] }
  }

  async function onSubmit(e) {
    e.preventDefault(); 
    setErr(''); 
    setOk(false)
    const req = ['name', 'email', 'password'];
    const miss = req.filter(k => !form[k])
    if (miss.length) { setErr('Faltan campos: ' + miss.join(', ')); return }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) { setErr('Correo inválido'); return }
    if (!form.terms) { setErr('Debes aceptar términos'); return }
    try {
      await authRegister({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        phone: form.phone || null,
        city: form.city || null,
        country: form.country || null,
        role: form.role || null,
        terms: !!form.terms
      })
      setOk(true)
      setTimeout(()=> nav('/login'), 600)
    }catch(ex){
      const parsed = normalizeBackendError(ex.message)
      setServerErrors(parsed.errors)
      if (!parsed.errors?.length) setErr(ex.message)
    }
  }

   return (
    <section style={{padding:'16px 0'}}>
      <h2>Registro</h2>
      <form className="card" onSubmit={onSubmit} noValidate>
        <div className="row">
          <div>
            <label>Nombre completo</label>
            <input className="input" value={form.name}
              onChange={e=>setForm({...form,name:e.target.value})}
              placeholder="Ana Pérez"/>
          </div>
          <div>
            <label>Correo</label>
            <input className="input" type="email" value={form.email}
              onChange={e=>setForm({...form,email:e.target.value})}
              placeholder="ana@email.com"/>
          </div>
        </div>

        <div className="row" style={{marginTop:10}}>
          <div>
            <label>Contraseña</label>
            <input className="input" type="password" value={form.password}
              onChange={e=>setForm({...form,password:e.target.value})}
              placeholder="••••••••"/>
            <div className="help">Se almacena de forma segura en el servidor (hash con bcrypt).</div>
          </div>
          <div>
            <label>Teléfono</label>
            <input className="input" value={form.phone}
              onChange={e=>setForm({...form,phone:e.target.value})}
              placeholder="+57 300 000 0000"/>
          </div>
        </div>

        <div className="row" style={{marginTop:10}}>
          <div>
            <label>Ciudad</label>
            <input className="input" value={form.city}
              onChange={e=>setForm({...form,city:e.target.value})}/>
          </div>
          <div>
            <label>País</label>
            <input className="input" value={form.country}
              onChange={e=>setForm({...form,country:e.target.value})}/>
          </div>
        </div>

        <div style={{marginTop:10}}>
          <label>Rol o perfil</label>
          <select className="input" value={form.role}
            onChange={e=>setForm({...form,role:e.target.value})}>
            <option value="">Selecciona</option>
            <option>Visitante</option>
            <option>Comunidad anfitriona</option>
            <option>Coordinación</option>
          </select>
        </div>

        <label style={{display:'flex',gap:8,alignItems:'center',marginTop:10}}>
          <input type="checkbox" checked={form.terms}
            onChange={e=>setForm({...form,terms:e.target.checked})}/>
          <span>Acepto términos y condiciones</span>
        </label>

        {/* Errores del backend legibles */}
        {serverErrors.length > 0 && (
          <ul className="help" style={{color:'#b91c1c', marginTop:10}}>
            {serverErrors.map((m,i)=>(<li key={i}>{m}</li>))}
          </ul>
        )}

        {/* Fallback de error plano */}
        {err && <p className="help" style={{color:'#b91c1c'}}>{err}</p>}

        {/* Mensaje de éxito */}
        {ok && <p className="help" style={{color:'#047857'}}>✅ Cuenta creada. Ahora inicia sesión.</p>}

        <div style={{display:'flex',gap:8,marginTop:12}}>
          <button className="btn primary">Crear cuenta</button>
          <Link className="btn" to="/login">Ya tengo cuenta</Link>
        </div>
      </form>
    </section>
  )
}
