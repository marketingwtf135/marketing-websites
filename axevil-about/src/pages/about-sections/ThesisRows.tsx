import { SectionHeading } from '@axevil/design-system/components'
import { THESIS } from './content'

export default function ThesisRows() {
  return (
    <section id="thesis" className="w-full" style={{ background: 'linear-gradient(180deg, var(--bg-100) 0%, var(--black-300) 100%)', padding: 'clamp(4rem, 8vw, 7.5rem) 0' }}>
      <div className="mx-auto w-full max-w-content container-px flex flex-col" style={{ gap: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
        <SectionHeading number="1.0" label={THESIS.eyebrow} title={THESIS.title} subtitle={THESIS.lead} titleMaxWidth="42.5rem" />
        <div className="flex flex-col">
          {THESIS.rows.map((r, i) => (
            <div
              key={r.num}
              className="grid items-start md:items-center md:grid-cols-[13rem_14rem_1fr]"
              style={{ gap: 'clamp(1rem, 2vw, 2.75rem)', padding: 'clamp(1.5rem, 3vw, 2.25rem) 0', borderTop: '1px solid var(--section-border)', borderBottom: i === THESIS.rows.length - 1 ? '1px solid var(--section-border)' : undefined }}
            >
              <div className="flex flex-col" style={{ gap: '0.5rem' }}>
                <span className="font-inter-tight font-semibold" style={{ fontSize: '1.75rem', color: 'rgba(77,186,121,0.5)' }}>{r.num}</span>
                <span className="font-inter-tight font-semibold text-white text-xl">{r.title}</span>
              </div>
              <div className="flex flex-col" style={{ gap: '0.5rem' }}>
                <span className="font-inter-tight font-semibold text-h2 text-acc-gradient" style={{ lineHeight: 1 }}>{r.stat}</span>
                <span className="font-inter-tight font-medium text-text-xs text-white/45" style={{ textTransform: 'uppercase', letterSpacing: '0.09375rem' }}>{r.statLabel}</span>
              </div>
              <p className="font-inter-tight font-medium text-paragraph text-white/70">{r.copy}</p>
            </div>
          ))}
        </div>
        <p className="font-inter-tight font-medium text-text-xs text-white/40" style={{ borderTop: '1px solid var(--section-border)', paddingTop: '1.125rem' }}>{THESIS.sources}</p>
      </div>
    </section>
  )
}
