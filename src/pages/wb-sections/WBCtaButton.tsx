import { scrollToForm } from './WBNav'

interface WBCtaButtonProps {
  className?: string
  fullWidthMobile?: boolean
  label?: string
}

export default function WBCtaButton({ className = '', fullWidthMobile: _fullWidthMobile = false, label = 'Reserve a seat' }: WBCtaButtonProps) {
  return (
    <button
      type="button"
      onClick={scrollToForm}
      className={`relative flex items-center justify-center gap-2
  w-full sm:w-auto
  h-14 md:h-16
  px-6 sm:px-8
  rounded-2xl font-inter-tight font-semibold
  text-[0.875rem] md:text-[1.125rem]
  text-btn-label transition-all duration-300
  border-b-4 border-btn-border
  hover:shadow-[32px_32px_32px_rgba(255,255,255,0.25),12px_12px_16px_rgba(255,255,255,0.25),2px_2px_8px_rgba(255,255,255,0.5)]
  hover:scale-[1.02]
  focus-visible:outline focus-visible:outline-2 focus-visible:outline-white
  ${className}`}
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
      <span className="relative z-10">{label}</span>
    </button>
  )
}
