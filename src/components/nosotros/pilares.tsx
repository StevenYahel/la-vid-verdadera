'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'

const IconCruz = () => (
  <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
    <path d="M14 4V24M4 14H24" stroke="white" strokeWidth="2.4" strokeLinecap="round"/>
  </svg>
)
const IconCopa = () => (
  <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
    <path d="M8 4H20L17 14C17 17.314 15.657 18 14 18C12.343 18 11 17.314 11 14L8 4Z" stroke="white" strokeWidth="1.9" strokeLinejoin="round"/>
    <path d="M14 18V23M10 23H18" stroke="white" strokeWidth="1.9" strokeLinecap="round"/>
  </svg>
)
const IconPaloma = () => (
  <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
    <path d="M5 16C5 16 8 10 14 9C20 8 23 12 23 16C23 20 19 22 14 21C9 20 5 16 5 16Z" stroke="white" strokeWidth="1.9" strokeLinejoin="round"/>
    <path d="M14 9V5M14 5L11 8M14 5L17 8" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const IconCorona = () => (
  <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
    <path d="M4 21L7 11L14 17L21 11L24 21H4Z" stroke="white" strokeWidth="1.9" strokeLinejoin="round"/>
    <path d="M4 21H24" stroke="white" strokeWidth="1.9" strokeLinecap="round"/>
    <circle cx="4" cy="11" r="1.8" fill="white"/>
    <circle cx="14" cy="7" r="1.8" fill="white"/>
    <circle cx="24" cy="11" r="1.8" fill="white"/>
  </svg>
)

const PILARES = [
  {
    id: 0, tag: 'SALVA', label: 'Cristo', name: 'Salvador',
    subtitle: 'La cruz representa la salvación',
    text: 'Creemos en un Jesús que salva. Su sacrificio en la cruz nos da perdón, nos reconcilia con Dios y nos da vida eterna. La salvación es un regalo por gracia, recibido por fe en Él.',
    quote: '"Que si confesares con tu boca que Jesús es el Señor, y creyeres en tu corazón que Dios le levantó de los muertos, serás salvo."',
    verse: 'Romanos 10:9',
    image: '/images/pilar-salvador.jpg',
    Icon: IconCruz, color: '#CC2229', bg: 'rgba(204,34,41,0.06)',
  },
  {
    id: 1, tag: 'SANA', label: 'Cristo', name: 'Sanador',
    subtitle: 'Jesús restaura cuerpo y alma',
    text: 'Jesús sana, restaura y libera. Su obra redentora alcanza no solo el alma sino también el cuerpo. Creemos en un Dios que sana hoy como lo hizo ayer.',
    quote: '"Mas él herido fue por nuestras rebeliones, molido por nuestros pecados... y por su llaga fuimos nosotros curados."',
    verse: 'Isaías 53:5',
    image: '/images/pilar-sanador.jpg',
    Icon: IconCopa, color: '#1B4FA0', bg: 'rgba(27,79,160,0.06)',
  },
  {
    id: 2, tag: 'BAUTIZA', label: 'Cristo', name: 'Bautizador',
    subtitle: 'El Espíritu Santo nos capacita',
    text: 'Jesús bautiza con el Espíritu Santo y nos capacita para vivir y servir en la misión de Dios. La paloma representa su presencia y poder en nuestra vida.',
    quote: '"Y fueron todos llenos del Espíritu Santo, y comenzaron a hablar en otras lenguas, según el Espíritu les daba que hablasen."',
    verse: 'Hechos 2:4',
    image: '/images/pilar-bautizador.jpg',
    Icon: IconPaloma, color: '#F5A800', bg: 'rgba(245,168,0,0.06)',
  },
  {
    id: 3, tag: 'VOLVERÁ', label: 'Cristo', name: 'Rey Venidero',
    subtitle: 'Vivimos con esperanza eterna',
    text: 'Vivimos con la esperanza del regreso de Jesucristo como Rey. La corona representa su señorío eterno. Él viene pronto y nuestra fe mira hacia ese día glorioso.',
    quote: '"He aquí yo vengo pronto, y mi galardón conmigo, para recompensar a cada uno según sea su obra."',
    verse: 'Apocalipsis 22:12',
    image: '/images/pilar-rey.jpg',
    Icon: IconCorona, color: '#5B2D8E', bg: 'rgba(91,45,142,0.06)',
  },
]

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.06) {
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

export default function Pilares() {
  const ref = useRef<HTMLElement>(null)
  const visible = useInView(ref)
  const [active, setActive] = useState(0)
  const [fading, setFading] = useState(false)

  const pilar = PILARES[active]

  const handleSelect = (id: number) => {
    if (id === active || fading) return
    setFading(true)
    setTimeout(() => { setActive(id); setFading(false) }, 320)
  }

  return (
    <section ref={ref} className="relative bg-[#F0F2F8] overflow-hidden py-16 lg:py-24">

      <style>{`
        @keyframes aurora-flow {
          0%,100% { opacity:.55; transform:scaleX(.85) translateX(-8px); }
          50%      { opacity:1;   transform:scaleX(1.1)  translateX(8px);  }
        }
        @keyframes aurora-flow-v {
          0%,100% { opacity:.4; transform:scaleY(.8) translateY(-6px); }
          50%      { opacity:.8; transform:scaleY(1.1) translateY(6px); }
        }
      `}</style>

      {/* Section bg tint */}
      <div style={{
        position:'absolute', inset:0,
        background: pilar.bg,
        transition:'background 0.7s ease',
        pointerEvents:'none',
      }}/>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">

        {/* Eyebrow */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
          display:'flex', alignItems:'center', gap:'12px', marginBottom:'40px',
        }}>
          <span style={{
            fontFamily:'var(--font-manrope)', fontSize:'11px', fontWeight:700,
            color:'#CC2229', letterSpacing:'0.16em', textTransform:'uppercase',
          }}>Nuestros pilares</span>
          <div style={{ width:'48px', height:'1px', background:'#CC2229' }}/>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr_280px] gap-10 lg:gap-12 items-start">

          {/* ── COL 1: Image card with aurora ── */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(-28px)',
            transition: 'opacity 0.9s ease 100ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) 100ms',
          }}>
            <div style={{ position:'relative', width:'100%', maxWidth:'340px', margin:'0 auto' }}>

              {/* ── Aurora layers ── */}
              {/* Top */}
              <div style={{
                position:'absolute', top:'-16px', left:'8%', right:'8%', height:'32px',
                background:`linear-gradient(90deg, transparent, ${pilar.color}, ${pilar.color}CC, ${pilar.color}, transparent)`,
                filter:'blur(14px)', borderRadius:'50%',
                animation:'aurora-flow 3.5s ease-in-out infinite',
                transition:'background 0.6s ease',
              }}/>
              {/* Bottom */}
              <div style={{
                position:'absolute', bottom:'-16px', left:'8%', right:'8%', height:'32px',
                background:`linear-gradient(90deg, transparent, ${pilar.color}AA, ${pilar.color}, ${pilar.color}AA, transparent)`,
                filter:'blur(14px)', borderRadius:'50%',
                animation:'aurora-flow 3.5s ease-in-out infinite reverse',
                transition:'background 0.6s ease',
              }}/>
              {/* Left */}
              <div style={{
                position:'absolute', left:'-14px', top:'12%', bottom:'12%', width:'28px',
                background:`linear-gradient(180deg, transparent, ${pilar.color}BB, transparent)`,
                filter:'blur(12px)', borderRadius:'50%',
                animation:'aurora-flow-v 4s ease-in-out infinite 0.5s',
                transition:'background 0.6s ease',
              }}/>
              {/* Right */}
              <div style={{
                position:'absolute', right:'-14px', top:'12%', bottom:'12%', width:'28px',
                background:`linear-gradient(180deg, transparent, ${pilar.color}BB, transparent)`,
                filter:'blur(12px)', borderRadius:'50%',
                animation:'aurora-flow-v 4s ease-in-out infinite reverse 0.5s',
                transition:'background 0.6s ease',
              }}/>

              {/* Card */}
              <div style={{
                position:'relative',
                borderRadius:'24px',
                overflow:'hidden',
                background:'#fff',
                boxShadow:`0 20px 60px ${pilar.color}25, 0 4px 20px rgba(0,0,0,0.08)`,
                transition:'box-shadow 0.6s ease',
              }}>
                {/* Image */}
                <div style={{ width:'100%', aspectRatio:'3/4', position:'relative', overflow:'hidden' }}>
                  <img
                    src={pilar.image}
                    alt={pilar.name}
                    style={{
                      width:'100%', height:'100%',
                      objectFit:'cover', objectPosition:'center',
                      opacity: fading ? 0 : 1,
                      transform: fading ? 'scale(1.04)' : 'scale(1)',
                      transition:'opacity 0.35s ease, transform 0.35s ease',
                    }}
                  />
                  {/* Gradient overlay bottom */}
                  <div style={{
                    position:'absolute', inset:0,
                    background:'linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 50%)',
                  }}/>
                  {/* Name overlay on image */}
                  <div style={{
                    position:'absolute', bottom:0, left:0, right:0,
                    padding:'20px',
                    opacity: fading ? 0 : 1,
                    transition:'opacity 0.3s ease',
                  }}>
                    {/* Icon */}
                    <div style={{
                      width:'48px', height:'48px', borderRadius:'50%',
                      background: pilar.color,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      marginBottom:'10px',
                      boxShadow:`0 4px 16px ${pilar.color}60`,
                      transition:'background 0.4s ease',
                    }}>
                      <pilar.Icon/>
                    </div>
                    <p style={{
                      fontFamily:'var(--font-manrope)',
                      fontSize:'10px', fontWeight:700,
                      color:'rgba(255,255,255,0.6)', letterSpacing:'0.2em',
                      textTransform:'uppercase', marginBottom:'4px',
                    }}>{pilar.tag}</p>
                    <p style={{
                      fontFamily:'var(--font-manrope)',
                      fontSize:'18px', fontWeight:800,
                      color:'#fff', lineHeight:1.15,
                    }}>Cristo <span style={{ color: pilar.color }}>{pilar.name}</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── COL 2: Content ── */}
          <div style={{
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.9s ease 150ms',
            paddingTop: '8px',
          }}>
            <div style={{
              opacity: fading ? 0 : 1,
              transform: fading ? 'translateY(10px)' : 'translateY(0)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
            }}>
              {/* Title */}
              <h2 style={{
                fontFamily:'var(--font-manrope)',
                fontWeight:800,
                lineHeight:0.95,
                letterSpacing:'-0.025em',
                marginBottom:'16px',
              }}>
                <span style={{
                  color:'#0A0A0F', display:'block',
                  fontSize:'clamp(24px,3vw,36px)',
                }}>Cristo</span>
                <span style={{
                  color: pilar.color,
                  display:'block',
                  fontSize:'clamp(44px,6vw,72px)',
                  transition:'color 0.4s ease',
                }}>{pilar.name}</span>
              </h2>

              <p style={{
                fontFamily:'var(--font-manrope)',
                fontSize:'11px', fontWeight:700,
                color:'#9CA3AF', letterSpacing:'0.18em',
                textTransform:'uppercase', marginBottom:'12px',
              }}>{pilar.subtitle}</p>

              <div style={{
                width:'44px', height:'3px',
                background: pilar.color, borderRadius:'99px',
                marginBottom:'24px',
                transition:'background 0.4s ease',
              }}/>

              <p style={{
                fontFamily:'var(--font-inter)',
                fontSize:'15px', fontWeight:300,
                color:'#4B5563', lineHeight:1.8,
                marginBottom:'28px',
              }}>{pilar.text}</p>

              {/* Quote card */}
              <div style={{
                background:'#fff',
                border:`1px solid ${pilar.color}20`,
                borderRadius:'16px',
                padding:'20px 22px',
                boxShadow:`0 4px 20px ${pilar.color}12`,
                transition:'border-color 0.4s ease, box-shadow 0.4s ease',
              }}>
                <div style={{
                  fontSize:'22px', color: pilar.color,
                  fontFamily:'Georgia, serif', lineHeight:1,
                  marginBottom:'10px', transition:'color 0.4s ease',
                }}>❝</div>
                <p style={{
                  fontFamily:'var(--font-inter)',
                  fontSize:'13px', fontStyle:'italic',
                  color:'#374151', lineHeight:1.75, marginBottom:'10px',
                }}>{pilar.quote}</p>
                <p style={{
                  fontFamily:'var(--font-manrope)',
                  fontSize:'10px', fontWeight:700,
                  color: pilar.color, letterSpacing:'0.1em',
                  transition:'color 0.4s ease',
                }}>— {pilar.verse}</p>
              </div>
            </div>
          </div>

          {/* ── COL 3: Selector ── */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(28px)',
            transition:'opacity 0.9s ease 250ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) 250ms',
            display:'flex', flexDirection:'column', gap:'10px',
            paddingTop:'8px',
          }}>
            {PILARES.map(p => {
              const isActive = p.id === active
              return (
                <button
                  key={p.id}
                  onClick={() => handleSelect(p.id)}
                  style={{
                    display:'flex', alignItems:'center', gap:'12px',
                    background: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
                    border:`1.5px solid ${isActive ? p.color + '35' : 'rgba(0,0,0,0.06)'}`,
                    borderRadius:'16px', padding:'13px 14px',
                    cursor:'pointer', textAlign:'left',
                    transition:'all 0.3s ease',
                    boxShadow: isActive ? `0 4px 24px ${p.color}20` : 'none',
                  }}
                >
                  <div style={{
                    width:'42px', height:'42px', borderRadius:'50%',
                    background: p.color,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    flexShrink:0,
                    boxShadow: isActive ? `0 4px 14px ${p.color}50` : 'none',
                    transition:'box-shadow 0.3s ease',
                  }}>
                    <p.Icon/>
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <p style={{
                      fontFamily:'var(--font-manrope)',
                      fontSize:'9px', fontWeight:600,
                      color:'#9CA3AF', letterSpacing:'0.12em',
                      textTransform:'uppercase', marginBottom:'2px',
                    }}>Cristo</p>
                    <p style={{
                      fontFamily:'var(--font-manrope)',
                      fontSize:'16px', fontWeight:800,
                      color: isActive ? p.color : '#0A0A0F',
                      lineHeight:1.1, marginBottom:'1px',
                      transition:'color 0.3s ease',
                    }}>{p.name}</p>
                    <p style={{
                      fontFamily:'var(--font-manrope)',
                      fontSize:'9px', fontWeight:700,
                      color: p.color, letterSpacing:'0.12em',
                    }}>{p.tag}</p>
                  </div>
                  <div style={{
                    width:'26px', height:'26px', borderRadius:'50%',
                    background: isActive ? p.color : 'rgba(0,0,0,0.06)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    flexShrink:0, transition:'background 0.3s ease',
                  }}>
                    <ArrowRight size={12} color={isActive ? '#fff' : '#9CA3AF'}/>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}