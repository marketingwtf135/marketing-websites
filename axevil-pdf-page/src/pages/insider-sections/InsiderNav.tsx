import { useState, useEffect } from 'react'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const NAV_LINKS = [
  { label: 'What you get',  id: 'insider-what-you-get' },
  { label: 'Why subscribe', id: 'insider-why-subscribe' },
  { label: 'How it works',  id: 'insider-how-it-works' },
  { label: 'FAQ',           id: 'insider-faq' },
]

export default function InsiderNav() {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    function onScroll() {
      const navH = 80
      let current: string | null = null
      for (const { id } of NAV_LINKS) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top
        if (top <= navH + 80) current = id
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 border-b border-nav-border bg-nav-bg"
      style={{ height: '5rem' }}
    >
      {/* 1440px content, three-zone layout: logo | nav (centered) | cta */}
      <div className="mx-auto w-full max-w-[90rem] h-full flex items-center">

        {/* Left: logo */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          aria-label="Axevil Insider"
        >
          <img src="/img/logo.svg" alt="AXEVIL" width={155} height={24} />
        </button>

        {/* Center: nav links auto-centered, hidden on mobile */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-1">
          {NAV_LINKS.map(({ label, id }) => {
            const isActive = active === id
            return (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                className={[
                  'flex items-center justify-center px-4 py-2 rounded-full font-inter-tight font-medium text-s-med transition-colors focus-visible:outline-none',
                  isActive
                    ? 'bg-white/5 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5',
                ].join(' ')}
              >
                {label}
              </button>
            )
          })}
        </div>

        {/* Right: CTA */}
        <div className="flex-1 md:flex-none flex justify-end">
          <button
            type="button"
            onClick={() => scrollTo('insider-form')}
            className="flex items-center justify-center px-4 py-2.5 rounded-full bg-white font-inter-tight font-semibold text-s-semi text-phone-bg hover:scale-[1.02] transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-phone-bg shrink-0"
          >
            Subscribe
          </button>
        </div>

      </div>
    </nav>
  )
}
