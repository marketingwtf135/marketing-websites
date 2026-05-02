/** Company Stock — Hero section (Figma 89:567)
 *  Design canvas: 1920×1080
 *  Content: max-w-content (1440px), content-edge 240px
 *  All top/left values below are relative to section (1080px tall)
 *  and within the 1440px content container.
 */

const TAGS = [
  'AI Leader', 'Claude 3.5', 'Unicorn', 'High Growth',
  'Late Stage', 'AI Safety', 'Private Equity',
]

export default function CSHero() {
  return (
    <section
      className="relative w-full bg-page-bg overflow-clip"
      style={{ height: '1080px' }}
    >
      {/* bg-shine — full-width absolute behind everything */}
      <img
        alt=""
        src="/img/bg-shine-company-stock.png"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ zIndex: 0 }}
      />

      <div className="relative mx-auto w-full max-w-content h-full" style={{ zIndex: 1 }}>

        {/* Breadcrumb — top:120, left:0 (239px from canvas = content-edge) */}
        <div
          className="absolute flex items-center gap-2"
          style={{ left: 0, top: '120px' }}
        >
          <span className="font-inter-tight font-medium text-text-m text-neutral-30 opacity-80 whitespace-nowrap">
            Company Stock
          </span>
          {/* Arrow → (arrow-down rotated -90deg) */}
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

        {/* Info card column — right-aligned, top:120, width:555
            On 1440 container: 1126-240=886 from left = 1440-886-555=-1 → right:0 */}
        <div
          className="absolute flex flex-col gap-4"
          style={{ right: 0, top: '120px', width: '555px' }}
        >
          {/* Tabs */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="flex items-center justify-center h-13 px-6 rounded-full bg-white border border-white/25 font-inter-tight font-medium text-text-l text-phone-bg whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              Invest in Anthropic
            </button>
            <button
              type="button"
              className="flex items-center justify-center h-13 px-6 rounded-full bg-white/5 font-inter-tight font-medium text-text-l text-white/50 whitespace-nowrap hover:text-white/70 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              Talk to an Advisor
            </button>
            <button
              type="button"
              className="flex items-center justify-center h-13 px-6 rounded-full bg-white/5 font-inter-tight font-medium text-text-l text-white/50 whitespace-nowrap hover:text-white/70 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              Watch this Stock
            </button>
          </div>

          {/* Price card */}
          <div
            className="relative flex flex-col w-full rounded-3xl"
            style={{ background: '#151515', padding: '32px', gap: '48px' }}
          >
            {/* +86% YTD badge — absolute top-right */}
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
              {/* Up arrow SVG inline */}
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M1 7L6 1L11 7" stroke="#4dba79" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-inter-tight font-medium text-s-med text-status-open whitespace-nowrap">
                +86% YTD
              </span>
            </div>

            {/* Price */}
            <div className="flex flex-col gap-4">
              <span className="font-inter-tight font-medium text-text-l text-neutral-30">
                Consensus Price
              </span>
              <div className="flex items-end gap-2">
                <span
                  className="font-inter-tight font-semibold text-white leading-none"
                  style={{ fontSize: '64px', letterSpacing: '-0.02em' }}
                >
                  $262.34
                </span>
                <span className="font-inter-tight font-medium text-text-m text-neutral-30 mb-1">
                  / share
                </span>
              </div>
            </div>

            {/* Stats 2×2 */}
            <div className="flex flex-col gap-8">
              <div className="flex gap-[73px] items-start">
                <StatItem label="Target Price"         value="$262.34" />
                <StatItem label="Last Round Valuation" value="$380B"   />
              </div>
              <div className="flex gap-[73px] items-start">
                <StatItem label="Total Funding"        value="$53.15B"         />
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
                style={{
                  height: '40px',
                  padding: '8px 16px',
                  borderRadius: '160px',
                  border: '1px solid #323232',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Heading block — top:746, left:0, width:614 */}
        <div
          className="absolute flex flex-col gap-8"
          style={{ left: 0, top: '746px', width: '614px' }}
        >
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
                backgroundImage: 'linear-gradient(106.618deg, #ffffff 2.5635%, #d7fffc 99.06%)',
              }}
            >
              {'Invest in \nAnthropic Stock'}
            </h1>
            <p
              className="font-inter-tight font-medium text-white/60"
              style={{ fontSize: '20px', lineHeight: 1.3, letterSpacing: '-0.02em', width: '604px' }}
            >
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
