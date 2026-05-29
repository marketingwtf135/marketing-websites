import { SectionHeading } from '@axevil/design-system/components'
import { LEGAL } from './content'

export default function LegalInfra() {
  return (
    <section id="legal" className="w-full" style={{ background: 'linear-gradient(180deg, var(--bg-100) 0%, var(--black-300) 100%)', padding: 'clamp(4rem, 8vw, 7.5rem) 0' }}>
      <div className="mx-auto w-full max-w-content container-px flex flex-col" style={{ gap: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
        <SectionHeading number="6.0" label={LEGAL.eyebrow} title={LEGAL.title} subtitle={LEGAL.lead} titleMaxWidth="42.5rem" />

        {/* Diagram */}
        <div className="flex flex-col rounded-card-lg bg-black-500" style={{ border: '1px solid var(--border-subtle)', padding: 'clamp(1.5rem, 3vw, 1.875rem)', gap: '1.375rem' }}>
          <div className="flex flex-col lg:flex-row lg:items-stretch" style={{ gap: '0.625rem' }}>
            {LEGAL.boxes.map((b, i) => (
              <div key={b.title} className="flex flex-col lg:flex-row lg:items-center lg:flex-1" style={{ gap: '0.625rem' }}>
                <div className="flex flex-col w-full lg:flex-1" style={{ borderRadius: '1rem', border: '1px solid var(--black-600)', background: 'rgba(255,255,255,0.03)', padding: '1.375rem', minHeight: '9.375rem', gap: '0.625rem' }}>
                  <span className="font-inter-tight font-medium text-text-xs" style={{ color: 'var(--status-open)', letterSpacing: '0.09375rem', textTransform: 'uppercase' }}>{b.kicker}</span>
                  <h3 className="font-inter-tight font-semibold text-white text-xl">{b.title}</h3>
                  <p className="font-inter-tight font-medium text-text-s-med text-white/55">{b.copy}</p>
                </div>
                {i < LEGAL.boxes.length - 1 && (
                  <span className="self-center font-inter-tight rotate-90 lg:rotate-0" style={{ color: 'var(--status-open)', fontSize: '1.375rem' }} aria-hidden>→</span>
                )}
              </div>
            ))}
          </div>

          {/* Messages */}
          <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: '1rem' }}>
            {LEGAL.messages.map((m) => (
              <p key={m.strong} className="font-inter-tight font-medium text-text-s-med text-white/70" style={{ borderTop: '1px solid var(--section-border)', paddingTop: '1rem' }}>
                <strong className="text-white font-semibold">{m.strong}</strong> {m.rest}
              </p>
            ))}
          </div>
        </div>

        {/* Partners */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: '1rem' }}>
          {LEGAL.partners.map((p) => (
            <div key={p.title} className="flex flex-col rounded-card bg-surface-0" style={{ border: '1px solid var(--border-subtle)', padding: '1.5rem', gap: '0.625rem' }}>
              <span className="font-inter-tight font-medium text-text-xs text-white/45" style={{ textTransform: 'uppercase', letterSpacing: '0.09375rem' }}>{p.type}</span>
              <h3 className="font-inter-tight font-semibold text-white text-xl">{p.title}</h3>
              <p className="font-inter-tight font-medium text-text-s-med text-white/70">{p.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
