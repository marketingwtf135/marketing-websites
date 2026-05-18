import type { ReactNode, CSSProperties } from 'react'

interface InsiderCtaBtnProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  type?: 'button' | 'submit'
  onClick?: () => void
}

export default function InsiderCtaBtn({ children, className = '', style, type = 'button', onClick }: InsiderCtaBtnProps) {
  function handleClick() {
    onClick?.()
    const el = document.getElementById('insider-form')
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`relative flex items-center justify-center gap-2.5 h-16 px-8 rounded-2xl font-inter-tight font-semibold text-text-btn text-btn-label hover:scale-[1.02] transition-transform border-b-4 border-btn-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${className}`}
      style={{
        boxShadow: '32px 32px 32px rgba(255,255,255,0.25), 12px 12px 16px rgba(255,255,255,0.25), 2px 2px 8px rgba(255,255,255,0.5)',
        ...style,
      }}
    >
      <div className="absolute inset-0 rounded-2xl bg-white pointer-events-none" />
      <img
        alt=""
        src="/img/block01/btn-overlay.png"
        className="absolute inset-0 w-full h-full rounded-2xl object-bottom mix-blend-overlay pointer-events-none"
      />
      <span className="relative z-10">{children}</span>
    </button>
  )
}
