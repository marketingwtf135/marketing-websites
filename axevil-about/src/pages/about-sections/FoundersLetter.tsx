import { DescTag, SliderCard } from '@axevil/design-system/components'
import { FOUNDERS } from './content'

/**
 * Founders Letter — Block 7.0
 *
 * Editorial card: eyebrow + gradient title header, then an asymmetric grid —
 * the letter (left, with a faint opening quote + green accent rule) and the two
 * founders as DS <SliderCard/> (right column, fixed 20rem). Single column on
 * mobile (founders below the letter).
 */

/** Faint oversized opening quote — decorative, aria-hidden. */
function BigQuote() {
  return (
    <span
      aria-hidden="true"
      className="font-inter-tight font-semibold select-none pointer-events-none"
      style={{
        fontSize: 'clamp(5rem, 12vw, 9rem)',
        lineHeight: 1,
        color: 'var(--status-open)',
        opacity: 0.12,
        letterSpacing: '-0.04em',
        display: 'block',
        marginBottom: '-2rem',
        marginLeft: '-0.25rem',
      }}
    >
      «
    </span>
  )
}

export default function FoundersLetter() {
  return (
    <section id="founders" className="relative w-full bg-page-bg padding-section-t6-b6">
      <div className="mx-auto w-full max-w-content container-px">
        {/* Editorial card */}
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: '2rem',
            border: '1px solid var(--border-subtle)',
            borderTop: '1px solid var(--status-open)',
            background: [
              'radial-gradient(ellipse 55% 40% at 5% 0%, rgba(77,186,121,0.07), transparent 55%)',
              'var(--black-300)',
            ].join(', '),
            padding: 'clamp(2rem, 4vw, 3rem)',
          }}
        >
          {/* Header — eyebrow + title */}
          <div
            className="flex flex-col"
            style={{
              gap: '1rem',
              paddingBottom: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              borderBottom: '1px solid var(--border-subtle)',
              marginBottom: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            }}
          >
            <DescTag number="7.0" label={FOUNDERS.eyebrow} />
            <h2
              className="font-inter-tight font-semibold text-h2 text-transparent gradient-text"
              style={{ backgroundImage: 'var(--gradient-headline)', maxWidth: '40rem' }}
            >
              {FOUNDERS.title}
            </h2>
          </div>

          {/* Letter (left) | founders SliderCards (right, fixed 20rem) */}
          <div
            className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.5fr)_20rem]"
            style={{ gap: 'clamp(2rem, 4vw, 3rem)', alignItems: 'start' }}
          >
            {/* Letter */}
            <div className="flex flex-col" style={{ gap: 0 }}>
              <BigQuote />
              <div
                style={{
                  borderLeft: '2px solid var(--status-open)',
                  paddingLeft: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.125rem',
                }}
              >
                {FOUNDERS.letter.map((para, i) => (
                  <p
                    key={i}
                    className="font-inter-tight font-medium text-paragraph"
                    style={{
                      color: i === 0 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.65)',
                      lineHeight: 1.6,
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Founders — DS SliderCard ×2, stacked */}
            <div className="flex flex-col items-center lg:items-start" style={{ gap: '2rem' }}>
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
          </div>
        </div>
      </div>
    </section>
  )
}
