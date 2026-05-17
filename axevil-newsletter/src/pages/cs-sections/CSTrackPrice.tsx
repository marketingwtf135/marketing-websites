import { useState } from 'react'

type RangeKey = '1M' | '3M' | 'YTD' | '1Y' | 'ALL'
type PtData = { x: number; y: number; price: string; label: string }
const RANGE_DATA: Record<RangeKey, { price: string; change: string; pts: PtData[] }> = {
  '1M': { price: '$262.34', change: '+$121 for last month', pts: [
    { x:  0,    y: 95,    price: '$141.00', label: 'Dec 28' },
    { x: 24.07, y: 71.82, price: '$168.50', label: 'Jan 6'  },
    { x: 36.78, y: 63.17, price: '$192.30', label: 'Jan 12' },
    { x: 49.14, y: 55.87, price: '$215.80', label: 'Jan 18' },
    { x: 73.78, y: 26.78, price: '$241.20', label: 'Jan 24' },
    { x: 99,    y: 0.05,  price: '$262.34', label: 'Jan 28' },
  ] },
  '3M': { price: '$248.90', change: '+$89.40 for 3 months', pts: [
    { x:  0, y: 98, price: '$159.50', label: 'Oct'    },
    { x: 20, y: 82, price: '$178.20', label: 'Nov 1'  },
    { x: 40, y: 68, price: '$196.80', label: 'Nov 15' },
    { x: 55, y: 48, price: '$214.10', label: 'Dec 1'  },
    { x: 75, y: 22, price: '$234.70', label: 'Dec 20' },
    { x: 99, y:  2, price: '$248.90', label: 'Jan 28' },
  ] },
  'YTD': { price: '$255.20', change: '+$114 YTD', pts: [
    { x:  0, y:100, price: '$141.00', label: 'Jan 1'  },
    { x: 15, y: 78, price: '$165.00', label: 'Mar'    },
    { x: 35, y: 60, price: '$186.00', label: 'May'    },
    { x: 55, y: 42, price: '$210.00', label: 'Aug'    },
    { x: 78, y: 18, price: '$239.00', label: 'Nov'    },
    { x: 99, y:  1, price: '$255.20', label: 'Jan 28' },
  ] },
  '1Y': { price: '$141.00', change: '+$121 for last year', pts: [
    { x:  0, y:100, price: '$20.00',  label: 'Jan 2025' },
    { x: 20, y: 85, price: '$45.00',  label: 'Apr 2025' },
    { x: 40, y: 70, price: '$72.00',  label: 'Jul 2025' },
    { x: 58, y: 48, price: '$102.00', label: 'Oct 2025' },
    { x: 78, y: 24, price: '$128.00', label: 'Dec 2025' },
    { x: 99, y:  3, price: '$141.00', label: 'Jan 2026' },
  ] },
  'ALL': { price: '$45.00', change: '+$217.34 all time', pts: [
    { x:  0, y:100, price: '$2.00',   label: '2021'    },
    { x: 18, y: 90, price: '$10.00',  label: '2022 H1' },
    { x: 35, y: 75, price: '$28.00',  label: '2022 H2' },
    { x: 52, y: 55, price: '$68.00',  label: '2023'    },
    { x: 72, y: 30, price: '$120.00', label: '2024'    },
    { x: 99, y:  0, price: '$262.34', label: '2026'    },
  ] },
}
const TABS: RangeKey[] = ['1M', '3M', 'YTD', '1Y', 'ALL']

function StockChart({ pts }: { pts: PtData[] }) {
  const W = 1440, H = 312
  const [hovered, setHovered] = useState<number | null>(null)
  // Pull last point slightly past the right edge so fill covers the whole frame
  const px = pts.map((p, idx) => {
    const x = idx === pts.length - 1 ? W + 8 : (p.x / 100) * W
    return [x, (p.y / 100) * H] as [number, number]
  })

  function smoothPath(points: [number, number][]) {
    if (points.length < 2) return ''
    let d = `M ${points[0][0]},${points[0][1]}`
    for (let i = 0; i < points.length - 1; i++) {
      const [x1, y1] = points[i], [x2, y2] = points[i + 1]
      const cpx = (x1 + x2) / 2
      d += ` C ${cpx},${y1} ${cpx},${y2} ${x2},${y2}`
    }
    return d
  }

  const linePath = smoothPath(px)
  const fillPath = linePath + ` L ${W + 8},${H} L 0,${H} Z`

  return (
    <div className="relative w-full" style={{ height: '312px' }}>
      {/* grid-bg layer, lowest */}
      <img
        alt=""
        src="/img/bg/grid-bg.png"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none object-cover"
        style={{ opacity: 0.7 }}
      />
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }} preserveAspectRatio="none">
        <defs>
          <linearGradient id="cf" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4EA3BF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#4EA3BF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="cl" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2a6e82" />
            <stop offset="100%" stopColor="#4EA3BF" />
          </linearGradient>
          <radialGradient id="dg">
            <stop offset="0%" stopColor="#4EA3BF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#4EA3BF" stopOpacity="0" />
          </radialGradient>
          <clipPath id="fillClip">
            <path d={fillPath} />
          </clipPath>
        </defs>
        {/* gradient fill — primary */}
        <path d={fillPath} fill="url(#cf)" />
        {/* graphic-bg image clipped to fill area, 10% opacity */}
        <image href="/img/bg/graphic-bg.png" x="0" y="0" width={W} height={H} clipPath="url(#fillClip)" preserveAspectRatio="none" opacity="0.1" />
        <path d={linePath} fill="none" stroke="url(#cl)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {px.slice(1).map(([x, y], i) => {
          const idx = i + 1, isHov = hovered === idx, pt = pts[idx]
          const tw = 160, th = 56
          const tx = Math.min(Math.max(x - tw / 2, 8), W - tw - 8)
          const ty = y - th - 20 < 0 ? y + 20 : y - th - 20
          return (
            <g key={i} style={{ cursor: 'pointer' }} onMouseEnter={() => setHovered(idx)} onMouseLeave={() => setHovered(null)}>
              <circle cx={x} cy={y} r={28} fill="transparent" />
              <circle cx={x} cy={y} r={isHov ? 18 : 12.4} fill="url(#dg)" />
              <circle cx={x} cy={y} r={4.655} fill="#101010" stroke="#4EA3BF" strokeWidth={isHov ? 2 : 1} strokeOpacity="0.6" />
              <circle cx={x} cy={y} r={4.655} fill="white" fillOpacity="0.9" />
              {isHov && (
                <g>
                  <rect x={tx} y={ty} width={tw} height={th} rx={10} fill="#1d1d1d" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  <text x={tx+12} y={ty+22} fill="#b7b7b7" fontSize="14" fontFamily="Inter Tight,sans-serif">{pt.label}</text>
                  <text x={tx+12} y={ty+44} fill="white" fontSize="20" fontFamily="Inter Tight,sans-serif" fontWeight="600">{pt.price}</text>
                </g>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}

/** ── Advantage card — single self-contained icon (44×44 with bg built-in) ── */
function AdvCard({
  label, value, iconSrc, iconAlt, leftBorder,
}: {
  label: string; value: string; iconSrc: string; iconAlt: string; leftBorder?: boolean
}) {
  return (
    <div
      className="group relative bg-[#111111] rounded-2xl flex items-start gap-6 w-full overflow-hidden"
      style={{ height: 124, padding: 16, borderLeft: leftBorder ? '1px solid #151515' : undefined }}
    >
      {/* Text column — justify-between: label top, value bottom */}
      <div className="flex flex-col flex-1 h-full min-w-0" style={{ gap: 42 }}>
        <span className="shrink-0 font-inter-tight font-medium text-text-m text-white/60 leading-[1.3]">{label}</span>
        <span className="shrink-0 font-inter-tight font-semibold text-h5 text-white select-none leading-[1.2]" style={{ filter: 'blur(6px)' }}>{value}</span>
      </div>
      <div className="shrink-0 flex items-center justify-center rounded-full" style={{ width: 44, height: 44, background: '#1a1a1a' }}>
        <img src={iconSrc} alt={iconAlt} width={24} height={24} />
      </div>
      {/* Sign up pill — bottom right, ease-in-out, 0.15s delay */}
      <div
        className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ bottom: 16, right: 16, transitionTimingFunction: 'ease-in-out', transitionDelay: '0.15s' }}
      >
        <span className="font-inter-tight font-semibold text-[14px] text-[#202020] bg-white flex items-center justify-center px-4 rounded-2xl whitespace-nowrap" style={{ height: 32 }}>
          Sign up to view
        </span>
      </div>
    </div>
  )
}

/** ── Main export ────────────────────────────────────────── */
export default function CSTrackPrice() {
  const [activeRange, setActiveRange] = useState<RangeKey>('1M')
  const data = RANGE_DATA[activeRange]

  return (
    <section className="w-full bg-page-bg" style={{ paddingTop: 'clamp(80px, 14vw, 200px)', paddingBottom: 'clamp(60px, 8vw, 100px)' }}>
      <div className="mx-auto w-full max-w-content container-px flex flex-col gap-10 lg:gap-[60px] items-start">

        {/* ── Heading ── */}
        <div className="flex flex-col gap-6 sm:gap-8 items-start">
          <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l text-neutral-30">
            <span className="opacity-50">2.0</span>
            <span className="opacity-80">Analytics</span>
          </div>
          <h2
            className="font-inter-tight font-semibold text-transparent bg-clip-text whitespace-pre"
            style={{
              fontSize: 'clamp(36px, 6vw, 64px)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              backgroundImage:
                'linear-gradient(94deg, #A2A2A2 4.07%, #FFF 49.51%, #A2A2A2 94.94%)',
            }}
          >
            {'Track Anthropic \nStock Price'}
          </h2>
        </div>

        {/* Graphic + advantages */}
        <div className="flex flex-col gap-4 w-full">

          <div className="flex flex-col gap-6 lg:gap-10 w-full">

          {/* Sub-heading row — stack on mobile/tablet */}
          <div
            className="flex flex-col lg:flex-row lg:items-start lg:justify-between w-full gap-4 lg:gap-8"
            style={{ borderTop: '1px solid #1d1d1d', paddingTop: 'clamp(24px, 4vw, 60px)' }}
          >
            <p className="font-inter-tight font-semibold text-white" style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', lineHeight: 1.2 }}>
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
            className="w-full rounded-[24px] sm:rounded-[32px] overflow-hidden flex flex-col items-center"
            style={{ background: '#111111', paddingTop: 24 }}
          >
            {/* Top row: price + tabs — stack on mobile */}
            <div
              className="flex flex-col sm:flex-row sm:items-start sm:justify-between w-full gap-6 sm:gap-4"
              style={{ paddingLeft: 24, paddingRight: 24, marginBottom: 'clamp(32px, 6vw, 59px)' }}
            >
              {/* Price + badge */}
              <div className="flex flex-col gap-4 sm:gap-6 items-start">
                <span className="font-inter-tight font-medium text-text-l text-neutral-30">
                  Consensus Price
                </span>
                <div className="flex flex-col gap-3 items-start">
                  <span
                    className="font-inter-tight font-semibold text-white"
                    style={{ fontSize: 'clamp(40px, 7vw, 64px)', lineHeight: 1, letterSpacing: '-0.02em' }}
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

              {/* Time range tabs — horizontal scroll on small screens */}
              <div
                className="flex items-center gap-1 overflow-x-auto -mx-1 px-1"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {TABS.map((tab) => {
                  const isActive = tab === activeRange
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveRange(tab)}
                      className="font-inter-tight font-medium text-text-m transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white shrink-0"
                      style={{
                        height: 44,
                        width: 56,
                        borderRadius: 12,
                        background: isActive ? '#fff' : '#1a1a1a',
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
            <div className="w-full" style={{ overflow: 'hidden' }}>
              <StockChart key={activeRange} pts={data.pts} />
            </div>
          </div>
          </div>

          {/* ── Advantage cards — 1col mobile, 2col tablet, 4col desktop ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 w-full">
            <AdvCard label="Highest Bid"      value="$258.00" iconSrc="/icons/Arrow-up.svg"    iconAlt="Highest bid"       leftBorder />
            <AdvCard label="Lowest Ask"        value="$268.50" iconSrc="/icons/Arrow-down-1.svg"  iconAlt="Lowest ask"        />
            <AdvCard label="Lost Transaction"  value="$262.34" iconSrc="/icons/Money.svg"       iconAlt="Lost transaction"  />
            <AdvCard label="Live Orders"       value="79"      iconSrc="/icons/User.svg"        iconAlt="Live orders"       />
          </div>
        </div>
      </div>
    </section>
  )
}
