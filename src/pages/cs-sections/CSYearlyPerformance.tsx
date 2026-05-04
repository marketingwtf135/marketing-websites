import { useState } from 'react'

type TabId = 'yearly' | 'valuation'

const YEARLY_ROWS = [
  { year: '2024',       price: '$30.00',   growth: '+167%', activity: 'Moderate' },
  { year: '2025',       price: '$140.97',  growth: '+370%', activity: 'High'     },
  { year: '2026 (YTD)', price: '$262.34',  growth: '+86%',  activity: 'Very High'},
]

const VALUATION_ROWS = [
  { year: 'Seed 2021',    price: '$4B',    growth: '—',      activity: 'Low'     },
  { year: 'Series A 2022', price: '$5.2B', growth: '+30%',   activity: 'Low'     },
  { year: 'Series B 2022', price: '$18B',  growth: '+246%',  activity: 'Moderate'},
  { year: 'Series C 2023', price: '$29B',  growth: '+61%',   activity: 'High'    },
  { year: 'Series E 2024', price: '$61.5B',growth: '+112%',  activity: 'Very High'},
]

function GrowthBadge({ value }: { value: string }) {
  if (value === '—') return <span className="font-inter-tight font-medium text-text-l text-white/40">{value}</span>
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

/** Section 4 — Yearly Performance (Figma 89:402) */
export default function CSYearlyPerformance() {
  const [tab, setTab] = useState<TabId>('yearly')
  const rows = tab === 'yearly' ? YEARLY_ROWS : VALUATION_ROWS

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
            className="font-inter-tight font-semibold text-transparent bg-clip-text text-center whitespace-nowrap"
            style={{
              fontSize: 64, lineHeight: 1, letterSpacing: '-0.02em',
              backgroundImage: 'linear-gradient(98.203deg, #ffffff 0.176%, #b7b7b7 98.822%)',
            }}
          >
            Yearly Perfomance
          </h2>
        </div>

        {/* paragraph — 32px gap to the tabs+table block below */}
        <p className="font-inter-tight font-medium text-text-l text-white/60 text-center whitespace-pre-wrap" style={{ maxWidth: 710 }}>
          {"Anthropic's value has grown as more businesses adopt Claude for their daily work. \nThis table shows how the estimated price has changed over the last few years."}
        </p>

        {/* Tabs + table: 16px gap between them */}
        <div className="flex flex-col gap-4 items-center w-full" style={{ marginTop: 32 }}>
          {/* Tabs */}
          <div className="flex items-center gap-1">
            {([
              { id: 'yearly' as TabId, label: 'Yearly Perfomance'  },
              { id: 'valuation' as TabId, label: 'Valuation history' },
            ]).map(({ id, label }) => {
              const active = tab === id
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTab(id)}
                  className="flex items-center justify-center font-inter-tight font-medium text-text-l transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                  style={{
                    height: 52, padding: '16px 24px', borderRadius: 160,
                    background: active ? '#fff' : 'rgba(255,255,255,0.05)',
                    color: active ? '#000' : 'rgba(255,255,255,0.5)',
                    border: active ? '1px solid rgba(255,255,255,0.25)' : 'none',
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
            {/* Header */}
            <div
              className="grid"
              style={{
                gridTemplateColumns: 'repeat(4, 160px)',
                justifyContent: 'space-between',
                padding: 24,
                background: '#1d1d1d',
                borderLeft: '1px solid #151515',
                borderRadius: '16px 16px 0 0',
              }}
            >
              {['Year', 'Price (AVG)', 'Growth', 'Market Activity'].map((h) => (
                <span key={h} className="font-inter-tight font-medium text-text-m text-neutral-30">{h}</span>
              ))}
            </div>
            {/* Rows */}
            <div
              style={{
                background: '#151515',
                borderLeft: '1px solid #151515',
                borderRadius: '0 0 16px 16px',
                padding: '0 24px 24px',
              }}
            >
              {rows.map((r, i) => (
                <div
                  key={r.year}
                  className="grid items-center"
                  style={{
                    gridTemplateColumns: 'repeat(4, 160px)',
                    justifyContent: 'space-between',
                    padding: '20px 0',
                    borderBottom: i < rows.length - 1 ? '1px dashed #2a2a2a' : 'none',
                  }}
                >
                  <span className="font-inter-tight font-medium text-text-l text-white">{r.year}</span>
                  <span className="font-inter-tight font-medium text-text-l text-white">{r.price}</span>
                  <div><GrowthBadge value={r.growth} /></div>
                  <span className="font-inter-tight font-medium text-text-l text-white">{r.activity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
