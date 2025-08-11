export default function Hero({ variant = 'urbano' }) {
  const imgSrc = variant === 'natural'
    ? '/img/hero_natural.jpg'
    : '/img/hero_urbano.jpg';
  return (
    <section className="hero">
      <div>
        <p className="kicker">Tecnología cívica</p>
        <h1>Conecta tu saber con quienes lo necesitan</h1>
        <p>Un ecosistema que impulsa redes de apoyo, formación y participación ciudadana.</p>
        <div style={{display:'flex',gap:8,marginTop:8}}>
          <a className="btn primary" href="/registro">Únete ahora</a>
          <a className="btn" href="/login">Ya tengo cuenta</a>
        </div>
      </div>
      <img src={imgSrc} alt="Raíces Vivas" style={{width:'100%',borderRadius:18,border:'1px solid var(--border)'}}/>
    </section>
  )
}