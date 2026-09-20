'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, MapPin, Mail, Navigation, Heart, Share2, Camera, BookOpen, Sun, Church, Users2 } from 'lucide-react'
import { NAV_LINKS, SITE } from '@/data/site'

const SCHEDULES = [
  { day: 'Lunes',     time: '6:00 PM',        name: 'Culto de Oración',                    color: '#5B2D8E', Icon: BookOpen },
  { day: 'Miércoles', time: 'Congregacional',  name: 'Día de Ayuno',                        color: '#1B4FA0', Icon: Sun     },
  { day: 'Jueves',    time: '7:00 PM',         name: 'Culto Formal',                        color: '#CC2229', Icon: Church  },
  { day: 'Domingo',   time: '7:30 AM',         name: 'Escuela Dominical + Culto Principal', color: '#F5A800', Icon: Users2  },
]

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.05 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref])
  return visible
}

export default function Footer() {
  const ref = useRef<HTMLElement>(null)
  const visible = useInView(ref)
  const year = new Date().getFullYear()

  const anim = (delay: number) => ({
    opacity:    visible ? 1 : 0,
    transform:  visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.8s ease ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  })

  return (
    <>
      <style>{`
        @keyframes pulse-icon {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.1); }
        }
      `}</style>

      <footer ref={ref} className="relative overflow-hidden" style={{ background: '#0F1120' }}>

        <div className="absolute inset-0" style={{
          backgroundImage: 'url(/images/footer-bg.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1,
        }}/>
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, rgba(15,17,32,0.97) 0%, rgba(15,17,32,0.88) 60%, rgba(15,17,32,0.94) 100%)',
        }}/>
        <div className="absolute bottom-0 right-0 pointer-events-none" style={{
          width: '500px', height: '400px',
          background: 'radial-gradient(ellipse at bottom right, rgba(204,34,41,0.12) 0%, transparent 65%)',
        }}/>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-8">

          {/* ── Main 4-col grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12" style={anim(0)}>

            {/* Brand — logo real */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <img
                  src="/images/logo.png"
                  alt="La Vid Verdadera"
                  style={{ height: '70px', width: 'auto', objectFit: 'contain', flexShrink: 0 }}
                />
                <div>
                  <p className="font-bold text-white text-base leading-none mb-1" style={{ fontFamily: 'var(--font-manrope)' }}>
                     Iglesia Cuadrangular
                  </p>
                  <p className="text-[9px] font-semibold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-manrope)' }}>
                   La Vid Verdadera
                  </p>
                </div>
              </div>

              <p className="text-[13px] font-light leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-inter)' }}>
                {SITE.description}
              </p>

              <div className="h-px mb-5" style={{ background: 'rgba(255,255,255,0.06)' }}/>

              <p className="text-[9px] font-bold tracking-widest uppercase mb-3" style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-manrope)' }}>
                Síguenos
              </p>
              <div className="flex gap-2.5">
                {[
                  { Icon: Share2, href: SITE.contact.facebook  || '#', label: 'Facebook'  },
                  { Icon: Camera, href: SITE.contact.instagram || '#', label: 'Instagram' },
                ].map(({ Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                    style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.4)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; e.currentTarget.style.background = 'transparent' }}
                  >
                    <Icon size={14}/>
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-white mb-1.5" style={{ fontFamily: 'var(--font-manrope)' }}>
                Navegación
              </p>
              <div className="w-7 h-0.5 rounded-full mb-5" style={{ background: '#CC2229' }}/>
              <nav className="flex flex-col">
                {NAV_LINKS.map(link => (
                  <a key={link.href} href={link.href}
                    className="flex items-center justify-between py-2.5 text-sm transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-inter)', fontWeight: 400, color: 'rgba(255,255,255,0.5)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#fff' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
                  >
                    {link.label}
                    <ArrowRight size={13} style={{ opacity: 0.3 }}/>
                  </a>
                ))}
              </nav>
            </div>

            {/* Schedules */}
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-white mb-1.5" style={{ fontFamily: 'var(--font-manrope)' }}>
                Horarios
              </p>
              <div className="w-7 h-0.5 rounded-full mb-5" style={{ background: '#CC2229' }}/>
              <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                {SCHEDULES.map((s, i) => (
                  <div key={s.day} className="flex items-center gap-3 px-4 py-3.5"
                    style={{ borderBottom: i < SCHEDULES.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: s.color, animation: 'pulse-icon 3s ease-in-out infinite', animationDelay: `${i * 0.4}s` }}>
                      <s.Icon size={14} color="#fff" strokeWidth={1.8}/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-white leading-none mb-0.5" style={{ fontFamily: 'var(--font-manrope)' }}>
                        {s.day}
                      </p>
                      <p className="text-[10px] font-light truncate" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-inter)' }}>
                        {s.name}
                      </p>
                    </div>
                    <p className="text-[12px] font-bold flex-shrink-0" style={{ color: s.color, fontFamily: 'var(--font-manrope)' }}>
                      {s.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Verse */}
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-white mb-1.5" style={{ fontFamily: 'var(--font-manrope)' }}>
                Versículo
              </p>
              <div className="w-7 h-0.5 rounded-full mb-5" style={{ background: '#CC2229' }}/>
              <div className="text-4xl leading-none mb-3" style={{ color: '#CC2229', fontFamily: 'Georgia, serif' }}>❝</div>
              <blockquote className="mb-5">
                <p className="text-[15px] font-medium italic leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-manrope)' }}>
                  {SITE.verse.text}
                </p>
              </blockquote>
              <cite className="text-[12px] font-bold not-italic" style={{ color: '#CC2229', fontFamily: 'var(--font-manrope)' }}>
                — {SITE.verse.ref}
              </cite>
            </div>
          </div>

          {/* ── Contact bar ── */}
          <div className="rounded-2xl overflow-hidden mb-8"
            style={{ ...anim(300), background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-3.5 p-5 border-b sm:border-b-0 sm:border-r lg:border-r" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(204,34,41,0.15)' }}>
                  <MapPin size={16} style={{ color: '#CC2229' }}/>
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-white" style={{ fontFamily: 'var(--font-manrope)' }}>Buritaca, Magdalena</p>
                  <p className="text-[11px] font-light" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-inter)' }}>Santa Marta, Colombia</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-5 border-b lg:border-b-0 lg:border-r" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(204,34,41,0.15)' }}>
                  <Mail size={16} style={{ color: '#CC2229' }}/>
                </div>
                <a href={`mailto:${SITE.contact.email}`}
                  className="text-[12px] font-light break-all transition-colors duration-200"
                  style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-inter)', textDecoration: 'none' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
                >
                  {SITE.contact.email}
                </a>
              </div>

              <div className="flex items-center justify-center p-5 border-b sm:border-b-0 sm:border-r" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(204,34,41,0.15)', border: '1px solid rgba(204,34,41,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Navigation size={20} style={{ color: '#CC2229' }}/>
                </div>
              </div>

              <a href={SITE.location.mapsUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 p-5 text-[15px] font-bold text-white transition-colors duration-200"
                style={{ fontFamily: 'var(--font-manrope)', textDecoration: 'none' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#CC2229' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#fff' }}
              >
                ¿Cómo llegar?
                <ArrowRight size={16}/>
              </a>
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5"
            style={{ ...anim(400), borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-[12px] font-light text-center sm:text-left" style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-inter)', lineHeight: 1.6 }}>
              © {year} Iglesia Cristiana Cuadrangular La Vid Verdadera.<br className="sm:hidden"/>
              {' '}Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-3">
              <p className="text-[12px] font-light" style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-inter)' }}>
                Buritaca, Magdalena — Colombia
              </p>
              <Heart size={13} style={{ color: 'rgba(255,255,255,0.15)', flexShrink: 0 }}/>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}