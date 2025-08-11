export default function Gallery(){
  const items = [
    { src: '/src/assets/gallery/comunidad_photo.jpg', t: 'Comunidad', d: 'Encuentros locales, caminatas y apoyo mutuo.' },
    { src: '/src/assets/gallery/paisaje_photo.jpg', t: 'Paisaje', d: 'Rutas por ríos y colinas con guías de la zona.' },
    { src: '/src/assets/gallery/tecnologia_photo.jpg', t: 'Tecnología', d: 'Coworks, talleres de oficios digitales y hardware abierto.' },
    { src: '/src/assets/gallery/tradicion_photo.jpg', t: 'Tradición', d: 'Talleres de carpintería y saberes artesanales.' },
    { src: '/src/assets/gallery/ambiente_photo.jpg', t: 'Ambiente', d: 'Actividades de cuidado del territorio y educación ambiental.' },
    { src: '/src/assets/gallery/juventudes_photo.jpg', t: 'Juventudes', d: 'Espacios maker, robótica y proyectos comunitarios.' },
  ]
  return (
    <section style={{marginTop:16}} className="gallery">
      <h2>Comunidades</h2>
      <div className="grid">
        {items.map((x,i)=> (
          <article key={i} className="card">
            <img src={x.src} alt={x.t} />
            <h3 style={{margin:'6px 0 4px'}}>{x.t}</h3>
            <p style={{color:'var(--muted)'}}>{x.d}</p>
          </article>
        ))}
      </div>
    </section>
  )
}