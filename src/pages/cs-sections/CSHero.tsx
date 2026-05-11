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
      className="relative w-full overflow-clip"
      style={{ minHeight: '640px', background: 'transparent' }}
    >
      {/* Background video — full-width fullscreen, opacity 60% (matches home page), hidden on mobile */}
      <video
        src="/ostracized_remix_scene.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="hidden md:block absolute top-0 left-0 pointer-events-none"
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.6, zIndex: 0 }}
      />

      {/* Main flex container — column on mobile/tablet, row on desktop */}
      <div
        className="relative mx-auto w-full max-w-content container-px flex flex-col lg:flex-row lg:items-stretch gap-8"
        style={{
          zIndex: 1,
          paddingTop: '40px',
          paddingBottom: '60px',
          minHeight: 'calc(100vh - 80px)',
          boxSizing: 'border-box',
        }}
      >
        {/* ─ Left column — heading anchored to bottom on desktop ─ */}
        <div className="flex flex-col gap-8 lg:gap-0 lg:justify-between flex-1 min-w-0 lg:h-auto lg:self-stretch">
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

          {/* Heading — anchored to bottom on desktop via mt-auto */}
          <div className="flex flex-col gap-6 lg:gap-8 lg:mt-auto" style={{ maxWidth: 614 }}>
            <div className="flex items-center gap-2 font-inter-tight font-medium text-text-l text-neutral-30">
              <span className="opacity-50">1.0</span>
              <span className="opacity-80">Overview</span>
            </div>
            <div className="flex flex-col gap-4 sm:gap-6">
              <h1
                className="font-inter-tight font-semibold leading-[1.05] lg:leading-none text-transparent bg-clip-text whitespace-pre-line"
                style={{
                  fontSize: 'clamp(40px, 9vw, 88px)',
                  letterSpacing: '-0.02em',
                  backgroundImage: 'linear-gradient(95deg, #FFF -2.56%, #8F8F8F 99.06%)',
                }}
              >
                {'Invest in \nAnthropic Stock'}
              </h1>
              <p
                className="font-inter-tight font-medium text-white/60"
                style={{ fontSize: 'clamp(16px, 1.6vw, 20px)', lineHeight: 1.4, letterSpacing: '-0.02em', maxWidth: 604 }}
              >
                Get early access to invest in Anthropic before its IPO. A leader in safe AI and creator of Claude,
                Anthropic is still private. Invest today via our platform. Current valuation: ~$380B.
              </p>
            </div>
          </div>
        </div>

        {/* ─ Right column — full-width on mobile, fixed 555px on desktop ─ */}
        <div className="flex flex-col gap-4 lg:shrink-0 lg:h-full w-full lg:w-[555px]">
          {/* Tabs — horizontal scroll on mobile if needed */}
          <div className="flex items-center gap-1 overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {[
              { label: 'Invest in Anthropic', active: true  },
              { label: 'Talk to an Advisor',  active: false },
              { label: 'Watch this Stock',    active: false },
            ].map(({ label, active }) => (
              <button
                key={label}
                type="button"
                className="flex items-center justify-center h-13 px-4 sm:px-6 rounded-full font-inter-tight font-medium text-text-m sm:text-text-l whitespace-nowrap outline-none transition-colors shrink-0"
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
            style={{ background: '#151515', padding: 'clamp(20px, 3vw, 32px)', gap: 'clamp(28px, 4vw, 48px)' }}
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
                <span className="font-inter-tight font-semibold text-white leading-none" style={{ fontSize: 'clamp(40px, 7vw, 64px)', letterSpacing: '-0.02em' }}>
                  $262.34
                </span>
                <span className="font-inter-tight font-medium text-text-m text-neutral-30 mb-1">/ share</span>
              </div>
            </div>

            <div className="flex flex-col gap-6 sm:gap-8">
              <div className="grid grid-cols-2 gap-0 items-start">
                <StatItem label="Target Price"         value="$262.34" />
                <StatItem label="Last Round Valuation" value="$380B"   />
              </div>
              <div className="grid grid-cols-2 gap-0 items-start">
                <StatItem label="Total Funding"        value="$53.15B"            />
                <StatItem label="Status"               value="Series G (Private)" />
              </div>
            </div>

            {/* Anthropic logo — bottom right */}
            <img
              alt="Anthropic"
              src="/img/cs/anthropic-symbol.svg"
              className="absolute"
              style={{ right: '24px', bottom: '24px', width: '26px', height: '18px', opacity: 0.6 }}
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
