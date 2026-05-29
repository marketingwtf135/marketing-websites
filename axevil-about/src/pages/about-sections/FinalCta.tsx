import { CtaForm } from '@axevil/design-system/components'
import { FINAL_CTA } from './content'

export default function FinalCta() {
  return (
    <section id="cta" className="w-full" style={{ background: 'linear-gradient(180deg, #080808 0%, #161616 50%, #080808 100%)', borderTop: '1px solid var(--section-border)' }}>
      <CtaForm
        number={FINAL_CTA.number}
        label={FINAL_CTA.label}
        title={FINAL_CTA.title}
        subtitle={FINAL_CTA.subtitle}
        primaryLabel={FINAL_CTA.primary}
        secondaryLabel={FINAL_CTA.secondary}
        onPrimaryClick={() => window.open(FINAL_CTA.calendly, '_blank', 'noopener')}
        onSecondaryClick={() => window.open(FINAL_CTA.calendly, '_blank', 'noopener')}
      />
      <div className="mx-auto w-full max-w-content container-px" style={{ paddingBottom: 'clamp(2rem, 4vw, 3rem)', textAlign: 'center' }}>
        <p className="font-inter-tight font-medium text-text-xs text-white/45">
          {FINAL_CTA.crossPrefix}{' '}
          <a href={FINAL_CTA.crossHref} className="underline" style={{ color: 'var(--status-open)' }}>{FINAL_CTA.crossLink}</a>
        </p>
      </div>
    </section>
  )
}
