export default function Security(){
  const items=[{t:'Privacidad',d:'Tus datos se manejan con buenas prácticas y consentimiento.',i:'🔒'},{t:'Confianza',d:'Perfiles verificados y flujo de aprobación de experiencias.',i:'✅'},{t:'Transparencia',d:'Términos claros y soporte a comunidades locales.',i:'📜'}]
  return (<section style={{marginTop:16}}><h2>Seguridad y confianza</h2><div className="grid">{items.map((x,i)=>(
    <article key={i} className="card"><div style={{fontSize:28}}>{x.i}</div><h3 style={{margin:'8px 0 4px'}}>{x.t}</h3><p style={{color:'var(--muted)'}}>{x.d}</p></article>
  ))}</div></section>)
}