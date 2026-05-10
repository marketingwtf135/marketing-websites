const SCHEDULE = [
  { time: '0:00 ~ 0:05', title: 'Context',                desc: 'Why private markets grew by $7T in 5 years' },
  { time: '0:05 ~ 0:25', title: 'Portfolio architecture', desc: 'HNWI portfolio architecture: what private markets allocation makes sense' },
  { time: '0:25 ~ 0:40', title: 'Access mechanics',       desc: 'Access mechanics for top-tier deals + 3 client portfolio cases' },
  { time: '0:40 ~ 0:55', title: '2026 trends',            desc: 'AI, Defense, Energy/Nuclear, Biotech' },
  { time: '0:55 ~ 1:00', title: 'Q&A',                    desc: 'Open questions' },
]

// Figma node 451:3749 вЂ” Time icon from /img/Time.svg
function ClockIcon() {
  return (
    <img src="/img/Time.svg" alt="" aria-hidden="true" width={20} height={20} />
  )
}

export default function WBSchedule() {
  return (
    <section id="wb-schedule" className="relative w-full bg-page-bg">
      <div className="mx-auto w-full max-w-[1440px] pt-[64px] sm:pt-[80px] lg:pt-[100px]" style={{ paddingBottom: 200 }}>

        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12 gap-4">
          <div className="flex items-center gap-2 font-inter-tight font-medium text-[12px] sm:text-text-l text-neutral-30">
            <span className="opacity-50">5.0</span>
            <span className="opacity-80">Schedule</span>
          </div>
          <h2
            className="font-inter-tight font-semibold text-transparent bg-clip-text"
            style={{
              fontSize: 'clamp(2.25rem, 5vw, 4.5rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              backgroundImage: 'linear-gradient(95deg, #ffffff -2.56%, #b7b7b7 99.06%)',
              overflow: 'visible',
            }}
          >
            Webinar schedule
          </h2>
        </div>

        {/* Schedule cards вЂ” width 710px, centered */}
        <div className="flex flex-col gap-3 mx-auto" style={{ maxWidth: 'min(100%, 44.375rem)' }}>
          {SCHEDULE.map(row => (
            <div
              key={row.time}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6 px-5 py-4 sm:px-6 sm:py-5 rounded-[1.25rem]"
              style={{
                width: '100%',
                background: '#0d0d0d',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {/* Left: title + desc */}
              <div className="flex flex-col gap-1.5 flex-1 min-w-0 pr-4">
                <span
                  className="font-inter-tight font-semibold text-white"
                  style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', lineHeight: 1.25, letterSpacing: '-0.02em' }}
                >
                  {row.title}
                </span>
                <span
                  className="font-inter-tight font-medium text-white/45"
                  style={{ fontSize: '0.875rem', lineHeight: 1.45 }}
                >
                  {row.desc}
                </span>
              </div>

              {/* Right: time pill with clock icon */}
              <div
                className="inline-flex items-center gap-2 shrink-0 px-3.5 py-2 rounded-full font-inter-tight font-medium tabular-nums"
                style={{
                  background: '#1a1a1a',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: '0.8125rem',
                }}
              >
                <ClockIcon />
                {row.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
