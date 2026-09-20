'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Heart, Users, Globe } from 'lucide-react'

const VALUES = [
  {
    icon: Heart,
    title: 'Amamos a Dios',
    description: 'Levantamos a Jesús como el centro de todo lo que hacemos.',
    accentColor: '#CC2229',
    bgColor: 'rgba(204,34,41,0.15)',
  },
  {
    icon: Users,
    title: 'Amamos a las personas',
    description: 'Construimos relaciones que transforman vidas.',
    accentColor: '#F5A800',
    bgColor: 'rgba(245,168,0,0.15)',
  },
  {
    icon: Globe,
    title: 'Servimos a nuestra comunidad',
    description: 'Llevamos esperanza y servicio a nuestra ciudad y más allá.',
    accentColor: '#7C3AED',
    bgColor: 'rgba(124,58,237,0.15)',
  },
]

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.06 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref])
  return visible
}

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const visible = useInView(ref)

  const anim = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.8s ease ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  })

  const animLeft = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateX(0)' : 'translateX(-28px)',
    transition: `opacity 0.9s ease ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  })

  return (
    <>
      {/* Responsive styles via <style> tag */}
      <style>{`
        #nosotros-grid {
          display: grid;
          grid-template-columns: 280px 1fr 300px;
          gap: 40px;
          align-items: center;
          padding-bottom: 72px;
        }

        #nosotros-logo-col {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        #nosotros-logo-img {
          width: 220px;
          height: 220px;
        }

        #nosotros-verse {
          display: block;
        }

        /* Tablet */
        @media (max-width: 1024px) {
          #nosotros-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto;
            gap: 32px;
          }
          #nosotros-logo-col {
            grid-column: 1;
            grid-row: 1;
          }
          #nosotros-text-col {
            grid-column: 2;
            grid-row: 1;
          }
          #nosotros-cards-col {
            grid-column: 1 / -1;
            grid-row: 2;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
          }
          #nosotros-verse {
            display: none;
          }
        }

        /* Mobile */
        @media (max-width: 640px) {
          #nosotros-grid {
            grid-template-columns: 1fr;
            gap: 28px;
            padding-bottom: 48px;
          }
          #nosotros-logo-col {
            grid-column: 1;
            grid-row: 1;
          }
          #nosotros-text-col {
            grid-column: 1;
            grid-row: 2;
          }
          #nosotros-cards-col {
            grid-column: 1;
            grid-row: 3;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          #nosotros-logo-img {
            width: 180px;
            height: 180px;
          }
          #nosotros-verse {
            display: none;
          }
        }
      `}</style>

      <section
        id="nosotros"
        ref={ref}
        style={{
          position: 'relative',
          background: '#0D1117',
          overflow: 'hidden',
          paddingTop: '72px',
          paddingBottom: '0',
        }}
      >
        {/* Dark gradient overlay */}
        <div aria-hidden style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(8,8,18,0.98) 0%, rgba(10,10,20,0.88) 60%, rgba(8,8,18,0.95) 100%)',
          zIndex: 1,
        }} />

        {/* Subtle radial glow top-center */}
        <div aria-hidden style={{
          position: 'absolute',
          top: '-80px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(204,34,41,0.08) 0%, transparent 70%)',
          zIndex: 1,
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div id="nosotros-grid">

            {/* ── COL 1: Logo ── */}
            <div id="nosotros-logo-col" style={animLeft(0)}>

              {/* Logo image — no cropping, full shield visible */}
              <div
                id="nosotros-logo-img"
                style={{
                  marginBottom: '16px',
                  filter: 'drop-shadow(0 0 32px rgba(204,34,41,0.3)) drop-shadow(0 16px 48px rgba(0,0,0,0.7))',
                  flexShrink: 0,
                }}
              >
                <img
                  src="/images/fe-escudo.jpg"
                  alt="Escudo Iglesia Cuadrangular La Vid Verdadera"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',   /* contain = logo completo, sin recorte */
                    display: 'block',
                  }}
                />
              </div>

              {/* BURITACA / LA VID VERDADERA */}
              <div style={{ textAlign: 'center', marginBottom: '0' }}>
                <p style={{
                  fontFamily: 'var(--font-manrope)',
                  fontSize: 'clamp(22px, 2.5vw, 30px)',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  letterSpacing: '0.08em',
                  lineHeight: 1,
                  margin: '0 0 6px',
                }}>
                  BURITACA
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                  <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.18)' }} />
                  <span style={{
                    fontFamily: 'var(--font-manrope)',
                    fontSize: '10px',
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.45)',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}>
                    LA VID VERDADERA
                  </span>
                  <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.18)' }} />
                </div>
              </div>

              {/* Bible verse — hidden on mobile/tablet via CSS above */}
              <div
                id="nosotros-verse"
                style={{
                  ...anim(500),
                  marginTop: '32px',
                  borderLeft: '3px solid #F5A800',
                  paddingLeft: '14px',
                  alignSelf: 'flex-start',
                  width: '100%',
                }}
              >
                <p style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '12.5px',
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.7)',
                  lineHeight: 1.75,
                  fontStyle: 'italic',
                  marginBottom: '8px',
                }}>
                  "Porque de él, y por él, y para él, son todas las cosas.
                  A él sea la gloria por los siglos. Amén."
                </p>
                <p style={{
                  fontFamily: 'var(--font-manrope)',
                  fontSize: '10px',
                  fontWeight: 700,
                  color: '#F5A800',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  margin: 0,
                }}>
                  ROMANOS 11:36
                </p>
              </div>
            </div>

            {/* ── COL 2: Texto ── */}
            <div id="nosotros-text-col" style={{ paddingTop: '4px' }}>

              <div style={anim(80)}>
                {/* Eyebrow */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <div style={{ width: '28px', height: '2px', background: '#F5A800', borderRadius: '99px', flexShrink: 0 }} />
                  <p style={{
                    fontFamily: 'var(--font-manrope)',
                    fontSize: '10.5px',
                    fontWeight: 700,
                    color: '#F5A800',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    margin: 0,
                  }}>
                    Quiénes somos
                  </p>
                </div>

                <h2 style={{
                  fontFamily: 'var(--font-manrope)',
                  fontSize: 'clamp(34px, 3.8vw, 52px)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  lineHeight: 1.08,
                  letterSpacing: '-0.025em',
                  margin: '0 0 24px',
                }}>
                  Una iglesia<br />para toda la<br />
                  <span style={{ color: '#CC2229' }}>familia</span>
                </h2>
              </div>

              <div style={anim(200)}>
                <p style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '15px',
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.62)',
                  lineHeight: 1.85,
                  margin: '0 0 32px',
                  maxWidth: '420px',
                }}>
                  Iglesia Cristiana Cuadrangular La Vid Verdadera existe para llevar el amor
                  de Cristo a cada persona, ayudarles a crecer en su fe y equiparlos para
                  servir a Dios y a los demás en{' '}
                  <strong style={{ color: '#FFFFFF', fontWeight: 600 }}>Buritaca, Magdalena</strong>
                  {' '}y más allá.
                </p>
              </div>

              <div style={anim(300)}>
                <Link
                  href="/nosotros"
                  style={{
                    fontFamily: 'var(--font-manrope)',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    border: '1.5px solid rgba(255,255,255,0.3)',
                    padding: '12px 28px',
                    borderRadius: '99px',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'background 0.2s ease, border-color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#CC2229'
                    e.currentTarget.style.borderColor = '#CC2229'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
                  }}
                >
                  Conoce nuestra historia
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* ── COL 3: Value cards ── */}
            <div id="nosotros-cards-col" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {VALUES.map(({ icon: Icon, title, description, accentColor, bgColor }, i) => (
                <div
                  key={title}
                  style={{
                    ...anim(180 + i * 110),
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderLeft: `3px solid ${accentColor}`,
                    borderRadius: '14px',
                    padding: '18px 16px 18px 16px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '14px',
                    backdropFilter: 'blur(10px)',
                    transition: 'background 0.2s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.07)'
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.04)'
                  }}
                >
                  {/* Icon */}
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={17} style={{ color: accentColor }} strokeWidth={1.5} />
                  </div>

                  {/* Text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{
                      fontFamily: 'var(--font-manrope)',
                      fontSize: '13.5px',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      margin: '0 0 4px',
                      lineHeight: 1.3,
                    }}>{title}</h3>
                    <p style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '12.5px',
                      fontWeight: 300,
                      color: 'rgba(255,255,255,0.52)',
                      lineHeight: 1.6,
                      margin: 0,
                    }}>{description}</p>
                  </div>

                  <ArrowRight size={13} style={{ color: 'rgba(255,255,255,0.22)', flexShrink: 0, marginTop: '3px' }} />
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ── Wave de colores abajo ── */}
        <div aria-hidden style={{ position: 'relative', zIndex: 2, lineHeight: 0 }}>
          <svg
            viewBox="0 0 1440 100"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '100%', display: 'block' }}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#CC2229" />
                <stop offset="33%"  stopColor="#F5A800" />
                <stop offset="66%"  stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#CC2229" />
              </linearGradient>
            </defs>
            <path
              d="M0,50 C200,90 400,15 600,55 C800,95 1000,20 1200,55 C1320,75 1400,45 1440,50 L1440,100 L0,100 Z"
              fill="url(#waveGrad)"
              opacity="0.95"
            />
            <path
              d="M0,70 C250,30 500,90 750,58 C950,35 1150,80 1440,48 L1440,100 L0,100 Z"
              fill="url(#waveGrad)"
              opacity="0.35"
            />
          </svg>
        </div>
      </section>
    </>
  )
}