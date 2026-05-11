import { useLang } from '../../lib/lang'

// Figma node 451:3749 — Time icon from /img/Time.svg
function ClockIcon() {
  return (
    <img src="/img/Time.svg" alt="" aria-hidden="true" width={20} height={20} />
  )
}

export default function WBSchedule() {
  const { t } = useLang()

  return (
    <section id="wb-schedule" className="relative w-full bg-page-bg">
      <div
        className="mx-auto w-full max-w-[1440px] container-px padding-global"
        style={{ paddingTop: 'clamp(3rem, 8vw, 7.5rem)', paddingBottom: 'clamp(3rem, 8vw, 7.5rem)' }}
      >

        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12 gap-4">
          <div className="flex items-center gap-2 font-inter-tight font-medium text-[12px] sm:text-text-l text-neutral-30">
            <span className="opacity-50">{t.schedule.label.split(' ')[0]}</span>
            <span className="opacity-80">{t.schedule.label.split(' ').slice(1).join(' ')}</span>
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
            {t.schedule.heading}
          </h2>
        </div>

        {/* Schedule cards — width 710px, centered */}
        <div className="flex flex-col gap-3 mx-auto" style={{ maxWidth: 'min(100%, 44.375rem)' }}>
          {t.schedule.rows.map(row => (
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
                className="inline-flex self-start sm:self-auto items-center gap-2 shrink-0 px-3.5 py-2 rounded-full font-inter-tight font-medium tabular-nums"
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
