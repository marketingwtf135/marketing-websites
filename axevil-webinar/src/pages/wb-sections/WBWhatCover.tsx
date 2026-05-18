import { useLang } from '../../lib/lang'

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
        borderRadius: '1.5rem',
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
          maxWidth: bodyFill ? 'none' : (typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches ? 'none' : '50%'),
        }}
      >
        {body}
      </p>
    </div>
  )
}

export default function WBWhatCover() {
  const { t } = useLang()
  const items = t.whatCover.items
  const row1 = items.slice(0, 3)
  const row2 = items.slice(3)

  return (
    <section id="wb-agenda" className="relative w-full bg-page-bg">
      <div
        className="mx-auto w-full max-w-[1440px] container-px padding-global"
        style={{ paddingTop: 'clamp(3rem, 8vw, 7.5rem)', paddingBottom: 'clamp(3rem, 8vw, 7.5rem)' }}
      >
        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12 gap-4">
          <div className="flex items-center gap-2 font-inter-tight font-medium text-[12px] sm:text-text-l text-neutral-30">
            <span className="opacity-50">{t.whatCover.label.split(' ')[0]}</span>
            <span className="opacity-80">{t.whatCover.label.split(' ').slice(1).join(' ')}</span>
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
            {t.whatCover.heading}
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {/* Row 1: first 3 items — paragraph fills container */}
          <div className="flex flex-col sm:flex-row gap-[1rem]">
            {row1.map(item => (
              <AgendaCard key={item.n} n={item.n} body={item.body} className="sm:h-[198px]" bodyFill />
            ))}
          </div>

          {/* Row 2: remaining items — paragraph fills container */}
          <div className="flex flex-col sm:flex-row gap-[1rem]">
            {row2.map(item => (
              <AgendaCard key={item.n} n={item.n} body={item.body} bodyFill />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
