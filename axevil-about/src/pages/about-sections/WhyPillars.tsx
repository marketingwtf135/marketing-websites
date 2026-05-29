import { SectionHeading } from '@axevil/design-system/components'
import { WHY } from './content'

/**
 * Why Pillars — What makes Axevil different (Block 5).
 * 3 column-cards in a flex-row (gap: 0). Each card:
 *   - marker eclipse icon + hairline (top)
 *   - h4 title + text-s-med body (max-w 18.75rem)
 *   - pillar number (text-s-med, color black-800) at bottom via marginTop:auto
 * Mobile: horizontal scroll with right-edge fade hint.
 */

export default function WhyPillars() {
  return (
    <section id="why" className="relative w-full bg-page-bg padding-section-t6-b6">
      <div
        className="mx-auto w-full max-w-content container-px flex flex-col items-center"
        style={{ gap: '3rem' }}
      >
        <div style={{ maxWidth: '50rem' }}>
          <SectionHeading
            number="5.0"
            label={WHY.eyebrow}
            title={WHY.title}
            subtitle={WHY.lead}
            gap="1.5rem"
            className="[&_h2]:overflow-visible"
          />
        </div>

        {/* Mobile: horizontal scroll, each card 95% of container width, gap 0 between cards.
            Right edge gets a subtle fade + light blur overlay to hint "more to scroll".
            Desktop (md+): equal flex-1 columns, no overlay. */}
        <div className="relative w-full">
          <div
            className="flex flex-row items-start w-full overflow-x-auto md:overflow-visible"
            style={{ gap: 0, scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {WHY.pillars.map((pillar) => (
              <div
                key={pillar.num}
                className="flex flex-col shrink-0 w-[95%] md:w-auto md:flex-1 md:min-w-0 self-stretch"
                style={{ minHeight: '14rem' }}
              >
                {/* Marker eclipse + horizontal hairline */}
                <div className="flex items-center w-full" style={{ gap: 0 }}>
                  <img
                    src="/about/icons/icon-eclipse.svg"
                    alt=""
                    aria-hidden="true"
                    className="shrink-0"
                    style={{ width: '1rem', height: '1rem' }}
                  />
                  <div
                    className="flex-1"
                    style={{ height: '1px', background: 'var(--black-500)' }}
                  />
                </div>

                {/* Title + body on top */}
                <div className="flex flex-col w-full" style={{ gap: '0.5rem', maxWidth: '18.75rem', paddingTop: '2rem' }}>
                  <h4 className="font-inter-tight font-medium text-h4 text-white" style={{ margin: 0 }}>
                    {pillar.title}
                  </h4>
                  <p className="font-inter-tight font-medium text-text-s-med text-white-400">
                    {pillar.copy}
                  </p>
                </div>

                {/* Number — pinned to bottom via marginTop:auto, hug content width */}
                <span
                  className="font-inter-tight font-medium text-s-med inline-block w-fit"
                  style={{ color: 'var(--black-800)', marginTop: 'auto', paddingTop: '2rem' }}
                >
                  {pillar.num}
                </span>
              </div>
            ))}
          </div>

          {/* Right-edge scroll hint — mobile only. Gradient fade to page-bg + subtle backdrop blur
              indicates more cards to scroll. Pointer-events-none so it never blocks touch-scroll. */}
          <div
            aria-hidden="true"
            className="md:hidden absolute right-0 top-0 bottom-0 pointer-events-none"
            style={{
              width: '5rem',
              background: 'linear-gradient(to left, var(--page-bg) 10%, transparent 100%)',
              backdropFilter: 'blur(1.5px)',
              WebkitBackdropFilter: 'blur(1.5px)',
              maskImage: 'linear-gradient(to left, black 30%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to left, black 30%, transparent 100%)',
            }}
          />
        </div>
      </div>
    </section>
  )
}
