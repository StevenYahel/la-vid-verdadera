'use client'

import { useEffect, useRef, useState } from 'react'
import { MapPin, ArrowUpRight, ZoomIn, X } from 'lucide-react'

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.12 }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [ref])
  return visible
}

export default function Ubicacion() {
  const ref = useRef<HTMLElement>(null)
  const visible = useInView(ref)
  const [zoomed, setZoomed] = useState(false)

  useEffect(() => {
    document.body.style.overflow = zoomed ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [zoomed])

  return (
    <>
      {/* Lightbox */}
      {zoomed && (
        <div
          onClick={() => setZoomed(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.95)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '16px',
            animation: 'fade-in 0.25s ease',
          }}
        >
          <button
            onClick={() => setZoomed(false)}
            style={{
              position: 'absolute', top: '16px', right: '16px',
              width: '40px', height: '40px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#fff',
            }}
          >
            <X size={18}/>
          </button>
          <img
            src="/images/buritaca-ubicacion.png"
            alt="Ubicación ampliada"
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '100%', maxHeight: '90vh',
              borderRadius: '16px',
              boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
              objectFit: 'contain',
            }}
          />
        </div>
      )}

      <style>{`@keyframes fade-in { from { opacity:0 } to { opacity:1 } }`}</style>

      <section
        ref={ref}
        className="relative overflow-hidden bg-[#0A0A0F] py-16 sm:py-20 lg:py-32"
      >
        <div aria-hidden className="pointer-events-none absolute -left-40 top-1/3 h-[400px] w-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(204,34,41,0.12) 0%, transparent 68%)' }}/>
        <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(245,168,0,0.08) 0%, transparent 68%)' }}/>

        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">

          {/* Header */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)',
            }}
            className="mb-10 lg:mb-14 max-w-3xl"
          >
            <div className="mb-5 flex items-center gap-3" style={{
              fontFamily: 'var(--font-manrope)', fontSize: '11px',
              fontWeight: 700, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: '#F5A800',
            }}>
              <span className="h-[2px] w-7 rounded-full" style={{ background: '#F5A800' }}/>
              Nuestro lugar
            </div>

            <h2 style={{
              fontFamily: 'var(--font-manrope)',
              fontSize: 'clamp(30px, 6vw, 64px)',
              fontWeight: 800, lineHeight: 1.02,
              letterSpacing: '-0.03em', color: '#FFFFFF',
            }}>
              Una iglesia<br/>
              <span style={{ color: '#CC2229' }}>arraigada en Buritaca.</span>
            </h2>

            <p className="mt-5" style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'clamp(14px, 2vw, 16px)',
              fontWeight: 300, lineHeight: 1.8,
              color: 'rgba(255,255,255,0.55)',
              maxWidth: '520px',
            }}>
              Dios nos ha permitido crecer, servir y compartir el evangelio
              desde este rincón del Magdalena. Este es el lugar que llamamos
              hogar y la comunidad a la que servimos.
            </p>
          </div>

          {/* Image */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0) scale(1)' : 'translateY(45px) scale(0.97)',
              transition: 'opacity 1s ease 150ms, transform 1.2s cubic-bezier(0.16,1,0.3,1) 150ms',
            }}
            className="relative"
          >
            <div
              className="relative overflow-hidden"
              style={{
                borderRadius: 'clamp(16px, 3vw, 36px)',
                background: '#111217',
                boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.08)',
                cursor: 'zoom-in',
              }}
              onClick={() => setZoomed(true)}
            >
              <img
                src="/images/buritaca-ubicacion.png"
                alt="Ubicación de la Iglesia La Vid Verdadera en Buritaca, Magdalena"
                className="block w-full h-auto"
              />
              <div aria-hidden className="pointer-events-none absolute inset-0" style={{
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.04), transparent 30%, rgba(0,0,0,0.08))',
              }}/>

              {/* Zoom hint */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-1.5 rounded-full px-3 py-1.5"
                style={{
                  background: 'rgba(10,10,15,0.75)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}>
                <ZoomIn size={13} style={{ color: '#F5A800' }}/>
                <span style={{
                  fontFamily: 'var(--font-manrope)', fontSize: '10px',
                  fontWeight: 600, color: 'rgba(255,255,255,0.7)',
                }}>Ampliar</span>
              </div>
            </div>

            {/* Floating card */}
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.8s ease 600ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) 600ms',
              }}
              className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8"
            >
              <div className="flex items-center gap-3 rounded-2xl px-3 py-2.5 sm:px-5 sm:py-4"
                style={{
                  background: 'rgba(10,10,15,0.88)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
                }}>
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: 'rgba(204,34,41,0.14)' }}>
                  <MapPin size={16} strokeWidth={1.7} style={{ color: '#CC2229' }}/>
                </div>
                <div>
                  <p style={{
                    fontFamily: 'var(--font-manrope)',
                    fontSize: 'clamp(11px,2.5vw,13px)', fontWeight: 700,
                    color: '#FFFFFF', lineHeight: 1.2,
                  }}>La Vid Verdadera</p>
                  <p className="mt-0.5" style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: 'clamp(10px,2vw,11px)', fontWeight: 400,
                    color: 'rgba(255,255,255,0.48)',
                  }}>Buritaca · Magdalena</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease 750ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) 750ms',
            }}
            className="mt-6 sm:mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {[
                { label: 'Ubicación', value: 'Buritaca, Magdalena' },
                { label: 'Región',    value: 'Costa Caribe · Colombia' },
              ].map(item => (
                <div key={item.label}>
                  <span style={{
                    fontFamily: 'var(--font-manrope)', fontSize: '10px',
                    fontWeight: 700, letterSpacing: '0.12em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
                  }}>{item.label}</span>
                  <p className="mt-1" style={{
                    fontFamily: 'var(--font-inter)', fontSize: '13px',
                    color: 'rgba(255,255,255,0.7)',
                  }}>{item.value}</p>
                </div>
              ))}
            </div>

            <a
              href="https://maps.app.goo.gl/gLBPGUkkvAG5DMz49"
              target="_blank" rel="noopener noreferrer"
              className="group inline-flex w-fit items-center gap-2"
              style={{
                fontFamily: 'var(--font-manrope)', fontSize: '13px',
                fontWeight: 600, color: '#FFFFFF', textDecoration: 'none',
              }}
            >
              Conoce nuestra ubicación
              <span className="flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1"
                style={{ background: 'rgba(255,255,255,0.08)' }}>
                <ArrowUpRight size={15}/>
              </span>
            </a>
          </div>

        </div>
      </section>
    </>
  )
}