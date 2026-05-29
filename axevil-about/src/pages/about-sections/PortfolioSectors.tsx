import { SectionHeading, BtnOwn, DescTag } from '@axevil/design-system/components'
import { PORTFOLIO } from './content'
import CompanyChip from './CompanyChip'

export default function PortfolioSectors() {
  const lm = PORTFOLIO.leadmagnet
  return (
    <section id="portfolio" className="w-full bg-page-bg" style={{ padding: 'clamp(4rem, 8vw, 7.5rem) 0' }}>
      <div className="mx-auto w-full max-w-content container-px flex flex-col" style={{ gap: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
        <SectionHeading number="2.0" label={PORTFOLIO.eyebrow} title={PORTFOLIO.title} subtitle={PORTFOLIO.lead} titleMaxWidth="42.5rem" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: '1rem' }}>
          {PORTFOLIO.sectors.map((s) => (
            <div key={s.title} className="flex flex-col rounded-card bg-surface-0" style={{ border: '1px solid var(--border-subtle)', padding: '1.5rem', gap: '1rem' }}>
              <span className="font-inter-tight font-semibold text-acc-gradient" style={{ fontSize: '1.875rem', lineHeight: 1 }}>{s.count}</span>
              <h3 className="font-inter-tight font-semibold text-white text-xl">{s.title}</h3>
              <div className="flex flex-wrap" style={{ gap: '0.5rem' }}>
                {s.companies.map((c) => <CompanyChip key={c} name={c} />)}
              </div>
              <p className="font-inter-tight font-medium text-text-s-med text-white/45">{s.note}</p>
            </div>
          ))}
        </div>

        {/* Lead-magnet */}
        <div className="rounded-card-lg bg-black-500" style={{ border: '1px solid rgba(77,186,121,0.2)', padding: 'clamp(1.5rem, 3vw, 1.875rem)' }}>
          <div className="grid items-center lg:grid-cols-[17.5rem_1fr]" style={{ gap: '2rem' }}>
            <div className="flex flex-col justify-between" style={{ minHeight: '13.75rem', borderRadius: '1rem', padding: '1.5rem', border: '1px solid var(--border-subtle)', background: 'radial-gradient(circle at 20% 20%, rgba(77,186,121,0.18), transparent 38%), linear-gradient(135deg,#111,#1c1c1c)' }}>
              <span className="font-inter-tight font-medium text-text-xs" style={{ color: 'var(--status-open)', letterSpacing: '0.09375rem' }}>{lm.tag}</span>
              <span className="font-inter-tight font-semibold text-white text-h4">{lm.coverTitle}</span>
              <span className="font-inter-tight font-medium text-text-xs text-white/45">{lm.coverFoot}</span>
            </div>
            <div className="flex flex-col" style={{ gap: '1rem' }}>
              <DescTag number="3.0" label={lm.eyebrow} />
              <h3 className="font-inter-tight font-semibold text-white text-h4">{lm.title}</h3>
              <p className="font-inter-tight font-medium text-paragraph text-white/70" style={{ maxWidth: '42.5rem' }}>{lm.body}</p>
              <div><BtnOwn size="L" hideIcon onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}>{lm.cta}</BtnOwn></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
