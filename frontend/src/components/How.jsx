export default function How(){
  const steps=[{t:'Explora',d:'Descubre experiencias por región, duración e intereses.',i:'🧭'},{t:'Conecta',d:'Contacta a comunidades anfitrionas con seguridad.',i:'🤝'},{t:'Vive',d:'Participa, aprende y comparte tu experiencia.',i:'🎒'}]
  return (<section style={{marginTop:16}}><h2>¿Cómo funciona?</h2><div className="grid">{steps.map((x,i)=>(
    <article key={i} className="card" style={{display:'flex',gap:12,alignItems:'center'}}><div style={{fontSize:32}}>{x.i}</div><div><h3 style={{margin:'0 0 4px'}}>{x.t}</h3><p style={{color:'var(--muted)',margin:0}}>{x.d}</p></div></article>
  ))}</div></section>)
}