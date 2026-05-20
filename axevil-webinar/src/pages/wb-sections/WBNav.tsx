import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLang } from '../../lib/lang'

// Fixed nav bar height — keep in sync with NAV_HEIGHT below.
const NAV_OFFSET_PX = 64

/**
 * Layout-based document Y of an element — unaffected by CSS transforms or by
 * a currently-stuck `position: sticky` ancestor.
 *
 * Two quirks this function defends against:
 *
 * 1. **Scaled ancestors.** Several sections sit inside framer-motion `motion.div`s
 *    that animate `scale` (0.8 → 1) via scroll progress. `getBoundingClientRect`
 *    and `scrollIntoView` use the visual rect (post-transform), so a click at the
 *    top of the page captures a "compressed" target; while the page smooth-scrolls,
 *    the scale grows to 1.0, layout expands, and the precomputed target becomes
 *    stale — landing a few hundred pixels short. `offsetTop` is layout-based, so
 *    walking the offsetParent chain sidesteps this.
 *
 * 2. **Stuck sticky ancestors.** Sections like `#wb-who` (and `#wb-schedule`) are
 *    wrapped in a `position: sticky` parent with `top: -160`. When the user is
 *    scrolled past them and the sticky parent is currently "stuck", browsers
 *    report a translated layout position to descendants — so `offsetTop` of a
 *    descendant ends up near the *current* scrollY rather than the parent's
 *    natural flow position. The visible symptom is that clicking the nav link
 *    only scrolls a hundred pixels or so. To get a clean reading, we walk up
 *    the DOM tree once and momentarily set `position: static` on any sticky
 *    ancestor, measure, then restore. The whole sequence is synchronous (no
 *    paint in between), so it's visually invisible.
 */
function getDocumentOffsetTop(el: HTMLElement): number {
  type Override = { el: HTMLElement; previous: string }
  const overrides: Override[] = []
  let walker: HTMLElement | null = el.parentElement
  while (walker && walker !== document.body) {
    if (window.getComputedStyle(walker).position === 'sticky') {
      overrides.push({ el: walker, previous: walker.style.position })
      walker.style.position = 'static'
    }
    walker = walker.parentElement
  }

  let top = 0
  let node: HTMLElement | null = el
  while (node && node !== document.body) {
    top += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }

  for (const o of overrides) {
    o.el.style.position = o.previous
  }

  return top
}

export function scrollToForm() {
  const el = document.getElementById('wb-form')
  if (!el) return
  window.scrollTo({ top: Math.max(0, getDocumentOffsetTop(el)), behavior: 'smooth' })
}

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  // Subtract the fixed nav height so the section heading isn't tucked under
  // the navbar after the smooth scroll lands.
  window.scrollTo({
    top: Math.max(0, getDocumentOffsetTop(el) - NAV_OFFSET_PX),
    behavior: 'smooth',
  })
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
  const { t } = useLang()
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
                  className={`flex items-center h-9 px-4 rounded-full font-inter-tight font-medium text-text-s-med transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${
                    isActive ? 'text-white bg-[#1a1a1a]' : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            {/* Reserve a seat — desktop only — scrolls to the registration form (same anchor as WBCtaButton "Занять место") */}
            <button
              type="button"
              onClick={scrollToForm}
              className="hidden sm:flex items-center justify-center font-inter-tight font-semibold text-phone-bg bg-white hover:scale-[1.02] transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-white shrink-0"
              style={{ height: '2.25rem', padding: '0 1.25rem', borderRadius: '1rem', fontSize: 'var(--font-s)' }}
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
                className="w-full text-left px-5 py-3 font-inter-tight font-medium text-text-m text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              >
                {label}
              </button>
            ))}
            {/* Reserve a seat — desktop button in mobile menu — scrolls to the registration form */}
            <div className="px-5 py-3">
              <button
                type="button"
                onClick={() => { scrollToForm(); setMenuOpen(false) }}
                className="flex items-center justify-center font-inter-tight font-semibold text-phone-bg bg-white hover:scale-[1.02] transition-transform w-full"
                style={{ height: '2.75rem', borderRadius: '1rem', fontSize: 'var(--font-s)' }}
              >
                {t.nav.reserve}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
