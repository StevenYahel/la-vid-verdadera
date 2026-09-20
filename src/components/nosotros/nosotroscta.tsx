'use client'

import { useEffect, useRef, useState } from 'react'

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.1) {
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

export default function NosotrosCTA() {
  const ref = useRef<HTMLElement>(null)
  const visible = useInView(ref, 0.08)
  const [scrollY, setScrollY] = useState(0)
  const [btnHovered, setBtnHovered] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Parallax ref offset
  const sectionTop = ref.current?.offsetTop ?? 0
  const parallax = (scrollY - sectionTop) * 0.2

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        minHeight: '92vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0A0A0F',
      }}
    >
      {/* ── Background photo with parallax ── */}
      <div
        style={{
          position: 'absolute',
          inset: '-80px',
          transform: `translateY(${parallax}px)`,
          transition: 'transform 0.1s linear',
          zIndex: 0,
        }}
      >
        <img
          src="/images/congregacion-cierre.jpg"
          alt="Congregación La Vid Verdadera"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            filter: 'grayscale(20%) contrast(1.05) brightness(0.75)',
            // Scale in on mount
            transform: visible ? 'scale(1)' : 'scale(1.06)',
            transition: 'transform 1.8s cubic-bezier(0.16,1,0.3,1)',
          }}
        />
      </div>

      {/* ── Layered overlays ── */}
      {/* Dark base */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'rgba(10,10,15,0.58)',
      }}/>
      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(10,10,15,0.75) 100%)',
      }}/>
      {/* Bottom fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3,
        height: '180px',
        background: 'linear-gradient(to top, #0A0A0F 0%, transparent 100%)',
      }}/>
      {/* Top fade */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 3,
        height: '120px',
        background: 'linear-gradient(to bottom, #0A0A0F 0%, transparent 100%)',
      }}/>

      {/* ── Animated grain ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 4,
        opacity: 0.03,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '180px 180px',
        pointerEvents: 'none',
      }}/>

      {/* ── Content ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '0 32px',
          maxWidth: '860px',
          margin: '0 auto',
        }}
      >
        {/* Eyebrow line — draws from center */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          marginBottom: '36px',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.8s ease 100ms',
        }}>
          <div style={{
            height: '1px',
            width: visible ? '48px' : '0px',
            background: 'rgba(255,255,255,0.25)',
            transition: 'width 1s cubic-bezier(0.16,1,0.3,1) 300ms',
          }}/>
          <span style={{
            fontFamily: 'var(--font-manrope)',
            fontSize: '10px',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
          }}>
            Únete a la historia
          </span>
          <div style={{
            height: '1px',
            width: visible ? '48px' : '0px',
            background: 'rgba(255,255,255,0.25)',
            transition: 'width 1s cubic-bezier(0.16,1,0.3,1) 300ms',
          }}/>
        </div>

        {/* Main headline — line by line reveal */}
        <h2
          style={{
            fontFamily: 'var(--font-manrope)',
            fontSize: 'clamp(44px, 7vw, 88px)',
            fontWeight: 800,
            color: '#fff',
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            marginBottom: '28px',
          }}
        >
          <span style={{ display: 'block', overflow: 'hidden' }}>
            <span style={{
              display: 'block',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(100%)',
              transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1) 200ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) 200ms',
            }}>
              La historia
            </span>
          </span>
          <span style={{ display: 'block', overflow: 'hidden' }}>
            <span style={{
              display: 'block',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(100%)',
              transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1) 340ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) 340ms',
              // Italic for emphasis like mockup
              fontStyle: 'italic',
              color: '#fff',
            }}>
              continúa.
            </span>
          </span>
        </h2>

        {/* Subtext */}
        <p style={{
          fontFamily: 'var(--font-inter)',
          fontSize: 'clamp(15px, 1.8vw, 18px)',
          fontWeight: 300,
          color: 'rgba(255,255,255,0.55)',
          lineHeight: 1.75,
          maxWidth: '480px',
          margin: '0 auto 44px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1) 480ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) 480ms',
        }}>
          Y queremos que seas parte de ella.
        </p>

        {/* CTA Button */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.96)',
          transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1) 580ms, transform 0.9s cubic-bezier(0.34,1.56,0.64,1) 580ms',
        }}>
          <a
            href="/#contacto"
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: btnHovered ? '#B51E25' : '#CC2229',
              color: '#fff',
              fontFamily: 'var(--font-manrope)',
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              padding: '16px 36px',
              borderRadius: '3px',
              textDecoration: 'none',
              transition: 'background 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease',
              boxShadow: btnHovered
                ? '0 16px 48px rgba(204,34,41,0.45)'
                : '0 4px 20px rgba(204,34,41,0.25)',
              transform: btnHovered ? 'translateY(-2px)' : 'translateY(0)',
            }}
          >
            Ven a conocernos
            {/* Animated arrow */}
            <span style={{
              display: 'inline-block',
              transform: btnHovered ? 'translateX(5px)' : 'translateX(0)',
              transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
              fontSize: '16px',
            }}>
              →
            </span>
          </a>
        </div>

        {/* Bottom signature */}
        <div style={{
          marginTop: '64px',
          opacity: visible ? 1 : 0,
          transition: 'opacity 1.2s ease 800ms',
        }}>
          <div style={{
            width: visible ? '32px' : '0px',
            height: '1px',
            background: 'rgba(245,168,0,0.45)',
            margin: '0 auto 14px',
            transition: 'width 1s cubic-bezier(0.16,1,0.3,1) 900ms',
          }}/>
          <p style={{
            fontFamily: 'var(--font-manrope)',
            fontSize: '9px',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.2)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
          }}>
            Iglesia Cuadrangular La Vid Verdadera
          </p>
          <p style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '10px',
            color: 'rgba(255,255,255,0.15)',
            marginTop: '4px',
          }}>
            Buritaca · Magdalena · Colombia
          </p>
        </div>
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @media (max-width: 640px) {
          section h2 {
            font-size: clamp(40px, 12vw, 64px) !important;
          }
        }
      `}</style>
    </section>
  )
}