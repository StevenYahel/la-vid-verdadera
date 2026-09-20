'use client'

import { useEffect, useRef, useState } from 'react'

// ── Data ─────────────────────────────────────────────────────────────────────
const TIMELINE = [
  {
    year: '2006',
    label: 'El comienzo',
    title: 'Los primeros pasos',
    text: 'Todo comenzó con un pequeño grupo de creyentes en Buritaca, Magdalena, reunidos con un mismo sueño: ver sus familias y comunidad transformadas por el amor de Cristo.',
    image: '/images/historia-2009.jpg',
    imageAlt: 'Primeros años de la iglesia',
    side: 'left' as const,
  },
  {
    year: '2012',
    label: 'Crecimiento',
    title: 'Crecimiento y consolidación',
    text: 'Dios fue fiel y la iglesia comenzó a crecer. Más familias se unieron a la visión del pastor Juvenal Flórez y juntos construimos nuestra primera casa propia.',
    image: '/images/historia-2012.jpg',
    imageAlt: 'Congregación 2012',
    side: 'right' as const,
  },
  {
    year: '2016',
    label: 'Ministerios',
    title: 'Expansión de ministerios',
    text: 'Nacieron oficialmente los ministerios de Jóvenes, Niños, Damas, Caballeros y Música. Nuestra visión comenzó a alcanzar más personas dentro y fuera de Buritaca.',
    image: '/images/historia-2016.jpg',
    imageAlt: 'Ministerios 2016',
    side: 'left' as const,
  },
  {
    year: '2020',
    label: 'Fe',
    title: 'Fe en tiempos difíciles',
    text: 'La pandemia fue un reto enorme, pero la iglesia permaneció unida. El mensaje del evangelio llegó a más hogares que nunca.',
    image: '/images/historia-2020.jpg',
    imageAlt: 'Fe durante la pandemia',
    side: 'right' as const,
  },
  {
    year: 'HOY',
    label: 'Presente',
    title: 'Más de 15 años de fidelidad',
    text: 'Hoy somos una familia de más de 500 personas comprometidas con Dios y su comunidad. Seguimos creciendo, sirviendo y creyendo que lo mejor está por venir.',
    image: '/images/historia-hoy.jpg',
    imageAlt: 'Congregación hoy',
    side: 'left' as const,
  },
]

// ── Hooks ────────────────────────────────────────────────────────────────────
function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const calc = () => {
      const rect = el.getBoundingClientRect()
      const winH = window.innerHeight
      const p = 1 - rect.bottom / (winH + rect.height)
      setProgress(Math.min(1, Math.max(0, p)))
    }
    window.addEventListener('scroll', calc, { passive: true })
    calc()
    return () => window.removeEventListener('scroll', calc)
  }, [ref])
  return progress
}

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

// ── Sub-components ───────────────────────────────────────────────────────────

function ImageCard({
  item,
  corner,
  visible,
  delay,
}: {
  item: (typeof TIMELINE)[0]
  corner: 'left' | 'right'
  visible: boolean
  delay: number
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        maxWidth: '340px',
        aspectRatio: '4/3',
        borderRadius: '4px',
        overflow: 'hidden',
        background: '#111',
        position: 'relative',
        boxShadow: hovered
          ? '0 24px 64px rgba(0,0,0,0.28), 0 0 0 1px rgba(245,168,0,0.4)'
          : '0 8px 32px rgba(0,0,0,0.16), 0 0 0 1px rgba(245,168,0,0.2)',
        transition: 'box-shadow 0.5s ease',
        // Entrance
        opacity: visible ? 1 : 0,
        transform: visible
          ? 'translateY(0) scale(1)'
          : `translateY(28px) scale(0.97)`,
        transitionProperty: 'opacity, transform, box-shadow',
        transitionDuration: `0.9s, 0.9s, 0.5s`,
        transitionTimingFunction: `cubic-bezier(0.16,1,0.3,1), cubic-bezier(0.16,1,0.3,1), ease`,
        transitionDelay: `${delay}ms, ${delay}ms, 0ms`,
      }}
    >
      {/* Photo with zoom on hover */}
      <div style={{
        position: 'absolute',
        inset: 0,
        transform: hovered ? 'scale(1.05)' : 'scale(1)',
        transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <img
          src={item.image}
          alt={item.imageAlt}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            filter: hovered
              ? 'grayscale(0%) contrast(1.08) brightness(0.92)'
              : 'grayscale(20%) contrast(1.05) brightness(0.85)',
            transition: 'filter 0.8s ease',
          }}
        />
      </div>

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)',
        zIndex: 1,
      }}/>

      {/* Gold shimmer on hover */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'linear-gradient(135deg, rgba(245,168,0,0.08) 0%, transparent 60%)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}/>

      {/* Year watermark */}
      <div style={{
        position: 'absolute', bottom: '14px', left: '16px', zIndex: 3,
        fontFamily: 'var(--font-manrope)',
        fontSize: '11px', fontWeight: 800,
        color: 'rgba(255,255,255,0.5)',
        letterSpacing: '0.1em',
      }}>
        {item.year}
      </div>

      {/* Gold corner bracket */}
      <div style={{
        position: 'absolute',
        ...(corner === 'right'
          ? { bottom: '-1px', right: '-1px', borderTop: '3px solid #F5A800', borderLeft: '3px solid #F5A800', transform: 'rotate(180deg)' }
          : { bottom: '-1px', left: '-1px', borderTop: '3px solid #F5A800', borderRight: '3px solid #F5A800', transform: 'rotate(180deg)' }),
        width: '28px', height: '28px',
        zIndex: 3,
        opacity: visible ? 1 : 0,
        transition: `opacity 0.6s ease ${delay + 300}ms`,
      }}/>
    </div>
  )
}

function TextCard({
  item,
  align,
  visible,
  delay,
}: {
  item: (typeof TIMELINE)[0]
  align: 'left' | 'right'
  visible: boolean
  delay: number
}) {
  return (
    <div style={{ maxWidth: '300px', textAlign: align }}>
      {/* Label */}
      <p style={{
        fontFamily: 'var(--font-manrope)',
        fontSize: '10px', fontWeight: 700,
        color: '#CC2229', letterSpacing: '0.18em',
        textTransform: 'uppercase', marginBottom: '10px',
        // Clip reveal
        clipPath: visible ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
        transition: `clip-path 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}>
        {item.year === 'HOY' ? 'Nuestro presente' : item.year}
      </p>

      {/* Title */}
      <h3 style={{
        fontFamily: 'var(--font-manrope)',
        fontSize: 'clamp(18px, 2vw, 24px)', fontWeight: 800,
        color: '#CC2229', lineHeight: 1.15, marginBottom: '14px',
        letterSpacing: '-0.015em',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(14px)',
        transition: `opacity 0.8s ease ${delay + 80}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay + 80}ms`,
      }}>
        {item.title}
      </h3>

      {/* Gold bar */}
      <div style={{
        width: visible ? '28px' : '0px', height: '2px',
        background: '#F5A800', borderRadius: '99px', marginBottom: '14px',
        marginLeft: align === 'right' ? 'auto' : '0',
        transition: `width 0.7s cubic-bezier(0.16,1,0.3,1) ${delay + 160}ms`,
      }}/>

      {/* Body */}
      <p style={{
        fontFamily: 'var(--font-inter)',
        fontSize: '14px', fontWeight: 300,
        color: '#5a5a6a', lineHeight: 1.8,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(10px)',
        transition: `opacity 0.8s ease ${delay + 220}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay + 220}ms`,
      }}>
        {item.text}
      </p>
    </div>
  )
}

function TimelineDot({
  item,
  index,
  progress,
}: {
  item: (typeof TIMELINE)[0]
  index: number
  progress: number
}) {
  const threshold = (index / TIMELINE.length) * 0.85
  const isLit = progress >= threshold
  const isActive = progress >= threshold + 0.05

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', gap: '8px',
      position: 'relative', zIndex: 2,
    }}>
      {/* Outer pulse ring */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Pulse 1 */}
        <div style={{
          position: 'absolute',
          width: '44px', height: '44px',
          borderRadius: '50%',
          background: 'rgba(204,34,41,0.12)',
          opacity: isActive ? 1 : 0,
          animation: isActive ? 'pulse1 2.4s ease-out infinite' : 'none',
          transition: 'opacity 0.6s ease',
        }}/>
        {/* Pulse 2 — offset */}
        <div style={{
          position: 'absolute',
          width: '36px', height: '36px',
          borderRadius: '50%',
          background: 'rgba(204,34,41,0.1)',
          opacity: isActive ? 1 : 0,
          animation: isActive ? 'pulse1 2.4s ease-out infinite 0.6s' : 'none',
          transition: 'opacity 0.6s ease',
        }}/>

        {/* Dot itself */}
        <div style={{
          width: '22px', height: '22px', borderRadius: '50%',
          background: isLit ? '#CC2229' : '#F8F8FA',
          border: `3px solid ${isLit ? '#CC2229' : '#D1D5DB'}`,
          boxShadow: isLit
            ? '0 0 0 4px rgba(204,34,41,0.15), 0 0 20px rgba(204,34,41,0.5)'
            : 'none',
          transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)',
          position: 'relative', zIndex: 2,
        }}/>
      </div>

      {/* Year label */}
      <span style={{
        fontFamily: 'var(--font-manrope)',
        fontSize: item.year === 'HOY' ? '13px' : '12px',
        fontWeight: 800,
        color: isLit ? '#CC2229' : '#B0B0BC',
        letterSpacing: item.year === 'HOY' ? '0.06em' : '-0.01em',
        transition: 'color 0.6s ease',
      }}>
        {item.year}
      </span>
    </div>
  )
}

function DesktopItem({
  item,
  index,
  progress,
}: {
  item: (typeof TIMELINE)[0]
  index: number
  progress: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref as React.RefObject<HTMLElement>, 0.08)
  const isLeft = item.side === 'left'
  const baseDelay = index * 80

  return (
    <div
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 80px 1fr',
        alignItems: 'center',
        minHeight: '320px',
        position: 'relative',
      }}
    >
      {/* LEFT COLUMN */}
      <div style={{
        padding: '0 52px 0 0',
        display: 'flex', flexDirection: 'column',
        alignItems: isLeft ? 'flex-end' : 'flex-start',
      }}>
        {isLeft
          ? <ImageCard item={item} corner="right" visible={visible} delay={baseDelay} />
          : <TextCard item={item} align="right" visible={visible} delay={baseDelay} />
        }
      </div>

      {/* CENTER */}
      <TimelineDot item={item} index={index} progress={progress} />

      {/* RIGHT COLUMN */}
      <div style={{
        padding: '0 0 0 52px',
        display: 'flex', flexDirection: 'column',
        alignItems: isLeft ? 'flex-start' : 'flex-end',
      }}>
        {isLeft
          ? <TextCard item={item} align="left" visible={visible} delay={baseDelay + 80} />
          : <ImageCard item={item} corner="left" visible={visible} delay={baseDelay + 80} />
        }
      </div>
    </div>
  )
}

function MobileItem({
  item,
  index,
  isLit,
}: {
  item: (typeof TIMELINE)[0]
  index: number
  isLit: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref as React.RefObject<HTMLElement>, 0.06)

  return (
    <div ref={ref} style={{
      display: 'flex', gap: '20px', paddingBottom: '44px',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.85s ease ${index * 70}ms, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${index * 70}ms`,
    }}>
      {/* Left: dot + line */}
      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', paddingTop: '2px' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {isLit && (
            <div style={{
              position: 'absolute', width: '30px', height: '30px', borderRadius: '50%',
              background: 'rgba(204,34,41,0.12)',
              animation: 'pulse1 2.2s ease-out infinite',
            }}/>
          )}
          <div style={{
            width: '18px', height: '18px', borderRadius: '50%',
            background: isLit ? '#CC2229' : '#F8F8FA',
            border: `3px solid ${isLit ? '#CC2229' : '#D1D5DB'}`,
            boxShadow: isLit ? '0 0 14px rgba(204,34,41,0.5)' : 'none',
            transition: 'all 0.6s ease',
            position: 'relative', zIndex: 1,
          }}/>
        </div>
        <span style={{
          fontFamily: 'var(--font-manrope)', fontSize: '10px', fontWeight: 800,
          color: isLit ? '#CC2229' : '#B0B0BC',
          transition: 'color 0.5s ease',
        }}>{item.year}</span>
      </div>

      {/* Right: content */}
      <div style={{ flex: 1 }}>
        <p style={{
          fontFamily: 'var(--font-manrope)', fontSize: '10px', fontWeight: 700,
          color: '#CC2229', letterSpacing: '0.14em',
          textTransform: 'uppercase', marginBottom: '10px',
        }}>{item.label}</p>

        {/* Photo */}
        <div style={{
          width: '100%', aspectRatio: '16/9',
          borderRadius: '10px', overflow: 'hidden',
          background: '#111', marginBottom: '14px',
          border: '1px solid rgba(245,168,0,0.2)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.14)',
        }}>
          <img src={item.image} alt={item.imageAlt} style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            filter: 'grayscale(15%) contrast(1.05)',
          }}/>
        </div>

        <h3 style={{
          fontFamily: 'var(--font-manrope)', fontSize: '18px', fontWeight: 800,
          color: '#CC2229', marginBottom: '10px', lineHeight: 1.2,
        }}>{item.title}</h3>
        <div style={{ width: '24px', height: '2px', background: '#F5A800', borderRadius: '99px', marginBottom: '10px' }}/>
        <p style={{
          fontFamily: 'var(--font-inter)', fontSize: '14px',
          fontWeight: 300, color: '#5a5a6a', lineHeight: 1.78,
        }}>{item.text}</p>
      </div>
    </div>
  )
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function Historia() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const headerVisible = useInView(headerRef as React.RefObject<HTMLElement>, 0.15)
  const progress = useScrollProgress(sectionRef)

  const lineH = `${Math.min(100, progress * 140)}%`

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#F8F8FA',
        paddingTop: '96px',
        paddingBottom: '100px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Ambient glow that moves with scroll */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: `${10 + progress * 60}%`,
        transform: 'translateX(-50%)',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(204,34,41,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
        transition: 'top 0.3s ease',
        zIndex: 0,
      }}/>

      <style>{`
        @keyframes pulse1 {
          0%   { transform: scale(0.8); opacity: 0.9; }
          70%  { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes lineGlow {
          0%, 100% { box-shadow: 0 0 8px rgba(204,34,41,0.5), 0 0 20px rgba(204,34,41,0.25); }
          50%       { box-shadow: 0 0 14px rgba(204,34,41,0.8), 0 0 36px rgba(204,34,41,0.4); }
        }
        @keyframes headerFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-4px); }
        }
        @media (max-width: 767px) {
          .historia-desktop { display: none !important; }
        }
        @media (min-width: 768px) {
          .historia-mobile  { display: none !important; }
        }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* ── Header ── */}
        <div ref={headerRef} style={{
          textAlign: 'center', marginBottom: '88px',
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)',
          animation: headerVisible ? 'headerFloat 6s ease-in-out infinite 1s' : 'none',
        }}>
          {/* Eyebrow with lines */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '18px' }}>
            <div style={{
              height: '1px', width: headerVisible ? '36px' : '0px',
              background: '#CC2229', opacity: 0.5,
              transition: 'width 1s cubic-bezier(0.16,1,0.3,1) 200ms',
            }}/>
            <p style={{
              fontFamily: 'var(--font-manrope)', fontSize: '10px', fontWeight: 700,
              color: '#CC2229', letterSpacing: '0.2em', textTransform: 'uppercase',
            }}>Nuestra Historia</p>
            <div style={{
              height: '1px', width: headerVisible ? '36px' : '0px',
              background: '#CC2229', opacity: 0.5,
              transition: 'width 1s cubic-bezier(0.16,1,0.3,1) 200ms',
            }}/>
          </div>

          <div style={{ overflow: 'hidden' }}>
            <h2 style={{
              fontFamily: 'var(--font-manrope)',
              fontSize: 'clamp(36px, 5vw, 62px)', fontWeight: 800,
              color: '#0A0A0F', lineHeight: 1.04, letterSpacing: '-0.026em',
              transform: headerVisible ? 'translateY(0)' : 'translateY(100%)',
              transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1) 100ms',
            }}>El camino recorrido</h2>
          </div>

          {/* Animated gold underline — expands from center */}
          <div style={{
            height: '3px',
            background: 'linear-gradient(to right, transparent, #F5A800, transparent)',
            borderRadius: '99px', margin: '20px auto 0',
            width: headerVisible ? '100px' : '0px',
            transition: 'width 1.1s cubic-bezier(0.16,1,0.3,1) 400ms',
          }}/>
        </div>

        {/* ── DESKTOP ── */}
        <div className="historia-desktop" style={{ position: 'relative' }}>
          {/* Track */}
          <div style={{
            position: 'absolute', left: '50%', top: 0, bottom: 0,
            width: '2px', background: '#E5E7EB',
            transform: 'translateX(-50%)', borderRadius: '99px', zIndex: 0,
          }}/>
          {/* Glowing fill — grows with scroll */}
          <div style={{
            position: 'absolute', left: '50%', top: 0,
            width: '2px', height: lineH,
            background: 'linear-gradient(to bottom, #CC2229 0%, #F5A800 100%)',
            transform: 'translateX(-50%)', borderRadius: '99px', zIndex: 1,
            animation: 'lineGlow 2.5s ease-in-out infinite',
            transition: 'height 0.15s linear',
          }}/>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {TIMELINE.map((item, i) => (
              <DesktopItem key={item.year} item={item} index={i} progress={progress} />
            ))}
          </div>
        </div>

        {/* ── MOBILE ── */}
        <div className="historia-mobile" style={{ position: 'relative' }}>
          {/* Track */}
          <div style={{
            position: 'absolute', left: '8px', top: 0, bottom: 0,
            width: '2px', background: '#E5E7EB', borderRadius: '99px',
          }}/>
          {/* Fill */}
          <div style={{
            position: 'absolute', left: '8px', top: 0,
            width: '2px', height: lineH,
            background: 'linear-gradient(to bottom, #CC2229, #F5A800)',
            borderRadius: '99px',
            boxShadow: '0 0 10px rgba(204,34,41,0.55)',
            transition: 'height 0.15s linear',
          }}/>

          <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '8px' }}>
            {TIMELINE.map((item, i) => (
              <MobileItem
                key={item.year}
                item={item}
                index={i}
                isLit={progress >= (i / TIMELINE.length) * 0.85}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}