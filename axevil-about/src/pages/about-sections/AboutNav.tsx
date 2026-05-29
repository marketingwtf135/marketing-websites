import { useState, useEffect } from 'react'
import { BtnOwn } from '@axevil/design-system/components'
import { NAV_LINKS } from './content'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function AboutNav() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function handleLink(id: string) {
    scrollTo(id)
    setMenuOpen(false)
  }

  return (
    <>
      {/* Fixed nav bar — DS Nav visual shell */}
      <nav
        className="fixed top-0 left-0 w-full z-50 h-[3.75rem] md:h-[5rem]"
        style={{
          background: 'var(--black-200, #060606)',
          borderBottom: '1px solid var(--black-500, #1A1A1A)',
        }}
      >
        <div
          className="relative mx-auto w-full h-[3.75rem] md:h-[5rem] flex items-center justify-between container-px"
          style={{ maxWidth: '90rem' }}
        >
          {/* Logo */}
          <a href="#top" aria-label="AXEVIL Capital" className="shrink-0">
            <img
              src="/img/logos/footer-logo.svg"
              alt="AXEVIL"
              className="w-[7.5rem] h-[1.125rem] lg:w-[9.6875rem] lg:h-6"
            />
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ label, id }) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                className="flex items-center px-4 py-2 rounded-full font-inter-tight font-medium text-text-s-med text-white opacity-80 hover:opacity-100 hover:bg-white/5 transition-[opacity,background-color] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              >
                {label}
              </button>
            ))}
          </div>

          {/* Right side: CTA + burger */}
          <div className="flex items-center gap-2 shrink-0">
            <BtnOwn
              size="XS"
              hideIcon
              className="hidden sm:flex"
              onClick={() => scrollTo('cta')}
            >
              Обсудить
            </BtnOwn>

            {/* Burger — CSS transition, no framer-motion */}
            <button
              type="button"
              aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={menuOpen}
              className="lg:hidden flex flex-col items-center justify-center gap-[0.3125rem] w-11 h-11 rounded-full transition-colors hover:bg-white/5"
              onClick={() => setMenuOpen(o => !o)}
            >
              <span
                className={`block w-5 h-[0.125rem] bg-white transition-transform duration-[250ms] ${
                  menuOpen ? 'translate-y-[0.21875rem] rotate-45' : ''
                }`}
              />
              <span
                className={`block w-5 h-[0.125rem] bg-white transition-transform duration-[250ms] ${
                  menuOpen ? '-translate-y-[0.21875rem] -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className="fixed inset-x-0 bottom-0 top-[3.75rem] md:top-[5rem] z-40 lg:hidden flex flex-col"
          style={{ background: 'var(--black-200)' }}
        >
          <div
            className="flex flex-col flex-1 overflow-y-auto"
            style={{ padding: '2rem 1rem 1rem', gap: '2rem' }}
          >
            {NAV_LINKS.map(({ label, id }) => (
              <button
                key={id}
                type="button"
                onClick={() => handleLink(id)}
                className="font-inter-tight font-semibold text-h4 text-white text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                style={{ fontSize: 'var(--font-h4)', letterSpacing: '-0.02em', lineHeight: 1.2 }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Bottom CTA */}
          <div style={{ padding: '1rem' }}>
            <BtnOwn
              size="L"
              hideIcon
              className="w-full"
              onClick={() => { scrollTo('cta'); setMenuOpen(false) }}
            >
              Обсудить
            </BtnOwn>
          </div>
        </div>
      )}
    </>
  )
}
