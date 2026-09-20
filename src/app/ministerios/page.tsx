'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import {
  Star, Zap, Heart, Shield, Music2,
  ArrowRight, Clock, User, Plus, X,
  ChevronRight, MapPin,
} from 'lucide-react'

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const MINISTRIES = [
  {
    id: 'ninos',
    name: 'Niños',
    tagline: 'Semillitas de fe',
    color: '#F5A800',
    colorRgb: '245,168,0',
    icon: Star,
    image: '/images/ministerio-ninos.jpg',
    leader: 'Hna. Carmen López',
    schedule: 'Domingos 9:00 AM',
    members: '+40 niños',
    description:
      'El ministerio de Niños de La Vid Verdadera existe para sembrar la Palabra de Dios en los corazones más tiernos de nuestra congregación. Creemos que la fe verdadera comienza desde la infancia, y por eso cada domingo creamos un ambiente seguro, divertido y lleno del amor de Cristo donde los niños pueden aprender, crecer y descubrir su propósito en Dios.',
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
    colorRgb: '124,58,237',
    icon: Zap,
    image: '/images/ministerio-jovenes.jpg',
    leader: 'Ps. Andrés Martínez',
    schedule: 'Viernes 7:00 PM',
    members: '+60 jóvenes',
    description:
      'Jóvenes La Vid Verdadera es un espacio donde la nueva generación encuentra identidad, propósito y una fe que va más allá de los domingos. No somos solo una reunión, somos una familia que se reta mutuamente a vivir con convicción, a servir con pasión y a impactar nuestra ciudad con el amor de Cristo.',
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
    colorRgb: '204,34,41',
    icon: Heart,
    image: '/images/ministerio-damas.jpg',
    leader: 'Hna. Rosa Pedraza',
    schedule: 'Sábados 8:00 AM',
    members: '+35 damas',
    description:
      'El ministerio de Damas es un refugio de amor, fortaleza y comunidad para las mujeres de La Vid Verdadera. Creemos que cada mujer lleva en su interior una unción especial de Dios, y nuestro llamado es ayudarles a descubrirla, desarrollarla y vivirla con valentía. Aquí cada dama es bienvenida tal como es.',
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
    colorRgb: '27,79,160',
    icon: Shield,
    image: '/images/ministerio-caballeros.jpg',
    leader: 'Ps. Miguel Torres',
    schedule: 'Sábados 7:00 AM',
    members: '+30 caballeros',
    description:
      'El ministerio de Caballeros es el espacio donde los hombres de La Vid Verdadera se forjan con carácter, integridad y un corazón de siervo. Creemos que cuando un hombre camina con Dios, su familia es bendecida, su hogar es fortalecido y su comunidad es transformada. Aquí los hombres no vienen a sentarse, vienen a ser equipados.',
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
    color: '#0F6E56',
    colorRgb: '15,110,86',
    icon: Music2,
    image: '/images/ministerio-musica.jpg',
    leader: 'Hno. David Cure',
    schedule: 'Ensayos: Jueves 6:00 PM',
    members: '+20 músicos',
    description:
      'El ministerio de Música de La Vid Verdadera tiene un solo objetivo: llevar a cada persona que entra por nuestras puertas a un encuentro genuino con la presencia de Dios. No somos un grupo de entretenimiento, somos adoradores. Cada nota, cada letra y cada momento de adoración es una ofrenda viva al Señor.',
    pillars: [
      { title: 'Adoración con excelencia', desc: 'Preparamos cada servicio con dedicación para honrar a Dios con lo mejor de nosotros.' },
      { title: 'Formación musical', desc: 'Entrenamos a músicos y cantantes con bases técnicas y espirituales sólidas.' },
      { title: 'Cobertura espiritual', desc: 'El equipo tiene un compromiso de vida íntegra y crecimiento espiritual constante.' },
      { title: 'Nuevos talentos', desc: 'Puertas abiertas para quienes quieran servir a Dios con sus dones musicales.' },
    ],
  },
]

/* ─────────────────────────────────────────
   HOOKS
───────────────────────────────────────── */
function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.08) {
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

/* ─────────────────────────────────────────
   PILLAR CARD with expand animation
───────────────────────────────────────── */
function PillarCard({
  title, desc, color, colorRgb, index,
}: {
  title: string; desc: string; color: string; colorRgb: string; index: number
}) {
  const [open, setOpen] = useState(false)
  return (
    <button
      onClick={() => setOpen(o => !o)}
      style={{
        all: 'unset',
        cursor: 'pointer',
        display: 'block',
        width: '100%',
        background: open
          ? `rgba(${colorRgb},0.12)`
          : 'rgba(255,255,255,0.04)',
        border: `1px solid ${open ? color : 'rgba(255,255,255,0.08)'}`,
        borderRadius: '16px',
        padding: '18px 20px',
        textAlign: 'left',
        transition: 'background 0.3s ease, border-color 0.3s ease, transform 0.2s ease',
        transform: open ? 'scale(1.01)' : 'scale(1)',
      }}
      onMouseEnter={e => { if (!open) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)' }}
      onMouseLeave={e => { if (!open) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '8px',
            background: `rgba(${colorRgb},0.2)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span style={{ fontSize: '13px', fontWeight: 800, color, fontFamily: 'var(--font-manrope)' }}>
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
          <span style={{
            fontFamily: 'var(--font-manrope)',
            fontSize: '13px', fontWeight: 700,
            color: '#FFFFFF',
          }}>{title}</span>
        </div>
        <div style={{
          width: '24px', height: '24px', borderRadius: '50%',
          background: open ? color : 'rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          transition: 'background 0.3s ease, transform 0.3s ease',
          transform: open ? 'rotate(45deg)' : 'rotate(0)',
        }}>
          <Plus size={12} color={open ? '#fff' : 'rgba(255,255,255,0.5)'} />
        </div>
      </div>

      {/* Expandable desc */}
      <div style={{
        maxHeight: open ? '120px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <p style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '13px', fontWeight: 300,
          color: 'rgba(255,255,255,0.55)',
          lineHeight: 1.7,
          marginTop: '12px',
          paddingLeft: '40px',
        }}>{desc}</p>
      </div>
    </button>
  )
}

/* ─────────────────────────────────────────
   MINISTRY SECTION
───────────────────────────────────────── */
function MinistrySection({
  ministry, index,
}: {
  ministry: typeof MINISTRIES[0]; index: number
}) {
  const ref = useRef<HTMLElement>(null)
  const visible = useInView(ref)
  const Icon = ministry.icon
  const isEven = index % 2 === 0

  const slideImg = visible ? 'translateX(0)' : `translateX(${isEven ? '-40px' : '40px'})`
  const slideTxt = visible ? 'translateX(0)' : `translateX(${isEven ? '40px' : '-40px'})`

  return (
    <article
      ref={ref}
      id={ministry.id}
      style={{
        scrollMarginTop: '90px',
        position: 'relative',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        overflow: 'hidden',
      }}
    >
      {/* Subtle color glow bg */}
      <div aria-hidden style={{
        position: 'absolute',
        top: '50%', left: isEven ? '-10%' : 'auto', right: isEven ? 'auto' : '-10%',
        transform: 'translateY(-50%)',
        width: '500px', height: '500px',
        borderRadius: '50%',
        background: `radial-gradient(circle, rgba(${ministry.colorRgb},0.07) 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '88px 32px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '72px',
        alignItems: 'center',
      }}
        className="ministry-inner-grid"
      >

        {/* ── IMAGE COLUMN ── */}
        <div
          style={{
            order: isEven ? 0 : 1,
            opacity: visible ? 1 : 0,
            transform: slideImg,
            transition: 'opacity 1s ease 100ms, transform 1s cubic-bezier(0.16,1,0.3,1) 100ms',
          }}
          className="ministry-img-col"
        >
          {/* Main image */}
          <div style={{
            position: 'relative',
            borderRadius: '28px',
            overflow: 'hidden',
            aspectRatio: '4/3',
            boxShadow: `0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05), 0 0 60px rgba(${ministry.colorRgb},0.12)`,
          }}>
            <img
              src={ministry.image}
              alt={ministry.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.8s ease' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            />
            {/* Bottom gradient */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
              pointerEvents: 'none',
            }} />
            {/* Color top bar */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: '4px', background: ministry.color,
            }} />
            {/* Badge */}
            <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: 'rgba(0,0,0,0.55)',
                backdropFilter: 'blur(12px)',
                borderRadius: '99px',
                padding: '8px 16px 8px 8px',
                border: '1px solid rgba(255,255,255,0.12)',
              }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: ministry.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={15} color="#fff" strokeWidth={2} />
                </div>
                <span style={{
                  fontFamily: 'var(--font-manrope)',
                  fontSize: '13px', fontWeight: 700, color: '#fff',
                }}>Ministerio de {ministry.name}</span>
              </div>
            </div>
          </div>

          {/* Meta pills */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '16px', flexWrap: 'wrap' }}>
            {[
              { icon: Clock, label: ministry.schedule },
              { icon: User, label: ministry.leader },
              { icon: MapPin, label: ministry.members },
            ].map(({ icon: MIcon, label }) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '99px',
                padding: '8px 14px',
                transition: 'background 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.09)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
              >
                <MIcon size={12} style={{ color: ministry.color, flexShrink: 0 }} />
                <span style={{
                  fontFamily: 'var(--font-manrope)',
                  fontSize: '12px', fontWeight: 500,
                  color: 'rgba(255,255,255,0.65)',
                  whiteSpace: 'nowrap',
                }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── TEXT COLUMN ── */}
        <div
          style={{
            order: isEven ? 1 : 0,
            opacity: visible ? 1 : 0,
            transform: slideTxt,
            transition: 'opacity 1s ease 200ms, transform 1s cubic-bezier(0.16,1,0.3,1) 200ms',
          }}
          className="ministry-txt-col"
        >
          {/* Number */}
          <div style={{
            fontFamily: 'var(--font-manrope)',
            fontSize: '80px', fontWeight: 900,
            color: `rgba(${ministry.colorRgb},0.07)`,
            lineHeight: 1,
            marginBottom: '-20px',
            letterSpacing: '-0.04em',
            userSelect: 'none',
          }}>
            {String(index + 1).padStart(2, '0')}
          </div>

          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '24px', height: '2.5px', background: ministry.color, borderRadius: '99px', flexShrink: 0 }} />
            <span style={{
              fontFamily: 'var(--font-manrope)',
              fontSize: '10px', fontWeight: 700,
              color: ministry.color,
              letterSpacing: '0.22em', textTransform: 'uppercase',
            }}>{ministry.tagline}</span>
          </div>

          {/* Title */}
          <h2 style={{
            fontFamily: 'var(--font-manrope)',
            fontSize: 'clamp(32px, 3.2vw, 48px)',
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.06,
            letterSpacing: '-0.025em',
            marginBottom: '18px',
          }}>
            Ministerio<br />
            <span style={{ color: ministry.color }}>de {ministry.name}</span>
          </h2>

          {/* Divider */}
          <div style={{
            width: '40px', height: '3px',
            background: `linear-gradient(90deg, ${ministry.color}, transparent)`,
            borderRadius: '99px',
            marginBottom: '20px',
          }} />

          {/* Description */}
          <p style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '15px', fontWeight: 300,
            color: 'rgba(255,255,255,0.58)',
            lineHeight: 1.9,
            marginBottom: '32px',
          }}>
            {ministry.description}
          </p>

          {/* Pillar accordion cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '36px' }}>
            {ministry.pillars.map((p, i) => (
              <PillarCard
                key={i}
                index={i}
                title={p.title}
                desc={p.desc}
                color={ministry.color}
                colorRgb={ministry.colorRgb}
              />
            ))}
          </div>

          {/* CTA button */}
          <a
            href="#contacto"
            style={{
              fontFamily: 'var(--font-manrope)',
              fontSize: '14px', fontWeight: 700,
              color: '#fff',
              background: ministry.color,
              padding: '14px 30px',
              borderRadius: '12px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              boxShadow: `0 8px 30px rgba(${ministry.colorRgb},0.35)`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = `0 14px 40px rgba(${ministry.colorRgb},0.5)`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = `0 8px 30px rgba(${ministry.colorRgb},0.35)`
            }}
          >
            Quiero unirme
            <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </article>
  )
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function MinistriesPage() {
  const [mounted, setMounted] = useState(false)
  const [activeId, setActiveId] = useState<string>('ninos')

  useEffect(() => { setTimeout(() => setMounted(true), 60) }, [])

  // Update active nav on scroll
  useEffect(() => {
    const handler = () => {
      for (const m of [...MINISTRIES].reverse()) {
        const el = document.getElementById(m.id)
        if (el && el.getBoundingClientRect().top <= 140) {
          setActiveId(m.id)
          return
        }
      }
      setActiveId('ninos')
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = useCallback((id: string) => {
    setActiveId(id)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <>
      <style>{`
        html { scroll-behavior: smooth; }

        /* ── Sticky nav pill ── */
        #min-sticky-nav {
          position: sticky;
          top: 72px;
          z-index: 50;
          background: rgba(10,10,15,0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          padding: 0 32px;
          display: flex;
          gap: 4px;
          align-items: center;
          height: 54px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        #min-sticky-nav::-webkit-scrollbar { display: none; }

        /* ── Responsive ── */
        .ministry-inner-grid {
          grid-template-columns: 1fr 1fr;
          gap: 72px;
        }
        @media (max-width: 900px) {
          .ministry-inner-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            padding: 56px 24px !important;
          }
          .ministry-img-col { order: 0 !important; }
          .ministry-txt-col { order: 1 !important; }
        }
        @media (max-width: 560px) {
          .ministry-inner-grid { padding: 40px 16px !important; }
          #hero-min-title { font-size: 36px !important; }
        }

        /* ── Number watermark ── */
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>

      <main style={{ background: '#0A0A0F', minHeight: '100vh', color: '#fff' }}>

        {/* ════════════════════════════════
            HERO
        ════════════════════════════════ */}
        <div style={{
          position: 'relative',
          paddingTop: '110px',
          paddingBottom: '80px',
          overflow: 'hidden',
          background: 'linear-gradient(160deg, #0D0D1A 0%, #0A0A0F 60%)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          {/* Decorative dots */}
          <div aria-hidden style={{
            position: 'absolute', top: '15%', right: '8%',
            width: '220px', height: '220px',
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
            backgroundSize: '20px 20px', pointerEvents: 'none',
          }} />
          {/* Gold ring */}
          <div aria-hidden style={{
            position: 'absolute', top: '50%', right: '4%',
            transform: 'translateY(-50%)',
            width: '380px', height: '380px',
            borderRadius: '50%',
            border: '1px solid rgba(245,168,0,0.1)',
            pointerEvents: 'none',
          }} />
          <div aria-hidden style={{
            position: 'absolute', top: '50%', right: '10%',
            transform: 'translateY(-50%)',
            width: '240px', height: '240px',
            borderRadius: '50%',
            border: '1px solid rgba(245,168,0,0.06)',
            pointerEvents: 'none',
          }} />
          {/* Red glow */}
          <div aria-hidden style={{
            position: 'absolute', bottom: '-60px', left: '-60px',
            width: '400px', height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(204,34,41,0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{
            maxWidth: '1280px', margin: '0 auto', padding: '0 32px',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)',
          }}>
            {/* Breadcrumb */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              marginBottom: '28px',
            }}>
              <a href="/" style={{
                fontFamily: 'var(--font-manrope)',
                fontSize: '12px', fontWeight: 500,
                color: 'rgba(255,255,255,0.35)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
              >Inicio</a>
              <ChevronRight size={12} style={{ color: 'rgba(255,255,255,0.2)' }} />
              <span style={{
                fontFamily: 'var(--font-manrope)',
                fontSize: '12px', fontWeight: 600,
                color: '#F5A800',
              }}>Ministerios</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '22px' }}>
              <div style={{ width: '32px', height: '2.5px', background: '#F5A800', borderRadius: '99px' }} />
              <span style={{
                fontFamily: 'var(--font-manrope)',
                fontSize: '10px', fontWeight: 700,
                color: '#F5A800',
                letterSpacing: '0.24em', textTransform: 'uppercase',
              }}>La Vid Verdadera</span>
            </div>

            <h1
              id="hero-min-title"
              style={{
                fontFamily: 'var(--font-manrope)',
                fontSize: 'clamp(42px, 5.5vw, 72px)',
                fontWeight: 800,
                color: '#FFFFFF',
                lineHeight: 1.03,
                letterSpacing: '-0.03em',
                marginBottom: '22px',
              }}
            >
              Nuestros<br />
              <span style={{ color: '#CC2229' }}>Ministerios</span>
            </h1>

            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '16px', fontWeight: 300,
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.85,
              maxWidth: '500px',
              marginBottom: '44px',
            }}>
              Cinco espacios de crecimiento, comunidad y servicio donde cada
              persona encuentra su lugar en la familia de La Vid Verdadera.
            </p>

            {/* Ministry preview cards — horizontal scroll on mobile */}
            <div style={{
              display: 'flex', gap: '12px',
              flexWrap: 'wrap',
            }}>
              {MINISTRIES.map((m, i) => {
                const Icon = m.icon
                return (
                  <button
                    key={m.id}
                    onClick={() => scrollTo(m.id)}
                    style={{
                      all: 'unset',
                      cursor: 'pointer',
                      display: 'inline-flex', alignItems: 'center', gap: '9px',
                      background: 'rgba(255,255,255,0.05)',
                      border: `1px solid rgba(255,255,255,0.1)`,
                      borderRadius: '99px',
                      padding: '10px 18px',
                      fontFamily: 'var(--font-manrope)',
                      fontSize: '13px', fontWeight: 600,
                      color: 'rgba(255,255,255,0.65)',
                      transition: 'all 0.25s ease',
                      opacity: mounted ? 1 : 0,
                      transform: mounted ? 'translateY(0)' : 'translateY(16px)',
                      transitionDelay: `${i * 60}ms`,
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.background = m.color
                      el.style.borderColor = m.color
                      el.style.color = '#fff'
                      el.style.transform = 'translateY(-2px)'
                      el.style.boxShadow = `0 8px 24px rgba(${m.colorRgb},0.4)`
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.background = 'rgba(255,255,255,0.05)'
                      el.style.borderColor = 'rgba(255,255,255,0.1)'
                      el.style.color = 'rgba(255,255,255,0.65)'
                      el.style.transform = 'translateY(0)'
                      el.style.boxShadow = 'none'
                    }}
                  >
                    <Icon size={14} />
                    {m.name}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* ════════════════════════════════
            STICKY NAV
        ════════════════════════════════ */}
        <nav id="min-sticky-nav" aria-label="Navegación ministerios">
          <div style={{
            maxWidth: '1280px', margin: '0 auto',
            display: 'flex', gap: '4px', width: '100%',
          }}>
            {MINISTRIES.map(m => {
              const Icon = m.icon
              const active = activeId === m.id
              return (
                <button
                  key={m.id}
                  onClick={() => scrollTo(m.id)}
                  style={{
                    all: 'unset',
                    cursor: 'pointer',
                    display: 'inline-flex', alignItems: 'center', gap: '7px',
                    padding: '6px 16px',
                    borderRadius: '99px',
                    fontFamily: 'var(--font-manrope)',
                    fontSize: '12.5px', fontWeight: 600,
                    color: active ? '#fff' : 'rgba(255,255,255,0.45)',
                    background: active ? m.color : 'transparent',
                    transition: 'all 0.25s ease',
                    whiteSpace: 'nowrap',
                    boxShadow: active ? `0 4px 16px rgba(${m.colorRgb},0.4)` : 'none',
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      const el = e.currentTarget as HTMLElement
                      el.style.color = '#fff'
                      el.style.background = 'rgba(255,255,255,0.08)'
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      const el = e.currentTarget as HTMLElement
                      el.style.color = 'rgba(255,255,255,0.45)'
                      el.style.background = 'transparent'
                    }
                  }}
                >
                  <Icon size={13} />
                  {m.name}
                </button>
              )
            })}
          </div>
        </nav>

        {/* ════════════════════════════════
            MINISTRY SECTIONS
        ════════════════════════════════ */}
        <div>
          {MINISTRIES.map((m, i) => (
            <MinistrySection key={m.id} ministry={m} index={i} />
          ))}
        </div>

        {/* ════════════════════════════════
            BOTTOM CTA
        ════════════════════════════════ */}
        <div style={{
          position: 'relative',
          background: 'linear-gradient(160deg, #0D0D1A 0%, #0A0A0F 100%)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '96px 32px',
          textAlign: 'center',
          overflow: 'hidden',
        }}>
          {/* decorative glow */}
          <div aria-hidden style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '600px', height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(204,34,41,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', maxWidth: '560px', margin: '0 auto' }}>
            {/* Vine icon */}
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%',
              border: '1px solid rgba(245,168,0,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 28px',
              background: 'rgba(245,168,0,0.06)',
            }}>
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
                <path d="M12 22V12M12 12C12 7 7 4 3 5c0 4 3 8 9 7M12 12c0-5 5-8 9-7-1 4-4 7-9 7"
                  stroke="#F5A800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <h2 style={{
              fontFamily: 'var(--font-manrope)',
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 800, color: '#FFFFFF',
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
              marginBottom: '16px',
            }}>
              ¿Listo para ser<br />
              <span style={{ color: '#CC2229' }}>parte de algo grande?</span>
            </h2>

            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '15px', fontWeight: 300,
              color: 'rgba(255,255,255,0.48)',
              lineHeight: 1.85, marginBottom: '36px',
            }}>
              Visítanos cualquier domingo y encuentra tu lugar en la familia
              de La Vid Verdadera. Todos son bienvenidos.
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="#contacto"
                style={{
                  fontFamily: 'var(--font-manrope)',
                  fontSize: '14px', fontWeight: 700,
                  color: '#fff', background: '#CC2229',
                  padding: '14px 32px', borderRadius: '12px',
                  textDecoration: 'none',
                  display: 'inline-flex', alignItems: 'center', gap: '9px',
                  boxShadow: '0 8px 30px rgba(204,34,41,0.35)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 14px 40px rgba(204,34,41,0.5)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(204,34,41,0.35)'
                }}
              >
                Contáctanos <ArrowRight size={15} />
              </a>
              <a
                href="/"
                style={{
                  fontFamily: 'var(--font-manrope)',
                  fontSize: '14px', fontWeight: 600,
                  color: 'rgba(255,255,255,0.55)',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: '14px 32px', borderRadius: '12px',
                  textDecoration: 'none',
                  display: 'inline-flex', alignItems: 'center', gap: '9px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.09)'
                  e.currentTarget.style.color = '#fff'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.55)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                }}
              >
                Volver al inicio
              </a>
            </div>
          </div>
        </div>

      </main>
    </>
  )
}