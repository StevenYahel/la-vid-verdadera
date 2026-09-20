'use client'

import { useEffect, useRef, useState } from 'react'
import { BookOpen, Sun, Church, Users, Heart, Gift, Baby, MapPin, Mail, ArrowRight, Navigation, Calendar } from 'lucide-react'
import { SITE } from '@/data/site'

const SCHEDULES = [
  { day: 'Lunes',      name: 'Culto de Oración',                    time: '6:00 PM',       duration: '1 hora',           color: '#5B2D8E', icon: BookOpen },
  { day: 'Miércoles',  name: 'Día de Ayuno',                        time: 'Congregacional', duration: 'Todo el día',      color: '#1B4FA0', icon: Sun      },
  { day: 'Jueves',     name: 'Culto Formal',                        time: '7:00 PM',       duration: '1 hora',           color: '#CC2229', icon: Church   },
  { day: 'Domingo',    name: 'Escuela Dominical + Culto Principal',  time: '7:30 AM',       duration: 'Hasta las 9:30 AM', color: '#F5A800', icon: Users   },
]

const PERKS = [
  { icon: Heart,  label: 'Ambiente familiar' },
  { icon: Gift,   label: 'Entrada gratuita'  },
  { icon: Baby,   label: 'Niños bienvenidos' },
  { icon: MapPin, label: 'Fácil ubicación'   },
]

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.08 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref])
  return visible
}

export default function Schedule() {
  const ref = useRef<HTMLElement>(null)
  const visible = useInView(ref)
  const [activeDay, setActiveDay] = useState<string | null>(null)

  const anim = (delay: number) => ({
    opacity:    visible ? 1 : 0,
    transform:  visible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.8s ease ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  })

  return (
    <section
      id="horarios"
      ref={ref}
      className="relative bg-white overflow-hidden py-20 lg:py-28"
    >
      {/* Dot grid */}
      <div aria-hidden className="pointer-events-none absolute right-[45%] top-[5%] opacity-[0.04]" style={{
        width: '200px', height: '200px',
        backgroundImage: 'radial-gradient(circle, #F5A800 1.5px, transparent 1.5px)',
        backgroundSize: '18px 18px',
      }}/>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Header ── */}
        <div style={{ ...anim(0), marginBottom: '48px' }}>
          <p style={{
            fontFamily: 'var(--font-manrope)',
            fontSize: '11px', fontWeight: 700,
            color: '#F5A800', letterSpacing: '0.14em',
            textTransform: 'uppercase', marginBottom: '14px',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <span style={{ width: '20px', height: '2px', background: '#F5A800', borderRadius: '99px', display: 'inline-block' }}/>
            Únete a nosotros
          </p>
          <h2 style={{
            fontFamily: 'var(--font-manrope)',
            fontSize: 'clamp(32px,4vw,50px)',
            fontWeight: 800, color: '#0A0A0F',
            lineHeight: 1.08, letterSpacing: '-0.02em',
            marginBottom: '16px',
          }}>
            Las puertas de La Vid Verdadera<br/>siempre están abiertas.
          </h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '15px', fontWeight: 300, color: '#6B7280', marginBottom: '4px' }}>
            Ven como eres y encuentra una familia que te espera.
          </p>
          <p style={{ fontFamily: 'var(--font-manrope)', fontSize: '15px', fontWeight: 600, color: '#CC2229' }}>
            Te esperamos con los brazos abiertos.
          </p>
        </div>

        {/* ── Two column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* LEFT — schedules + perks + first time */}
          <div>
            {/* Section label */}
            <div style={{
              ...anim(100),
              display: 'flex', alignItems: 'center', gap: '10px',
              marginBottom: '20px',
            }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px',
                background: 'rgba(204,34,41,0.07)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Calendar size={15} style={{ color: '#CC2229' }}/>
              </div>
              <p style={{
                fontFamily: 'var(--font-manrope)',
                fontSize: '10px', fontWeight: 700,
                color: '#9CA3AF', letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}>Reuniones semanales</p>
            </div>

            {/* Schedule rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
              {SCHEDULES.map((s, i) => {
                const Icon = s.icon
                const isActive = activeDay === s.day
                return (
                  <div
                    key={s.day}
                    style={{
                      ...anim(150 + i * 70),
                      display: 'flex', alignItems: 'center', gap: '14px',
                      background: isActive ? `${s.color}08` : '#F8F8FA',
                      border: `1px solid ${isActive ? s.color + '30' : 'rgba(0,0,0,0.05)'}`,
                      borderLeft: `3px solid ${s.color}`,
                      borderRadius: '14px',
                      padding: '16px 18px',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      boxShadow: isActive ? `0 4px 20px ${s.color}15` : '0 1px 4px rgba(0,0,0,0.04)',
                    }}
                    onMouseEnter={() => setActiveDay(s.day)}
                    onMouseLeave={() => setActiveDay(null)}
                  >
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '50%',
                      background: s.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: `0 4px 12px ${s.color}40`,
                    }}>
                      <Icon size={17} color="#fff" strokeWidth={1.8}/>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{
                        fontFamily: 'var(--font-manrope)',
                        fontSize: '15px', fontWeight: 700,
                        color: '#0A0A0F', marginBottom: '2px',
                      }}>{s.day}</p>
                      <p style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize: '12px', fontWeight: 300,
                        color: '#9CA3AF',
                      }}>{s.name}</p>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <p style={{
                        fontFamily: 'var(--font-manrope)',
                        fontSize: '15px', fontWeight: 700,
                        color: s.color, marginBottom: '2px',
                      }}>{s.time}</p>
                      <p style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize: '11px', fontWeight: 300,
                        color: '#9CA3AF',
                      }}>{s.duration}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Perks */}
            <div style={{
              ...anim(450),
              display: 'flex', flexWrap: 'wrap', gap: '20px',
              marginBottom: '28px',
            }}>
              {PERKS.map(({ icon: Icon, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Icon size={14} style={{ color: '#CC2229' }} strokeWidth={1.5}/>
                  <span style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '12px', fontWeight: 400,
                    color: '#6B7280',
                  }}>{label}</span>
                </div>
              ))}
            </div>

            {/* First time card */}
            <div style={{
              ...anim(500),
              background: 'rgba(204,34,41,0.04)',
              border: '1px solid rgba(204,34,41,0.10)',
              borderRadius: '20px',
              padding: '24px',
              display: 'flex', alignItems: 'flex-start', gap: '18px',
            }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '50%',
                background: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 4px 16px rgba(204,34,41,0.12)',
              }}>
                <Heart size={24} style={{ color: '#CC2229' }} fill="#CC2229"/>
              </div>
              <div>
                <h4 style={{
                  fontFamily: 'var(--font-manrope)',
                  fontSize: '16px', fontWeight: 700,
                  color: '#0A0A0F', marginBottom: '8px',
                }}>¿Es tu primera vez?</h4>
                <p style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '13px', fontWeight: 300,
                  color: '#6B7280', lineHeight: 1.65,
                }}>
                  Queremos que te sientas como en casa. Estaremos felices de recibirte
                  y acompañarte durante tu primera visita.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT — map + contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Map */}
            <div style={{
              ...anim(200),
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
              border: '1px solid rgba(0,0,0,0.06)',
              height: '360px',
            }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.0!2d-73.985!3d11.235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef5fa4d5f5f5f5f%3A0x0!2sBuritaca%2C+Magdalena!5e0!3m2!1ses!2sco!4v1234567890"
                width="100%" height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación La Vid Verdadera"
              />
            </div>

            {/* Contact card */}
            <div style={{
              ...anim(300),
              background: '#F8F8FA',
              borderRadius: '20px',
              padding: '24px',
              border: '1px solid rgba(0,0,0,0.05)',
            }}>
              <p style={{
                fontFamily: 'var(--font-manrope)',
                fontSize: '10px', fontWeight: 700,
                color: '#9CA3AF', letterSpacing: '0.14em',
                textTransform: 'uppercase', marginBottom: '16px',
                display: 'flex', alignItems: 'center', gap: '6px',
              }}>
                <MapPin size={12} style={{ color: '#CC2229' }}/>
                ¿Dónde estamos?
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: 'rgba(204,34,41,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <MapPin size={15} style={{ color: '#CC2229' }}/>
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-manrope)', fontSize: '14px', fontWeight: 700, color: '#0A0A0F' }}>
                      Buritaca, Magdalena
                    </p>
                    <p style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', color: '#9CA3AF', fontWeight: 300 }}>
                      Santa Marta, Colombia
                    </p>
                  </div>
                </div>

                {SITE.contact.email && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '10px',
                      background: 'rgba(204,34,41,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Mail size={15} style={{ color: '#CC2229' }}/>
                    </div>
                    <a href={`mailto:${SITE.contact.email}`} style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '13px', color: '#4B5563',
                      textDecoration: 'none', fontWeight: 300,
                    }}>
                      {SITE.contact.email}
                    </a>
                  </div>
                )}
              </div>

              <a
                href={SITE.location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  background: '#CC2229',
                  color: '#fff',
                  fontFamily: 'var(--font-manrope)',
                  fontSize: '14px', fontWeight: 600,
                  padding: '14px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#b01e24' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#CC2229' }}
              >
                <Navigation size={15}/>
                Cómo llegar
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform"/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}