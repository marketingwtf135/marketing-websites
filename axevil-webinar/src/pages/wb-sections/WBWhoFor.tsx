import { useLang } from '../../lib/lang'

const CARD_ICONS = [
  '/img/audience-01.svg',
  '/img/audience-02.svg',
  '/img/audience-03.svg',
]

export default function WBWhoFor() {
  const { t } = useLang()

  return (
    <section id="wb-who" className="relative w-full bg-page-bg">
      {/* py 200px top/bottom, 0 horizontal padding removed from inner */}
      <div
        className="mx-auto w-full max-w-[1440px] container-px padding-global"
        style={{ paddingTop: '1.5rem', paddingBottom: 'clamp(12rem, 32vw, 30rem)' }}
      >
        {/* Heading — centered */}
        <div className="flex flex-col items-center text-center mb-4 gap-4">
          <div className="flex items-center gap-2 font-inter-tight font-medium text-[12px] sm:text-text-l text-neutral-30">
            <span className="opacity-50">{t.whoFor.label.split(' ')[0]}</span>
            <span className="opacity-80">{t.whoFor.label.split(' ').slice(1).join(' ')}</span>
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
            {t.whoFor.heading}
          </h2>
        </div>

        {/* 3 cards — height 450px, items centered, gap auto (justify-between) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.whoFor.cards.map((card, i) => (
            <div
              key={card.title}
              className="flex flex-col items-center text-center justify-between md:h-[450px] gap-8 md:gap-0"
              style={{
                padding: '1.25rem',
                borderRadius: '1.5rem',
                background: '#0d0d0d',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {/* Number — text-align center */}
              <span
                className="font-inter-tight font-medium tabular-nums text-center w-full"
                style={{ fontSize: '1.125rem', lineHeight: '135%', letterSpacing: '-0.36px', color: '#303030' }}
              >
                {card.n}
              </span>

              {/* Icon — 128×128 */}
              <img
                src={CARD_ICONS[i]}
                alt=""
                width={80}
                height={80}
                className="md:w-32 md:h-32"
                style={{ objectFit: 'contain' }}
              />

              {/* Title + body — text-align center */}
              <div className="flex flex-col items-center gap-4">
                <h3
                  className="font-inter-tight font-semibold text-white text-center"
                  style={{ fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', lineHeight: 1.2, letterSpacing: '-0.02em' }}
                >
                  {card.title}
                </h3>
                <p
                  className="font-inter-tight font-medium text-white/55 text-center"
                  style={{ fontSize: '0.9375rem', lineHeight: 1.5 }}
                >
                  {card.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
