'use client'

import { useEffect, useRef, useState } from 'react'
import { Crown, Heart } from 'lucide-react'
import { PASTORS } from '@/data/site'

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref])
  return visible
}

function PastorCard({
  pastor,
  icon: Icon,
  delay,
  visible,
  align,
}: {
  pastor: typeof PASTORS[0]
  icon: React.ElementType
  delay: number
  visible: boolean
  align: 'left' | 'right'
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{
        opacity:   visible ? 1 : 0,
        transform: visible
          ? 'translateY(0)'
          : align === 'left' ? 'translateX(-40px)' : 'translateX(40px)',
        transition: `opacity 0.9s ease ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px',
      }}
    >
      <div
        style={{ position: 'relative', cursor: 'pointer' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={{
          position: 'absolute', top: '-12px', left: '10%', right: '10%', height: '28px',
          background: 'linear-gradient(90deg, transparent, #CC2229, #F5A800, #CC2229, transparent)',
          filter: 'blur(10px)',
          borderRadius: '50%',
          opacity: hovered ? 0.95 : 0.55,
          animation: 'aurora-shift 4s ease-in-out infinite',
          transition: 'opacity 0.4s ease',
          zIndex: 0,
        }}/>
        <div style={{
          position: 'absolute', bottom: '-12px', left: '10%', right: '10%', height: '28px',
          background: 'linear-gradient(90deg, transparent, #5B2D8E, #1B4FA0, #5B2D8E, transparent)',
          filter: 'blur(10px)',
          borderRadius: '50%',
          opacity: hovered ? 0.95 : 0.55,
          animation: 'aurora-shift 4s ease-in-out infinite reverse',
          transition: 'opacity 0.4s ease',
          zIndex: 0,
        }}/>
        <div style={{
          position: 'absolute', left: '-12px', top: '15%', bottom: '15%', width: '24px',
          background: 'linear-gradient(180deg, transparent, #5B2D8E, #CC2229, transparent)',
          filter: 'blur(10px)',
          borderRadius: '50%',
          opacity: hovered ? 0.85 : 0.4,
          animation: 'aurora-shift 5s ease-in-out infinite 1s',
          transition: 'opacity 0.4s ease',
          zIndex: 0,
        }}/>
        <div style={{
          position: 'absolute', right: '-12px', top: '15%', bottom: '15%', width: '24px',
          background: 'linear-gradient(180deg, transparent, #F5A800, #1B4FA0, transparent)',
          filter: 'blur(10px)',
          borderRadius: '50%',
          opacity: hovered ? 0.85 : 0.4,
          animation: 'aurora-shift 5s ease-in-out infinite reverse 1s',
          transition: 'opacity 0.4s ease',
          zIndex: 0,
        }}/>

        <div style={{
          position: 'relative',
          width: '260px',
          aspectRatio: '3/4',
          borderRadius: '24px',
          overflow: 'hidden',
          background: '#e5e7eb',
          zIndex: 2,
          boxShadow: hovered ? '0 24px 60px rgba(0,0,0,0.18)' : '0 8px 32px rgba(0,0,0,0.12)',
          transition: 'box-shadow 0.4s ease',
        }}>
          <img
            src={pastor.image}
            alt={pastor.name}
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center top',
              display: 'block',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 50%)',
          }}/>
        </div>

        <div style={{
          position: 'absolute', bottom: '-14px',
          left: '50%', transform: 'translateX(-50%)',
          width: '44px', height: '44px',
          borderRadius: '50%',
          background: '#CC2229',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(204,34,41,0.5)',
          zIndex: 3,
          border: '3px solid #F8F8FA',
        }}>
          <Icon size={18} color="#fff" fill="#fff" strokeWidth={1.5}/>
        </div>
      </div>

      <div style={{ textAlign: 'center', paddingTop: '8px' }}>
        <h3 style={{
          fontFamily: 'var(--font-manrope)',
          fontSize: '20px', fontWeight: 800,
          color: '#0A0A0F', marginBottom: '6px',
        }}>{pastor.name}</h3>
        <p style={{
          fontFamily: 'var(--font-manrope)',
          fontSize: '10px', fontWeight: 700,
          color: '#CC2229', letterSpacing: '0.16em',
          textTransform: 'uppercase', marginBottom: '8px',
        }}>{pastor.role}</p>
        <div style={{ width: '28px', height: '2px', background: '#F5A800', borderRadius: '99px', margin: '0 auto' }}/>
      </div>
    </div>
  )
}

export default function Pastors() {
  const ref = useRef<HTMLElement>(null)
  const visible = useInView(ref)

  const anim = (delay: number) => ({
    opacity:    visible ? 1 : 0,
    transform:  visible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.8s ease ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  })

  return (
    <>
      <style>{`
        @keyframes aurora-shift {
          0%, 100% { opacity: var(--from, 0.45); transform: scaleX(0.85) translateX(-6px); }
          50%       { opacity: var(--to,   0.9);  transform: scaleX(1.1)  translateX(6px);  }
        }
      `}</style>

      <section
        id="pastores"
        ref={ref}
        className="relative bg-[#F8F8FA] overflow-hidden py-20 lg:py-28"
      >
        <div aria-hidden className="pointer-events-none absolute left-[5%] top-[15%] opacity-[0.05]" style={{
          width: '160px', height: '280px',
          backgroundImage: 'radial-gradient(circle, #F5A800 1.5px, transparent 1.5px)',
          backgroundSize: '18px 18px',
        }}/>
        <div aria-hidden className="pointer-events-none absolute right-[5%] bottom-[15%] opacity-[0.05]" style={{
          width: '160px', height: '200px',
          backgroundImage: 'radial-gradient(circle, #F5A800 1.5px, transparent 1.5px)',
          backgroundSize: '18px 18px',
        }}/>

        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div style={{ ...anim(0), textAlign: 'center', marginBottom: '60px' }}>
            <p style={{
              fontFamily: 'var(--font-manrope)',
              fontSize: '11px', fontWeight: 700,
              color: '#CC2229', letterSpacing: '0.16em',
              textTransform: 'uppercase', marginBottom: '12px',
            }}>Liderazgo pastoral</p>
            <h2 style={{
              fontFamily: 'var(--font-manrope)',
              fontSize: 'clamp(36px,4vw,52px)',
              fontWeight: 800, color: '#0A0A0F',
              lineHeight: 1.08, letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}>Nuestros pastores</h2>
            <div style={{ width: '44px', height: '3px', background: '#F5A800', borderRadius: '99px', margin: '0 auto' }}/>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="flex justify-center lg:justify-end">
              <PastorCard pastor={PASTORS[0]} icon={Crown} delay={100} visible={visible} align="left"/>
            </div>

            <div style={{ ...anim(200), textAlign: 'center', position: 'relative' }}>
              <div style={{
                position: 'absolute', top: '80px',
                left: '-60px', right: '-60px',
                pointerEvents: 'none', zIndex: 0,
              }}>
                <svg viewBox="0 0 400 120" style={{ width: '100%', overflow: 'visible' }} fill="none">
                  <path d="M 0 60 C 60 60 140 30 200 60" stroke="url(#arcGradLeft)" strokeWidth="1.5" strokeDasharray="6 4" strokeLinecap="round" opacity="0.5"/>
                  <path d="M 200 60 C 260 90 340 60 400 60" stroke="url(#arcGradRight)" strokeWidth="1.5" strokeDasharray="6 4" strokeLinecap="round" opacity="0.5"/>
                  <circle cx="200" cy="60" r="4" fill="#F5A800" opacity="0.8"/>
                  <circle cx="200" cy="60" r="8" stroke="#F5A800" strokeWidth="1" opacity="0.25"/>
                  <circle cx="0" cy="60" r="3" fill="#CC2229" opacity="0.6"/>
                  <circle cx="400" cy="60" r="3" fill="#5B2D8E" opacity="0.6"/>
                  <defs>
                    <linearGradient id="arcGradLeft" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#CC2229"/>
                      <stop offset="100%" stopColor="#F5A800"/>
                    </linearGradient>
                    <linearGradient id="arcGradRight" x1="200" y1="0" x2="400" y2="0" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#F5A800"/>
                      <stop offset="100%" stopColor="#5B2D8E"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div style={{ position: 'relative', zIndex: 1, width: '90px', height: '90px', margin: '0 auto 32px' }}>
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(245,168,0,0.3)' }}/>
                <div style={{ position: 'absolute', inset: '8px', borderRadius: '50%', border: '1px solid rgba(245,168,0,0.15)' }}/>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg viewBox="0 0 48 48" style={{ width: '44px', height: '44px' }} fill="none">
                    <circle cx="24" cy="24" r="22" stroke="rgba(245,168,0,0.2)" strokeWidth="1"/>
                    <circle cx="24" cy="14" r="4" stroke="#F5A800" strokeWidth="1.5"/>
                    <circle cx="14" cy="20" r="3.5" stroke="#F5A800" strokeWidth="1.5"/>
                    <circle cx="34" cy="20" r="3.5" stroke="#F5A800" strokeWidth="1.5"/>
                    <path d="M17 34c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="#F5A800" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M9 34c0-3 2.5-5.5 5.5-5.5" stroke="#F5A800" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M39 34c0-3-2.5-5.5-5.5-5.5" stroke="#F5A800" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>

              <div style={{ fontSize: '22px', color: 'rgba(204,34,41,0.25)', fontFamily: 'Georgia, serif', lineHeight: 1, marginBottom: '16px' }}>❝</div>

              <p style={{ fontFamily: 'var(--font-manrope)', fontSize: '17px', fontWeight: 500, color: '#374151', lineHeight: 1.7, marginBottom: '20px' }}>
                Nuestro deseo es que cada persona pueda conocer el amor de Cristo
                y encontrar una familia donde crecer espiritualmente.
                Siempre serán bienvenidos en{' '}
                <strong style={{ color: '#CC2229', fontWeight: 700 }}>La Vid Verdadera.</strong>
              </p>

              <div style={{ width: '36px', height: '2px', background: '#F5A800', borderRadius: '99px', margin: '0 auto 16px' }}/>
              <p style={{ fontFamily: 'var(--font-manrope)', fontSize: '10px', fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '4px' }}>Pastores</p>
              <p style={{ fontFamily: 'var(--font-manrope)', fontSize: '10px', fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Iglesia Cuadrangular La Vid Verdadera</p>
            </div>

            <div className="flex justify-center lg:justify-start">
              <PastorCard pastor={PASTORS[1]} icon={Heart} delay={100} visible={visible} align="right"/>
            </div>
          </div>

          <div style={{ ...anim(400), marginTop: '56px', display: 'flex', justifyContent: 'center' }}>
            <div style={{
              background: 'rgba(204,34,41,0.06)',
              border: '1px solid rgba(204,34,41,0.1)',
              borderRadius: '16px',
              padding: '16px 28px',
              display: 'flex', alignItems: 'center', gap: '14px',
              maxWidth: '560px',
            }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(204,34,41,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Heart size={16} style={{ color: '#CC2229' }} fill="#CC2229"/>
              </div>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: '14px', fontWeight: 300, color: '#4B5563', lineHeight: 1.6 }}>
                Dos vidas, un propósito: pastorear con amor,{' '}
                <strong style={{ color: '#CC2229', fontWeight: 600 }}>guiar con sabiduría y servir juntos al Reino de Dios.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// ─── Verse Section con video de YouTube ──────────────────────────────────────
export function VerseSection() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const WORDS = 'Yo soy la vid; ustedes son las ramas. El que permanece en mí, como yo en él, ese lleva mucho fruto.'.split(' ')

  // ID extraído de https://youtu.be/3O1zS5s_kRw
  const YT_ID = '3O1zS5s_kRw'

  return (
    <section
      ref={ref}
      aria-label="Versículo de la iglesia"
      className="relative overflow-hidden"
      style={{ minHeight: 'clamp(480px, 60vh, 700px)' }}
    >
      {/* ── Video background desde YouTube ── */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <iframe
          src={`https://www.youtube.com/embed/${YT_ID}?autoplay=1&mute=1&loop=1&playlist=${YT_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{
            position: 'absolute',
            // Escalar el iframe para que cubra como object-fit: cover
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '177.78vh',
            minWidth: '100%',
            height: '56.25vw',
            minHeight: '100%',
            border: 'none',
          }}
          title="Video de fondo Juan 15"
        />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0" style={{ background: 'rgba(10,10,15,0.68)' }}/>
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(204,34,41,0.08) 0%, transparent 70%)',
      }}/>
      <div className="absolute inset-x-0 top-0 h-24" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)' }}/>
      <div className="absolute inset-x-0 bottom-0 h-24" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }}/>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center w-full h-full min-h-[inherit] px-6 py-24">
        <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>

          <div style={{
            fontSize: '80px', lineHeight: 1,
            color: 'rgba(255,255,255,0.06)',
            fontFamily: 'Georgia, serif',
            marginBottom: '-8px',
            userSelect: 'none',
            opacity: visible ? 1 : 0,
            transition: 'opacity 1s ease 200ms',
          }}>"</div>

          <blockquote style={{ marginBottom: '28px' }}>
            <p style={{
              fontFamily: 'var(--font-manrope)',
              fontSize: 'clamp(22px, 3.2vw, 36px)',
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1.55,
              letterSpacing: '-0.01em',
            }}>
              {WORDS.map((word, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0) blur(0px)' : 'translateY(16px)',
                    filter: visible ? 'blur(0px)' : 'blur(4px)',
                    transition: `opacity 0.6s ease ${300 + i * 55}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${300 + i * 55}ms, filter 0.6s ease ${300 + i * 55}ms`,
                    marginRight: '0.28em',
                  }}
                >
                  {word}
                </span>
              ))}
            </p>
          </blockquote>

          <div style={{
            height: '1px',
            background: 'rgba(255,255,255,0.25)',
            margin: '0 auto 20px',
            width: visible ? '48px' : '0px',
            transition: 'width 0.8s cubic-bezier(0.16,1,0.3,1) 1400ms',
          }}/>

          <cite style={{
            fontFamily: 'var(--font-manrope)',
            fontSize: '11px', fontWeight: 700,
            color: 'rgba(255,255,255,0.45)',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            fontStyle: 'normal',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.8s ease 1600ms',
          }}>
            Juan 15:5 — RVR60
          </cite>
        </div>
      </div>
    </section>
  )
}