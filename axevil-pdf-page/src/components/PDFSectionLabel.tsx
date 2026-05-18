import type { ReactNode } from 'react'

interface PDFSectionLabelProps {
  children: ReactNode
  className?: string
}

export default function PDFSectionLabel({ children, className = '' }: PDFSectionLabelProps) {
  return (
    <p
      className={`font-inter-tight font-medium ${className}`}
      style={{ fontSize: '1.125rem', lineHeight: 1.35, letterSpacing: '-0.02em', color: '#848484' }}
    >
      {children}
    </p>
  )
}
