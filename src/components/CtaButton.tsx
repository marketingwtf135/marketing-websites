import type { ReactNode, CSSProperties } from 'react'

interface CtaButtonProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  type?: 'button' | 'submit'
  onClick?: () => void
}

export default function CtaButton({ children, className = '', style, type = 'button', onClick }: CtaButtonProps) {
  return (
    <button
      type={type}
      onClick={() => { onClick?.(); window.dispatchEvent(new CustomEvent('open-quiz')) }}
      className={`flex items-center justify-center gap-2 rounded-2xl font-inter-tight font-semibold text-text-btn hover:scale-[1.02] transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${className}`}
      style={{
        background: '#ffffff',
        color: '#202020',
        height: '64px',
        padding: '13px 32px 16px',
        borderBottom: '3px solid #b8b8b8',
        boxShadow: '32px 32px 32px rgba(255,255,255,0.25), 12px 12px 16px rgba(255,255,255,0.25), 2px 2px 8px rgba(255,255,255,0.5)',
        ...style,
      }}
    >
      <img
        src="/img/block01/cta-key-icon.svg"
        alt=""
        aria-hidden="true"
        width={24}
        height={24}
      />
      <span>{children}</span>
    </button>
  )
}
