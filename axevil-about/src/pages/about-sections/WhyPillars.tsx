import { SectionHeading } from '@axevil/design-system/components'
import { WHY } from './content'

export default function WhyPillars() {
  return (
    <section id="why" className="w-full bg-page-bg" style={{ padding: 'clamp(4rem, 8vw, 7.5rem) 0' }}>
      <div className="mx-auto w-full max-w-content container-px flex flex-col" style={{ gap: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
        <SectionHeading number="5.0" label={WHY.eyebrow} title={WHY.title} subtitle={WHY.lead} titleMaxWidth="42.5rem" />
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '1.25rem' }}>
          {WHY.pillars.map((p) => (
            <div key={p.num} className="flex flex-col rounded-card bg-surface-0" style={{ border: '1px solid var(--border-subtle)', padding: '1.5rem', gap: '1.25rem' }}>
              <span className="font-inter-tight font-semibold text-acc-gradient" style={{ fontSize: '2.375rem', lineHeight: 1 }}>{p.num}</span>
              <h3 className="font-inter-tight font-semibold text-white text-h4">{p.title}</h3>
              <p className="font-inter-tight font-medium text-text-s-med text-white/70">{p.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
