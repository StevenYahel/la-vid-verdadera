'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Star,
  Zap,
  Heart,
  Circle,
  Music2,
  ArrowRight,
} from 'lucide-react'

const MINISTRIES = [
  {
    id: 'ninos',
    name: 'Niños',
    tagline: 'Semillitas de fe',
    description:
      'Formamos a la próxima generación en el amor de Jesús.',
    image: '/images/ministerio-ninos.jpg',
    icon: Star,
    color: '#F5A800',
  },
  {
    id: 'jovenes',
    name: 'Jóvenes',
    tagline: 'Generación de impacto',
    description:
      'Conectamos jóvenes con propósito y una fe que transforma su presente y su futuro.',
    image: '/images/ministerio-jovenes.jpg',
    icon: Zap,
    color: '#5B2D8E',
  },
  {
    id: 'damas',
    name: 'Damas',
    tagline: 'Mujeres de fe',
    description:
      'Creamos espacios para que las mujeres crezcan y sean fortalecidas.',
    image: '/images/ministerio-damas.jpg',
    icon: Heart,
    color: '#CC2229',
  },
  {
    id: 'caballeros',
    name: 'Caballeros',
    tagline: 'Hombres de Dios',
    description:
      'Desarrollamos hombres íntegros que lideran con sabiduría.',
    image: '/images/ministerio-caballeros.jpg',
    icon: Circle,
    color: '#1B4FA0',
  },
  {
    id: 'musica',
    name: 'Música',
    tagline: 'Alabanza y adoración',
    description:
      'Llevamos a la congregación a la presencia de Dios con cada nota y cada canto.',
    image: '/images/ministerio-musica.jpg',
    icon: Music2,
    color: '#0F6E56',
  },
]

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])

  return visible
}

export default function Ministries() {
  const sectionRef = useRef<HTMLElement>(null)
  const visible = useInView(sectionRef)

  return (
    <section
      id="ministerios"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F8F8FA] py-20 lg:py-28"
    >
      {/* DECORACIÓN */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[7%] top-[5%] hidden lg:block"
        style={{
          width: '170px', height: '170px', opacity: 0.055,
          backgroundImage: 'radial-gradient(circle, #CC2229 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[14%] top-[2%] hidden lg:block"
        style={{
          width: '280px', height: '280px',
          borderRadius: '50%',
          border: '1px solid rgba(245,168,0,0.18)',
        }}
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">

        {/* HEADER */}
        <div
          className="mb-12 flex flex-col gap-7 sm:mb-14 sm:flex-row sm:items-end sm:justify-between"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.8s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <div>
            <p style={{
              fontFamily: 'var(--font-manrope)',
              fontSize: '11px', fontWeight: 700,
              color: '#CC2229', letterSpacing: '0.16em',
              textTransform: 'uppercase', marginBottom: '13px',
            }}>
              Ministerios
            </p>
            <h2 style={{
              fontFamily: 'var(--font-manrope)',
              fontSize: 'clamp(32px, 5vw, 54px)',
              fontWeight: 800, color: '#0A0A0F',
              lineHeight: 1.04, letterSpacing: '-0.035em',
            }}>
              Hay un lugar para ti<br />
              y tu{' '}
              <em style={{ color: '#CC2229', fontStyle: 'italic' }}>familia</em>
            </h2>
            <div style={{
              width: '42px', height: '3px',
              background: '#F5A800', borderRadius: '999px', marginTop: '17px',
            }} />
          </div>

          <a
            href="/ministerios"
            className="group inline-flex w-fit items-center gap-2 rounded-full"
            style={{
              fontFamily: 'var(--font-manrope)',
              fontSize: '13px', fontWeight: 600,
              color: '#CC2229',
              border: '1px solid rgba(204,34,41,0.55)',
              padding: '11px 20px', textDecoration: 'none',
              transition: 'background 0.3s ease, color 0.3s ease, transform 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#CC2229'
              e.currentTarget.style.color = '#fff'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#CC2229'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Ver todos
            <ArrowRight size={14} strokeWidth={1.8} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {MINISTRIES.map((ministry, index) => {
            const Icon = ministry.icon
            return (
              <article
                key={ministry.id}
                className="group relative overflow-hidden rounded-[22px] bg-white"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(32px)',
                  transition: `
                    opacity 0.75s ease ${120 + index * 90}ms,
                    transform 0.85s cubic-bezier(0.16,1,0.3,1) ${120 + index * 90}ms,
                    box-shadow 0.35s ease
                  `,
                  boxShadow: '0 8px 30px rgba(0,0,0,0.07)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-7px)'
                  e.currentTarget.style.boxShadow = '0 18px 45px rgba(0,0,0,0.13)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = visible ? 'translateY(0)' : 'translateY(32px)'
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.07)'
                }}
              >
                {/* IMAGE */}
                <div className="relative h-[300px] overflow-hidden lg:h-[340px]">
                  <img
                    src={ministry.image}
                    alt={ministry.name}
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.42) 45%, rgba(0,0,0,0.04) 100%)' }}
                  />

                  {/* ICON */}
                  <div
                    className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full"
                    style={{
                      background: ministry.color,
                      boxShadow: `0 7px 20px ${ministry.color}55`,
                      transition: 'transform 0.35s ease',
                    }}
                  >
                    <Icon size={17} color="#fff" strokeWidth={2} />
                  </div>

                  {/* TEXT OVER IMAGE */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 style={{
                      fontFamily: 'var(--font-manrope)',
                      fontSize: '21px', fontWeight: 800,
                      color: '#fff', lineHeight: 1, marginBottom: '9px',
                    }}>
                      {ministry.name}
                    </h3>
                    <div
                      style={{
                        width: '25px', height: '2px',
                        background: '#F5A800', borderRadius: '999px',
                        marginBottom: '8px', transition: 'width 0.35s ease',
                      }}
                      className="group-hover:w-10"
                    />
                    <p style={{
                      fontFamily: 'var(--font-manrope)',
                      fontSize: '9px', fontWeight: 700,
                      color: 'rgba(255,255,255,0.68)',
                      letterSpacing: '0.13em', textTransform: 'uppercase',
                    }}>
                      {ministry.tagline}
                    </p>
                  </div>
                </div>

                {/* DESCRIPTION */}
                <div
                  className="relative flex min-h-[172px] flex-col justify-between p-5"
                  style={{ borderTop: `3px solid ${ministry.color}` }}
                >
                  <p style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '13px', fontWeight: 300,
                    color: '#596273', lineHeight: 1.7,
                  }}>
                    {ministry.description}
                  </p>

                  {/* ✅ Link corregido: va a /ministerios#id */}
                  <a
                    href={`/ministerios#${ministry.id}`}
                    className="group/link mt-5 inline-flex w-fit items-center gap-1.5"
                    style={{
                      fontFamily: 'var(--font-manrope)',
                      fontSize: '12px', fontWeight: 700,
                      color: ministry.color, textDecoration: 'none',
                    }}
                  >
                    Conoce más
                    <ArrowRight
                      size={13}
                      strokeWidth={2}
                      className="transition-transform duration-300 group-hover/link:translate-x-1"
                    />
                  </a>
                </div>

                {/* BLACK BASE */}
                <div style={{ height: '8px', background: '#111114' }} />
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}