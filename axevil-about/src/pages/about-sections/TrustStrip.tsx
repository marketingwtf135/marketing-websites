import { SectionHeading } from '@axevil/design-system/components'
import { Tag } from '@axevil/design-system/components'
import { TRUST_STATS, KEYSTATS_PILLS } from './content'

/**
 * About — Trust Strip / Key Stats (ported from RIKeyStats.tsx)
 * Figma source: 1131:5961 desktop / 946:9129 mobile
 *
 * Desktop: staircase 4 cards bottom-aligned, ascending heights (8 → 35 → 1 000+ → $150M)
 *          + 3 regulatory pills below
 * Tablet:  2×2 grid
 * Mobile:  1-col vertical stack ($150M → 1 000+ → 35 → 8) + 3 pills
 */

const STROKE_GRADIENT =
  'linear-gradient(var(--page-bg), var(--page-bg)), linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)'
const STROKE_BORDER_STYLE: React.CSSProperties = {
  border: '1px solid transparent',
  backgroundImage: STROKE_GRADIENT,
  backgroundOrigin: 'padding-box, border-box',
  backgroundClip: 'padding-box, border-box',
}

/** Mobile cards — order biggest → smallest per Figma 946:9129 */
const MOBILE_CARDS = [
  { stat: TRUST_STATS[0].num, label: TRUST_STATS[0].label, num: '1.0' }, // $150M
  { stat: TRUST_STATS[1].num, label: TRUST_STATS[1].label, num: '2.0' }, // 1 000+
  { stat: TRUST_STATS[2].num, label: TRUST_STATS[2].label, num: '3.0' }, // 35
  { stat: TRUST_STATS[3].num, label: TRUST_STATS[3].label, num: '4.0' }, // 8
]

export default function TrustStrip() {
  return (
    <section
      className="w-full bg-page-bg pt-0"
      style={{
        paddingBottom: 'clamp(3.125rem, 6.25vw, 6.25rem)',
        paddingLeft: '1.25rem',
        paddingRight: '1.25rem',
      }}
    >
      {/* ── Mobile layout (< 768px) — 1 column vertical stack ── */}
      <div className="md:hidden flex flex-col w-full">
        {/* Heading */}
        <div style={{ marginBottom: '2rem' }}>
          <SectionHeading
            number="2.0"
            label="Наши цифры"
            title="Ключевые показатели"
            align="start"
            gap="2rem"
            gradient="var(--gradient-headline-narrow)"
            className="[&_h2]:overflow-visible"
          />
        </div>

        {/* Stacked cards — biggest → smallest per Figma */}
        {MOBILE_CARDS.map((card) => (
          <div key={card.num} className="flex flex-col bg-page-bg" style={{ height: '10.1875rem' }}>
            <div className="bg-white shrink-0 w-full" style={{ height: '1px' }} />
            <div className="flex flex-col flex-1 items-start justify-between p-5 relative overflow-hidden" style={STROKE_BORDER_STYLE}>
              <div className="flex flex-col gap-2 items-start w-full">
                <p className="font-inter-tight font-medium text-h1-med text-white">{card.stat}</p>
                <p className="font-inter-tight font-medium text-text-l" style={{ color: 'var(--white-300)' }}>{card.label}</p>
              </div>
              <p className="font-inter-tight font-medium text-text-m relative" style={{ color: 'var(--black-800, #404040)' }}>{card.num}</p>
            </div>
          </div>
        ))}

        {/* Regulatory pills */}
        <div className="flex flex-wrap items-center justify-center w-full" style={{ gap: '0.5rem', marginTop: '2rem' }}>
          {KEYSTATS_PILLS.map((label) => (
            <Tag key={label} variant="regulatory" label={label} />
          ))}
        </div>
      </div>

      {/* ── Tablet layout (768–1023px) — 2×2 grid of stat cards ── */}
      <div className="hidden md:block lg:hidden w-full">
        <div className="mx-auto w-full max-w-content flex flex-col" style={{ gap: '2rem' }}>
          <SectionHeading
            number="2.0"
            label="Наши цифры"
            title="Ключевые показатели"
            align="start"
            gap="2rem"
            gradient="var(--gradient-headline-narrow)"
            className="[&_h2]:overflow-visible"
          />

          <div className="grid grid-cols-2 w-full" style={{ gap: '1rem' }}>
            {MOBILE_CARDS.map((card) => (
              <div key={card.num} className="flex flex-col bg-page-bg" style={{ height: '15.625rem' }}>
                <div className="bg-white shrink-0 w-full" style={{ height: '0.375rem' }} />
                <div className="flex flex-col flex-1 items-start justify-between p-6 relative overflow-hidden" style={STROKE_BORDER_STYLE}>
                  <div className="flex flex-col gap-3 items-start w-full">
                    <p className="font-inter-tight font-medium text-h1-med text-white">{card.stat}</p>
                    <p className="font-inter-tight font-medium text-paragraph text-white">{card.label}</p>
                  </div>
                  <p className="font-inter-tight font-medium text-text-m" style={{ color: 'var(--black-800, #404040)' }}>{card.num}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center w-full" style={{ gap: '0.5rem' }}>
            {KEYSTATS_PILLS.map((label) => (
              <Tag key={label} variant="regulatory" label={label} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Desktop layout (≥ 1024px) — staircase ascending ──
          Fluid: local font-size scales with viewport (16px @ ≥1440, 11.4px @ 1024).
          Every rem inside this wrapper shrinks proportionally — the cards keep their
          staircase visual but never overflow horizontally. ── */}
      <div className="hidden lg:block w-full overflow-hidden">
        <div
          className="relative mx-auto overflow-clip"
          style={{
            fontSize: 'clamp(0.5rem, calc(100vw / 90), 1rem)',
            width: '90rem',
            height: '63rem',
            maxWidth: '100%',
          }}
        >
        {/* Section heading — top-left */}
        <div className="absolute whitespace-nowrap" style={{ left: 0, top: 0 }}>
          <SectionHeading
            number="2.0"
            label="Наши цифры"
            title="Ключевые показатели"
            align="start"
            gap="2rem"
            gradient="var(--gradient-headline-narrow)"
            className="[&_h2]:overflow-visible"
          />
        </div>

        {/* Card 01 — 8 / успешных выходов (smallest) */}
        <div className="absolute flex flex-col bg-page-bg group" style={{ left: 0, top: '32.6875rem', width: '23.4375rem', height: '24.6875rem' }}>
          <div className="bg-white shrink-0 w-full" style={{ height: '0.625rem' }} />
          <div className="flex flex-col flex-1 items-start justify-between p-6 relative overflow-hidden" style={STROKE_BORDER_STYLE}>
            <img alt="" src="/about/img/block03/gradient-image.webp" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 pointer-events-none" style={{ transition: 'opacity 0.8s ease-in-out' }} />
            <div className="flex flex-col gap-4 items-start w-full relative">
              <p className="font-inter-tight font-medium text-h1-med text-white">8</p>
              <p className="font-inter-tight font-medium text-paragraph text-white">успешных выходов</p>
            </div>
            <p className="font-inter-tight font-medium text-text-l text-white/60 relative">1.0</p>
          </div>
        </div>

        {/* Card 02 — 35 / компаний в портфеле */}
        <div className="absolute flex flex-col bg-page-bg group" style={{ left: '22.1875rem', top: '29.625rem', width: '23.4375rem', height: '27.75rem' }}>
          <div className="bg-white shrink-0 w-full" style={{ height: '0.625rem' }} />
          <div className="flex flex-col flex-1 items-start justify-between p-6 relative overflow-hidden" style={STROKE_BORDER_STYLE}>
            <img alt="" src="/about/img/block03/gradient-image.webp" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 pointer-events-none" style={{ transition: 'opacity 0.8s ease-in-out' }} />
            <div className="flex flex-col gap-4 items-start w-full relative">
              <p className="font-inter-tight font-medium text-h1-med text-white">35</p>
              <p className="font-inter-tight font-medium text-paragraph text-white">компаний в портфеле</p>
            </div>
            <p className="font-inter-tight font-medium text-text-l text-white/60 relative">2.0</p>
          </div>
        </div>

        {/* Card 03 — 1 000+ / инвесторов */}
        <div className="absolute flex flex-col bg-page-bg group" style={{ left: '44.375rem', top: '17.6875rem', width: '23.4375rem', height: '39.6875rem' }}>
          <div className="bg-white shrink-0 w-full" style={{ height: '0.625rem' }} />
          <div className="flex flex-col flex-1 items-start justify-between p-6 relative overflow-hidden" style={STROKE_BORDER_STYLE}>
            <img alt="" src="/about/img/block03/gradient-image.webp" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 pointer-events-none" style={{ transition: 'opacity 0.8s ease-in-out' }} />
            <div className="absolute inset-0 pointer-events-none" style={{
              maskImage: "url('/about/img/block03/card02-mask.svg')",
              WebkitMaskImage: "url('/about/img/block03/card02-mask.svg')",
              maskSize: '22.8125rem 46.8125rem', WebkitMaskSize: '22.8125rem 46.8125rem',
              maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat',
              opacity: 0.03, transform: 'rotate(45deg) scale(1.5)',
            }}>
              <img alt="" src="/about/img/block03/card02-mask-fill.webp" className="absolute w-full h-full object-cover" />
            </div>
            <div className="flex flex-col gap-4 items-start w-full relative">
              <p className="font-inter-tight font-medium text-h1-med text-white relative">1 000+</p>
              <p className="font-inter-tight font-medium text-paragraph text-white relative">инвесторов</p>
            </div>
            <p className="font-inter-tight font-medium text-text-l text-white/60 relative">3.0</p>
          </div>
        </div>

        {/* Card 04 — $150M / под управлением (tallest, ornate with ellipses + mask) */}
        <div className="absolute flex flex-col bg-page-bg overflow-clip group" style={{ left: '66.5625rem', top: '10.5625rem', width: '23.4375rem', height: '46.8125rem' }}>
          {/* card04-glow.png removed — asset not present in this project.
              The mask <div> is kept without any child <img> so the card04 mask
              CSS is preserved and the ellipses layers below still render. */}
          <div className="absolute inset-0 pointer-events-none" style={{
            maskImage: "url('/about/img/block03/card04-mask.svg')",
            WebkitMaskImage: "url('/about/img/block03/card04-mask.svg')",
            maskSize: '23.4375rem 46.8125rem', WebkitMaskSize: '23.4375rem 46.8125rem',
            maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat',
          }} />
          <div className="absolute mix-blend-plus-lighter pointer-events-none" style={{ left: '10.25rem', top: '-9.625rem', width: '25.1875rem', height: '24.1875rem' }}>
            <img alt="" src="/about/img/block03/card04-ellipse1.svg" className="w-full h-full" style={{ transform: 'rotate(41.09deg)' }} />
          </div>
          <div className="absolute mix-blend-plus-lighter pointer-events-none" style={{ left: '-8.5625rem', top: '11.6875rem', width: '12.375rem', height: '15.1875rem' }}>
            <img alt="" src="/about/img/block03/card04-ellipse2.svg" className="w-full h-full" style={{ transform: 'rotate(90deg)' }} />
          </div>
          <div className="bg-white shrink-0 w-full relative z-10" style={{ height: '0.625rem' }} />
          <div className="flex flex-col flex-1 items-start justify-between p-6 relative z-10 overflow-clip" style={STROKE_BORDER_STYLE}>
            <img alt="" src="/about/img/block03/gradient-image.webp" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 pointer-events-none" style={{ transition: 'opacity 0.8s ease-in-out' }} />
            <div className="flex flex-col gap-4 items-start w-full relative">
              <p className="font-inter-tight font-medium text-h1-med text-white mix-blend-hard-light">$150M</p>
              <p className="font-inter-tight font-medium text-paragraph text-white">под управлением</p>
            </div>
            <p className="font-inter-tight font-medium text-text-l text-white/60">4.0</p>
          </div>
        </div>

        {/* Regulatory pills row — bottom center */}
        <div
          className="absolute flex items-center justify-center w-full"
          style={{ left: 0, bottom: 0, gap: '0.5rem' }}
        >
          {KEYSTATS_PILLS.map((label) => (
            <Tag key={label} variant="regulatory" label={label} />
          ))}
        </div>
        </div>
      </div>
    </section>
  )
}
