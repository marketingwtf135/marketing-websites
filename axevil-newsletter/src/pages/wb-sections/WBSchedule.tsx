const SCHEDULE = [
  { time: '0:00 – 0:05', title: 'Context', desc: 'Why private markets grew by $7T in 5 years' },
  { time: '0:05 – 0:25', title: 'Portfolio architecture', desc: 'HNWI portfolio architecture: what private markets allocation makes sense' },
  { time: '0:25 – 0:40', title: 'Access mechanics', desc: 'Access mechanics for top-tier deals + 3 client portfolio cases' },
  { time: '0:40 – 0:55', title: '2026 trends', desc: 'AI, Defense, Energy/Nuclear, Biotech' },
  { time: '0:55 – 1:00', title: 'Q&A', desc: 'Open questions' },
]

export default function WBSchedule() {
  return (
    <section id="wb-schedule" className="relative w-full bg-page-bg">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-[80px] py-[64px] sm:py-[80px] lg:py-[100px]">

        <div className="mb-10 sm:mb-12">
          <div className="flex items-center gap-2 font-inter-tight font-medium text-[12px] sm:text-text-l text-neutral-30 mb-4">
            <span className="opacity-50">5.0</span>
            <span className="opacity-80">Schedule</span>
          </div>
          <h2
            className="font-inter-tight font-semibold text-transparent bg-clip-text"
            style={{
              fontSize: 'clamp(32px, 3.5vw, 48px)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              backgroundImage: 'linear-gradient(95deg, #ffffff -2.56%, #8f8f8f 99.06%)',
            }}
          >
            Webinar schedule
          </h2>
        </div>

        <div className="rounded-[24px] overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
          {SCHEDULE.map((row, i) => (
            <div
              key={row.time}
              className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 px-5 sm:px-8 py-4 sm:py-6"
              style={{
                background: i % 2 === 0 ? '#0d0d0d' : '#0a0a0a',
                borderTop: i > 0 ? '1px solid rgba(255,255,255,0.05)' : undefined,
              }}
            >
              {/* Time — primary on mobile */}
              <span className="font-inter-tight font-semibold sm:font-medium text-white sm:text-neutral-35 text-text-s-med tabular-nums shrink-0" style={{ minWidth: '110px' }}>
                {row.time}
              </span>
              <div className="hidden sm:block w-px h-4 shrink-0" style={{ background: 'rgba(255,255,255,0.1)' }} />
              {/* Title — full width on mobile */}
              <span className="font-inter-tight font-semibold text-white text-text-m shrink-0" style={{ minWidth: '180px' }}>
                {row.title}
              </span>
              <span className="font-inter-tight font-medium text-white/45 text-text-m leading-[1.4]">
                {row.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
