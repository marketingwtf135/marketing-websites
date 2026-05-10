const ITEMS_ROW1 = [
  { n: '1.0', body: 'The math of private market alpha — sources, persistence and net-of-fee evidence over the last two decades.' },
  { n: '2.0', body: 'HNWI portfolio construction — four real allocation examples from 5% sleeve to 30% institutional-grade.' },
  { n: '3.0', body: 'Access vehicles compared — SPVs, feeders, secondaries, evergreen, pre-IPO.' },
]

const ITEMS_ROW2 = [
  { n: '4.0', body: 'A 90-day plan to introduce private markets to your existing client base without disrupting current allocations.' },
  { n: '5.0', body: 'Live Q&A.' },
]

function AgendaCard({
  n, body, height, flex, bodyFill, className,
}: { n: string; body: string; height?: number; flex?: string; bodyFill?: boolean; className?: string }) {
  return (
    <div
      className={`flex flex-col justify-between${className ? ' ' + className : ''}`}
      style={{
        padding: '1.5rem',
        gap: '2rem',
        flex: flex ?? '1 0 0',
        borderRadius: 24,
        background: '#0d0d0d',
        height: height ?? 'auto',
      }}
    >
      <span
        className="font-inter-tight font-medium tabular-nums"
        style={{ fontSize: '0.875rem', lineHeight: '135%', letterSpacing: '-0.36px', color: '#404040' }}
      >
        {n}
      </span>
      <p
        className="font-inter-tight font-medium"
        style={{
          fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
          lineHeight: '130%',
          letterSpacing: '-0.4px',
          color: '#ffffff',
          maxWidth: bodyFill ? 'none' : '50%',
        }}
      >
        {body}
      </p>
    </div>
  )
}

export default function WBWhatCover() {
  return (
    <section id="wb-agenda" className="relative w-full bg-page-bg">
      <div
        className="mx-auto w-full max-w-[1440px]"
        style={{ paddingTop: '6.25rem', paddingBottom: '6.25rem' }}
      >
        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12 gap-4">
          <div className="flex items-center gap-2 font-inter-tight font-medium text-[12px] sm:text-text-l text-neutral-30">
            <span className="opacity-50">4.0</span>
            <span className="opacity-80">Agenda</span>
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
            What we&#39;ll cover
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {/* Row 1: 1.0/2.0/3.0 — paragraph fills container */}
          <div className="flex flex-col sm:flex-row gap-[1rem]">
            {ITEMS_ROW1.map(item => (
              <AgendaCard key={item.n} n={item.n} body={item.body} className="sm:h-[198px]" bodyFill />
            ))}
          </div>

          {/* Row 2: 4.0/5.0 — paragraph max-width 50% */}
          <div className="flex flex-col sm:flex-row gap-[1rem]">
            {ITEMS_ROW2.map(item => (
              <AgendaCard key={item.n} n={item.n} body={item.body} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
