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
      className={`cta-button-glow flex items-center justify-center gap-2 rounded-2xl font-inter-tight font-semibold text-text-btn transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${className}`}
      style={{
        background: '#ffffff',
        color: '#202020',
        height: '64px',
        padding: '13px 32px 16px',
        borderBottom: '3px solid #b8b8b8',
        ...style,
      }}
    >
      <img
        src="/icons/Key.svg"
        alt=""
        aria-hidden="true"
        width={24}
        height={24}
        style={{ filter: 'brightness(0)' }}
      />
      <span>{children}</span>
    </button>
  )
}
