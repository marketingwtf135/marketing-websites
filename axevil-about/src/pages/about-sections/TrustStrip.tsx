import { TRUST_STATS, COMPLIANCE } from './content'

export default function TrustStrip() {
  return (
    <section className="w-full bg-page-bg" style={{ borderTop: '1px solid var(--section-border)', borderBottom: '1px solid var(--section-border)', padding: 'clamp(2.5rem, 5vw, 3.375rem) 0' }}>
      <div className="mx-auto w-full max-w-content container-px flex flex-col" style={{ gap: '1.75rem' }}>
        <div className="grid grid-cols-2 md:grid-cols-4 text-center" style={{ gap: '2rem 1rem' }}>
          {TRUST_STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center" style={{ gap: '0.625rem' }}>
              <span className="font-inter-tight font-semibold text-h1-semi text-acc-gradient" style={{ lineHeight: 1 }}>{s.num}</span>
              <span className="font-inter-tight font-medium text-text-xs text-white/45" style={{ letterSpacing: '0.125rem', textTransform: 'uppercase' }}>{s.label}</span>
            </div>
          ))}
        </div>
        <p className="text-center font-inter-tight font-medium text-text-xs text-white/45">{COMPLIANCE}</p>
      </div>
    </section>
  )
}
