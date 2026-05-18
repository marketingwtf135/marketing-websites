import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import MailIcon from './MailIcon'
import OwnButton from './OwnButton'

export function scrollToNLForm() {
  document.getElementById('nl-form')?.scrollIntoView({ behavior: 'smooth' })
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function useNavVisible() {
  const [visible, setVisible] = useState(true)
  const lastY = useRef(0)
  const peakY = useRef(0)
  useEffect(() => {
    function onScroll() {
      const y = window.scrollY
      if (y > lastY.current) { peakY.current = y; if (y > 500) setVisible(false) }
      else { if (peakY.current - y >= 200) setVisible(true) }
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return visible
}

const NAV_LINKS = [
  { label: 'Состав выпуска',   id: 'nl-contents'    },
  { label: 'Методология',      id: 'nl-methodology'  },
  { label: 'Как это работает', id: 'nl-steps'        },
  { label: 'О платформе',      id: 'nl-about'        },
]

export default function NLNav() {
  const visible = useNavVisible()
  const [menuOpen, setMenuOpen] = useState(false)

  function handleNavLink(id: string) {
    scrollTo(id)
    setMenuOpen(false)
  }

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 w-full z-50"
        style={{ background: '#060606', borderBottom: '1px solid #1a1a1a', height: 72 }}
        animate={{ y: visible ? 0 : -72 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="container-px mx-auto w-full max-w-[1440px] h-full flex items-center justify-between">
          {/* Logo */}
          <a href="#" aria-label="AXEVIL Capital" className="shrink-0">
            <img src="/img/newsletter/logo.svg" alt="AXEVIL Capital" className="shrink-0 block"
              style={{ width: 'clamp(116px, 10.8vw, 155px)', height: 'clamp(18px, 1.7vw, 24px)' }} />
          </a>

          {/* Desktop: centered nav */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-1 h-8">
            {NAV_LINKS.map(({ label, id }, i) => (
              <button key={id} type="button" onClick={() => scrollTo(id)}
                className="flex items-center justify-center px-4 py-2 rounded-[160px] font-inter-tight font-medium text-white text-center whitespace-nowrap transition-colors"
                style={{ fontSize: 14, lineHeight: 'normal', background: i === 0 ? 'rgba(255,255,255,0.05)' : 'transparent', opacity: i === 0 ? 1 : 0.8 }}>
                {label}
              </button>
            ))}
          </div>

          {/* Desktop: CTA */}
          <div className="ml-auto hidden lg:flex">
            <button type="button" onClick={scrollToNLForm}
              className="flex items-center gap-2 font-inter-tight font-semibold text-[#202020] bg-white rounded-2xl hover:opacity-90 transition-opacity shrink-0"
              style={{ height: 40, paddingLeft: 16, paddingRight: 16, paddingTop: 13, paddingBottom: 16, fontSize: 16, fontWeight: 600, lineHeight: '110%', letterSpacing: '-1px' }}>
              <MailIcon />
              Подписаться
            </button>
          </div>

          {/* Mobile: burger */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden relative shrink-0 focus-visible:outline-none"
            style={{ width: 40, height: 40 }}
            aria-label="Меню"
          >
            <motion.div
              className="absolute bg-white"
              style={{ height: 2, left: 10, width: 20 }}
              animate={{ top: menuOpen ? 19 : 15, rotate: menuOpen ? 45 : 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.div
              className="absolute bg-white"
              style={{ height: 2, left: 10, width: 20 }}
              animate={{ top: menuOpen ? 19 : 24, rotate: menuOpen ? -45 : 0 }}
              transition={{ duration: 0.25 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu drawer — style from main Axevil website Nav.tsx */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            style={{ background: 'rgba(8,8,8,0.97)', backdropFilter: 'blur(1rem)', WebkitBackdropFilter: 'blur(1rem)', paddingTop: '4.5rem' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="flex flex-col px-5 sm:px-8 py-6 overflow-y-auto h-full">
              <div className="flex flex-col gap-1 flex-1">
                {NAV_LINKS.map(({ label, id }) => (
                  <button key={id} type="button"
                    onClick={() => handleNavLink(id)}
                    className="flex items-center justify-between px-4 py-4 rounded-xl font-inter-tight font-medium text-white/70 hover:text-white hover:bg-white/5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                    style={{ minHeight: '3.5rem', fontSize: '1.125rem', lineHeight: 1.35, letterSpacing: '-0.36px' }}>
                    <span>{label}</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden style={{ transform: 'rotate(-90deg)', opacity: 0.5, flexShrink: 0, display: 'block' }}>
                      <path d="M4 6L8 10L12 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                ))}
              </div>
              {/* gap auto — button pushed to bottom */}
              <div className="mt-auto pt-6">
                <OwnButton onClick={() => { scrollToNLForm(); setMenuOpen(false) }} label="Подписаться" fullWidth />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
