export default function FAQ(){
  const items=[{q:'¿Es gratuito?',a:'Sí, este demo es gratuito y no recolecta datos reales.'},{q:'¿Cómo se valida una experiencia?',a:'Existe un flujo de aprobación por parte de coordinadores del proyecto.'},{q:'¿Qué pasa con mis datos?',a:'Se manejan con políticas claras y puedes eliminarlos cuando quieras.'}]
  return (<section style={{marginTop:16}}><h2>FAQ</h2><div className="accordion" style={{display:'grid',gap:10}}>{items.map((x,i)=>(
    <details key={i} className="item"><summary>{x.q}</summary><p style={{color:'var(--muted)',marginTop:8}}>{x.a}</p></details>
  ))}</div></section>)
}