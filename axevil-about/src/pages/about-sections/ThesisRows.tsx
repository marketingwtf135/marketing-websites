import { SectionHeading } from '@axevil/design-system/components'
import { THESIS, THESIS_IMAGES } from './content'

/**
 * ThesisRows — Why Private Markets (About page §1.0)
 * Layout mirrors RIInsight: 3-col card grid · image + h4 + body + ONE stat block.
 * Source: ri-sections/RIInsight.tsx
 */

export default function ThesisRows() {
  return (
    <section id="thesis" className="relative w-full bg-page-bg padding-section-t6-b6">
      <div className="mx-auto w-full max-w-content container-px flex flex-col" style={{ gap: '3rem' }}>
        <div className="w-full mx-auto" style={{ maxWidth: '50rem' }}>
          <SectionHeading
            number="1.0"
            label={THESIS.eyebrow}
            title={THESIS.title}
            subtitle={THESIS.lead}
            gap="1.5rem"
          />
        </div>

        {/* 3 cards */}
        <div className="flex flex-col items-center w-full" style={{ gap: '1.5rem' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 w-full" style={{ gap: '1rem' }}>
            {THESIS.rows.map((row, i) => (
              <ThesisCardEl
                key={row.title}
                img={THESIS_IMAGES[i]}
                title={row.title}
                copy={row.copy}
                stat={row.stat}
                statLabel={row.statLabel}
              />
            ))}
          </div>
          <p
            className="font-inter-tight font-medium text-xs text-center"
            style={{ color: 'var(--black-800)', maxWidth: '37.5rem' }}
          >
            {THESIS.sources}
          </p>
        </div>
      </div>
    </section>
  )
}

interface ThesisCardProps {
  img: string
  title: string
  copy: string
  stat: string
  statLabel: string
}

function ThesisCardEl({ img, title, copy, stat, statLabel }: ThesisCardProps) {
  return (
    <div
      className="flex flex-col items-center overflow-hidden w-full"
      style={{
        background: 'var(--black-300)',
        borderRadius: '1rem',
      }}
    >
      {/* Image — fluid 13.75rem mobile → 16.25rem tablet+ */}
      <div className="relative w-full shrink-0" style={{ height: 'clamp(13.75rem, 30vw, 16.25rem)' }}>
        <img
          src={img}
          alt={title}
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: 'cover' }}
          loading="lazy"
        />
      </div>

      {/* Bottom — mobile: gap-6; desktop: gap-0 + stats pinned to bottom via mt-auto */}
      <div
        className="flex flex-col flex-1 w-full gap-6"
        style={{ padding: '1.5rem 1rem 1rem 1rem' }}
      >
        {/* Title + body */}
        <div className="flex flex-col items-start w-full gap-2 md:gap-6">
          <h4 className="font-inter-tight font-medium text-h4 text-white w-full" style={{ margin: 0 }}>
            {title}
          </h4>
          <p className="font-inter-tight font-medium text-m text-white-400 w-full">
            {copy}
          </p>
        </div>

        {/* Single stat block — md:mt-auto pins it to card bottom on desktop */}
        <div className="flex flex-col items-start w-full md:mt-auto" style={{ gap: '0.25rem' }}>
          <div
            className="flex flex-col items-start w-full"
            style={{
              background: 'var(--black-500)',
              borderRadius: '0.75rem',
              padding: '1rem',
              gap: '0.5rem',
            }}
          >
            <p className="font-inter-tight font-semibold text-xl text-white whitespace-nowrap" style={{ margin: 0 }}>
              {stat}
            </p>
            <p className="font-inter-tight font-medium text-s-med text-white-400" style={{ margin: 0 }}>
              {statLabel}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
