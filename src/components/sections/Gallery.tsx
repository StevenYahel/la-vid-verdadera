'use client'

import { useEffect, useRef, useState } from 'react'
import { Images, ArrowRight } from 'lucide-react'

const ITEMS = [
  { src: '/images/galeria-1.jpg', label: 'Adoración',           desc: 'La presencia de Dios transformando vidas',      iconBg: '#CC2229', icon: '❤' },
  { src: '/images/galeria-2.jpg', label: 'Ministerio de música', desc: 'Alabanza que eleva nuestro corazón',            iconBg: '#F5A800', icon: '🎵' },
  { src: '/images/galeria-3.jpg', label: 'Ministerio de Jóvenes',desc: 'Formando generaciones con principios y amor',   iconBg: '#5B2D8E', icon: '👥' },
  { src: '/images/galeria-4.jpg', label: 'Celebraciones',        desc: 'Momentos especiales que nos unen',             iconBg: '#CC2229', icon: '❤' },
  { src: '/images/galeria-5.jpg', label: 'Día del Padre',        desc: 'Honrando a quienes Dios nos dio',              iconBg: '#0F6E56', icon: '⭐' },
  { src: '/images/galeria-6.jpg', label: 'Bautismos',            desc: 'Nuevas vidas en Cristo',                       iconBg: '#1B4FA0', icon: '💧' },
]

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.06 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref])
  return visible
}

function Card({ item, className = '', style }: { item: typeof ITEMS[0]; className?: string; style?: React.CSSProperties }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className={className}
      style={{
        position: 'relative', borderRadius: '20px', overflow: 'hidden',
        background: '#d1d5db', cursor: 'pointer',
        boxShadow: hovered ? '0 16px 40px rgba(0,0,0,0.18)' : '0 2px 12px rgba(0,0,0,0.09)',
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
        transition: 'box-shadow 0.3s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1)',
        ...style,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={item.src} alt={item.label}
        style={{
          width: '100%', height: '100%', objectFit: 'cover', display: 'block',
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
          transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
        }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
      }}/>
      <div style={{ position: 'absolute', bottom: '14px', left: '12px', right: '12px', display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
        <div style={{
          width: '28px', height: '28px', borderRadius: '50%',
          background: item.iconBg, display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '12px', flexShrink: 0,
        }}>
          {item.icon}
        </div>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontFamily: 'var(--font-manrope)', fontSize: '13px', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '2px' }}>
            {item.label}
          </p>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', fontWeight: 300, color: 'rgba(255,255,255,0.65)', lineHeight: 1.3 }}>
            {item.desc}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Gallery() {
  const ref = useRef<HTMLElement>(null)
  const visible = useInView(ref)

  const anim = (delay: number) => ({
    opacity:   visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.8s ease ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  })

  return (
    <section id="galeria" ref={ref} className="relative bg-white overflow-hidden py-16 lg:py-28">

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">

        {/* ── Header ── */}
        <div style={anim(0)} className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 lg:mb-14">
          <div className="max-w-xl">
            <p style={{
              fontFamily: 'var(--font-manrope)', fontSize: '11px', fontWeight: 700,
              color: '#CC2229', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '14px',
            }}>Nuestra iglesia en imágenes</p>
            <h2 style={{
              fontFamily: 'var(--font-manrope)',
              fontSize: 'clamp(28px, 4.5vw, 48px)',
              fontWeight: 800, color: '#0A0A0F',
              lineHeight: 1.1, letterSpacing: '-0.02em',
            }}>
              Momentos que nos llenan<br/>
              y nos recuerdan su{' '}
              <em style={{ color: '#CC2229', fontStyle: 'italic' }}>fidelidad</em>
            </h2>
            <div style={{ width: '44px', height: '3px', background: '#F5A800', borderRadius: '99px', margin: '16px 0 18px' }}/>
            <p style={{
              fontFamily: 'var(--font-inter)', fontSize: '15px', fontWeight: 300,
              color: '#6B7280', lineHeight: 1.7,
            }}>
              Cada reunión, cada sonrisa y cada oración reflejan lo que Dios
              está haciendo en nuestra iglesia y en nuestra comunidad.
            </p>
          </div>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 group self-start sm:self-auto flex-shrink-0"
            style={{
              fontFamily: 'var(--font-manrope)', fontSize: '14px', fontWeight: 600,
              color: '#CC2229', border: '1.5px solid #CC2229',
              padding: '11px 20px', borderRadius: '99px',
              textDecoration: 'none', transition: 'all 0.2s ease', whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#CC2229'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#CC2229' }}
          >
            <Images size={14}/> Ver más fotos
            <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform"/>
          </a>
        </div>

        {/* ── MOBILE: horizontal scroll strip ── */}
        <div className="lg:hidden" style={anim(150)}>
          <div
            className="flex gap-3 overflow-x-auto pb-4"
            style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
          >
            {ITEMS.map(item => (
              <div
                key={item.label}
                style={{ flexShrink: 0, width: '64vw', maxWidth: '240px', scrollSnapAlign: 'start' }}
              >
                <Card item={item} style={{ height: '280px' }}/>
              </div>
            ))}
          </div>
          {/* Scroll hint dots */}
          <div className="flex justify-center gap-1.5 mt-4">
            {ITEMS.map((item, i) => (
              <div key={i} style={{
                width: i === 0 ? '18px' : '6px', height: '6px',
                borderRadius: '99px',
                background: i === 0 ? '#CC2229' : '#D1D5DB',
                transition: 'all 0.3s ease',
              }}/>
            ))}
          </div>
        </div>

        {/* ── DESKTOP: mosaic grid ── */}
        <div
          className="hidden lg:grid"
          style={{
            ...anim(150),
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: 'repeat(3, 190px)',
            gap: '12px',
          }}
        >
          {/* Large — col 1-2, row 1-2 */}
          <Card item={ITEMS[0]} style={{ gridColumn: '1 / 3', gridRow: '1 / 3' }}/>
          {/* Top right */}
          <Card item={ITEMS[1]} style={{ gridColumn: '3', gridRow: '1' }}/>
          <Card item={ITEMS[2]} style={{ gridColumn: '4', gridRow: '1' }}/>
          {/* Bottom row */}
          <Card item={ITEMS[3]} style={{ gridColumn: '1', gridRow: '3' }}/>
          <Card item={ITEMS[4]} style={{ gridColumn: '2', gridRow: '3' }}/>
          {/* Tall right */}
          <Card item={ITEMS[5]} style={{ gridColumn: '3', gridRow: '2 / 4' }}/>

          {/* Quote card */}
          <div style={{
            gridColumn: '4', gridRow: '2 / 4',
            background: '#F8F8FA', borderRadius: '20px',
            padding: '24px 20px', border: '1px solid rgba(0,0,0,0.04)',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
          }}>
            <div style={{ fontSize: '26px', color: '#CC2229', fontFamily: 'Georgia, serif', marginBottom: '14px' }}>❝</div>
            <p style={{
              fontFamily: 'var(--font-manrope)', fontSize: '15px', fontWeight: 600,
              color: '#0A0A0F', lineHeight: 1.55, marginBottom: '18px',
            }}>
              Cada imagen cuenta lo que Dios está haciendo entre nosotros.
            </p>
            <div style={{ width: '30px', height: '2px', background: '#F5A800', borderRadius: '99px', marginBottom: '12px' }}/>
            <p style={{
              fontFamily: 'var(--font-manrope)', fontSize: '10px', fontWeight: 700,
              color: '#CC2229', letterSpacing: '0.14em', textTransform: 'uppercase',
            }}>La Vid Verdadera</p>
          </div>
        </div>

      </div>
    </section>
  )
}