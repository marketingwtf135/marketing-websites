import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLang } from '../../lib/lang'

export function scrollToForm() {
  document.getElementById('wb-form')?.scrollIntoView({ behavior: 'smooth' })
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const NAV_IDS = ['wb-who', 'wb-why', 'wb-agenda', 'wb-speaker', 'wb-schedule']

const NAV_HEIGHT = '4rem' // 64px nav bar height

/**
 * Tracks which section is currently in view to highlight active nav link.
 * Uses IntersectionObserver — fires when section's top crosses 30% from top.
 */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const sections = ids
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (!sections.length) return

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: [0, 0.5, 1] }
    )

    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [ids])

  return active
}

export default function WBNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { t, lang, setLang } = useLang()
  const active = useActiveSection(NAV_IDS)

  const NAV_LINKS = [
    { label: t.nav.audience,   id: 'wb-who'      },
    { label: t.nav.whyAttend,  id: 'wb-why'      },
    { label: t.nav.agenda,     id: 'wb-agenda'   },
    { label: t.nav.speaker,    id: 'wb-speaker'  },
    { label: t.nav.schedule,   id: 'wb-schedule' },
  ]

  useEffect(() => {
    if (!menuOpen) return
    const first = document.querySelector<HTMLButtonElement>('#wb-mobile-menu button')
    first?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-50 border-b border-nav-border bg-nav-bg"
        style={{ height: NAV_HEIGHT }}
      >
        <div className="mx-auto w-full max-w-[90rem] h-full flex items-center justify-between container-px padding-global">
          {/* Logo */}
          <a href="#" aria-label="AXEVIL Capital" className="shrink-0">
            <img src="/img/block01/logo.svg" alt="AXEVIL Capital" width={110} height={17} />
          </a>

          {/* Desktop links — hidden below lg */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ label, id }) => {
              const isActive = active === id
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollTo(id)}
                  className={`flex items-center h-9 px-4 rounded-full font-inter-tight font-medium text-[0.8125rem] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${
                    isActive ? 'text-white bg-[#1a1a1a]' : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            {/* Language switcher — visible on all sizes */}
            <button
              type="button"
              onClick={() => setLang(lang === 'en' ? 'ru' : 'en')}
              className="flex items-center gap-1 font-inter-tight font-medium transition-colors shrink-0"
              style={{ fontSize: '0.8125rem', height: '2.25rem', padding: '0 0.75rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.6)' }}
              aria-label="Switch language"
            >
              <span style={{ color: lang === 'en' ? '#ffffff' : 'rgba(255,255,255,0.35)', fontWeight: lang === 'en' ? 600 : 500 }}>EN</span>
              <span style={{ color: 'rgba(255,255,255,0.2)', margin: '0 1px' }}>/</span>
              <span style={{ color: lang === 'ru' ? '#ffffff' : 'rgba(255,255,255,0.35)', fontWeight: lang === 'ru' ? 600 : 500 }}>RU</span>
            </button>

            {/* Reserve a seat — desktop only */}
            <button
              type="button"
              onClick={() => document.getElementById('wb-footer')?.scrollIntoView({ behavior: 'smooth' })}
              className="hidden sm:flex items-center justify-center font-inter-tight font-semibold text-phone-bg bg-white hover:scale-[1.02] transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-white shrink-0"
              style={{ height: '2.25rem', padding: '0 1.25rem', borderRadius: '1rem', fontSize: '0.875rem' }}
            >
              {t.nav.reserve}
            </button>

            {/* Hamburger — mobile/tablet only */}
            <button
              type="button"
              onClick={() => setMenuOpen(o => !o)}
              className="lg:hidden flex flex-col items-center justify-center gap-[5px] w-11 h-11 rounded-full hover:bg-white/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="wb-mobile-menu"
            >
              <span className={`block w-5 h-[2px] bg-white transition-transform ${menuOpen ? 'translate-y-[3.5px] rotate-45' : ''}`} />
              <span className={`block w-5 h-[2px] bg-white transition-transform ${menuOpen ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile/tablet drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="wb-mobile-menu"
            role="navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-0 right-0 z-40 lg:hidden flex flex-col py-2 bg-nav-bg border-b border-nav-border"
            style={{ top: NAV_HEIGHT }}
          >
            {NAV_LINKS.map(({ label, id }) => (
              <button
                key={id}
                type="button"
                onClick={() => { scrollTo(id); setMenuOpen(false) }}
                className="w-full text-left px-5 py-3 font-inter-tight font-medium text-[1rem] text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
