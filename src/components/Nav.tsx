import { useState, useEffect } from 'react'

interface NavProps {
  /** Active link label, e.g. "Company Stock" */
  active?: string
}

const NAV_LINKS = ['Invest', 'Company Stock', 'Product', 'Compare', 'Resources', 'Company']

function navHref(label: string) {
  if (label === 'Company Stock') return '#company-stock'
  return '#'
}

export default function Nav({ active }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  // Close menu on hash change (link clicked) and lock scroll while open
  useEffect(() => {
    const close = () => setMenuOpen(false)
    window.addEventListener('hashchange', close)
    return () => window.removeEventListener('hashchange', close)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-nav-border bg-nav-bg" style={{ height: '80px' }}>
        <div className="mx-auto w-full max-w-content container-px h-full flex items-center justify-between">
          <a href="#" aria-label="AXEVIL Capital" className="shrink-0">
            <img src="/img/block01/logo.svg" alt="AXEVIL" width={155} height={24} className="w-[120px] sm:w-[155px] h-auto" />
          </a>

          {/* Desktop links — hidden below lg */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((label) => {
              const isActive = label === active
              return (
                <a
                  key={label}
                  href={navHref(label)}
                  className={[
                    'flex items-center gap-1 px-4 py-2 rounded-full font-inter-tight font-medium text-s-med transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white',
                    isActive
                      ? 'text-white bg-white/5'
                      : 'text-white/60 hover:text-white hover:bg-white/5',
                  ].join(' ')}
                >
                  {label}
                  <img src="/img/block01/arrow-down.svg" alt="" aria-hidden="true" width={16} height={16} />
                </a>
              )
            })}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              className="nav-cta-glow hidden sm:flex items-center justify-center px-4 py-2.5 rounded-full bg-white font-inter-tight font-semibold text-s-semi text-phone-bg hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-phone-bg"
              onClick={() => window.dispatchEvent(new CustomEvent('open-quiz'))}
            >
              Request access
            </button>

            {/* Burger — mobile/tablet only */}
            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="lg:hidden flex flex-col items-center justify-center gap-[5px] w-11 h-11 rounded-full hover:bg-white/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className={`block w-5 h-[2px] bg-white transition-transform ${menuOpen ? 'translate-y-[3.5px] rotate-45' : ''}`} />
              <span className={`block w-5 h-[2px] bg-white transition-transform ${menuOpen ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu drawer */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: 'rgba(8,8,8,0.97)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', paddingTop: '80px' }}
        >
          <div className="flex flex-col gap-1 px-5 sm:px-8 py-6 overflow-y-auto h-full">
            {NAV_LINKS.map((label) => {
              const isActive = label === active
              return (
                <a
                  key={label}
                  href={navHref(label)}
                  onClick={() => setMenuOpen(false)}
                  className={[
                    'flex items-center justify-between px-4 py-4 rounded-xl font-inter-tight font-medium text-text-l transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white',
                    isActive
                      ? 'text-white bg-white/5'
                      : 'text-white/70 hover:text-white hover:bg-white/5',
                  ].join(' ')}
                  style={{ minHeight: 56 }}
                >
                  <span>{label}</span>
                  <img src="/img/block01/arrow-down.svg" alt="" aria-hidden="true" width={16} height={16} style={{ transform: 'rotate(-90deg)', opacity: 0.5 }} />
                </a>
              )
            })}

            {/* Mobile-only Request access button */}
            <button
              type="button"
              className="sm:hidden flex items-center justify-center mt-4 px-4 py-2.5 rounded-full bg-white font-inter-tight font-semibold text-text-m text-phone-bg hover:scale-[1.02] transition-transform"
              style={{ minHeight: 56 }}
              onClick={() => { setMenuOpen(false); window.dispatchEvent(new CustomEvent('open-quiz')) }}
            >
              Request access
            </button>
          </div>
        </div>
      )}
    </>
  )
}
