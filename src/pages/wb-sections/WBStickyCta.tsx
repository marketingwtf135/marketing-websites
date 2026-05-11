import { useEffect, useState } from 'react'
import { scrollToForm } from './WBNav'

export default function WBStickyCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function check() {
      const hero = document.getElementById('wb-hero')
      const form = document.getElementById('wb-form')
      if (!hero) return

      const heroBottom = hero.getBoundingClientRect().bottom
      const formTop = form?.getBoundingClientRect().top ?? Infinity

      // Show after hero scrolled past; hide when form is in view
      setVisible(heroBottom < 0 && formTop > window.innerHeight)
    }

    window.addEventListener('scroll', check, { passive: true })
    check()
    return () => window.removeEventListener('scroll', check)
  }, [])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden transition-transform duration-300 ${visible ? 'translate-y-0' : 'translate-y-full'}`}
      style={{
        background: 'rgba(10, 10, 10, 0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '0.75rem 1.25rem',
        paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))',
      }}
    >
      <button
        type="button"
        onClick={scrollToForm}
        className="w-auto px-8 flex items-center justify-center font-inter-tight font-semibold text-[16px] text-phone-bg bg-white hover:scale-[1.01] active:scale-[0.99] transition-transform rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        style={{ height: '3.5rem', minHeight: '3.5rem' }}
      >
        Register
      </button>
    </div>
  )
}
