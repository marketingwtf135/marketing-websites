import { useEffect, useState } from 'react'

const STORAGE_KEY = 'wb_cookie_consent'

export default function WBCookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    // Consent Mode v2: update consent state
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      })
    }
    setVisible(false)
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[60] sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-[400px]"
      style={{
        background: '#141414',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '16px 16px 0 0',
        padding: '20px',
      }}
    >
      <p className="font-inter-tight font-medium text-white/60 text-[13px] leading-[1.5] mb-4">
        We use cookies to improve your experience and for analytics. By clicking "Accept", you consent to our{' '}
        <a href="#" className="text-white/80 underline underline-offset-2 hover:text-white transition-colors">
          Cookie Policy
        </a>
        .
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={accept}
          className="flex-1 h-10 rounded-[10px] font-inter-tight font-semibold text-[13px] text-phone-bg bg-white hover:scale-[1.01] transition-transform"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={decline}
          className="flex-1 h-10 rounded-[10px] font-inter-tight font-medium text-[13px] text-white/50 hover:text-white transition-colors"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          Decline
        </button>
      </div>
    </div>
  )
}
