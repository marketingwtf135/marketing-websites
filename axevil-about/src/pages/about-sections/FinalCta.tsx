import { BtnOwn, DescTag } from '@axevil/design-system/components'
import { FINAL_CTA } from './content'

/**
 * Final CTA — centered composition mirroring the DS CtaForm visual
 * (eyebrow + gradient h2 + subtitle + two BtnOwn), but built locally with
 * DS BtnOwn so we control the icon (the DS CtaForm's internal buttons load a
 * root-absolute /icons/Key.svg that 404s under the / base).
 */
export default function FinalCta() {
  const openCalendly = () => window.open(FINAL_CTA.calendly, '_blank', 'noopener')
  return (
    <section
      id="cta"
      className="w-full"
      style={{ background: 'var(--bg-100)', borderTop: '1px solid var(--section-border)' }}
    >
      <div className="mx-auto w-full max-w-content container-px flex flex-col items-center text-center padding-section-t6-b12">
        {/* whole section — gap spacing-2 (2rem) */}
        <div className="flex flex-col items-center" style={{ gap: '2rem', maxWidth: '60rem' }}>
          {/* descriptor + heading-group — gap spacing-1.5 (1.5rem) */}
          <div className="flex flex-col items-center" style={{ gap: '1.5rem' }}>
            <DescTag number={FINAL_CTA.number} label={FINAL_CTA.label} className="items-center" />
            {/* h3 + paragraph — gap spacing-1 (1rem), max-width 710px */}
            <div className="flex flex-col items-center" style={{ gap: '1rem', maxWidth: '44.375rem' }}>
              <h3
                className="font-inter-tight font-semibold text-h3 text-transparent gradient-text"
                style={{ backgroundImage: 'var(--gradient-headline)' }}
              >
                {FINAL_CTA.title}
              </h3>
              <p className="font-inter-tight font-medium text-paragraph text-white/60" style={{ maxWidth: '37.5rem' }}>
                {FINAL_CTA.subtitle}
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center sm:justify-center w-full max-w-[30rem] sm:max-w-none" style={{ gap: '0.5rem' }}>
            <BtnOwn size="L" hideIcon className="w-full sm:w-auto" onClick={openCalendly}>{FINAL_CTA.primary}</BtnOwn>
            <BtnOwn size="L" hideIcon variant="secondary" className="w-full sm:w-auto" onClick={openCalendly}>{FINAL_CTA.secondary}</BtnOwn>
          </div>
          <p className="font-inter-tight font-medium text-xs text-white-400">
            {FINAL_CTA.crossPrefix}{' '}
            <a href={FINAL_CTA.crossHref} className="underline" style={{ color: 'var(--white-100)' }}>{FINAL_CTA.crossLink}</a>
          </p>
        </div>
      </div>
    </section>
  )
}
