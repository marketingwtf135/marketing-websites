import { useState } from 'react'

/** ── DATA per time range ───────────────────────────────── */
type RangeKey = '1M' | '3M' | 'YTD' | '1Y' | 'ALL'

// Points: [x%, y%] where y=0 is TOP of chart, y=100 is BOTTOM
// Derived from Figma pixel coords in a 1440×312 canvas
const RANGE_DATA: Record<RangeKey, { price: string; change: string; pts: [number, number][] }> = {
  '1M': {
    price: '$262.34',
    change: '+$121 for last month',
    pts: [
      [0,   95], [24.07, 71.82], [36.78, 63.17],
      [49.14, 55.87], [73.78, 26.78], [99, 0.05],
    ],
  },
  '3M': {
    price: '$248.90',
    change: '+$89.40 for 3 months',
    pts: [
      [0, 98], [20, 82], [40, 68],
      [55, 48], [75, 22], [99, 2],
    ],
  },
  'YTD': {
    price: '$255.20',
    change: '+$114 YTD',
    pts: [
      [0, 100], [15, 78], [35, 60],
      [55, 42], [78, 18], [99, 1],
    ],
  },
  '1Y': {
    price: '$141.00',
    change: '+$121 for last year',
    pts: [
      [0, 100], [20, 85], [40, 70],
      [58, 48], [78, 24], [99, 3],
    ],
  },
  'ALL': {
    price: '$45.00',
    change: '+$217.34 all time',
    pts: [
      [0, 100], [18, 90], [35, 75],
      [52, 55], [72, 30], [99, 0],
    ],
  },
}

const TABS: RangeKey[] = ['1M', '3M', 'YTD', '1Y', 'ALL']

/** ── SVG chart ─────────────────────────────────────────── */
function StockChart({ pts }: { pts: [number, number][] }) {
  const W = 1440
  const H = 312

  // Convert % → px
  const px = pts.map(([x, y]) => [
    (x / 100) * W,
    (y / 100) * H,
  ] as [number, number])

  // Smooth bezier path through points
  function smoothPath(points: [number, number][]) {
    if (points.length < 2) return ''
    let d = `M ${points[0][0]},${points[0][1]}`
    for (let i = 0; i < points.length - 1; i++) {
      const [x1, y1] = points[i]
      const [x2, y2] = points[i + 1]
      const cpx = (x1 + x2) / 2
      d += ` C ${cpx},${y1} ${cpx},${y2} ${x2},${y2}`
    }
    return d
  }

  const linePath = smoothPath(px)

  // Fill area closes at bottom
  const fillPath =
    linePath +
    ` L ${W},${H} L 0,${H} Z`

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      style={{ height: '312px' }}
      preserveAspectRatio="none"
    >
      <defs>
        {/* Gradient fill under curve */}
        <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00e5b4" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#00e5b4" stopOpacity="0" />
        </linearGradient>
        {/* Line gradient left→right teal */}
        <linearGradient id="chart-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#175e6e" />
          <stop offset="100%" stopColor="#00f0c8" />
        </linearGradient>
        {/* Dot outer glow */}
        <radialGradient id="dot-glow">
          <stop offset="0%" stopColor="#00f0c8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#00f0c8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Fill area */}
      <path d={fillPath} fill="url(#chart-fill)" />

      {/* Line */}
      <path
        d={linePath}
        fill="none"
        stroke="url(#chart-line)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Data point dots (skip first/last for cleaner look, match Figma's 5 dots) */}
      {px.slice(1).map(([x, y], i) => (
        <g key={i}>
          {/* Outer glow ring */}
          <circle cx={x} cy={y} r={12.4} fill="url(#dot-glow)" />
          {/* Mid ring */}
          <circle cx={x} cy={y} r={4.655} fill="#101010" stroke="#00f0c8" strokeWidth="1" strokeOpacity="0.4" />
          {/* Inner white dot */}
          <circle cx={x} cy={y} r={4.655} fill="white" fillOpacity="0.9" />
        </g>
      ))}
    </svg>
  )
}

/** ── Icon with circle bg (Figma: 44px circle + 24px icon centered) ── */
function IconBadge({ src, alt, bg }: { src: string; alt: string; bg?: string }) {
  return (
    <div className="relative shrink-0" style={{ width: 44, height: 44 }}>
      <img src={bg ?? '/img/cs/icon-circle-bg.svg'} alt="" className="absolute inset-0 w-full h-full" />
      <img src={src} alt={alt} className="absolute" style={{ width: 24, height: 24, left: 10, top: 10 }} />
    </div>
  )
}

/** ── Advantage card ─────────────────────────────────────── */
function AdvCard({
  label, value, iconSrc, iconBg, iconAlt, leftBorder,
}: {
  label: string; value: string; iconSrc: string; iconBg?: string; iconAlt: string; leftBorder?: boolean
}) {
  return (
    <div
      className="bg-[#101010] rounded-2xl flex items-start gap-6"
      style={{
        padding: 16,
        width: 345,
        borderLeft: leftBorder ? '1px solid #151515' : undefined,
      }}
    >
      <div className="flex flex-col gap-4 flex-1 min-w-0">
        <span className="font-inter-tight font-medium text-text-m text-white/60">{label}</span>
        <span className="font-inter-tight font-semibold text-h5 text-white">{value}</span>
      </div>
      <IconBadge src={iconSrc} alt={iconAlt} bg={iconBg} />
    </div>
  )
}

/** ── Main export ────────────────────────────────────────── */
export default function CSTrackPrice() {
  const [activeRange, setActiveRange] = useState<RangeKey>('1M')
  const data = RANGE_DATA[activeRange]

  return (
    <section className="w-full bg-page-bg" style={{ paddingBottom: '120px', marginBottom: '200px' }}>
      <div className="mx-auto w-full max-w-content flex flex-col gap-[60px] items-start" style={{ marginTop: '200px' }}>

        {/* ── Heading ── */}
        <div className="flex flex-col gap-8 items-start">
          <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l text-neutral-30">
            <span className="opacity-50">2.0</span>
            <span className="opacity-80">Analytics</span>
          </div>
          <h2
            className="font-inter-tight font-semibold text-transparent bg-clip-text whitespace-pre"
            style={{
              fontSize: '64px',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              backgroundImage:
                'linear-gradient(93.581deg, #ffffff 0.176%, #b7b7b7 98.822%)',
            }}
          >
            {'Track Anthropic \nStock Price'}
          </h2>
        </div>

        {/* ── Graphic + advantages ── */}
        <div className="flex flex-col gap-4 w-full">

          {/* Sub-heading row */}
          <div
            className="flex items-start justify-between w-full"
            style={{ borderTop: '1px solid #1d1d1d', paddingTop: 32 }}
          >
            <p className="font-inter-tight font-semibold text-white" style={{ fontSize: 36, lineHeight: 1.2, whiteSpace: 'nowrap' }}>
              Anthropic consensus price
            </p>
            <p className="font-inter-tight font-medium text-white/60 text-text-l" style={{ maxWidth: 710 }}>
              We monitor the Anthropic stock price based on the latest private market
              data and funding rounds. Since there is no Anthropic stock symbol on
              public exchanges yet, we provide a consensus price to help you track
              your investment.
            </p>
          </div>

          {/* Chart card */}
          <div
            className="w-full rounded-[32px] overflow-hidden flex flex-col items-center"
            style={{ background: '#101010', paddingTop: 24, gap: 59 }}
          >
            {/* Top row: price + tabs */}
            <div className="flex items-start justify-between w-full" style={{ paddingLeft: 24, paddingRight: 24 }}>
              {/* Price + badge */}
              <div className="flex flex-col gap-6 items-start">
                <span className="font-inter-tight font-medium text-text-l text-neutral-30">
                  Consensus Price
                </span>
                <div className="flex flex-col gap-3 items-start">
                  <span
                    className="font-inter-tight font-semibold text-white"
                    style={{ fontSize: 64, lineHeight: 1, letterSpacing: '-0.02em' }}
                  >
                    {data.price}
                  </span>
                  <div
                    className="flex items-center gap-1 rounded-full"
                    style={{
                      height: 32,
                      padding: '6px 12px',
                      background: 'rgba(77,186,121,0.1)',
                      border: '1px solid rgba(77,186,121,0.25)',
                    }}
                  >
                    <img src="/img/cs/icon-arrow-up-green.svg" alt="" width={12} height={8} />
                    <span className="font-inter-tight font-medium text-s-med text-status-open whitespace-nowrap">
                      {data.change}
                    </span>
                  </div>
                </div>
              </div>

              {/* Time range tabs */}
              <div className="flex items-center gap-1">
                {TABS.map((tab) => {
                  const isActive = tab === activeRange
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveRange(tab)}
                      className="font-inter-tight font-medium text-text-m transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                      style={{
                        height: 50,
                        width: 61,
                        borderRadius: 16,
                        background: isActive ? '#fff' : '#212121',
                        color: isActive ? '#000' : 'rgba(255,255,255,0.5)',
                        border: isActive ? '1px solid rgba(255,255,255,0.25)' : 'none',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {tab}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Chart SVG */}
            <StockChart key={activeRange} pts={data.pts} />
          </div>

          {/* ── Advantage cards — icons from Figma 89:339/349/359/367 ── */}
          <div className="flex items-center justify-between w-full">
            <AdvCard
              label="Highest Bid"
              value="$258.00"
              iconBg="/img/cs/adv-bg-1.svg"
              iconSrc="/img/cs/adv-course-up.svg"
              iconAlt="Chart up"
              leftBorder
            />
            <AdvCard
              label="Lowest Ask"
              value="$268.50"
              iconBg="/img/cs/adv-bg-2.svg"
              iconSrc="/img/cs/adv-course-down.svg"
              iconAlt="Chart down"
            />
            <AdvCard
              label="Last Transaction"
              value="$262.34"
              iconBg="/img/cs/adv-bg-3.svg"
              iconSrc="/img/cs/adv-money-bag.svg"
              iconAlt="Money bag"
            />
            <AdvCard
              label="Live Orders"
              value="79"
              iconBg="/img/cs/adv-bg-4.svg"
              iconSrc="/img/cs/adv-user-body.svg"
              iconAlt="Live orders"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
