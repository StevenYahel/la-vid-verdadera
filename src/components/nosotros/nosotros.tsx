'use client'

import { useEffect, useRef, useState } from 'react'

export default function NosotrosHero() {
  const [mounted, setMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Staggered entrance helpers
  const fadeUp = (delay: number, extraStyle: React.CSSProperties = {}) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0px)' : 'translateY(36px)',
    transition: `opacity 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    ...extraStyle,
  })

  const fadeIn = (delay: number) => ({
    opacity: mounted ? 1 : 0,
    transition: `opacity 1.4s ease ${delay}ms`,
  })

  const revealLeft = (delay: number) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateX(0px)' : 'translateX(-40px)',
    transition: `opacity 1.2s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1.2s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  })

  const revealRight = (delay: number) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateX(0px) scale(1)' : 'translateX(50px) scale(0.97)',
    transition: `opacity 1.3s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1.3s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  })

  // Subtle parallax on photo
  const photoParallax = scrollY * 0.18

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#0A0A0F',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Animated grain overlay ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          opacity: 0.035,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '160px 160px',
          pointerEvents: 'none',
        }}
      />

      {/* ── Red glow pulse (left side) ── */}
      <div
        style={{
          position: 'absolute',
          left: '-10%',
          top: '20%',
          width: '50vw',
          height: '60vh',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(204,34,41,0.13) 0%, transparent 70%)',
          zIndex: 1,
          ...fadeIn(400),
        }}
      />

      {/* ── Thin horizontal rule (decorative) ── */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(245,168,0,0.08), transparent)',
          zIndex: 1,
          transform: mounted ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left center',
          transition: 'transform 2s cubic-bezier(0.16,1,0.3,1) 600ms',
        }}
      />

      {/* ── Main layout ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'center',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 48px',
          minHeight: '100vh',
          gap: '0',
          width: '100%',
        }}
        className="hero-grid"
      >
        {/* ════ LEFT ════ */}
        <div style={{ paddingRight: '64px', paddingTop: '120px', paddingBottom: '80px' }}>

          {/* Editorial eyebrow */}
          <div style={{ ...revealLeft(100), marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: mounted ? '32px' : '0px',
                height: '1px',
                background: '#CC2229',
                transition: 'width 0.8s cubic-bezier(0.16,1,0.3,1) 300ms',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-manrope)',
                fontSize: '10px',
                fontWeight: 700,
                color: '#CC2229',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              Nuestra Historia
            </span>
          </div>

          {/* Main headline — word-by-word stagger */}
          <h1
            style={{
              fontFamily: 'var(--font-manrope)',
              fontSize: 'clamp(40px, 5.5vw, 76px)',
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1.0,
              letterSpacing: '-0.025em',
              marginBottom: '28px',
            }}
          >
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <span style={{ display: 'block', ...fadeUp(150) }}>Conoce quiénes</span>
            </span>
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <span style={{ display: 'block', ...fadeUp(230) }}>somos y de dónde</span>
            </span>
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <span
                style={{
                  display: 'block',
                  color: '#CC2229',
                  ...fadeUp(310),
                  // Subtle text shimmer after mount
                  backgroundImage: mounted
                    ? 'linear-gradient(90deg, #CC2229 0%, #e8373f 50%, #CC2229 100%)'
                    : 'none',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: mounted ? 'text' : 'unset',
                  WebkitTextFillColor: mounted ? 'transparent' : '#CC2229',
                  animation: mounted ? 'shimmer 3s linear 1.4s forwards' : 'none',
                }}
              >
                venimos.
              </span>
            </span>
          </h1>

          {/* Subtext */}
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '16px',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.50)',
              lineHeight: 1.85,
              maxWidth: '400px',
              marginBottom: '52px',
              ...fadeUp(420),
            }}
          >
            Más de 15 años llevando el amor de Cristo a Buritaca,
            Magdalena y más allá. Una historia de fe, familia y propósito.
          </p>

          {/* Timeline ruler */}
          <div style={{ ...fadeUp(520), display: 'flex', alignItems: 'center', gap: '0' }}>
            <span
              style={{
                fontFamily: 'var(--font-manrope)',
                fontSize: '11px',
                fontWeight: 700,
                color: '#F5A800',
                letterSpacing: '0.08em',
              }}
            >
              2009
            </span>
            <div style={{ position: 'relative', flex: 1, margin: '0 14px', height: '1px' }}>
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.15)', width: '100%' }} />
              {/* Animated progress fill */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to right, #F5A800, rgba(245,168,0,0.3))',
                  transform: mounted ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 1.8s cubic-bezier(0.16,1,0.3,1) 700ms',
                }}
              />
              {/* Moving dot on line */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '0',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#F5A800',
                  transform: 'translateY(-50%)',
                  opacity: mounted ? 1 : 0,
                  transition: 'opacity 0.4s ease 2.4s',
                  boxShadow: '0 0 8px rgba(245,168,0,0.6)',
                }}
              />
            </div>
            <span
              style={{
                fontFamily: 'var(--font-manrope)',
                fontSize: '11px',
                fontWeight: 700,
                color: 'rgba(255,255,255,0.5)',
                letterSpacing: '0.08em',
              }}
            >
              HOY
            </span>
          </div>
        </div>

        {/* ════ RIGHT — Photo ════ */}
        <div
          style={{
            position: 'relative',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          {/* Photo container — irregular clip */}
          <div
            style={{
              ...revealRight(200),
              position: 'relative',
              width: '100%',
              height: '88vh',
              overflow: 'hidden',
              clipPath: 'polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 8%)',
            }}
          >
            {/* Parallax inner */}
            <div
              style={{
                position: 'absolute',
                inset: '-60px',
                transform: `translateY(${photoParallax}px)`,
                transition: 'transform 0.1s linear',
              }}
            >
              <img
                src="/images/congregacion-hero.jpg"
                alt="Congregación Iglesia La Vid Verdadera"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  filter: 'grayscale(15%) contrast(1.08) brightness(0.88)',
                }}
              />
            </div>

            {/* Cinematic overlays */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to left, transparent 30%, rgba(10,10,15,0.55) 100%)',
                zIndex: 2,
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top, rgba(10,10,15,0.7) 0%, transparent 45%)',
                zIndex: 2,
              }}
            />

            {/* Thin red top border accent */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(to right, #CC2229, transparent)',
                zIndex: 3,
                transform: mounted ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 1.5s cubic-bezier(0.16,1,0.3,1) 800ms',
              }}
            />

            {/* Bottom info badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '36px',
                left: '32px',
                zIndex: 4,
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.9s ease 1000ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) 1000ms',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'rgba(10,10,15,0.75)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '3px',
                  padding: '14px 20px',
                }}
              >
                <div style={{ width: '3px', height: '32px', background: '#CC2229', borderRadius: '99px', flexShrink: 0 }} />
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-manrope)',
                      fontSize: '15px',
                      fontWeight: 800,
                      color: '#fff',
                      lineHeight: 1,
                      marginBottom: '4px',
                    }}
                  >
                    Buritaca, Magdalena
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '11px',
                      fontWeight: 300,
                      color: 'rgba(255,255,255,0.45)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Colombia · Desde 2006
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom fade to light section ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '120px',
          background: 'linear-gradient(to top, #F8F8FA, transparent)',
          zIndex: 5,
          pointerEvents: 'none',
        }}
      />

      {/* ── Scroll indicator ── */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          opacity: mounted ? 0.5 : 0,
          transition: 'opacity 1s ease 1400ms',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-manrope)',
            fontSize: '9px',
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: '1px',
            height: '40px',
            background: 'rgba(255,255,255,0.3)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '40%',
              background: '#F5A800',
              animation: 'scrollDrop 1.8s cubic-bezier(0.4,0,0.2,1) infinite',
            }}
          />
        </div>
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes scrollDrop {
          0%   { transform: translateY(-100%); opacity: 1; }
          80%  { transform: translateY(280%);  opacity: 0.3; }
          100% { transform: translateY(280%);  opacity: 0; }
        }
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            padding: 0 24px !important;
          }
        }
      `}</style>
    </section>
  )
}