import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BtnOwn } from '@axevil/design-system/components'
import { NAV_LINKS } from './content'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
function scrollToCta() { scrollTo('cta') }

function useNavVisible() {
  const [visible, setVisible] = useState(true)
  const lastY = useRef(0)
  const peakY = useRef(0)
  useEffect(() => {
    function onScroll() {
      const y = window.scrollY
      if (y > lastY.current) { peakY.current = y; if (y > 31.25 * 16) setVisible(false) }
      else { if (peakY.current - y >= 12.5 * 16) setVisible(true) }
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return visible
}

export default function AboutNav() {
  const visible = useNavVisible()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function handleLink(id: string) { scrollTo(id); setMenuOpen(false) }

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 w-full z-50"
        style={{ background: 'rgba(8,8,8,0.92)', backdropFilter: 'blur(1.25rem)', WebkitBackdropFilter: 'blur(1.25rem)', borderBottom: '1px solid var(--nav-border)', height: '4.5rem' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: visible ? 0 : '-4.5rem' }}
        transition={{ opacity: { duration: 0.3, ease: 'easeOut' }, y: { duration: 0.25, ease: [0.4, 0, 0.2, 1] } }}
      >
        <div className="container-px mx-auto w-full max-w-content h-full flex items-center justify-between">
          <a href="#top" aria-label="AXEVIL Capital" className="shrink-0 font-inter-tight font-semibold text-white" style={{ fontSize: '1.125rem', letterSpacing: '0.09375rem' }}>
            AXEVIL
          </a>

          <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ label, id }) => (
              <button key={id} type="button" onClick={() => scrollTo(id)}
                className="flex items-center justify-center font-inter-tight font-medium text-white whitespace-nowrap transition-colors hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                style={{ padding: '0.5rem 1rem', borderRadius: '10rem', fontSize: 'var(--font-s)', opacity: 0.8 }}>
                {label}
              </button>
            ))}
          </div>

          <div className="ml-auto hidden lg:flex">
            <BtnOwn size="XS" hideIcon onClick={scrollToCta}>Обсудить</BtnOwn>
          </div>

          <button type="button" onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden relative shrink-0 focus-visible:outline-none" style={{ width: '2.5rem', height: '2.5rem' }} aria-label="Меню" aria-expanded={menuOpen}>
            <motion.div className="absolute bg-white" style={{ height: '0.125rem', left: '0.625rem', width: '1.25rem' }} animate={{ top: menuOpen ? '1.1875rem' : '0.9375rem', rotate: menuOpen ? 45 : 0 }} transition={{ duration: 0.25 }} />
            <motion.div className="absolute bg-white" style={{ height: '0.125rem', left: '0.625rem', width: '1.25rem' }} animate={{ top: menuOpen ? '1.1875rem' : '1.5rem', rotate: menuOpen ? -45 : 0 }} transition={{ duration: 0.25 }} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="fixed inset-0 z-40 lg:hidden" style={{ background: 'rgba(8,8,8,0.97)', backdropFilter: 'blur(1rem)', WebkitBackdropFilter: 'blur(1rem)', paddingTop: '4.5rem' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}>
            <div className="flex flex-col px-5 sm:px-8 py-6 overflow-y-auto h-full">
              <div className="flex flex-col gap-1 flex-1">
                {NAV_LINKS.map(({ label, id }) => (
                  <button key={id} type="button" onClick={() => handleLink(id)}
                    className="flex items-center justify-between font-inter-tight font-medium text-white/70 hover:text-white hover:bg-white/5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                    style={{ minHeight: '3.5rem', padding: '1rem', borderRadius: '0.75rem', fontSize: 'var(--font-l)' }}>
                    <span>{label}</span>
                  </button>
                ))}
              </div>
              <div className="mt-auto pt-6">
                <BtnOwn size="L" hideIcon onClick={() => { scrollToCta(); setMenuOpen(false) }} className="w-full">Обсудить</BtnOwn>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
