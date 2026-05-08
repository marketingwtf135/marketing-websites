import { useState } from 'react'

type TabId = 'yearly' | 'valuation'

const YEARLY_ROWS = [
  { year: '2024',       price: '$30.00',  growth: '+167%', activity: 'Moderate'  },
  { year: '2025',       price: '$140.97', growth: '+370%', activity: 'High'      },
  { year: '2026 (YTD)', price: '$262.34', growth: '+86%',  activity: 'Very High' },
]

const VALUATION_ROWS = [
  { year: '2024',       price: '$30.00',  growth: '—'     },
  { year: '2025',       price: '$140.97', growth: '+370%' },
  { year: '2026 (YTD)', price: '$262.34', growth: '+86%'  },
]

function GrowthBadge({ value }: { value: string }) {
  if (value === '—') {
    return (
      <span className="font-inter-tight font-medium text-text-l text-white" style={{ opacity: 0.5 }}>
        {value}
      </span>
    )
  }
  return (
    <div
      className="inline-flex items-center justify-center font-inter-tight font-medium text-s-med text-status-open rounded-full"
      style={{
        height: 32, padding: '0 12px',
        background: 'rgba(77,186,121,0.1)',
        border: '1px solid rgba(77,186,121,0.25)',
      }}
    >
      {value}
    </div>
  )
}

const TABS: { id: TabId; label: string }[] = [
  { id: 'yearly',    label: 'Yearly Perfomance'  },
  { id: 'valuation', label: 'Valuation history'  },
]

/** Section 4 — Yearly Performance (Figma 89:402 / 142:10944) */
export default function CSYearlyPerformance() {
  const [tab, setTab] = useState<TabId>('yearly')

  const isValuation = tab === 'valuation'
  const heading     = isValuation ? 'Valuation history' : 'Yearly Perfomance'
  const rows        = isValuation ? VALUATION_ROWS : YEARLY_ROWS
  const colHeaders  = isValuation
    ? ['Year', 'Price (AVG)', 'Growth (YOY)']
    : ['Year', 'Price (AVG)', 'Growth (YOY)', 'Market Activity']

  return (
    <section className="w-full bg-page-bg padding-section-t6-b6">
      <div className="mx-auto w-full max-w-content flex flex-col gap-6 items-center">

        {/* Heading */}
        <div className="flex flex-col gap-8 items-center text-center">
          <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l text-neutral-30">
            <span className="opacity-50">4.0</span>
            <span className="opacity-80">Efficiency</span>
          </div>
          <h2
            className="font-inter-tight font-semibold text-transparent bg-clip-text text-center whitespace-nowrap pb-2"
            style={{
              fontSize: 64, lineHeight: 1, letterSpacing: '-0.02em',
              backgroundImage: 'linear-gradient(97.274deg, #ffffff 0.176%, #b7b7b7 98.822%)',
            }}
          >
            {heading}
          </h2>
        </div>

        {/* Paragraph + tabs + table */}
        <div className="flex flex-col gap-10 items-center w-full">
          <p className="font-inter-tight font-medium text-text-l text-white/60 text-center" style={{ maxWidth: 710 }}>
            The Anthropic valuation has more than doubled in the last year. This growth follows major
            investments from tech giants and successful Anthropic funding rounds.
          </p>

          {/* Tabs + table */}
          <div className="flex flex-col gap-6 items-center">
            {/* Tabs */}
            <div className="flex items-center gap-2">
              {TABS.map(({ id, label }) => {
                const active = tab === id
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setTab(id)}
                    className="flex items-center justify-center font-inter-tight font-medium text-text-l transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                    style={{
                      height: 52, padding: '16px 24px', borderRadius: 16,
                      background: active ? '#fff' : '#151515',
                      color: active ? '#000' : 'rgba(255,255,255,0.5)',
                      letterSpacing: '-0.02em', whiteSpace: 'nowrap',
                    }}
                  >
                    {label}
                  </button>
                )
              })}
            </div>

            {/* Table */}
            <div style={{ width: 900 }}>
              {/* Header row */}
              <div
                className="flex items-center justify-between"
                style={{
                  padding: 24,
                  background: '#151515',
                  borderRadius: '16px 16px 0 0',
                }}
              >
                {colHeaders.map((h) => (
                  <span key={h} className="font-inter-tight font-medium text-text-m text-neutral-30" style={{ width: 160 }}>
                    {h}
                  </span>
                ))}
              </div>
              {/* Data rows */}
              <div
                style={{
                  background: '#111111',
                  borderRadius: '0 0 16px 16px',
                  padding: '0 24px 24px',
                }}
              >
                {rows.map((r, i) => (
                  <div
                    key={r.year}
                    className="flex items-center justify-between"
                    style={{
                      padding: '20px 0',
                      borderBottom: i < rows.length - 1 ? '1px dashed #2a2a2a' : 'none',
                    }}
                  >
                    <span className="font-inter-tight font-medium text-text-l text-white" style={{ width: 160 }}>{r.year}</span>
                    <span className="font-inter-tight font-medium text-text-l text-white" style={{ width: 160 }}>{r.price}</span>
                    <div style={{ width: 160 }}><GrowthBadge value={r.growth} /></div>
                    {'activity' in r && (
                      <span className="font-inter-tight font-medium text-text-l text-white" style={{ width: 160 }}>{(r as typeof YEARLY_ROWS[0]).activity}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
