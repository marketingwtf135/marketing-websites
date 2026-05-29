import { DescTag } from '@axevil/design-system/components'
import { FOUNDERS } from './content'

/**
 * Founders Letter — Block 7.0
 *
 * Composition: full-bleed editorial card surface with a large decorative
 * opening quotation mark, asymmetric two-column desktop grid
 * (left = letter body + signatures; right = stacked founder cards),
 * and a green accent hairline anchoring the eyebrow + title.
 *
 * Desktop (lg+): [1.5fr | 1fr] — letter dominates, cards float right.
 * Tablet / Mobile: single column, cards rendered before the letter body.
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
        /* Lift it so it overlaps the first paragraph slightly */
        display: 'block',
        marginBottom: '-2rem',
        marginLeft: '-0.25rem',
      }}
    >
      «
    </span>
  )
}

/** Placeholder founder photo card — replace inner div with <img> once photos are available. */
function FounderCard({ name, role }: { name: string; role: string }) {
  return (
    <div
      className="relative flex flex-col justify-end overflow-hidden"
      style={{
        minHeight: '17.5rem',
        borderRadius: '1rem',
        border: '1px solid var(--border-subtle)',
        padding: '1.5rem',
        gap: '0.375rem',
        background: [
          'radial-gradient(ellipse 70% 60% at 25% 15%, rgba(77,186,121,0.14), transparent 55%)',
          'linear-gradient(160deg, var(--black-300) 0%, var(--black-200) 100%)',
        ].join(', '),
      }}
    >
      {/* photo goes here — drop a <img> with object-fit:cover position:absolute inset-0 w-full h-full */}

      {/* Subtle grid texture overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: [
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '2rem 2rem',
          borderRadius: 'inherit',
        }}
      />

      {/* Bottom-left name + role — sits above texture */}
      <div className="relative flex flex-col" style={{ gap: '0.3rem' }}>
        <h3
          className="font-inter-tight font-semibold text-white"
          style={{ fontSize: '1.375rem', lineHeight: 1.2, letterSpacing: '-0.02em' }}
        >
          {name}
        </h3>
        <p
          className="font-inter-tight font-medium text-xs"
          style={{ color: 'var(--white-400)', lineHeight: 1.4 }}
        >
          {role}
        </p>
      </div>
    </div>
  )
}

export default function FoundersLetter() {
  return (
    <section
      id="founders"
      className="relative w-full bg-page-bg padding-section-t6-b6"
    >
      <div className="mx-auto w-full max-w-content container-px">

        {/* Outer editorial card */}
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: '2rem',
            border: '1px solid var(--border-subtle)',
            /* Hairline green top accent */
            borderTop: '1px solid var(--status-open)',
            background: [
              /* faint ambient glow top-left */
              'radial-gradient(ellipse 55% 40% at 5% 0%, rgba(77,186,121,0.07), transparent 55%)',
              'var(--black-300)',
            ].join(', '),
            padding: 'clamp(2rem, 4vw, 3rem)',
          }}
        >

          {/* Header row: eyebrow + title — full width above the grid */}
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
              style={{
                backgroundImage: 'var(--gradient-headline)',
                maxWidth: '40rem',
              }}
            >
              {FOUNDERS.title}
            </h2>
          </div>

          {/* Two-column grid: letter (left, wider) | founder cards (right) */}
          <div
            className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr]"
            style={{ gap: 'clamp(2rem, 4vw, 2.75rem)', alignItems: 'start' }}
          >

            {/* ── Left: letter body ── */}
            <div className="flex flex-col" style={{ gap: 0 }}>
              <BigQuote />

              {/* Letter paragraphs with left accent rule */}
              <div
                style={{
                  borderLeft: '2px solid var(--status-open)',
                  paddingLeft: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.125rem',
                }}
              >
                {/* First paragraph styled as editorial lead */}
                {FOUNDERS.letter.map((para, i) => (
                  <p
                    key={i}
                    className="font-inter-tight font-medium text-paragraph"
                    style={{
                      color: i === 0 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.65)',
                      fontSize: i === 0 ? 'clamp(1rem, 1.25vw, 1.125rem)' : undefined,
                      lineHeight: 1.6,
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Signatures */}
              <div
                className="grid grid-cols-1 sm:grid-cols-2"
                style={{
                  gap: '1.25rem',
                  marginTop: '2rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid var(--border-subtle)',
                }}
              >
                {FOUNDERS.signatures.map((s) => (
                  <div
                    key={s.name}
                    className="flex flex-col"
                    style={{ gap: '0.3rem' }}
                  >
                    {/* Stylised signature line */}
                    <div
                      style={{
                        height: '1px',
                        width: '3rem',
                        background: 'var(--status-open)',
                        marginBottom: '0.625rem',
                        opacity: 0.6,
                      }}
                    />
                    <strong
                      className="font-inter-tight font-semibold text-white"
                      style={{ fontSize: '0.9375rem', letterSpacing: '-0.01em' }}
                    >
                      {s.name}
                    </strong>
                    <span
                      className="font-inter-tight font-medium text-xs"
                      style={{ color: 'var(--white-400)' }}
                    >
                      {s.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: founder cards (mobile: above letter via order) ── */}
            <div
              className="flex flex-col order-first lg:order-last"
              style={{ gap: '1rem' }}
            >
              {FOUNDERS.people.map((f) => (
                <FounderCard key={f.name} name={f.name} role={f.role} />
              ))}

              {/* Small accent stat panel below cards */}
              <div
                className="flex flex-col"
                style={{
                  gap: '0.75rem',
                  padding: '1.25rem 1.5rem',
                  borderRadius: '1rem',
                  background: 'var(--black-400)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div
                  className="font-inter-tight font-medium text-xs"
                  style={{ color: 'var(--white-400)', letterSpacing: '0.12em', textTransform: 'uppercase' }}
                >
                  Пять лет работы
                </div>
                <div
                  className="grid grid-cols-2"
                  style={{ gap: '0.875rem' }}
                >
                  {[
                    { val: '$150M', label: 'под управлением' },
                    { val: '1 000+', label: 'инвесторов' },
                    { val: '35', label: 'компаний' },
                    { val: '8', label: 'выходов' },
                  ].map(({ val, label }) => (
                    <div key={label} className="flex flex-col" style={{ gap: '0.15rem' }}>
                      <span
                        className="font-inter-tight font-semibold text-white"
                        style={{ fontSize: '1.375rem', letterSpacing: '-0.03em', lineHeight: 1.1 }}
                      >
                        {val}
                      </span>
                      <span
                        className="font-inter-tight font-medium text-xs"
                        style={{ color: 'var(--white-400)' }}
                      >
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
