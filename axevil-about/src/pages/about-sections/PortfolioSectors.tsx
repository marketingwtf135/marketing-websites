import { SectionHeading, StatusPill, type StatusKind, BtnOwn } from '@axevil/design-system/components'
import { PORTFOLIO, PORTFOLIO_COMPANIES, PORTFOLIO_CTA } from './content'

/**
 * About — Portfolio Sectors (port of RIPortfolio)
 * Cards: logo top-left + StatusPill top-right · category as h4 · body · lock link.
 */

interface Company {
  logo: string
  status: StatusKind
  statusLabel: string
  category: string
  body: string
}

export default function PortfolioSectors() {
  return (
    <section id="portfolio" className="relative w-full bg-page-bg padding-section-t6-b6">
      <div className="mx-auto w-full max-w-content container-px flex flex-col items-center" style={{ gap: '2rem' }}>
        <div style={{ maxWidth: '50rem' }}>
          <SectionHeading
            number="3.0"
            label={PORTFOLIO.eyebrow}
            title={PORTFOLIO.title}
            subtitle={PORTFOLIO.lead}
            gap="1.5rem"
          />
        </div>

        {/* Cards grid + "See all" CTA grouped */}
        <div className="flex flex-col items-center w-full" style={{ gap: '2rem' }}>
          {/* Cards grid 3 cols desktop / 2 tablet / 1 mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full" style={{ gap: '1rem' }}>
            {PORTFOLIO_COMPANIES.map((company, i) => (
              <CompanyCard
                key={i}
                logo={company.logo}
                status={company.status}
                statusLabel={company.statusLabel}
                category={company.category}
                body={company.body}
              />
            ))}
          </div>

          {/* "See all" CTA — mobile full-width capped at 30rem; sm+ auto width */}
          <BtnOwn
            size="L"
            hideIcon
            className="w-full max-w-[30rem] sm:w-auto sm:max-w-none"
            onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {PORTFOLIO_CTA}
          </BtnOwn>
        </div>
      </div>
    </section>
  )
}

function CompanyCard({ logo, status, statusLabel, category, body }: Company) {
  return (
    <div
      className="relative flex flex-col w-full"
      style={{
        background: 'var(--color-bg-card)',
        borderRadius: '1rem',
        padding: '1rem',
        gap: '1.5rem',
      }}
    >
      {/* Logo + status row */}
      <div className="flex items-center justify-between">
        <img src={logo} alt="" aria-hidden="true" style={{ height: '1.25rem', width: 'auto', objectFit: 'contain' }} />
        <StatusPill status={status} label={statusLabel} />
      </div>

      {/* Category (h4 token) + body */}
      <div className="flex flex-col" style={{ gap: '0.75rem' }}>
        <h4 className="font-inter-tight font-medium text-h4 text-white" style={{ margin: 0 }}>{category}</h4>
        <p className="font-inter-tight font-medium text-text-m text-white-300">{body}</p>
      </div>

      {/* Lock CTA — bottom */}
      <div
        className="flex items-center"
        style={{
          marginTop: 'auto',
          padding: '1rem 0 0',
          borderTop: '1px solid var(--border-subtle)',
          gap: '0.5rem',
        }}
      >
        <img src="/about/icons/Lock.svg" alt="" aria-hidden="true" style={{ width: '1rem', height: '1rem', opacity: 0.5 }} />
        <span className="font-inter-tight font-medium text-text-s-med text-white-400">Условия — в приложении</span>
      </div>
    </div>
  )
}
