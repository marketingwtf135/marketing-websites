import { IllCards, type IllCard, SectionHeading } from '@axevil/design-system/components'
import { LEGAL, LEGAL_CARDS } from './content'

// Satisfy the IllCard type — LEGAL_CARDS shape matches exactly (num, img, imgMobile, title, body)
const cards: IllCard[] = LEGAL_CARDS

export default function LegalInfra() {
  return (
    <section id="legal" className="w-full bg-page-bg padding-section-t6-b6">
      <div className="mx-auto w-full max-w-content container-px flex flex-col gap-12 items-center">
        <SectionHeading
          number="6.0"
          label={LEGAL.eyebrow}
          title={LEGAL.title}
          align="center"
          titleMaxWidth="50rem"
        />
        <IllCards cards={cards} className="w-full ill-cards-home" />

        {/* Partners grid */}
        <div
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: '1rem', marginTop: 'clamp(2rem, 4vw, 3rem)' }}
        >
          {LEGAL.partners.map((p, i) => (
            <div
              key={p.title}
              className="flex flex-col"
              style={{
                background: 'var(--color-bg-card)',
                borderRadius: '1rem',
                padding: '1.5rem',
              }}
            >
              {/* descriptor + content group — gap spacing-2 (2rem) */}
              <div className="flex flex-col" style={{ gap: '2rem' }}>
                <span
                  className="font-inter-tight font-medium text-s-med"
                  style={{ color: 'var(--black-800)' }}
                >
                  {`${i + 1}.0`} {p.type}
                </span>
                {/* title + copy group — gap spacing-1 (1rem) */}
                <div className="flex flex-col" style={{ gap: '1rem' }}>
                  <h4
                    className="font-inter-tight font-semibold text-white text-xl"
                    style={{ margin: 0 }}
                  >
                    {p.title}
                  </h4>
                  <p className="font-inter-tight font-medium text-s-med text-white-300">
                    {p.copy}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
