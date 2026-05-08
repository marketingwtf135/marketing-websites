/** Company Stock — Hero section (Figma 89:567)
 *  Layout: flex-row with left column (breadcrumb/heading, gap:auto) + right info column
 *  Padding: top = 80px(nav) + 40px = 120px; bottom = 40px
 */
const TAGS = [
  'AI Leader', 'Claude 3.5', 'Unicorn', 'High Growth',
  'Late Stage', 'AI Safety', 'Private Equity',
]

export default function CSHero() {
  return (
    <section
      className="relative w-full bg-page-bg overflow-clip"
      style={{ height: 'calc(100vh - 80px)', minHeight: '640px' }}
    >
      {/* shape-eclipse-left — pinned left, opacity 25% */}
      <img
        alt=""
        src="/img/shape-eclipse-left.png"
        className="absolute top-0 left-0 pointer-events-none"
        style={{ width: '40%', height: '100%', objectFit: 'cover', objectPosition: 'left center', opacity: 0.25, zIndex: 0 }}
      />
      {/* shape-eclipse-right — pinned right, opacity 25% */}
      <img
        alt=""
        src="/img/shape-eclipse-right.png"
        className="absolute top-0 right-0 pointer-events-none"
        style={{ width: '40%', height: '100%', objectFit: 'cover', objectPosition: 'right center', opacity: 0.25, zIndex: 0 }}
      />

      {/* Main flex container: top=120px (80+40), bottom=40px */}
      {/* paddingTop:40px (spacer in CompanyStock handles nav 80px) */}
      <div
        className="relative mx-auto w-full max-w-content flex items-stretch gap-8"
        style={{
          zIndex: 1,
          paddingTop: '40px',
          paddingBottom: '60px',
          height: '100%',
          boxSizing: 'border-box',
        }}
      >
        {/* ─ Left column: breadcrumb top, heading bottom, stretches full height ─ */}
        <div className="flex flex-col justify-between flex-1 min-w-0 h-full">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2">
            <span className="font-inter-tight font-medium text-text-m text-neutral-30 opacity-80 whitespace-nowrap">
              Company Stock
            </span>
            <img
              src="/img/block01/arrow-down.svg"
              alt=""
              aria-hidden="true"
              width={16}
              height={16}
              style={{ transform: 'rotate(-90deg)', opacity: 0.8 }}
            />
            <span className="font-inter-tight font-medium text-text-m text-white whitespace-nowrap">
              Anthropic
            </span>
          </div>

          {/* Heading — anchored to bottom via justify-between */}
          <div className="flex flex-col gap-8" style={{ maxWidth: 614 }}>
            <div className="flex items-center gap-2 font-inter-tight font-medium text-text-l text-neutral-30">
              <span className="opacity-50">1.0</span>
              <span className="opacity-80">Overview</span>
            </div>
            <div className="flex flex-col gap-6">
              <h1
                className="font-inter-tight font-semibold leading-none text-transparent bg-clip-text whitespace-pre-line"
                style={{
                  fontSize: '88px',
                  letterSpacing: '-0.02em',
                  backgroundImage: 'linear-gradient(95deg, #FFF -2.56%, #8F8F8F 99.06%)',
                }}
              >
                {'Invest in \nAnthropic Stock'}
              </h1>
              <p
                className="font-inter-tight font-medium text-white/60"
                style={{ fontSize: '20px', lineHeight: 1.3, letterSpacing: '-0.02em', maxWidth: 604 }}
              >
                Get early access to invest in Anthropic before its IPO. A leader in safe AI and creator of Claude,
                Anthropic is still private. Invest today via our platform. Current valuation: ~$380B.
              </p>
            </div>
          </div>
        </div>

        {/* ─ Right column: stretches full height, info card aligned top ─ */}
        <div className="flex flex-col gap-4 shrink-0 h-full" style={{ width: 555 }}>
          {/* Tabs */}
          <div className="flex items-center gap-1">
            {[
              { label: 'Invest in Anthropic', active: true  },
              { label: 'Talk to an Advisor',  active: false },
              { label: 'Watch this Stock',    active: false },
            ].map(({ label, active }) => (
              <button
                key={label}
                type="button"
                className="flex items-center justify-center h-13 px-6 rounded-full font-inter-tight font-medium text-text-l whitespace-nowrap outline-none transition-colors"
                style={{
                  background: active ? '#fff' : 'rgba(255,255,255,0.05)',
                  color: active ? '#000' : 'rgba(255,255,255,0.5)',
                  border: active ? '1px solid rgba(255,255,255,0.25)' : 'none',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Price card */}
          <div
            className="relative flex flex-col w-full rounded-3xl"
            style={{ background: '#151515', padding: '32px', gap: '48px' }}
          >
            {/* +86% YTD badge */}
            <div
              className="absolute flex items-center gap-1 rounded-full"
              style={{
                top: '12px', right: '12px',
                background: 'rgba(77,186,121,0.1)',
                border: '1px solid rgba(77,186,121,0.25)',
                padding: '6px 12px',
                height: '32px',
              }}
            >
              <img src="/img/cs/icon-arrow-up-green.svg" alt="" width={12} height={8} />
              <span className="font-inter-tight font-medium text-s-med text-status-open whitespace-nowrap">
                +86% YTD
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <span className="font-inter-tight font-medium text-text-l text-neutral-30">Consensus Price</span>
              <div className="flex items-end gap-2">
                <span className="font-inter-tight font-semibold text-white leading-none" style={{ fontSize: '64px', letterSpacing: '-0.02em' }}>
                  $262.34
                </span>
                <span className="font-inter-tight font-medium text-text-m text-neutral-30 mb-1">/ share</span>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex gap-[73px] items-start">
                <StatItem label="Target Price"         value="$262.34" />
                <StatItem label="Last Round Valuation" value="$380B"   />
              </div>
              <div className="flex gap-[73px] items-start">
                <StatItem label="Total Funding"        value="$53.15B"            />
                <StatItem label="Status"               value="Series G (Private)" />
              </div>
            </div>

            {/* Anthropic logo — bottom right */}
            <img
              alt="Anthropic"
              src="/img/cs/anthropic-symbol.svg"
              className="absolute"
              style={{ right: '32px', bottom: '32px', width: '26px', height: '18px', opacity: 0.6 }}
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 items-center">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="flex items-center justify-center font-inter-tight font-medium text-s-med text-white whitespace-nowrap opacity-80"
                style={{ height: '40px', padding: '8px 16px', borderRadius: '160px', border: '1px solid #323232' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-4">
      <span className="font-inter-tight font-medium text-text-m text-neutral-30">{label}</span>
      <span className="font-inter-tight font-semibold text-h5 text-white whitespace-nowrap">{value}</span>
    </div>
  )
}
