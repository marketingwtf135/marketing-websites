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
    <section className="w-full bg-page-bg" style={{ paddingTop: 'clamp(60px, 10vw, 100px)', paddingBottom: 'clamp(60px, 10vw, 100px)' }}>
      <div className="mx-auto w-full max-w-content container-px flex flex-col gap-6 items-center">

        {/* Heading */}
        <div className="flex flex-col gap-6 sm:gap-8 items-center text-center">
          <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l text-neutral-30">
            <span className="opacity-50">4.0</span>
            <span className="opacity-80">Efficiency</span>
          </div>
          <h2
            className="font-inter-tight font-semibold text-transparent bg-clip-text text-center pb-2"
            style={{
              fontSize: 'clamp(36px, 6vw, 64px)', lineHeight: 1.05, letterSpacing: '-0.02em',
              backgroundImage: 'linear-gradient(94deg, #A2A2A2 4.07%, #FFF 49.51%, #A2A2A2 94.94%)',
            }}
          >
            {heading}
          </h2>
        </div>

        {/* Paragraph + tabs + table */}
        <div className="flex flex-col gap-8 lg:gap-10 items-center w-full">
          <p className="font-inter-tight font-medium text-text-l text-white/60 text-center" style={{ maxWidth: 710 }}>
            The Anthropic valuation has more than doubled in the last year. This growth follows major
            investments from tech giants and successful Anthropic funding rounds.
          </p>

          {/* Tabs + table */}
          <div className="flex flex-col gap-6 items-center w-full">
            {/* Tabs */}
            <div className="flex items-center gap-2">
              {TABS.map(({ id, label }) => {
                const active = tab === id
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setTab(id)}
                    className="flex items-center justify-center font-inter-tight font-medium text-text-m sm:text-text-l transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                    style={{
                      height: 48, padding: '12px 18px', borderRadius: 14,
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

            {/* Table — desktop view (≥sm) */}
            <div className="hidden sm:block w-full" style={{ maxWidth: 900 }}>
              <div
                className="flex items-center justify-between"
                style={{
                  padding: 'clamp(16px, 2.5vw, 24px)',
                  background: '#151515',
                  borderRadius: '16px 16px 0 0',
                }}
              >
                {colHeaders.map((h) => (
                  <span key={h} className="font-inter-tight font-medium text-text-m text-neutral-30 flex-1 min-w-0">
                    {h}
                  </span>
                ))}
              </div>
              <div
                style={{
                  background: '#111111',
                  borderRadius: '0 0 16px 16px',
                  padding: '0 clamp(16px, 2.5vw, 24px) clamp(16px, 2.5vw, 24px)',
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
                    <span className="font-inter-tight font-medium text-text-l text-white flex-1 min-w-0">{r.year}</span>
                    <span className="font-inter-tight font-medium text-text-l text-white flex-1 min-w-0">{r.price}</span>
                    <div className="flex-1 min-w-0"><GrowthBadge value={r.growth} /></div>
                    {'activity' in r && (
                      <span className="font-inter-tight font-medium text-text-l text-white flex-1 min-w-0">{(r as typeof YEARLY_ROWS[0]).activity}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile view — card-style stacked rows */}
            <div className="sm:hidden flex flex-col gap-2 w-full">
              {rows.map((r) => (
                <div
                  key={r.year}
                  className="flex flex-col gap-3 rounded-2xl"
                  style={{ background: '#111111', padding: '16px', border: '1px solid #1d1d1d' }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-inter-tight font-semibold text-white text-h5" style={{ fontSize: 18 }}>{r.year}</span>
                    <GrowthBadge value={r.growth} />
                  </div>
                  <div className="flex items-center justify-between" style={{ borderTop: '1px dashed #2a2a2a', paddingTop: 12 }}>
                    <span className="font-inter-tight font-medium text-text-m text-white/60">Price (AVG)</span>
                    <span className="font-inter-tight font-medium text-text-m text-white">{r.price}</span>
                  </div>
                  {'activity' in r && (
                    <div className="flex items-center justify-between">
                      <span className="font-inter-tight font-medium text-text-m text-white/60">Market Activity</span>
                      <span className="font-inter-tight font-medium text-text-m text-white">{(r as typeof YEARLY_ROWS[0]).activity}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
