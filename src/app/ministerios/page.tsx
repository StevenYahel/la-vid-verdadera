'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import {
  Star, Zap, Heart, Shield, Music2,
  ArrowRight, Clock, User, Plus,
  ChevronRight, MapPin, Menu, X,
  Share2, Camera, Navigation, Mail,
  BookOpen, Sun, Church, Users2,
} from 'lucide-react'
import { NAV_LINKS, SITE } from '@/data/site'

/* ─── palette ─────────────────────────────────────────────────────────────── */
const BG      = '#07080F'
const SURFACE = 'rgba(255,255,255,0.04)'
const BORDER  = 'rgba(255,255,255,0.07)'
const MUTED   = 'rgba(255,255,255,0.38)'
const BODY    = 'rgba(255,255,255,0.58)'

/* ─── data ────────────────────────────────────────────────────────────────── */
const MINISTRIES = [
  {
    id: 'ninos',
    name: 'Niños',
    tagline: 'Semillitas de fe',
    color: '#F5A800',
    rgb: '245,168,0',
    Icon: Star,
    image: '/images/ministerio-ninos.jpg',
    leader: 'Hna. Carmen López',
    schedule: 'Domingos 9:00 AM',
    members: '+40 niños',
    description: 'El ministerio de Niños de La Vid Verdadera existe para sembrar la Palabra de Dios en los corazones más tiernos de nuestra congregación. Creemos que la fe verdadera comienza desde la infancia, y por eso cada domingo creamos un ambiente seguro, divertido y lleno del amor de Cristo donde los niños pueden aprender, crecer y descubrir su propósito en Dios.',
    pillars: [
      { title: 'Enseñanza bíblica', desc: 'Clases dinámicas adaptadas a cada edad para que los niños entiendan y amen la Palabra.' },
      { title: 'Adoración infantil', desc: 'Momentos especiales de alabanza donde los niños aprenden a adorar a Dios con alegría.' },
      { title: 'Actividades creativas', desc: 'Manualidades, juegos y dinámicas que refuerzan los valores del Reino de Dios.' },
      { title: 'Comunidad familiar', desc: 'Integramos a los padres en el proceso de formación espiritual de sus hijos.' },
    ],
  },
  {
    id: 'jovenes',
    name: 'Jóvenes',
    tagline: 'Generación de impacto',
    color: '#7C3AED',
    rgb: '124,58,237',
    Icon: Zap,
    image: '/images/ministerio-jovenes.jpg',
    leader: 'Ps. Andrés Martínez',
    schedule: 'Viernes 7:00 PM',
    members: '+60 jóvenes',
    description: 'Jóvenes La Vid Verdadera es un espacio donde la nueva generación encuentra identidad, propósito y una fe que va más allá de los domingos. No somos solo una reunión, somos una familia que se reta mutuamente a vivir con convicción, a servir con pasión y a impactar nuestra ciudad con el amor de Cristo.',
    pillars: [
      { title: 'Identidad en Cristo', desc: 'Enseñanzas que ayudan a los jóvenes a conocer quiénes son en Dios y vivir con propósito.' },
      { title: 'Grupos de vida', desc: 'Células semanales donde se construyen amistades profundas y se estudia la Biblia.' },
      { title: 'Servicio y misión', desc: 'Proyectos comunitarios que conectan a los jóvenes con las necesidades reales de Buritaca.' },
      { title: 'Adoración y expresión', desc: 'Un espacio donde el arte, la música y la creatividad se usan para glorificar a Dios.' },
    ],
  },
  {
    id: 'damas',
    name: 'Damas',
    tagline: 'Mujeres de fe',
    color: '#CC2229',
    rgb: '204,34,41',
    Icon: Heart,
    image: '/images/ministerio-damas.jpg',
    leader: 'Hna. Rosa Pedraza',
    schedule: 'Sábados 8:00 AM',
    members: '+35 damas',
    description: 'El ministerio de Damas es un refugio de amor, fortaleza y comunidad para las mujeres de La Vid Verdadera. Creemos que cada mujer lleva en su interior una unción especial de Dios, y nuestro llamado es ayudarles a descubrirla, desarrollarla y vivirla con valentía. Aquí cada dama es bienvenida tal como es.',
    pillars: [
      { title: 'Estudio de la Palabra', desc: 'Estudios bíblicos diseñados para fortalecer la fe y la vida espiritual de cada mujer.' },
      { title: 'Consejería y apoyo', desc: 'Un equipo que camina junto a las mujeres en sus momentos más difíciles con amor y sabiduría.' },
      { title: 'Retiros espirituales', desc: 'Encuentros especiales para renovar fuerzas, sanar heridas y conectar con Dios.' },
      { title: 'Proyectos sociales', desc: 'Iniciativas de ayuda a mujeres vulnerables de la comunidad de Buritaca.' },
    ],
  },
  {
    id: 'caballeros',
    name: 'Caballeros',
    tagline: 'Hombres de Dios',
    color: '#1B4FA0',
    rgb: '27,79,160',
    Icon: Shield,
    image: '/images/ministerio-caballeros.jpg',
    leader: 'Ps. Miguel Torres',
    schedule: 'Sábados 7:00 AM',
    members: '+30 caballeros',
    description: 'El ministerio de Caballeros es el espacio donde los hombres de La Vid Verdadera se forjan con carácter, integridad y un corazón de siervo. Creemos que cuando un hombre camina con Dios, su familia es bendecida, su hogar es fortalecido y su comunidad es transformada.',
    pillars: [
      { title: 'Formación de carácter', desc: 'Enseñanzas bíblicas que moldean al hombre en integridad, honestidad y responsabilidad.' },
      { title: 'Liderazgo del hogar', desc: 'Herramientas prácticas para ser mejores esposos, padres y líderes en sus familias.' },
      { title: 'Fraternidad genuina', desc: 'Vínculos de amistad entre hombres que se rinden cuentas y se apoyan mutuamente.' },
      { title: 'Servicio comunitario', desc: 'Brigadas de trabajo y acción social en Buritaca y sus alrededores.' },
    ],
  },
  {
    id: 'musica',
    name: 'Música',
    tagline: 'Alabanza y adoración',
    color: '#0F9972',
    rgb: '15,153,114',
    Icon: Music2,
    image: '/images/ministerio-musica.jpg',
    leader: 'Hno. David Cure',
    schedule: 'Ensayos: Jueves 6:00 PM',
    members: '+20 músicos',
    description: 'El ministerio de Música de La Vid Verdadera tiene un solo objetivo: llevar a cada persona que entra por nuestras puertas a un encuentro genuino con la presencia de Dios. No somos un grupo de entretenimiento, somos adoradores.',
    pillars: [
      { title: 'Adoración con excelencia', desc: 'Preparamos cada servicio con dedicación para honrar a Dios con lo mejor de nosotros.' },
      { title: 'Formación musical', desc: 'Entrenamos a músicos y cantantes con bases técnicas y espirituales sólidas.' },
      { title: 'Cobertura espiritual', desc: 'El equipo tiene un compromiso de vida íntegra y crecimiento espiritual constante.' },
      { title: 'Nuevos talentos', desc: 'Puertas abiertas para quienes quieran servir a Dios con sus dones musicales.' },
    ],
  },
]

const FOOTER_SCHEDULES = [
  { day: 'Lunes',     time: '6:00 PM',       name: 'Culto de Oración',                    color: '#5B2D8E', Icon: BookOpen },
  { day: 'Miércoles', time: 'Todo el día',    name: 'Día de Ayuno',                        color: '#1B4FA0', Icon: Sun     },
  { day: 'Jueves',    time: '7:00 PM',        name: 'Culto Formal',                        color: '#CC2229', Icon: Church  },
  { day: 'Domingo',   time: '7:30 AM',        name: 'Escuela Dominical + Culto Principal', color: '#F5A800', Icon: Users2  },
]

/* ─── hooks ───────────────────────────────────────────────────────────────── */
function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.1) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref])
  return visible
}

/* ─── Pillar accordion ────────────────────────────────────────────────────── */
function Pillar({ title, desc, color, rgb, idx }: {
  title: string; desc: string; color: string; rgb: string; idx: number
}) {
  const [open, setOpen] = useState(false)
  return (
    <button
      onClick={() => setOpen(o => !o)}
      style={{
        all: 'unset', cursor: 'pointer', display: 'block', width: '100%',
        background: open ? `rgba(${rgb},0.1)` : SURFACE,
        border: `1px solid ${open ? color : BORDER}`,
        borderRadius: 14, padding: '16px 18px', textAlign: 'left',
        transition: 'background .25s, border-color .25s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            width: 26, height: 26, borderRadius: 8,
            background: `rgba(${rgb},0.18)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 800, color,
            fontFamily: 'var(--font-manrope)', flexShrink: 0,
          }}>{String(idx + 1).padStart(2, '0')}</span>
          <span style={{ fontFamily: 'var(--font-manrope)', fontSize: 13, fontWeight: 700, color: '#fff' }}>{title}</span>
        </div>
        <span style={{
          width: 22, height: 22, borderRadius: '50%',
          background: open ? color : 'rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          transition: 'background .25s, transform .3s',
          transform: open ? 'rotate(45deg)' : 'none',
        }}><Plus size={11} color="#fff" /></span>
      </div>
      <div style={{ maxHeight: open ? 120 : 0, overflow: 'hidden', transition: 'max-height .4s cubic-bezier(.16,1,.3,1)' }}>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 300, color: MUTED, lineHeight: 1.7, marginTop: 10, paddingLeft: 38 }}>{desc}</p>
      </div>
    </button>
  )
}

/* ─── Ministry row ────────────────────────────────────────────────────────── */
function MinistryRow({ m, idx }: { m: typeof MINISTRIES[0]; idx: number }) {
  const ref = useRef<HTMLElement>(null)
  const visible = useInView(ref)
  const even = idx % 2 === 0

  return (
    <article
      ref={ref}
      id={m.id}
      style={{
        scrollMarginTop: 120,
        borderBottom: `1px solid ${BORDER}`,
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* glow */}
      <div aria-hidden style={{
        position: 'absolute',
        top: '50%', [even ? 'left' : 'right']: '-5%',
        transform: 'translateY(-50%)',
        width: 560, height: 560, borderRadius: '50%',
        background: `radial-gradient(circle, rgba(${m.rgb},.06) 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div className="min-row-inner" style={{
        maxWidth: 1240, margin: '0 auto',
        padding: '80px 32px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 64,
        alignItems: 'center',
      }}>
        {/* IMAGE */}
        <div className={`min-img-col ${even ? 'order-first' : 'order-last-lg'}`} style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : `translateX(${even ? -32 : 32}px)`,
          transition: 'opacity .9s ease .1s, transform .9s cubic-bezier(.16,1,.3,1) .1s',
        }}>
          <div style={{
            position: 'relative', borderRadius: 24,
            overflow: 'hidden', aspectRatio: '4/3',
            boxShadow: `0 32px 80px rgba(0,0,0,.5), 0 0 0 1px rgba(255,255,255,.05), 0 0 48px rgba(${m.rgb},.1)`,
          }}>
            <img src={m.image} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.7) 0%, transparent 55%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: m.color }} />
            {/* badge */}
            <div style={{ position: 'absolute', bottom: 18, left: 18 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 9,
                background: 'rgba(0,0,0,.5)', backdropFilter: 'blur(12px)',
                borderRadius: 99, padding: '7px 14px 7px 7px',
                border: `1px solid rgba(255,255,255,.1)`,
              }}>
                <span style={{ width: 30, height: 30, borderRadius: '50%', background: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <m.Icon size={14} color="#fff" strokeWidth={2} />
                </span>
                <span style={{ fontFamily: 'var(--font-manrope)', fontSize: 12, fontWeight: 700, color: '#fff' }}>Ministerio de {m.name}</span>
              </div>
            </div>
          </div>

          {/* meta pills */}
          <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
            {[
              { I: Clock, t: m.schedule },
              { I: User,  t: m.leader   },
              { I: MapPin,t: m.members  },
            ].map(({ I, t }) => (
              <div key={t} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: SURFACE, border: `1px solid ${BORDER}`,
                borderRadius: 99, padding: '7px 13px',
              }}>
                <I size={11} style={{ color: m.color, flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-manrope)', fontSize: 11, fontWeight: 500, color: MUTED, whiteSpace: 'nowrap' }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* TEXT */}
        <div className={`min-txt-col ${even ? 'order-last' : 'order-first-lg'}`} style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : `translateX(${even ? 32 : -32}px)`,
          transition: 'opacity .9s ease .2s, transform .9s cubic-bezier(.16,1,.3,1) .2s',
        }}>
          {/* big watermark number */}
          <div style={{
            fontFamily: 'var(--font-manrope)', fontSize: 96, fontWeight: 900,
            color: `rgba(${m.rgb},.05)`, lineHeight: 1,
            marginBottom: -24, letterSpacing: '-0.04em', userSelect: 'none',
          }}>{String(idx + 1).padStart(2, '0')}</div>

          {/* eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span style={{ width: 20, height: 2.5, background: m.color, borderRadius: 99, flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-manrope)', fontSize: 10, fontWeight: 700, color: m.color, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{m.tagline}</span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-manrope)',
            fontSize: 'clamp(30px,3vw,46px)',
            fontWeight: 800, color: '#fff',
            lineHeight: 1.06, letterSpacing: '-0.025em',
            marginBottom: 16,
          }}>
            Ministerio<br />
            <span style={{ color: m.color }}>de {m.name}</span>
          </h2>

          <div style={{ width: 36, height: 2.5, background: `linear-gradient(90deg,${m.color},transparent)`, borderRadius: 99, marginBottom: 18 }} />

          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 15, fontWeight: 300, color: BODY, lineHeight: 1.85, marginBottom: 28 }}>
            {m.description}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 32 }}>
            {m.pillars.map((p, i) => (
              <Pillar key={i} idx={i} title={p.title} desc={p.desc} color={m.color} rgb={m.rgb} />
            ))}
          </div>

          <a
            href="/#contacto"
            style={{
              fontFamily: 'var(--font-manrope)', fontSize: 14, fontWeight: 700,
              color: '#fff', background: m.color,
              padding: '13px 28px', borderRadius: 12,
              textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 9,
              boxShadow: `0 8px 28px rgba(${m.rgb},.35)`,
              transition: 'transform .2s, box-shadow .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 14px 36px rgba(${m.rgb},.5)` }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 8px 28px rgba(${m.rgb},.35)` }}
          >
            Quiero unirme <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </article>
  )
}

/* ─── Navbar ─────────────────────────────────────────────────────────────── */
function MinistriesNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      transition: 'all .4s ease',
      padding: scrolled ? '8px 16px' : '0',
    }}>
      <div style={{
        maxWidth: scrolled ? 900 : 1240,
        margin: '0 auto',
        transition: 'max-width .4s ease',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 64, padding: scrolled ? '0 20px' : '0 32px',
          background: scrolled ? 'rgba(255,255,255,.93)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          border: scrolled ? '1px solid rgba(0,0,0,.06)' : 'none',
          borderRadius: scrolled ? 18 : 0,
          boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,.07)' : 'none',
          transition: 'all .4s ease',
        }}>
          {/* logo */}
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <img src="/images/logo.png" alt="La Vid Verdadera" style={{ height: 38, width: 'auto', objectFit: 'contain' }} />
            <div>
              <p style={{ fontFamily: 'var(--font-manrope)', fontSize: 10, fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: scrolled ? 'rgba(0,0,0,.4)' : 'rgba(255,255,255,.45)', marginBottom: 1 }}>Iglesia Cuadrangular</p>
              <p style={{ fontFamily: 'var(--font-manrope)', fontSize: 14, fontWeight: 800, color: scrolled ? '#0A0A0F' : '#fff', lineHeight: 1 }}>La Vid Verdadera</p>
            </div>
          </a>

          {/* desktop links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="min-desk-nav">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} style={{
                fontFamily: 'var(--font-manrope)', fontSize: 13, fontWeight: 600,
                color: scrolled ? 'rgba(0,0,0,.55)' : 'rgba(255,255,255,.7)',
                padding: '8px 14px', borderRadius: 10,
                textDecoration: 'none', transition: 'color .2s, background .2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.color = scrolled ? '#0A0A0F' : '#fff'; e.currentTarget.style.background = scrolled ? 'rgba(0,0,0,.04)' : 'rgba(255,255,255,.1)' }}
                onMouseLeave={e => { e.currentTarget.style.color = scrolled ? 'rgba(0,0,0,.55)' : 'rgba(255,255,255,.7)'; e.currentTarget.style.background = 'transparent' }}
              >{l.label}</a>
            ))}
          </nav>

          {/* CTA */}
          <a href="/#contacto" className="min-desk-nav" style={{
            fontFamily: 'var(--font-manrope)', fontSize: 13, fontWeight: 700,
            color: scrolled ? '#fff' : '#0A0A0F',
            background: scrolled ? '#CC2229' : '#fff',
            padding: '10px 20px', borderRadius: 11,
            textDecoration: 'none', transition: 'all .2s',
            boxShadow: scrolled ? '0 4px 16px rgba(204,34,41,.3)' : 'none',
          }}>Visítanos →</a>

          {/* hamburger */}
          <button
            onClick={() => setOpen(o => !o)}
            className="min-mob-btn"
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 8,
              color: scrolled ? '#0A0A0F' : '#fff',
            }}
            aria-label="Menú"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 40,
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity .3s',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.4)', backdropFilter: 'blur(4px)' }} onClick={() => setOpen(false)} />
        <div style={{
          position: 'absolute', top: 0, right: 0, bottom: 0, width: 280,
          background: '#fff',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform .3s cubic-bezier(.16,1,.3,1)',
          display: 'flex', flexDirection: 'column',
          boxShadow: '-8px 0 40px rgba(0,0,0,.15)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', borderBottom: '1px solid rgba(0,0,0,.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <img src="/images/logo.png" alt="logo" style={{ height: 30, width: 'auto' }} />
              <span style={{ fontFamily: 'var(--font-manrope)', fontSize: 13, fontWeight: 800, color: '#0A0A0F' }}>La Vid Verdadera</span>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}><X size={18} /></button>
          </div>
          <nav style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
                fontFamily: 'var(--font-manrope)', fontSize: 14, fontWeight: 600,
                color: 'rgba(0,0,0,.65)', textDecoration: 'none',
                padding: '12px 14px', borderRadius: 10,
                transition: 'background .2s, color .2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,.04)'; e.currentTarget.style.color = '#CC2229' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(0,0,0,.65)' }}
              >{l.label}</a>
            ))}
          </nav>
          <div style={{ padding: '0 16px 24px' }}>
            <a href="/#contacto" onClick={() => setOpen(false)} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: '#CC2229', color: '#fff',
              fontFamily: 'var(--font-manrope)', fontSize: 14, fontWeight: 700,
              padding: '14px', borderRadius: 12, textDecoration: 'none',
            }}>Visítanos →</a>
          </div>
        </div>
      </div>
    </header>
  )
}

/* ─── Footer ─────────────────────────────────────────────────────────────── */
function MinistriesFooter() {
  const ref = useRef<HTMLElement>(null)
  const visible = useInView(ref, 0.05)
  const year = new Date().getFullYear()

  const anim = (d: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity .8s ease ${d}ms, transform .8s cubic-bezier(.16,1,.3,1) ${d}ms`,
  })

  return (
    <footer ref={ref} style={{ background: '#0F1120', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/footer-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.08 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(15,17,32,.97) 0%,rgba(15,17,32,.9) 100%)' }} />
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: 500, height: 400, background: 'radial-gradient(ellipse at bottom right,rgba(204,34,41,.1) 0%,transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1240, margin: '0 auto', padding: '64px 32px 32px' }}>
        {/* 4-col */}
        <div className="footer-grid" style={{ ...anim(0), display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 40, marginBottom: 48 }}>
          {/* brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <img src="/images/logo.png" alt="La Vid Verdadera" style={{ height: 64, width: 'auto', objectFit: 'contain' }} />
              <div>
                <p style={{ fontFamily: 'var(--font-manrope)', fontSize: 13, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 3 }}>Iglesia Cuadrangular</p>
                <p style={{ fontFamily: 'var(--font-manrope)', fontSize: 9, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)' }}>La Vid Verdadera</p>
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,.4)', lineHeight: 1.7, marginBottom: 20 }}>{SITE.description}</p>
            <div style={{ height: 1, background: 'rgba(255,255,255,.06)', marginBottom: 18 }} />
            <p style={{ fontFamily: 'var(--font-manrope)', fontSize: 9, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,.25)', marginBottom: 10 }}>Síguenos</p>
            <div style={{ display: 'flex', gap: 8 }}>
              {[{ Icon: Share2, href: SITE.contact.facebook || '#', label: 'Facebook' }, { Icon: Camera, href: SITE.contact.instagram || '#', label: 'Instagram' }].map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} style={{
                  width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px solid rgba(255,255,255,.12)', color: 'rgba(255,255,255,.4)', textDecoration: 'none', transition: 'all .2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.3)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,.06)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.12)'; e.currentTarget.style.color = 'rgba(255,255,255,.4)'; e.currentTarget.style.background = 'transparent' }}
                ><Icon size={14} /></a>
              ))}
            </div>
          </div>

          {/* nav */}
          <div>
            <p style={{ fontFamily: 'var(--font-manrope)', fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#fff', marginBottom: 6 }}>Navegación</p>
            <div style={{ width: 28, height: 2, background: '#CC2229', borderRadius: 99, marginBottom: 20 }} />
            <nav style={{ display: 'flex', flexDirection: 'column' }}>
              {NAV_LINKS.map(l => (
                <a key={l.href} href={l.href} style={{
                  fontFamily: 'var(--font-inter)', fontSize: 14, fontWeight: 400,
                  color: 'rgba(255,255,255,.5)', textDecoration: 'none',
                  padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,.05)',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  transition: 'color .2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,.5)' }}
                >{l.label}<ArrowRight size={12} style={{ opacity: 0.3 }} /></a>
              ))}
            </nav>
          </div>

          {/* schedules */}
          <div>
            <p style={{ fontFamily: 'var(--font-manrope)', fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#fff', marginBottom: 6 }}>Horarios</p>
            <div style={{ width: 28, height: 2, background: '#CC2229', borderRadius: 99, marginBottom: 20 }} />
            <div style={{ borderRadius: 16, overflow: 'hidden', background: SURFACE, border: `1px solid ${BORDER}` }}>
              {FOOTER_SCHEDULES.map((s, i) => (
                <div key={s.day} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', borderBottom: i < 3 ? `1px solid ${BORDER}` : 'none' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <s.Icon size={14} color="#fff" strokeWidth={1.8} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: 'var(--font-manrope)', fontSize: 13, fontWeight: 700, color: '#fff', lineHeight: 1, marginBottom: 2 }}>{s.day}</p>
                    <p style={{ fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 300, color: 'rgba(255,255,255,.3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.name}</p>
                  </div>
                  <p style={{ fontFamily: 'var(--font-manrope)', fontSize: 11, fontWeight: 700, color: s.color, flexShrink: 0 }}>{s.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* verse */}
          <div>
            <p style={{ fontFamily: 'var(--font-manrope)', fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#fff', marginBottom: 6 }}>Versículo</p>
            <div style={{ width: 28, height: 2, background: '#CC2229', borderRadius: 99, marginBottom: 20 }} />
            <div style={{ fontSize: 40, color: '#CC2229', fontFamily: 'Georgia, serif', lineHeight: 1, marginBottom: 12 }}>❝</div>
            <p style={{ fontFamily: 'var(--font-manrope)', fontSize: 15, fontWeight: 500, fontStyle: 'italic', color: 'rgba(255,255,255,.7)', lineHeight: 1.7, marginBottom: 16 }}>{SITE.verse.text}</p>
            <cite style={{ fontFamily: 'var(--font-manrope)', fontSize: 12, fontWeight: 700, color: '#CC2229', fontStyle: 'normal' }}>— {SITE.verse.ref}</cite>
          </div>
        </div>

        {/* contact bar */}
        <div style={{ ...anim(200), borderRadius: 18, overflow: 'hidden', background: SURFACE, border: `1px solid ${BORDER}`, marginBottom: 32 }}>
          <div className="footer-contact-bar">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 20px' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(204,34,41,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MapPin size={16} style={{ color: '#CC2229' }} />
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-manrope)', fontSize: 13, fontWeight: 600, color: '#fff' }}>Buritaca, Magdalena</p>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: 11, fontWeight: 300, color: 'rgba(255,255,255,.4)' }}>Santa Marta, Colombia</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 20px' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(204,34,41,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Mail size={16} style={{ color: '#CC2229' }} />
              </div>
              <a href={`mailto:${SITE.contact.email}`} style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 300, color: 'rgba(255,255,255,.6)', textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.6)'}
              >{SITE.contact.email}</a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '18px 20px' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(204,34,41,.15)', border: '1px solid rgba(204,34,41,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Navigation size={18} style={{ color: '#CC2229' }} />
              </div>
            </div>
            <a href={SITE.location.mapsUrl} target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '18px 20px',
              fontFamily: 'var(--font-manrope)', fontSize: 14, fontWeight: 700, color: '#fff', textDecoration: 'none', transition: 'color .2s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#CC2229'}
              onMouseLeave={e => e.currentTarget.style.color = '#fff'}
            >¿Cómo llegar? <ArrowRight size={15} /></a>
          </div>
        </div>

        {/* bottom */}
        <div style={{ ...anim(300), display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12, paddingTop: 20, borderTop: `1px solid ${BORDER}` }}>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 300, color: 'rgba(255,255,255,.25)', lineHeight: 1.6 }}>
            © {year} Iglesia Cristiana Cuadrangular La Vid Verdadera. Todos los derechos reservados.
          </p>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 300, color: 'rgba(255,255,255,.2)' }}>Buritaca, Magdalena — Colombia</p>
        </div>
      </div>
    </footer>
  )
}

/* ─── PAGE ────────────────────────────────────────────────────────────────── */
export default function MinistriesPage() {
  const [mounted, setMounted] = useState(false)
  const [activeId, setActiveId] = useState('ninos')

  useEffect(() => { setTimeout(() => setMounted(true), 60) }, [])

  useEffect(() => {
    const fn = () => {
      for (const m of [...MINISTRIES].reverse()) {
        const el = document.getElementById(m.id)
        if (el && el.getBoundingClientRect().top <= 140) { setActiveId(m.id); return }
      }
      setActiveId('ninos')
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scrollTo = useCallback((id: string) => {
    setActiveId(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <>
      <style>{`
        /* ── Side nav ── */
        .min-side-nav { display: flex; }
        @media (max-width: 900px) {
          .min-side-nav { display: none !important; }
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .min-row-inner {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
            padding: 56px 20px !important;
          }
          .order-last-lg  { order: 1 !important; }
          .order-first-lg { order: 0 !important; }
          .min-desk-nav   { display: none !important; }
          .min-mob-btn    { display: flex !important; }
          .footer-grid    { grid-template-columns: 1fr 1fr !important; }
          .footer-contact-bar { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .footer-grid        { grid-template-columns: 1fr !important; }
          .footer-contact-bar { grid-template-columns: 1fr !important; }
          #min-hero-title     { font-size: 38px !important; }
        }
        @media (min-width: 901px) {
          .min-mob-btn    { display: none !important; }
          .order-last-lg  { order: 1 !important; }
          .order-first-lg { order: 0 !important; }
        }

        /* contact bar grid */
        .footer-contact-bar {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          border-top: 1px solid rgba(255,255,255,.07);
        }
        .footer-contact-bar > * + * {
          border-left: 1px solid rgba(255,255,255,.07);
        }
        @media (max-width: 900px) {
          .footer-contact-bar > * + * { border-left: none; border-top: 1px solid rgba(255,255,255,.07); }
        }

        /* sticky nav scrollbar hide */
        #min-sticky::-webkit-scrollbar { display: none; }

        /* smooth scroll */
        html { scroll-behavior: smooth; }
      `}</style>

      <MinistriesNavbar />

      <main style={{ background: BG, minHeight: '100vh', color: '#fff' }}>

        {/* ══ HERO ══════════════════════════════════════════════════════════ */}
        <section style={{
          position: 'relative', overflow: 'hidden',
          paddingTop: 130, paddingBottom: 80,
          background: `linear-gradient(160deg, #0D0D1A 0%, ${BG} 65%)`,
          borderBottom: `1px solid ${BORDER}`,
        }}>
          {/* decorative rings */}
          {[380, 240].map((s, i) => (
            <div key={s} aria-hidden style={{
              position: 'absolute', top: '50%', right: `${i * 8 + 3}%`,
              transform: 'translateY(-50%)',
              width: s, height: s, borderRadius: '50%',
              border: `1px solid rgba(245,168,0,${i === 0 ? .09 : .05})`,
              pointerEvents: 'none',
            }} />
          ))}
          {/* red glow */}
          <div aria-hidden style={{ position: 'absolute', bottom: -60, left: -60, width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle,rgba(204,34,41,.09) 0%,transparent 70%)', pointerEvents: 'none' }} />
          {/* dot grid */}
          <div aria-hidden style={{ position: 'absolute', top: '12%', right: '7%', width: 200, height: 200, backgroundImage: 'radial-gradient(circle,rgba(255,255,255,.06) 1px,transparent 1px)', backgroundSize: '20px 20px', pointerEvents: 'none' }} />

          <div style={{
            maxWidth: 1240, margin: '0 auto', padding: '0 32px',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'none' : 'translateY(24px)',
            transition: 'opacity .9s ease, transform .9s cubic-bezier(.16,1,.3,1)',
          }}>
            {/* breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 28 }}>
              <a href="/" style={{ fontFamily: 'var(--font-manrope)', fontSize: 12, fontWeight: 500, color: MUTED, textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = MUTED}
              >Inicio</a>
              <ChevronRight size={12} style={{ color: 'rgba(255,255,255,.2)' }} />
              <span style={{ fontFamily: 'var(--font-manrope)', fontSize: 12, fontWeight: 600, color: '#F5A800' }}>Ministerios</span>
            </div>

            {/* headline */}
            <h1 id="min-hero-title" style={{
              fontFamily: 'var(--font-manrope)',
              fontSize: 'clamp(44px,5.5vw,76px)',
              fontWeight: 800, color: '#fff',
              lineHeight: 1.02, letterSpacing: '-0.03em',
              marginBottom: 20,
            }}>
              Nuestros<br />
              <span style={{ color: '#CC2229' }}>Ministerios</span>
            </h1>

            <p style={{
              fontFamily: 'var(--font-inter)', fontSize: 16, fontWeight: 300,
              color: BODY, lineHeight: 1.85, maxWidth: 480, marginBottom: 44,
            }}>
              Cinco espacios de crecimiento, comunidad y servicio donde cada persona encuentra su lugar en la familia de La Vid Verdadera.
            </p>

            {/* ministry pills */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {MINISTRIES.map((m, i) => (
                <button key={m.id} onClick={() => scrollTo(m.id)} style={{
                  all: 'unset', cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: SURFACE, border: `1px solid ${BORDER}`,
                  borderRadius: 99, padding: '9px 16px',
                  fontFamily: 'var(--font-manrope)', fontSize: 13, fontWeight: 600,
                  color: 'rgba(255,255,255,.6)', transition: 'all .2s',
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'none' : 'translateY(12px)',
                  transitionDelay: `${i * 55}ms`,
                }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = m.color; el.style.borderColor = m.color; el.style.color = '#fff'; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = `0 8px 20px rgba(${m.rgb},.4)` }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = SURFACE; el.style.borderColor = BORDER; el.style.color = 'rgba(255,255,255,.6)'; el.style.transform = ''; el.style.boxShadow = '' }}
                >
                  <m.Icon size={13} />{m.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FLOATING SIDE INDICATOR ═══════════════════════════════════════ */}
        <div className="min-side-nav" style={{
          position: 'fixed', right: 24, top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 40,
          display: 'flex', flexDirection: 'column',
          alignItems: 'flex-end', gap: 8,
        }}>
          {/* vertical line */}
          <div style={{
            position: 'absolute', right: 11, top: 0, bottom: 0, width: 1,
            background: 'rgba(255,255,255,.1)', zIndex: 0,
          }} />

          {MINISTRIES.map(m => {
            const active = activeId === m.id
            return (
              <button
                key={m.id}
                onClick={() => scrollTo(m.id)}
                title={m.name}
                style={{ all: 'unset', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, position: 'relative', zIndex: 1 }}
              >
                {/* label — slides in when active */}
                <span style={{
                  fontFamily: 'var(--font-manrope)', fontSize: 11, fontWeight: 700,
                  color: m.color, letterSpacing: '0.1em', textTransform: 'uppercase',
                  opacity: active ? 1 : 0,
                  transform: active ? 'translateX(0)' : 'translateX(10px)',
                  transition: 'opacity .35s ease, transform .35s ease',
                  whiteSpace: 'nowrap',
                  textShadow: `0 0 20px rgba(${m.rgb},.5)`,
                }}>{m.name}</span>

                {/* dot / icon */}
                <div style={{
                  width: active ? 24 : 8,
                  height: active ? 24 : 8,
                  borderRadius: '50%',
                  background: active ? m.color : 'rgba(255,255,255,.22)',
                  boxShadow: active ? `0 0 18px rgba(${m.rgb},.7), 0 0 6px rgba(${m.rgb},.4)` : 'none',
                  transition: 'all .4s cubic-bezier(.16,1,.3,1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {active && <m.Icon size={12} color="#fff" strokeWidth={2.5} />}
                </div>
              </button>
            )
          })}
        </div>

        {/* ══ MINISTRY ROWS ═════════════════════════════════════════════════ */}
        {MINISTRIES.map((m, i) => <MinistryRow key={m.id} m={m} idx={i} />)}

        {/* ══ BOTTOM CTA ════════════════════════════════════════════════════ */}
        <section style={{
          position: 'relative', overflow: 'hidden',
          background: `linear-gradient(160deg,#0D0D1A 0%,${BG} 100%)`,
          borderTop: `1px solid ${BORDER}`,
          padding: '96px 32px', textAlign: 'center',
        }}>
          <div aria-hidden style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 300, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(204,34,41,.07) 0%,transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', maxWidth: 540, margin: '0 auto' }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', border: '1px solid rgba(245,168,0,.3)', background: 'rgba(245,168,0,.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
                <path d="M12 22V12M12 12C12 7 7 4 3 5c0 4 3 8 9 7M12 12c0-5 5-8 9-7-1 4-4 7-9 7" stroke="#F5A800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 style={{ fontFamily: 'var(--font-manrope)', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: 14 }}>
              ¿Listo para ser<br /><span style={{ color: '#CC2229' }}>parte de algo grande?</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: 15, fontWeight: 300, color: MUTED, lineHeight: 1.85, marginBottom: 36 }}>
              Visítanos cualquier domingo y encuentra tu lugar en la familia de La Vid Verdadera. Todos son bienvenidos.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/#contacto" style={{
                fontFamily: 'var(--font-manrope)', fontSize: 14, fontWeight: 700,
                color: '#fff', background: '#CC2229',
                padding: '14px 32px', borderRadius: 12, textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 8,
                boxShadow: '0 8px 28px rgba(204,34,41,.35)', transition: 'transform .2s, box-shadow .2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 36px rgba(204,34,41,.5)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 28px rgba(204,34,41,.35)' }}
              >Contáctanos <ArrowRight size={14} /></a>
              <a href="/" style={{
                fontFamily: 'var(--font-manrope)', fontSize: 14, fontWeight: 600,
                color: 'rgba(255,255,255,.55)', background: SURFACE, border: `1px solid ${BORDER}`,
                padding: '14px 32px', borderRadius: 12, textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'all .2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.09)'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = SURFACE; e.currentTarget.style.color = 'rgba(255,255,255,.55)' }}
              >Volver al inicio</a>
            </div>
          </div>
        </section>

        <MinistriesFooter />
      </main>
    </>
  )
}