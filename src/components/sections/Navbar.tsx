'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS, SITE } from '@/data/site'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [scrolled, setScrolled]         = useState(false)
  const [open, setOpen]                 = useState(false)
  const [activeAnchor, setActiveAnchor] = useState('#inicio')
  const pathname = usePathname()
  const isHome   = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isHome) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActiveAnchor(`#${e.target.id}`) }),
      { rootMargin: '-40% 0px -55% 0px' }
    )
    document.querySelectorAll('section[id]').forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [isHome])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const isActive = (link: typeof NAV_LINKS[0]) => {
    if (!isHome) return pathname === link.href
    return activeAnchor === link.homeAnchor
  }

  const resolveHref = (link: typeof NAV_LINKS[0]) => {
    if (isHome) return link.homeAnchor
    return link.href
  }

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-500',
        scrolled ? 'py-2' : 'py-0'
      )}
    >
      <div className={cn(
        'mx-auto transition-all duration-500',
        scrolled ? 'max-w-5xl px-4' : 'max-w-7xl px-6'
      )}>
        <div className={cn(
          'flex items-center justify-between h-16 transition-all duration-500',
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border border-black/[0.06] rounded-2xl px-5 shadow-[0_4px_24px_rgba(0,0,0,0.07)]'
            : 'bg-transparent px-0'
        )}>

          {/* ── Logo ── */}
          <a href="/" className="flex items-center gap-3 group flex-shrink-0">
            <img
              src="/images/logo.png"
              alt="Iglesia La Vid Verdadera"
              className="transition-all duration-300 group-hover:scale-105"
              style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
            />
            <div>
              <p className={cn(
                'text-[10px] font-medium tracking-widest uppercase leading-none mb-0.5 transition-colors duration-300 hidden sm:block',
                scrolled ? 'text-gray-400' : 'text-white/50'
              )}>
                Iglesia Cuadrangular
              </p>
              <p
                className={cn(
                  'font-bold leading-none transition-colors duration-300',
                  'text-[13px] sm:text-[15px]',
                  scrolled ? 'text-[#0A0A0F]' : 'text-white'
                )}
                style={{ fontFamily: 'var(--font-manrope)' }}
              >
                 La Vid Verdadera
              </p>
            </div>
          </a>

          {/* ── Desktop links ── */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => {
              const active = isActive(link)
              const href   = resolveHref(link)
              return (
                <a
                  key={link.href}
                  href={href}
                  className={cn(
                    'relative px-4 py-2 rounded-xl text-[13px] font-medium transition-all duration-200',
                    active
                      ? scrolled
                        ? 'text-[#CC2229] bg-[#CC2229]/5'
                        : 'text-white bg-white/10'
                      : scrolled
                        ? 'text-gray-500 hover:text-gray-900 hover:bg-black/[0.04]'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                  )}
                  style={{ fontFamily: 'var(--font-manrope)' }}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-4 rounded-full bg-[#CC2229]"/>
                  )}
                </a>
              )
            })}
          </nav>

          {/* ── CTA ── */}
          <div className="hidden lg:block">
            <a
              href={isHome ? '#contacto' : '/#contacto'}
              className={cn(
                'text-[13px] font-semibold px-5 py-2.5 rounded-xl transition-all duration-200',
                scrolled
                  ? 'bg-[#CC2229] text-white hover:bg-[#b01e24] shadow-sm'
                  : 'bg-white text-[#0A0A0F] hover:bg-white/90'
              )}
              style={{ fontFamily: 'var(--font-manrope)' }}
            >
              Visítanos →
            </a>
          </div>

          {/* ── Mobile toggle ── */}
          <button
            onClick={() => setOpen(!open)}
            className={cn(
              'lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-colors',
              scrolled
                ? 'text-gray-700 hover:bg-black/[0.04]'
                : 'text-white hover:bg-white/10'
            )}
            aria-label="Menú"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      <div className={cn(
        'lg:hidden fixed inset-0 z-40 transition-all duration-300',
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}>
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <div className={cn(
          'absolute top-0 right-0 h-full w-72 bg-white shadow-2xl transition-transform duration-300 flex flex-col',
          open ? 'translate-x-0' : 'translate-x-full'
        )}>
          {/* Drawer header */}
          <div className="flex items-center justify-between p-5 border-b border-black/[0.06]">
            <div className="flex items-center gap-2.5">
              <img
                src="/images/logo.png"
                alt="La Vid Verdadera"
                style={{ height: '32px', width: 'auto', objectFit: 'contain' }}
              />
              <span className="font-bold text-sm text-[#0A0A0F]" style={{ fontFamily: 'var(--font-manrope)' }}>
                La Vid Verdadera
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-black/[0.04]"
            >
              <X size={18} />
            </button>
          </div>

          {/* Drawer links */}
          <nav className="p-4 space-y-1 flex-1">
            {NAV_LINKS.map(link => {
              const active = isActive(link)
              const href   = resolveHref(link)
              return (
                <a
                  key={link.href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                    active
                      ? 'bg-[#CC2229]/6 text-[#CC2229]'
                      : 'text-gray-700 hover:bg-black/[0.04] hover:text-[#CC2229]'
                  )}
                  style={{ fontFamily: 'var(--font-manrope)' }}
                >
                  {active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CC2229] mr-3 flex-shrink-0" />
                  )}
                  {link.label}
                </a>
              )
            })}
          </nav>

          {/* Drawer CTA */}
          <div className="px-4 pb-6">
            <a
              href={isHome ? '#contacto' : '/#contacto'}
              onClick={() => setOpen(false)}
              className="flex items-center justify-center w-full bg-[#CC2229] text-white font-semibold text-sm py-3.5 rounded-xl hover:bg-[#b01e24] transition-colors"
              style={{ fontFamily: 'var(--font-manrope)' }}
            >
              Visítanos →
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}