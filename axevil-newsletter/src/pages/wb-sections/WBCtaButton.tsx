import { scrollToForm } from './WBNav'

interface WBCtaButtonProps {
  className?: string
  fullWidthMobile?: boolean
}

export default function WBCtaButton({ className = '', fullWidthMobile = false }: WBCtaButtonProps) {
  const widthClass = fullWidthMobile ? 'w-full sm:w-auto' : ''
  return (
    <button
      type="button"
      onClick={scrollToForm}
      className={`relative flex items-center justify-center gap-2 h-14 md:h-16 px-8 rounded-2xl font-inter-tight font-semibold text-[15px] md:text-[18px] text-btn-label hover:scale-[1.02] transition-transform border-b-4 border-btn-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${widthClass} ${className}`}
      style={{
        boxShadow: '32px 32px 32px rgba(255,255,255,0.25), 12px 12px 16px rgba(255,255,255,0.25), 2px 2px 8px rgba(255,255,255,0.5)',
        minHeight: 56,
      }}
    >
      <div className="absolute inset-0 rounded-2xl bg-white pointer-events-none" />
      <img
        alt=""
        src="/img/block01/btn-overlay.png"
        className="absolute inset-0 w-full h-full rounded-2xl object-bottom mix-blend-overlay pointer-events-none"
      />
      <span
        className="relative z-10 shrink-0 rounded-full"
        style={{ width: 8, height: 8, background: '#2b2b2b' }}
      />
      <span className="relative z-10">Register for webinar</span>
    </button>
  )
}
