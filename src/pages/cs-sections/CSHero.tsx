/** Company Stock — Hero section (Figma 89:567)
 *  #2: height 100vh  #3: bg-shine-inner-pages.png centered
 *  #4: breadcrumb arrow from 89:613  #5: no white borders
 */

const TAGS = [
  'AI Leader', 'Claude 3.5', 'Unicorn', 'High Growth',
  'Late Stage', 'AI Safety', 'Private Equity',
]

export default function CSHero() {
  return (
    <section
      className="relative w-full bg-page-bg overflow-clip"
      style={{ height: '100vh', minHeight: '720px', outline: 'none', border: 'none' }}
    >
      {/* Main bg-shine */}
      <img
        alt=""
        src="/img/bg-shine-company-stock.png"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ zIndex: 0 }}
      />

      <div className="relative mx-auto w-full max-w-content h-full" style={{ zIndex: 1, outline: 'none' }}>

        {/* bg-shine-inner-pages — centered on all axes */}
        <img
          alt=""
          src="/img/bg-shine-inner-pages.png"
          className="absolute pointer-events-none"
          style={{
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '100%',
            zIndex: 0,
          }}
        />

        {/* Breadcrumb — top:120, left:0 */}
        <div className="absolute flex items-center gap-2" style={{ left: 0, top: '120px', zIndex: 2 }}>
          <span className="font-inter-tight font-medium text-text-m text-neutral-30 opacity-80 whitespace-nowrap">
            Company Stock
          </span>
          {/* Chevron → from Figma 89:613 */}
          <img
            src="/img/cs/icon-breadcrumb-arrow.svg"
            alt=""
            aria-hidden="true"
            width={16}
            height={16}
            className="opacity-80"
          />
          <span className="font-inter-tight font-medium text-text-m text-white whitespace-nowrap">
            Anthropic
          </span>
        </div>

        {/* Info card column — right-aligned, top:120, width:555 */}
        <div
          className="absolute flex flex-col gap-4"
          style={{ right: 0, top: '120px', width: '555px', zIndex: 2 }}
        >
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

            {/* Price */}
            <div className="flex flex-col gap-4">
              <span className="font-inter-tight font-medium text-text-l text-neutral-30">Consensus Price</span>
              <div className="flex items-end gap-2">
                <span className="font-inter-tight font-semibold text-white leading-none" style={{ fontSize: '64px', letterSpacing: '-0.02em' }}>
                  $262.34
                </span>
                <span className="font-inter-tight font-medium text-text-m text-neutral-30 mb-1">/ share</span>
              </div>
            </div>

            {/* Stats 2×2 */}
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

        {/* Heading block — bottom-anchored */}
        <div
          className="absolute flex flex-col gap-8"
          style={{ left: 0, bottom: '80px', width: '614px', zIndex: 2 }}
        >
          <div className="flex items-center gap-2 font-inter-tight font-medium text-text-l text-neutral-30">
            <span className="opacity-50">1.0</span>
            <span className="opacity-80">Overview</span>
          </div>
          <div className="flex flex-col gap-6">
            <h1
              className="font-inter-tight font-semibold leading-none text-transparent bg-clip-text whitespace-pre-line"
              style={{ fontSize: '88px', letterSpacing: '-0.02em', backgroundImage: 'linear-gradient(106.618deg, #ffffff 2.5635%, #d7fffc 99.06%)' }}
            >
              {'Invest in \nAnthropic Stock'}
            </h1>
            <p className="font-inter-tight font-medium text-white/60" style={{ fontSize: '20px', lineHeight: 1.3, letterSpacing: '-0.02em', width: '604px' }}>
              Get early access to invest in Anthropic before its IPO. A leader in safe AI and creator of Claude, Anthropic is still private. Invest today via our platform. Current valuation: ~$380B.
            </p>
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
