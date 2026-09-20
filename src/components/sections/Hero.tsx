'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Calendar, Users, Church, Heart, ArrowDown } from 'lucide-react'
import { SITE } from '@/data/site'

const STATS = [
  { icon: Users,  value: '+100', label: 'Personas',     sub: 'Forman parte de nuestra familia' },
  { icon: Church, value: '5',    label: 'Ministerios',  sub: 'Sirviendo con propósito' },
  { icon: Heart,  value: '+15',  label: 'Años',         sub: 'Anunciando el amor de Cristo' },
]

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => { setTimeout(() => setMounted(true), 60) }, [])

  const anim = (delay: number) => ({
    opacity:    mounted ? 1 : 0,
    transform:  mounted ? 'translateY(0)' : 'translateY(32px)',
    transition: `opacity 0.9s ease ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  })

  return (
    <section id="inicio" className="relative min-h-screen bg-[#0A0A0F] overflow-hidden flex flex-col">

      {/* ── Radial glow ─────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0">
        <div style={{
          position:'absolute', inset:0,
          background:'radial-gradient(ellipse 70% 60% at 10% 50%, rgba(204,34,41,0.18) 0%, transparent 65%)',
        }}/>
        <div style={{
          position:'absolute', inset:0,
          background:'radial-gradient(ellipse 50% 50% at 85% 20%, rgba(91,45,142,0.10) 0%, transparent 60%)',
        }}/>
      </div>

      {/* ── Vertical text (right edge) ──────────────────────────────── */}
      <div
        className="hidden xl:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-3"
        style={{ opacity: mounted ? 0.35 : 0, transition: 'opacity 1.2s ease 800ms' }}
      >
        <div style={{
          writingMode:'vertical-rl', textOrientation:'mixed',
          fontSize:'9px', letterSpacing:'0.22em', color:'#fff',
          fontFamily:'var(--font-manrope)', fontWeight:500,
          textTransform:'uppercase',
        }}>
          La Vid Verdadera
        </div>
        <div style={{ width:'1px', height:'48px', background:'rgba(255,255,255,0.2)', margin:'4px 0' }}/>
        <span style={{ color:'#F5A800', fontSize:'16px' }}>+</span>
      </div>

      {/* ── Main grid ───────────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto w-full px-6 lg:px-10 pt-28 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">

          {/* LEFT — copy */}
          <div>
            {/* Eyebrow */}
            <div style={anim(0)} className="flex items-center gap-3 mb-8">
              <span style={{
                fontSize:'11px', fontWeight:700, color:'#CC2229',
                fontFamily:'var(--font-manrope)', letterSpacing:'0.06em',
              }}>01</span>
              <span style={{ width:'1px', height:'14px', background:'rgba(255,255,255,0.2)' }}/>
              <span style={{
                fontSize:'10px', fontWeight:600, color:'rgba(255,255,255,0.45)',
                letterSpacing:'0.18em', textTransform:'uppercase',
                fontFamily:'var(--font-manrope)',
              }}>Bienvenidos</span>
            </div>

            {/* Headline */}
            <div style={anim(100)}>
              <h1
                style={{
                  fontFamily:'var(--font-manrope)',
                  fontWeight:800,
                  fontSize:'clamp(52px, 6vw, 80px)',
                  lineHeight:1.0,
                  letterSpacing:'-0.02em',
                  color:'#fff',
                  marginBottom:'0',
                }}
              >
                Hay un lugar<br/>
                para ti{' '}
                <em style={{
                  fontStyle:'italic',
                  color:'#CC2229',
                  fontFamily:'var(--font-manrope)',
                }}>aquí.</em>
              </h1>
              {/* Gold underline */}
              <svg viewBox="0 0 220 10" style={{ width:'140px', height:'8px', marginTop:'10px', marginBottom:'28px' }} preserveAspectRatio="none">
                <path
                  d="M 0 7 Q 55 2 110 6 Q 165 10 220 4"
                  stroke="#F5A800" strokeWidth="2.5" fill="none" strokeLinecap="round"
                  style={{
                    strokeDasharray: 240,
                    strokeDashoffset: mounted ? 0 : 240,
                    transition: 'stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1) 400ms',
                  }}
                />
              </svg>
            </div>

            {/* Subtext */}
            <div style={anim(200)}>
              <p style={{
                fontFamily:'var(--font-inter)',
                fontSize:'16px', fontWeight:300,
                color:'rgba(255,255,255,0.55)',
                lineHeight:1.7, marginBottom:'36px',
                maxWidth:'380px',
              }}>
                Una comunidad que busca a Dios,<br/>
                crece en familia y vive su fe cada día.
              </p>
            </div>

            {/* CTAs */}
            <div style={anim(300)} className="flex flex-wrap gap-3">
              <a
                href="#nosotros"
                className="group inline-flex items-center gap-2.5 font-semibold text-sm text-white px-7 py-3.5 rounded-xl transition-all duration-200"
                style={{
                  fontFamily:'var(--font-manrope)',
                  background:'#CC2229',
                  boxShadow:'0 0 0 0 rgba(204,34,41,0)',
                }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow='0 0 0 4px rgba(204,34,41,0.25)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow='0 0 0 0 rgba(204,34,41,0)')}
              >
                Conócenos
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#horarios"
                className="inline-flex items-center gap-2.5 font-semibold text-sm px-7 py-3.5 rounded-xl transition-all duration-200"
                style={{
                  fontFamily:'var(--font-manrope)',
                  background:'rgba(255,255,255,0.07)',
                  border:'1px solid rgba(255,255,255,0.12)',
                  color:'rgba(255,255,255,0.75)',
                  backdropFilter:'blur(8px)',
                }}
                onMouseEnter={e => (e.currentTarget.style.background='rgba(255,255,255,0.12)')}
                onMouseLeave={e => (e.currentTarget.style.background='rgba(255,255,255,0.07)')}
              >
                <Calendar size={15} style={{ opacity:0.7 }}/>
                Horarios de reunión
              </a>
            </div>
          </div>

          {/* RIGHT — image / video card */}
          <div style={{ ...anim(200), display:'flex', justifyContent:'flex-end' }}>
            <div style={{
              position:'relative',
              width:'100%', maxWidth:'560px',
              borderRadius:'24px',
              overflow:'hidden',
              boxShadow:'0 32px 80px rgba(0,0,0,0.5)',
              aspectRatio:'16/10',
              background:'#111',
            }}>
              <img
                src="/images/hero-bg.jpg"
                alt="Culto La Vid Verdadera"
                style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.85 }}
              />
              {/* Overlay gradient */}
              <div style={{
                position:'absolute', inset:0,
                background:'linear-gradient(135deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.10) 100%)',
              }}/>

             
              

              {/* Bottom label */}
              <div style={{
                position:'absolute', bottom:'16px', right:'16px',
                fontSize:'9px', fontWeight:600, letterSpacing:'0.18em',
                color:'rgba(255,255,255,0.45)', textTransform:'uppercase',
                fontFamily:'var(--font-manrope)',
              }}>
                Iglesia Cuadrangular · La Vid Verdadera
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Divider with center icon ─────────────────────────────────── */}
      <div style={{
        position:'relative', zIndex:10,
        display:'flex', alignItems:'center',
        maxWidth:'1280px', margin:'0 auto', width:'100%', padding:'0 40px',
        opacity: mounted ? 1 : 0, transition:'opacity 1s ease 700ms',
      }}>
        <div style={{ flex:1, height:'1px', background:'rgba(255,255,255,0.08)' }}/>
        <div style={{
          width:'44px', height:'44px', borderRadius:'50%',
          border:'1px solid rgba(245,168,0,0.35)',
          display:'flex', alignItems:'center', justifyContent:'center',
          margin:'0 16px', flexShrink:0,
          background:'rgba(245,168,0,0.06)',
        }}>
          {/* Vine/leaf icon */}
          <svg viewBox="0 0 24 24" style={{ width:'20px', height:'20px' }} fill="none">
            <path d="M12 22V12M12 12C12 7 7 4 3 5c0 4 3 8 9 7M12 12c0-5 5-8 9-7-1 4-4 7-9 7" stroke="#F5A800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div style={{ flex:1, height:'1px', background:'rgba(255,255,255,0.08)' }}/>
      </div>

      {/* ── Stats bar ───────────────────────────────────────────────── */}
      <div style={{
        position:'relative', zIndex:10,
        maxWidth:'1280px', margin:'0 auto', width:'100%', padding:'32px 40px',
        opacity: mounted ? 1 : 0, transition:'opacity 1s ease 900ms',
      }}>
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.07]">
          {STATS.map(({ icon: Icon, value, label, sub }) => (
            <div key={label} className="flex items-center gap-5 py-6 sm:py-4 sm:px-12 first:pl-0 last:pr-0">
              <Icon size={28} style={{ color:'#CC2229', flexShrink:0, opacity:0.9 }} strokeWidth={1.5}/>
              <div>
                <div className="flex items-baseline gap-2 mb-0.5">
                  <span style={{
                    fontFamily:'var(--font-manrope)',
                    fontSize:'42px', fontWeight:800,
                    color:'#fff', lineHeight:1,
                    letterSpacing:'-0.02em',
                  }}>{value}</span>
                  <span style={{
                    fontFamily:'var(--font-manrope)',
                    fontSize:'10px', fontWeight:700,
                    color:'#CC2229', letterSpacing:'0.14em',
                    textTransform:'uppercase',
                  }}>{label}</span>
                </div>
                <p style={{
                  fontFamily:'var(--font-inter)',
                  fontSize:'12px', color:'rgba(255,255,255,0.35)',
                  fontWeight:300,
                }}>{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ────────────────────────────────────────── */}
      <div style={{
        position:'relative', zIndex:10,
        display:'flex', flexDirection:'column', alignItems:'center',
        gap:'6px', paddingBottom:'28px',
        opacity: mounted ? 0.4 : 0, transition:'opacity 1.2s ease 1000ms',
      }}>
        <span style={{
          fontSize:'9px', letterSpacing:'0.22em', textTransform:'uppercase',
          color:'#fff', fontFamily:'var(--font-manrope)', fontWeight:500,
        }}>Desplázate</span>
        <ArrowDown size={14} color="#fff" style={{ animation:'bounce 2s infinite' }}/>
      </div>

      {/* ── Wave bottom ─────────────────────────────────────────────── */}
      <div style={{ position:'relative', zIndex:10, lineHeight:0, marginTop:'-2px' }}>
        <svg viewBox="0 0 1440 60" style={{ width:'100%', display:'block' }} preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z" fill="#ffffff"/>
        </svg>
      </div>

      <style>{`
        @keyframes bounce {
          0%,100%{transform:translateY(0)} 50%{transform:translateY(5px)}
        }
      `}</style>
    </section>
  )
}