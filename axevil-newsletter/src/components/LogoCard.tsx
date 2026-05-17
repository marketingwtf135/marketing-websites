import type { ReactNode } from 'react'

interface LogoCardProps {
  logoSrc: string
  logoAlt: string
  strokeGradient?: string
  children?: ReactNode
}

export default function LogoCard({ logoSrc, logoAlt, strokeGradient, children }: LogoCardProps) {
  const borderStyle = strokeGradient
    ? {
        border: '1px solid transparent',
        backgroundImage: `linear-gradient(var(--page-bg), var(--page-bg)), ${strokeGradient}`,
        backgroundOrigin: 'padding-box, border-box',
        backgroundClip: 'padding-box, border-box',
      }
    : undefined

  return (
    <div
      className={`flex flex-col items-center justify-between p-6 rounded-card-lg shrink-0 ${!strokeGradient ? 'border border-white/15' : ''}`}
      style={{ width: '260px', height: '240px', ...borderStyle }}
    >
      {children ? (
        <>
          {children}
          <img src={logoSrc} alt={logoAlt} width={212} height={27} className="object-contain" />
          <div />
        </>
      ) : (
        <img src={logoSrc} alt={logoAlt} width={212} height={27} className="object-contain m-auto" />
      )}
    </div>
  )
}
