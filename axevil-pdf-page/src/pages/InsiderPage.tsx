import { useState, useEffect, useRef } from 'react'
import FadeIn from '../components/FadeIn'
import PDFNav from './pdf-sections/PDFNav'
import PS1Hero from './pdf-sections/PS1Hero'
import PS2KeyQuestions from './pdf-sections/PS2KeyQuestions'
import PS3Preview from './pdf-sections/PS3Preview'
import PS4Methodology from './pdf-sections/PS4Methodology'
import PS5StayCurrent from './pdf-sections/PS5StayCurrent'
import PS6WhoFor from './pdf-sections/PS6WhoFor'
import PS7About from './pdf-sections/PS7About'
import PS8Form from './pdf-sections/PS8Form'
import PS9Footer from './pdf-sections/PS9Footer'
import PDFCtaButton from '../components/PDFCtaButton'

export default function InsiderPage() {
  const [stickyVisible, setStickyVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const formElRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    function onScroll() {
      const heroBottom = heroRef.current
        ? heroRef.current.getBoundingClientRect().bottom + window.scrollY
        : 0
      const pastHero = window.scrollY > heroBottom - 100

      if (!formElRef.current) {
        formElRef.current = document.getElementById('pdf-form') as HTMLElement | null
      }
      let formNear = false
      if (formElRef.current) {
        const rect = formElRef.current.getBoundingClientRect()
        formNear = rect.top < window.innerHeight + 100 && rect.bottom > -100
      }

      setStickyVisible(pastHero && !formNear)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollToForm() {
    document.getElementById('pdf-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main className="bg-page-bg overflow-x-clip">
      <PDFNav />

      <div ref={heroRef}>
        <PS1Hero />
      </div>

      <FadeIn><PS2KeyQuestions /></FadeIn>
      <FadeIn><PS3Preview /></FadeIn>
      <FadeIn><PS4Methodology /></FadeIn>
      <FadeIn><PS5StayCurrent /></FadeIn>
      <FadeIn><PS6WhoFor /></FadeIn>
      <FadeIn><PS7About /></FadeIn>
      <PS8Form />
      <PS9Footer />

      {/* Sticky mobile CTA — appears after Hero, hides near form, mobile only */}
      {stickyVisible && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden"
          style={{
            padding: '0.75rem 1rem',
            background: 'rgba(8,8,8,0.95)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          <PDFCtaButton
            onClick={scrollToForm}
            className="w-full"
            style={{ width: '100%' }}
          >
            Скачать PDF
          </PDFCtaButton>
        </div>
      )}
    </main>
  )
}
