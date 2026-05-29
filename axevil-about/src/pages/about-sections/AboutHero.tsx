import { BtnOwn, StatusPill } from '@axevil/design-system/components'
import { HERO, HERO_DEALS } from './content'

/** Set true to overlay a RU deal-feed on the phone; false shows the real product
 *  screenshot alone (use false if hero-phone.png already contains a baked-in feed). */
const OVERLAY = false

export default function AboutHero() {
  return (
    <section id="top" className="relative w-full overflow-clip bg-page-bg" style={{ paddingTop: '7.5rem' }}>
      <div
        className="mx-auto w-full max-w-content container-px grid items-center lg:grid-cols-[1.15fr_0.85fr]"
        style={{ gap: 'clamp(2.5rem, 5vw, 4.375rem)', paddingBottom: 'clamp(3.75rem, 7vw, 5.5rem)' }}
      >
        {/* Left */}
        <div className="flex flex-col" style={{ gap: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
          <p className="font-inter-tight font-medium text-text-s-med" style={{ color: 'var(--status-open)', letterSpacing: '0.1875rem' }}>{HERO.eyebrow}</p>
          <h1 className="font-inter-tight font-semibold text-h1-semi text-acc-gradient" style={{ maxWidth: '50rem' }}>{HERO.title}</h1>
          <p className="font-inter-tight font-medium text-paragraph text-white/60" style={{ maxWidth: '37.5rem' }}>{HERO.sub}</p>
          <div className="flex flex-wrap items-center" style={{ gap: '1.125rem' }}>
            <BtnOwn size="L" hideIcon onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}>{HERO.primary}</BtnOwn>
            <BtnOwn size="L" variant="secondary" hideIcon onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}>{HERO.secondary}</BtnOwn>
          </div>
        </div>

        {/* Right — phone */}
        <div className="relative mx-auto w-full" style={{ maxWidth: '20.625rem' }}>
          <img src="/about/img/hero-phone.png" alt="Axevil — мобильное приложение с лентой сделок" className="block w-full h-auto" />
          {OVERLAY && (
            <div className="absolute inset-0 flex flex-col" style={{ padding: '14% 9% 8%', gap: '0.625rem' }} aria-hidden>
              <p className="font-inter-tight font-medium text-text-xs text-white/50" style={{ letterSpacing: '0.09375rem' }}>DEAL FEED</p>
              <p className="font-inter-tight font-semibold text-white" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Открытые возможности</p>
              {HERO_DEALS.map((d) => (
                <div key={d.name} className="flex flex-col" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', borderRadius: '0.75rem', padding: '0.625rem', gap: '0.375rem' }}>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center justify-center font-inter-tight font-semibold text-black-600" style={{ width: '1.75rem', height: '1.75rem', borderRadius: '0.4375rem', fontSize: '0.625rem', background: 'linear-gradient(135deg,#bcbcbc,#4dba79)' }}>{d.ticker}</span>
                    <StatusPill status={d.status} label={d.statusLabel} />
                  </div>
                  <span className="font-inter-tight font-semibold text-white" style={{ fontSize: '0.75rem' }}>{d.name}</span>
                  <span className="font-inter-tight font-medium text-white/40" style={{ fontSize: '0.5625rem' }}>{d.sector}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
