export default function Purpose(){
  const items=[{t:'Conexión',d:'Unimos comunidades y visitantes a través de experiencias con sentido.',i:'🌱'},{t:'Aprendizaje',d:'Fomentamos el intercambio de saberes locales y oficios.',i:'📚'},{t:'Impacto',d:'Pequeñas acciones que generan cambios sostenibles.',i:'✨'}]
  return (<section style={{marginTop:16}}><h2>Propósito</h2><div className="grid">{items.map((x,i)=>(
    <article key={i} className="card"><div style={{fontSize:30}}>{x.i}</div><h3 style={{margin:'8px 0 4px'}}>{x.t}</h3><p style={{color:'var(--muted)'}}>{x.d}</p></article>
  ))}</div></section>)
}