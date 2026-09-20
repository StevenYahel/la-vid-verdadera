'use client'

import { useEffect, useRef, useState } from 'react'

// ── Animated SVG Icons ────────────────────────────────────────────────────────
function IconVision({ active }: { active: boolean }) {
  return (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
      <path
        d="M3 18C3 18 9 8 18 8C27 8 33 18 33 18C33 18 27 28 18 28C9 28 3 18 3 18Z"
        stroke="#CC2229" strokeWidth="1.6" strokeLinejoin="round"
        strokeDasharray="60" strokeDashoffset={active ? 0 : 60}
        style={{ transition: 'stroke-dashoffset 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s' }}
      />
      <circle cx="18" cy="18" r="5" stroke="#CC2229" strokeWidth="1.6"
        strokeDasharray="32" strokeDashoffset={active ? 0 : 32}
        style={{ transition: 'stroke-dashoffset 0.7s cubic-bezier(0.16,1,0.3,1) 0.5s' }}
      />
      <circle cx="18" cy="18" r="2" fill="#CC2229"
        style={{
          opacity: active ? 1 : 0,
          transform: active ? 'scale(1)' : 'scale(0)',
          transformOrigin: '18px 18px',
          transition: 'opacity 0.4s ease 0.9s, transform 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.9s',
        }}
      />
    </svg>
  )
}

function IconMision({ active }: { active: boolean }) {
  return (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="14" stroke="#CC2229" strokeWidth="1.6"
        strokeDasharray="88" strokeDashoffset={active ? 0 : 88}
        style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.16,1,0.3,1) 0.1s' }}
      />
      <circle cx="18" cy="18" r="8" stroke="#CC2229" strokeWidth="1.4"
        strokeDasharray="50" strokeDashoffset={active ? 0 : 50}
        style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s' }}
      />
      <path d="M18 4V9M18 27V32M4 18H9M27 18H32"
        stroke="#CC2229" strokeWidth="1.4" strokeLinecap="round"
        style={{ opacity: active ? 1 : 0, transition: 'opacity 0.5s ease 0.8s' }}
      />
      <circle cx="18" cy="18" r="2.5" fill="#CC2229"
        style={{
          opacity: active ? 1 : 0,
          transform: active ? 'scale(1)' : 'scale(0)',
          transformOrigin: '18px 18px',
          transition: 'opacity 0.4s ease 1s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) 1s',
        }}
      />
    </svg>
  )
}

function IconValores({ active }: { active: boolean }) {
  return (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
      <path
        d="M18 5L22 14H31L24 20L27 29L18 23L9 29L12 20L5 14H14L18 5Z"
        stroke="#CC2229" strokeWidth="1.6" strokeLinejoin="round"
        strokeDasharray="90" strokeDashoffset={active ? 0 : 90}
        style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.16,1,0.3,1) 0.1s' }}
      />
      <path
        d="M18 9L21 16H27L22 20L24 27L18 23L12 27L14 20L9 16H15L18 9Z"
        fill="#CC2229"
        style={{ opacity: active ? 0.12 : 0, transition: 'opacity 0.6s ease 0.8s' }}
      />
      <circle cx="18" cy="18" r="2" fill="#CC2229"
        style={{
          opacity: active ? 1 : 0,
          transform: active ? 'scale(1)' : 'scale(0)',
          transformOrigin: '18px 18px',
          transition: 'opacity 0.4s ease 1s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) 1s',
        }}
      />
    </svg>
  )
}

// ── Data ─────────────────────────────────────────────────────────────────────
const ITEMS = [
  {
    num: '01',
    label: 'Nuestra Visión',
    title: 'Ser una iglesia\nque transforma.',
    text: 'Ser una iglesia que transforma personas, familias y comunidades con el poder del evangelio de Jesucristo, llevando su amor hasta los confines de Buritaca, Magdalena y más allá.',
    Icon: IconVision,
  },
  {
    num: '02',
    label: 'Nuestra Misión',
    title: 'Hacer discípulos\nque hagan discípulos.',
    text: 'Llevar el amor de Cristo a cada persona, ayudarles a crecer en su fe, equiparlos para servir a Dios y a los demás, y enviarlos a cumplir el gran mandamiento.',
    Icon: IconMision,
  },
  {
    num: '03',
    label: 'Nuestros Valores',
    title: 'Lo que nos mueve\ncada día.',
    text: 'Fe genuina, amor incondicional, servicio desinteresado, comunidad auténtica y adoración de corazón. Los pilares que sostienen todo lo que hacemos.',
    Icon: IconValores,
  },
]

// ── Hook ─────────────────────────────────────────────────────────────────────
function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.12) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref, threshold])
  return visible
}

// ── Card ─────────────────────────────────────────────────────────────────────
function VMVCard({
  item,
  index,
  parentVisible,
  isLast,
}: {
  item: (typeof ITEMS)[0]
  index: number
  parentVisible: boolean
  isLast: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        padding: '48px 40px 44px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        opacity: parentVisible ? 1 : 0,
        transform: parentVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${200 + index * 150}ms, transform 1s cubic-bezier(0.16,1,0.3,1) ${200 + index * 150}ms`,
      }}
      className="vmv-card"
    >
      {/* Hover light orb */}
      <div style={{
        position: 'absolute', top: '-60px', left: '50%',
        transform: 'translateX(-50%)',
        width: '200px', height: '200px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(204,34,41,0.14) 0%, transparent 70%)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.6s ease',
        pointerEvents: 'none', zIndex: 0,
      }}/>

      {/* Top red bar — draws on scroll */}
      <div style={{
        position: 'absolute', top: 0, left: 0, height: '2px',
        background: 'linear-gradient(to right, #CC2229, rgba(204,34,41,0.2))',
        width: parentVisible ? '100%' : '0%',
        transition: `width 1.2s cubic-bezier(0.16,1,0.3,1) ${400 + index * 150}ms`,
      }}/>

      {/* Number */}
      <p style={{
        position: 'relative', zIndex: 1,
        fontFamily: 'var(--font-manrope)', fontSize: '12px', fontWeight: 800,
        color: '#F5A800', letterSpacing: '0.14em', marginBottom: '16px',
        clipPath: parentVisible ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
        transition: `clip-path 0.8s cubic-bezier(0.16,1,0.3,1) ${500 + index * 150}ms`,
      }}>
        {item.num}
      </p>

      {/* Label */}
      <p style={{
        position: 'relative', zIndex: 1,
        fontFamily: 'var(--font-manrope)', fontSize: '10px', fontWeight: 700,
        color: '#CC2229', letterSpacing: '0.18em', textTransform: 'uppercase',
        marginBottom: '20px',
        opacity: parentVisible ? 1 : 0,
        transition: `opacity 0.8s ease ${600 + index * 150}ms`,
      }}>
        {item.label}
      </p>

      {/* Animated Icon */}
      <div style={{
        position: 'relative', zIndex: 1, marginBottom: '24px',
        width: '52px', height: '52px', borderRadius: '14px',
        background: 'rgba(204,34,41,0.07)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transform: hovered ? 'scale(1.1) rotate(-3deg)' : 'scale(1) rotate(0deg)',
        transition: 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)',
        boxShadow: hovered ? '0 8px 24px rgba(204,34,41,0.18)' : '0 0 0 transparent',
      }}>
        <item.Icon active={parentVisible} />
      </div>

      {/* Title */}
      <h3 style={{
        position: 'relative', zIndex: 1,
        fontFamily: 'var(--font-manrope)',
        fontSize: 'clamp(18px, 2vw, 24px)',
        fontWeight: 800, color: '#0A0A0F',
        lineHeight: 1.15, letterSpacing: '-0.02em',
        marginBottom: '16px', whiteSpace: 'pre-line',
        opacity: parentVisible ? 1 : 0,
        transform: parentVisible ? 'translateX(0)' : 'translateX(-16px)',
        transition: `opacity 0.9s ease ${650 + index * 150}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${650 + index * 150}ms`,
      }}>
        {item.title}
      </h3>

      {/* Gold divider */}
      <div style={{
        position: 'relative', zIndex: 1, height: '1px',
        background: 'linear-gradient(to right, #F5A800, transparent)',
        marginBottom: '16px',
        width: parentVisible ? '48px' : '0px',
        transition: `width 0.9s cubic-bezier(0.16,1,0.3,1) ${750 + index * 150}ms`,
      }}/>

      {/* Body text */}
      <p style={{
        position: 'relative', zIndex: 1,
        fontFamily: 'var(--font-inter)', fontSize: '14px',
        fontWeight: 300, color: '#6B7280', lineHeight: 1.85,
        opacity: parentVisible ? 1 : 0,
        transform: parentVisible ? 'translateY(0)' : 'translateY(12px)',
        transition: `opacity 0.9s ease ${800 + index * 150}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${800 + index * 150}ms`,
      }}>
        {item.text}
      </p>
    </div>
  )
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function VisionMision() {
  const sectionRef = useRef<HTMLElement>(null)
  const visible = useInView(sectionRef, 0.08)

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#fff',
        padding: '100px 0 110px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Ambient lights */}
      <div style={{
        position: 'absolute', top: '10%', left: '-8%',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(204,34,41,0.05) 0%, transparent 70%)',
        opacity: visible ? 1 : 0, transition: 'opacity 2s ease 0.5s',
        pointerEvents: 'none',
        animation: visible ? 'breatheLeft 6s ease-in-out infinite' : 'none',
      }}/>
      <div style={{
        position: 'absolute', bottom: '10%', right: '-8%',
        width: '360px', height: '360px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245,168,0,0.06) 0%, transparent 70%)',
        opacity: visible ? 1 : 0, transition: 'opacity 2s ease 0.8s',
        pointerEvents: 'none',
        animation: visible ? 'breatheRight 7s ease-in-out infinite 1s' : 'none',
      }}/>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* ── Header ── */}
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: '14px', marginBottom: '20px',
          }}>
            <div style={{
              height: '1px',
              width: visible ? '40px' : '0px',
              background: 'rgba(204,34,41,0.35)',
              transition: 'width 1s cubic-bezier(0.16,1,0.3,1) 100ms',
            }}/>
            <p style={{
              fontFamily: 'var(--font-manrope)', fontSize: '10px', fontWeight: 700,
              color: '#CC2229', letterSpacing: '0.22em', textTransform: 'uppercase',
              opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease 200ms',
            }}>
              Lo que nos define
            </p>
            <div style={{
              height: '1px',
              width: visible ? '40px' : '0px',
              background: 'rgba(204,34,41,0.35)',
              transition: 'width 1s cubic-bezier(0.16,1,0.3,1) 100ms',
            }}/>
          </div>

          <div style={{ overflow: 'hidden' }}>
            <h2 style={{
              fontFamily: 'var(--font-manrope)',
              fontSize: 'clamp(32px, 5vw, 58px)',
              fontWeight: 800, color: '#0A0A0F',
              lineHeight: 1.05, letterSpacing: '-0.025em',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1) 150ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) 150ms',
            }}>
              Visión, misión y valores
            </h2>
          </div>

          {/* Gold underline from center */}
          <div style={{
            height: '3px',
            background: 'linear-gradient(to right, transparent, #F5A800, transparent)',
            borderRadius: '99px', margin: '20px auto 0',
            width: visible ? '120px' : '0px',
            transition: 'width 1.1s cubic-bezier(0.16,1,0.3,1) 400ms',
          }}/>
        </div>

        {/* ── Grid ── */}
        <div className="vmv-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', position: 'relative' }}>

          {/* Vertical dividers — desktop only */}
          {[1, 2].map(pos => (
            <div key={pos} className="vmv-divider" style={{
              position: 'absolute', top: '24px', bottom: '24px',
              left: `calc(${pos * 33.333}% - 0.5px)`,
              width: '1px',
              background: 'linear-gradient(to bottom, transparent, #e2e2e8 20%, #e2e2e8 80%, transparent)',
              transform: visible ? 'scaleY(1)' : 'scaleY(0)',
              transformOrigin: 'top',
              transition: `transform 1.2s cubic-bezier(0.16,1,0.3,1) ${350 + pos * 80}ms`,
            }}/>
          ))}

          {ITEMS.map((item, i) => (
            <VMVCard
              key={item.num}
              item={item}
              index={i}
              parentVisible={visible}
              isLast={i === ITEMS.length - 1}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes breatheLeft {
          0%, 100% { transform: scale(1) translateY(0); opacity: 0.8; }
          50%       { transform: scale(1.15) translateY(-20px); opacity: 1; }
        }
        @keyframes breatheRight {
          0%, 100% { transform: scale(1) translateY(0); opacity: 0.7; }
          50%       { transform: scale(1.1) translateY(20px); opacity: 1; }
        }

        /* ── Mobile: 1 columna ── */
        @media (max-width: 767px) {
          .vmv-grid {
            grid-template-columns: 1fr !important;
          }
          .vmv-divider {
            display: none !important;
          }
          .vmv-card {
            padding: 36px 20px 32px !important;
            border-bottom: 1px solid #f0f0f4;
          }
          .vmv-card:last-child {
            border-bottom: none;
          }
        }

        /* ── Tablet: 1 columna también ── */
        @media (min-width: 768px) and (max-width: 1023px) {
          .vmv-grid {
            grid-template-columns: 1fr !important;
          }
          .vmv-divider {
            display: none !important;
          }
          .vmv-card {
            padding: 40px 32px !important;
            border-bottom: 1px solid #f0f0f4;
            max-width: 600px;
            margin: 0 auto;
            width: 100%;
          }
          .vmv-card:last-child {
            border-bottom: none;
          }
        }

        /* ── Desktop: 3 columnas ── */
        @media (min-width: 1024px) {
          .vmv-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          .vmv-card {
            padding: 48px 40px 44px !important;
          }
        }
      `}</style>
    </section>
  )
}