import { SectionHeading } from '@axevil/design-system/components'
import { EXITS } from './content'

/**
 * About — Exits / Track Record (ported from RIIntelligence)
 * Layout: 2×2 card grid (1-col mobile, 2-col desktop).
 * Card structure mirrors RIIntelligence exactly; CTA/Plus-arrow replaced by
 * a gradient metric value + italic "why" note.
 */

export default function ExitsGrid() {
  return (
    <section id="exits" className="relative w-full bg-page-bg padding-section-t6-b6">
      {/* Mobile gap 1.5rem, scales up to 4rem on desktop — mirrors source */}
      <div className="mx-auto w-full max-w-content container-px flex flex-col items-center" style={{ gap: 'clamp(1.5rem, 5vw, 4rem)' }}>
        <div style={{ maxWidth: '52rem' }}>
          <SectionHeading
            number="4.0"
            label={EXITS.eyebrow}
            title={EXITS.title}
            subtitle={EXITS.lead}
            gap="1.5rem"
          />
        </div>

        {/* 2×2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 w-full" style={{ gap: '1rem' }}>
          {EXITS.cards.map((c) => (
            <div
              key={c.company}
              className="flex flex-col w-full"
              style={{
                background: 'var(--color-bg-card)',
                borderRadius: '1rem',
                padding: '1.5rem',
                gap: '2rem',
              }}
            >
              {/* Text group: eyebrow (type) + (h4 company + body copy) — gap 1.5rem */}
              <div className="flex flex-col" style={{ gap: '1.5rem' }}>
                <span className="font-inter-tight font-medium text-text-s-med text-white/50">
                  {c.type}
                </span>
                {/* Inner: h4 + body — gap 1rem */}
                <div className="flex flex-col" style={{ gap: '1rem' }}>
                  <h4 className="font-inter-tight font-medium text-h4 text-white" style={{ margin: 0 }}>
                    {c.company}
                  </h4>
                  <p className="font-inter-tight font-medium text-paragraph text-white/60">
                    {c.copy}
                  </p>
                </div>
              </div>

              {/* Bottom accent — replaces Plus-arrow CTA from source */}
              <div className="flex flex-col" style={{ marginTop: 'auto', gap: '0.375rem' }}>
                {/* Prominent metric value with gradient headline */}
                <span
                  className="font-inter-tight font-semibold text-h3 text-transparent gradient-text"
                  style={{ backgroundImage: 'var(--gradient-headline)' }}
                >
                  {c.metric}
                </span>
                {/* Small italic note */}
                <span
                  className="font-inter-tight font-medium text-text-s-med text-white-400"
                  style={{ fontStyle: 'italic' }}
                >
                  {c.why}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer line */}
        <p
          className="font-inter-tight font-medium text-text-s-med text-white-300"
          style={{ textAlign: 'center', fontStyle: 'italic', marginTop: '1.5rem' }}
        >
          {EXITS.foot}
        </p>
      </div>
    </section>
  )
}
