import { SectionHeading } from '@axevil/design-system/components'
import { EXITS } from './content'

export default function ExitsGrid() {
  return (
    <section id="exits" className="w-full" style={{ background: 'linear-gradient(180deg, var(--bg-100) 0%, var(--black-300) 100%)', padding: 'clamp(4rem, 8vw, 7.5rem) 0' }}>
      <div className="mx-auto w-full max-w-content container-px flex flex-col" style={{ gap: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
        <SectionHeading number="4.0" label={EXITS.eyebrow} title={EXITS.title} subtitle={EXITS.lead} titleMaxWidth="42.5rem" />
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '1.25rem' }}>
          {EXITS.cards.map((c) => (
            <article key={c.company} className="flex flex-col rounded-card bg-black-500" style={{ border: '1px solid var(--border-subtle)', padding: 'clamp(1.5rem, 3vw, 1.875rem)', gap: '0.75rem' }}>
              <div className="flex items-center justify-between" style={{ gap: '1.25rem', marginBottom: '0.5rem' }}>
                <h3 className="font-inter-tight font-semibold text-white text-h3">{c.company}</h3>
                <span className="font-inter-tight font-medium text-text-xs text-white/45" style={{ textTransform: 'uppercase', letterSpacing: '0.09375rem', textAlign: 'right' }}>{c.type}</span>
              </div>
              <span className="font-inter-tight font-semibold text-h3" style={{ color: 'var(--white-100)', lineHeight: 1.08 }}>{c.metric}</span>
              <p className="font-inter-tight font-medium text-text-s-med text-white/70">{c.copy}</p>
              <p className="font-inter-tight font-medium text-text-s-med" style={{ color: 'var(--white-300)', fontStyle: 'italic', borderTop: '1px solid var(--section-border)', paddingTop: '1rem', marginTop: '0.5rem' }}>{c.why}</p>
            </article>
          ))}
        </div>
        <p className="text-center font-inter-tight font-medium text-text-s-med" style={{ color: 'var(--white-300)', fontStyle: 'italic' }}>{EXITS.foot}</p>
      </div>
    </section>
  )
}
