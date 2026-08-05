import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { analytics } from '../../lib/analytics'
import { asset } from '../../lib/asset'
import MailIcon from './MailIcon'
import OwnButton from './OwnButton'

export function scrollToNLForm() {
  document.getElementById('nl-form')?.scrollIntoView({ behavior: 'smooth' })
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

/**
 * Какой раздел сейчас на экране — для подсветки пункта меню.
 *
 * Раньше подсветка была привязана к порядковому номеру (`i === 0`), то есть «Состав
 * выпуска» выглядел активным всегда, даже когда читатель дошёл до футера. Теперь пункт
 * подсвечивается только когда его раздел действительно виден.
 *
 * Полоса наблюдения сдвинута вниз на высоту шапки (72px) и сужена до верхней половины
 * экрана: иначе при прокрутке два раздела одновременно попадают в кадр и подсветка
 * мигает между ними.
 */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length) setActive(visible[0].target.id)
      },
      { rootMargin: '-72px 0px -50% 0px', threshold: 0 }
    )
    const nodes = ids
      .map(id => document.getElementById(id))
      .filter((n): n is HTMLElement => Boolean(n))
    nodes.forEach(n => observer.observe(n))

    // Первый экран не входит в наблюдаемые разделы, поэтому наверху странице ни один пункт
    // не соответствует тому, что видно. Наблюдатель сам это не сбросит: он срабатывает
    // только на пересечениях и у самого верха оставлял подсвеченным последний раздел, в
    // котором читатель был. Отдельный сброс у верхней границы.
    function clearAtTop() {
      if (window.scrollY < 120) setActive(null)
    }
    clearAtTop()
    window.addEventListener('scroll', clearAtTop, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', clearAtTop)
    }
  }, [ids.join(',')])

  return active
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

/**
 * «Методология» переименована в «Пример выпуска»: на мобильной вёрстке сам раздел так и
 * назывался, а в меню и на десктопе стояла «Методология» — с телефона человек жал одно и
 * попадал в другое. Выбрано название раздела, а не меню: в ТЗ этот блок тоже называется
 * «Превью выпуска (sample)», и оно честнее описывает, что внутри.
 */
const NAV_LINKS = [
  { label: 'Состав выпуска',   id: 'nl-contents'     },
  { label: 'Пример выпуска',   id: 'nl-methodology'  },
  { label: 'Как это работает', id: 'nl-steps'        },
  { label: 'О платформе',      id: 'nl-about'        },
]

const NAV_IDS = NAV_LINKS.map(l => l.id)

export default function NLNav() {
  const visible = useNavVisible()
  const activeId = useActiveSection(NAV_IDS)
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
        style={{ background: 'var(--black-200)', borderBottom: '1px solid #1a1a1a', height: 72 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: visible ? 0 : -72 }}
        transition={{
          opacity: { duration: 0.3, ease: 'easeOut' },
          y: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
        }}
      >
        <div className="container-px mx-auto w-full max-w-[1440px] h-full flex items-center justify-between">
          {/* Logo */}
          {/* Было `href="#"` — клик дописывал решётку в адрес и дёргал страницу вверх. */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="AXEVIL Capital — наверх"
            className="shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <img src={asset('/img/newsletter/logo.svg')} alt="AXEVIL Capital" className="shrink-0 block"
              style={{ width: 'clamp(116px, 10.8vw, 155px)', height: 'clamp(18px, 1.7vw, 24px)' }} />
          </button>

          {/* Desktop: centered nav */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-1 h-8">
            {NAV_LINKS.map(({ label, id }) => {
              const isActive = id === activeId
              return (
                <button key={id} type="button" onClick={() => scrollTo(id)}
                  aria-current={isActive ? 'true' : undefined}
                  className="flex items-center justify-center px-4 py-2 rounded-[160px] font-inter-tight font-medium text-white text-center whitespace-nowrap transition-colors"
                  style={{ fontSize: 'var(--font-s)', lineHeight: 'normal', background: isActive ? 'rgba(255,255,255,0.05)' : 'transparent', opacity: isActive ? 1 : 0.8 }}>
                  {label}
                </button>
              )
            })}
          </div>

          {/* Desktop: CTA */}
          <div className="ml-auto hidden lg:flex">
            <button type="button" onClick={() => { analytics.ctaClick('nav'); scrollToNLForm() }}
              className="flex items-center gap-2 font-inter-tight font-semibold text-black-600 bg-white rounded-2xl hover:opacity-90 transition-opacity shrink-0"
              style={{ height: 40, paddingLeft: 16, paddingRight: 16, paddingTop: 13, paddingBottom: 16, fontSize: 'var(--font-m)', fontWeight: 600, lineHeight: '110%', letterSpacing: '-1px' }}>
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
                    style={{ minHeight: '3.5rem', fontSize: 'var(--font-l)', lineHeight: 1.35, letterSpacing: '-0.36px' }}>
                    <span>{label}</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden style={{ transform: 'rotate(-90deg)', opacity: 0.5, flexShrink: 0, display: 'block' }}>
                      <path d="M4 6L8 10L12 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                ))}
              </div>
              {/* gap auto — button pushed to bottom */}
              <div className="mt-auto pt-6">
                <OwnButton onClick={() => { analytics.ctaClick('nav_mobile'); scrollToNLForm(); setMenuOpen(false) }} label="Подписаться" fullWidth />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
