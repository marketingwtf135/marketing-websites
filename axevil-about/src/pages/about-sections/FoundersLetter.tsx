import { SectionHeading, SliderCard } from '@axevil/design-system/components'
import { FOUNDERS } from './content'

/**
 * Founders Letter — Block 7.0 (rebuilt from scratch on the design system).
 *
 * Composition:
 *   1. SectionHeading (eyebrow 7.0 + gradient h2), centered.
 *   2. Two DS <SliderCard/> founders side-by-side — the visual anchor.
 *   3. The letter below as a centered editorial column: an oversized green quote
 *      mark, the paragraphs, then signatures separated by a hairline.
 *
 * All tokens from the DS (Inter Tight, --status-open accent, gradient headline,
 * surface/border tokens, rem spacing). Responsive: founders 1-col on mobile.
 */
export default function FoundersLetter() {
  return (
    <section id="founders" className="relative w-full bg-page-bg padding-section-t6-b6">
      <div
        className="mx-auto w-full max-w-content container-px flex flex-col items-center"
        style={{ gap: 'clamp(2.5rem, 5vw, 4rem)' }}
      >
        {/* 1 — heading */}
        <div style={{ maxWidth: '50rem' }}>
          <SectionHeading
            number="7.0"
            label={FOUNDERS.eyebrow}
            title={FOUNDERS.title}
            align="center"
            gap="1.5rem"
          />
        </div>

        {/* 2 — founders as DS SliderCards, side by side */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 w-full"
          style={{ gap: 'clamp(1rem, 2.5vw, 2rem)', maxWidth: '52rem' }}
        >
          {FOUNDERS.people.map((p) => (
            <SliderCard
              key={p.name}
              name={p.name}
              role={p.role}
              description={p.description}
              photo={p.photo}
              className="w-full"
            />
          ))}
        </div>

        {/* 3 — letter as a centered editorial column inside a DS surface card */}
        <div
          className="relative w-full flex flex-col items-center text-center overflow-hidden"
          style={{
            maxWidth: '52rem',
            borderRadius: '2rem',
            border: '1px solid var(--border-subtle)',
            borderTop: '1px solid var(--status-open)',
            background: [
              'radial-gradient(ellipse 60% 45% at 50% 0%, rgba(77,186,121,0.08), transparent 60%)',
              'var(--black-300)',
            ].join(', '),
            padding: 'clamp(2rem, 4.5vw, 3.5rem)',
            gap: '1.5rem',
          }}
        >
          {/* Oversized opening quote */}
          <span
            aria-hidden="true"
            className="font-inter-tight font-semibold select-none pointer-events-none"
            style={{
              fontSize: 'clamp(4rem, 9vw, 6.5rem)',
              lineHeight: 0.8,
              color: 'var(--status-open)',
              opacity: 0.18,
              letterSpacing: '-0.04em',
            }}
          >
            «
          </span>

          {/* Paragraphs — first one larger as an editorial lead */}
          <div className="flex flex-col" style={{ gap: '1.125rem' }}>
            {FOUNDERS.letter.map((para, i) => (
              <p
                key={i}
                className="font-inter-tight font-medium"
                style={{
                  color: i === 0 ? 'var(--white-100)' : 'rgba(255,255,255,0.6)',
                  fontSize: i === 0 ? 'clamp(1.125rem, 2vw, 1.5rem)' : 'var(--font-l)',
                  lineHeight: i === 0 ? 1.4 : 1.6,
                  letterSpacing: '-0.02em',
                }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Signatures */}
          <div
            className="flex flex-wrap justify-center w-full"
            style={{
              gap: '2.5rem',
              marginTop: '0.5rem',
              paddingTop: '1.75rem',
              borderTop: '1px solid var(--border-subtle)',
            }}
          >
            {FOUNDERS.signatures.map((s) => (
              <div key={s.name} className="flex flex-col items-center" style={{ gap: '0.375rem' }}>
                <span
                  aria-hidden="true"
                  style={{ height: '1px', width: '2.5rem', background: 'var(--status-open)', opacity: 0.7, marginBottom: '0.5rem' }}
                />
                <strong
                  className="font-inter-tight font-semibold text-white"
                  style={{ fontSize: '0.9375rem', letterSpacing: '-0.01em' }}
                >
                  {s.name}
                </strong>
                <span className="font-inter-tight font-medium text-xs" style={{ color: 'var(--white-400)' }}>
                  {s.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
