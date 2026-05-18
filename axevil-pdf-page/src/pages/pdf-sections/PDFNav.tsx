import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Образец',             id: 'preview' },
  { label: 'Оставайтесь в курсе', id: 'stay-current' },
  { label: 'О платформе',         id: 'about' },
] as const

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

export default function PDFNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const visible = useNavVisible()

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <motion.header
        role="banner"
        animate={{ y: visible ? 0 : '-100%' }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: '4.5rem',
          background: '#060606',
          borderBottom: '1px solid #1a1a1a',
        }}
      >
        <div
          style={{
            maxWidth: '90rem',
            margin: '0 auto',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 clamp(1rem, 5vw, 5rem)',
            position: 'relative',
          }}
        >
          {/* Logo */}
          <a
            href="/"
            aria-label="Axevil Capital"
            style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}
          >
            <img
              src="/img/logo.svg"
              alt="AXEVIL"
              style={{
                width: 'clamp(116px, 10.8vw, 155px)',
                height: 'clamp(18px, 1.7vw, 24px)',
                display: 'block',
              }}
            />
          </a>

          {/* Center nav — desktop only, absolutely centered */}
          <nav
            aria-label="Sections"
            className="hidden-mobile"
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '0.25rem',
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                style={{
                  background: i === 0 ? 'rgba(255,255,255,0.05)' : 'transparent',
                  borderRadius: '10rem',
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  fontFamily: 'Inter Tight, sans-serif',
                  fontWeight: 500,
                  color: '#ffffff',
                  opacity: i === 0 ? 1 : 0.8,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.2s, opacity 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  if (i !== 0) (e.currentTarget as HTMLButtonElement).style.opacity = '1'
                  ;(e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)'
                }}
                onMouseLeave={e => {
                  if (i !== 0) (e.currentTarget as HTMLButtonElement).style.opacity = '0.8'
                  if (i !== 0) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
                }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right: Download button (desktop) / Hamburger (mobile) */}
          <>
            {/* Desktop CTA */}
            <button
              onClick={() => scrollTo('pdf-form')}
              className="hidden-mobile"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                height: '2.5rem',
                padding: '0 1rem',
                background: 'white',
                borderRadius: '1rem',
                border: 'none',
                fontFamily: 'Inter Tight, sans-serif',
                fontWeight: 600,
                fontSize: '1rem',
                color: '#202020',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              <DownloadIcon />
              Скачать PDF
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="show-mobile"
              aria-label="Открыть меню"
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ display: 'block', width: '20px', height: '2px', background: 'white', borderRadius: '1px' }} />
              <span style={{ display: 'block', width: '20px', height: '2px', background: 'white', borderRadius: '1px' }} />
            </button>
          </>
        </div>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
              background: '#060606',
              display: 'flex',
              flexDirection: 'column',
              padding: '1rem',
            }}
          >
            {/* Menu header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '4.5rem' }}>
              <img
                src="/img/logo.svg"
                alt="AXEVIL"
                style={{ height: '1.125rem', width: 'auto' }}
              />
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Закрыть меню"
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'white',
                  fontSize: '1.5rem',
                  lineHeight: 1,
                  padding: '0.5rem',
                }}
              >
                ×
              </button>
            </div>

            {/* Nav links */}
            <nav
              aria-label="Mobile menu"
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '0.5rem',
              }}
            >
              {NAV_LINKS.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'Inter Tight, sans-serif',
                    fontWeight: 500,
                    fontSize: '1.25rem',
                    color: 'white',
                    textAlign: 'left',
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    transition: 'background 0.15s',
                  }}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Download button at bottom */}
            <button
              onClick={() => scrollTo('pdf-form')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                height: '3.5rem',
                background: 'white',
                borderRadius: '1rem',
                border: 'none',
                fontFamily: 'Inter Tight, sans-serif',
                fontWeight: 600,
                fontSize: '1rem',
                color: '#202020',
                cursor: 'pointer',
                marginBottom: '1rem',
              }}
            >
              <DownloadIcon />
              Скачать PDF
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 768px) {
          .show-mobile { display: none !important; }
          .hidden-mobile { display: flex !important; }
        }
      `}</style>
    </>
  )
}

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path
        d="M9 2v9M5.5 7.5L9 11l3.5-3.5"
        stroke="#202020"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3 13.5h12" stroke="#202020" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
