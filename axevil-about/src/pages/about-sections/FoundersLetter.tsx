import { DescTag } from '@axevil/design-system/components'
import { FOUNDERS } from './content'

/**
 * Founders Letter — Block 7.0 — rebuilt 1:1 from Figma 1426:5382.
 *
 * Layout:
 *   · wrapper: heading-text (eyebrow + gradient h2) ←→ letter column (710px).
 *   · cards-wrapper: two horizontal person-cards (text left + 240² photo right).
 * Desktop = two columns / two cards in a row; tablet & mobile stack.
 * Fully fluid (rem + clamp); all values from the DS token scale.
 */

function PersonCard({ num, name, role, photo }: { num: string; name: string; role: string; photo: string }) {
  return (
    <div
      className="flex items-center justify-between bg-black-400 w-full"
      style={{ borderRadius: '0.75rem', padding: '0.25rem', gap: '0.75rem' }}
    >
      {/* text */}
      <div className="flex flex-col justify-between self-stretch" style={{ padding: '0.75rem', gap: '1rem' }}>
        <span className="font-inter-tight font-medium text-s-med" style={{ color: 'var(--black-800)' }}>{num}</span>
        <div className="flex flex-col" style={{ gap: '0.25rem' }}>
          <span className="font-inter-tight font-medium text-xl text-white" style={{ lineHeight: 1.3 }}>{name}</span>
          <span className="font-inter-tight font-medium text-m" style={{ color: 'var(--white-300)' }}>{role}</span>
        </div>
      </div>
      {/* photo 240² → fluid square, gradient base + overlay texture */}
      <div
        className="relative shrink-0 overflow-hidden"
        style={{ width: 'clamp(8rem, 18vw, 15rem)', height: 'clamp(8rem, 18vw, 15rem)', borderRadius: '0.5rem' }}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #484b4e 0%, #1d1f20 42.5%, #080808 85%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'url(/img/founders-overlay.png)', backgroundSize: 'cover', backgroundPosition: 'top left', mixBlendMode: 'overlay' }} />
        <img src={photo} alt={name} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      </div>
    </div>
  )
}

export default function FoundersLetter() {
  return (
    <section id="founders" className="relative w-full bg-page-bg padding-section-t6-b6">
      <div
        className="mx-auto w-full max-w-content container-px flex flex-col items-center"
        style={{ gap: 'clamp(2.5rem, 4vw, 3rem)' }}
      >
        {/* wrapper: heading ←→ letter */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between w-full" style={{ gap: 'clamp(2rem, 4vw, 3.75rem)' }}>
          {/* heading-text */}
          <div className="flex flex-col items-start shrink-0" style={{ gap: '2rem' }}>
            <DescTag number="7.0" label={FOUNDERS.eyebrow} />
            <h2
              className="font-inter-tight font-semibold text-h2 text-transparent gradient-text whitespace-pre-line"
              style={{ backgroundImage: 'var(--gradient-headline)' }}
            >
              {FOUNDERS.title}
            </h2>
          </div>

          {/* letter column (710px desktop) */}
          <div className="flex flex-col w-full lg:pt-[4.25rem]" style={{ gap: '1.5rem', maxWidth: '44.375rem' }}>
            <p className="font-inter-tight font-medium text-large text-white">
              {FOUNDERS.letter[0]}
            </p>
            <div className="flex flex-col" style={{ gap: '1rem' }}>
              {FOUNDERS.letter.slice(1).map((para, i) => (
                <p key={i} className="font-inter-tight font-medium text-m" style={{ color: 'var(--white-300)', lineHeight: 1.4 }}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* cards-wrapper: two person cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full" style={{ gap: '1rem' }}>
          {FOUNDERS.people.map((p) => (
            <PersonCard key={p.name} num={p.num} name={p.name} role={p.role} photo={p.photo} />
          ))}
        </div>
      </div>
    </section>
  )
}
