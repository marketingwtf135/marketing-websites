import type { ReactNode, CSSProperties } from 'react'

interface PDFCtaButtonProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  type?: 'button' | 'submit'
  onClick?: () => void
  scrollTo?: string
}

export default function PDFCtaButton({
  children, className = '', style, type = 'button', onClick, scrollTo = 'pdf-form',
}: PDFCtaButtonProps) {
  function handleClick() {
    onClick?.()
    if (type !== 'submit') {
      document.getElementById(scrollTo)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`cta-button-glow relative flex items-center justify-center gap-2 font-inter-tight font-semibold shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white disabled:opacity-60 transition-all duration-300 ${className}`}
      style={{
        background: 'white',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        borderBottom: '3px solid #b8b8b8',
        height: 'clamp(3.5rem, 4.5vw, 4rem)',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        paddingTop: '0.8125rem',
        paddingBottom: '1rem',
        borderRadius: '1rem',
        fontSize: 'clamp(1rem, 1.25vw, 1.125rem)',
        fontWeight: 600,
        lineHeight: '110%',
        letterSpacing: '-0.6px',
        color: '#202020',
        fontFamily: '"Inter Tight", sans-serif',
        cursor: 'pointer',
        ...style,
      }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
        <path d="M9 2v9M5.5 7.5L9 11l3.5-3.5" stroke="#202020" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 13.5h12" stroke="#202020" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
      {children}
    </button>
  )
}
