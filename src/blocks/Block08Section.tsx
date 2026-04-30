const BADGES = [
  { label: 'SEC', sub: '# 802-126907' },
  { label: 'ERA Status', sub: '?' },
  { label: 'FINRA CRD', sub: '323970' },
]

export default function Block08Section() {
  return (
    <section className="relative w-full bg-page-bg overflow-clip" style={{ height: '1007px' }}>

      {/* Map area — max 742px wide, centered. Info cards anchor to corners */}
      <div
        className="absolute pointer-events-none"
        style={{ left: '50%', top: '350px', width: '742px', transform: 'translateX(-50%)' }}
      >
        <img
          alt=""
          src="/img/map-image.png"
          width={1484}
          height={1094}
          className="block w-full h-auto"
          style={{ opacity: 1 }}
          loading="lazy"
        />

        {/* Info card — Favorable Laws (top-left corner of map) */}
        <div
          className="absolute bg-surface-2 border border-white/15 rounded-2xl p-4 flex flex-col gap-3 pointer-events-auto"
          style={{ left: '-240px', top: '180px', width: '200px' }}
        >
          <div className="flex items-center justify-between">
            <span className="font-inter-tight font-medium text-s-med text-white/70">Favorable Laws</span>
            <div className="size-5 rounded-full bg-white/10 flex items-center justify-center">
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L4 7L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
          <p className="font-inter-tight font-medium text-s-med text-white/60">Delaware's laws are ideal for venture capital businesses.</p>
        </div>

        {/* Info card — VC Standard (top-right corner of map) */}
        <div
          className="absolute bg-surface-2 border border-white/15 rounded-2xl p-4 flex flex-col gap-3 pointer-events-auto"
          style={{ right: '-260px', top: '120px', width: '230px' }}
        >
          <div className="flex items-center justify-between">
            <span className="font-inter-tight font-medium text-s-med text-white/70">VC Standard</span>
            <div className="size-5 rounded-full bg-white/10 flex items-center justify-center">
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L4 7L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
          <p className="font-inter-tight font-medium text-s-med text-white/60">99% of US startups and the majority of venture capital funds choose Delaware for company incorporation and transactions.</p>
        </div>
      </div>

      {/* Heading */}
      <div className="absolute flex flex-col gap-8 items-center w-full" style={{ top: 0 }}>
        <div className="flex flex-col gap-8 items-center text-center">
          <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l text-neutral-30 whitespace-nowrap">
            <span className="opacity-50">8.0</span>
            <span className="opacity-80">Everything is legal</span>
          </div>
          <h2
            className="font-inter-tight font-semibold text-h2 text-white text-center"
            style={{ maxWidth: '900px' }}
          >
            Best Venture Practices<br />for Investor Capital Protection.
          </h2>
          <p className="font-inter-tight font-medium text-text-xl text-white/60 text-center" style={{ maxWidth: '460px' }}>
            A technology platform for private equity —<br />
            for professional investors and wealth managers.
          </p>
        </div>
      </div>

      {/* Bottom badges */}
      <div className="absolute flex gap-4 items-center" style={{ left: '50%', bottom: '60px', transform: 'translateX(-50%)' }}>
        {BADGES.map((b) => (
          <div key={b.label} className="bg-surface-2 border border-white/10 flex items-center gap-3 px-4 py-3 rounded-full">
            <div className="size-8 rounded-full bg-surface-3 flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="6" stroke="white" strokeOpacity="0.5" strokeWidth="1.5"/>
                <path d="M8 5V8L10 10" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-inter-tight font-semibold text-s-semi text-white whitespace-nowrap">{b.label}</span>
              <span className="font-inter-tight font-medium text-xs text-white/50 whitespace-nowrap">{b.sub}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
