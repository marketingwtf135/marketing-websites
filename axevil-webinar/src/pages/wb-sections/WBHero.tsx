import WBRegistrationForm from './WBRegistrationForm'
import { useLang } from '../../lib/lang'

// 6 brand logos — drop icon-logo-01.svg ... icon-logo-06.svg into /img/
const BRAND_LOGOS = [
  { label: 'Brand 1', src: '/img/icons-logo-01.svg' },
  { label: 'Brand 2', src: '/img/icons-logo-02.svg' },
  { label: 'Brand 3', src: '/img/icons-logo-03.svg' },
  { label: 'Brand 4', src: '/img/icons-logo-04.svg' },
  { label: 'Brand 5', src: '/img/icons-logo-05.svg' },
  { label: 'Brand 6', src: '/img/icons-logo-06.svg' },
]

export default function WBHero() {
  const { t } = useLang()
  return (
    <section
      id="wb-hero"
      className="relative w-full bg-page-bg flex flex-col overflow-clip min-h-[calc(100svh-4rem)] lg:h-[calc(100svh-4rem)]"
    >
      {/* Background video — drop bg-video.mp4 into /img/ */}
      <video
        src="/ostracized_remix_scene.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="pointer-events-none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'left center',
          opacity: 1,
          zIndex: 0,
        }}
      />
      {/* Dark overlay so text stays readable */}
      <div className="absolute inset-0 bg-transparent pointer-events-none" />

      <div
        className="relative flex-1 mx-auto w-full max-w-[1440px] container-px padding-global flex items-center"
        style={{ paddingTop: '2rem', paddingBottom: '2rem' }}
      >
        {/* Grid: single column on mobile, 1fr + auto-form on lg+; form is pinned to the right edge of the 1440px grid container */}
        <div className="grid w-full items-center gap-10 lg:gap-12 lg:grid-cols-[minmax(0,1fr)_auto]">

          {/* LEFT COLUMN — left-aligned content, no CTA button */}
          <div className="flex flex-col items-start text-left w-full min-w-0" style={{ gap: '1.5rem' }}>

            {/* Date badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-inter-tight font-medium"
              style={{
                fontSize: 'var(--font-s)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.6)',
                background: 'rgba(255,255,255,0.04)',
              }}
            >
              <span
                className="rounded-full shrink-0"
                style={{
                  width: '0.625rem', height: '0.625rem', background: 'var(--status-open)',
                  boxShadow: '0 0 6px #4dba79, 0 0 12px rgba(77,186,121,0.5)',
                }}
              />
              {t.hero.badge}
            </div>

            {/* H1 + subheadline */}
            <div className="flex flex-col items-start w-full" style={{ gap: '1.25rem' }}>
              <h1
                className="font-inter-tight font-semibold leading-[1.05] tracking-[-0.03em] text-transparent bg-clip-text w-full text-left"
                style={{
                  fontSize: 'clamp(1.75rem, 5vw, 4rem)',
                  backgroundImage: 'var(--acc-gradient)',
                  maxWidth: '55rem',
                }}
              >
                {t.hero.heading}
              </h1>
              <p
                className="font-inter-tight font-medium text-white/55 leading-[1.4] text-left"
                style={{ maxWidth: '37.5rem', fontSize: 'clamp(1rem, 1.4vw, 1.125rem)' }}
              >
                {t.hero.sub}
              </p>
            </div>

            {/* Brand logos — left aligned wrap */}
            <div className="flex flex-wrap items-center justify-start gap-2 sm:gap-3" style={{ marginTop: '0.5rem' }}>
              {BRAND_LOGOS.map((b, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center shrink-0 w-12 h-12 sm:w-16 sm:h-16"
                  style={{ borderRadius: '0.625rem', background: 'var(--surface-0)' }}
                >
                  <img
                    src={b.src}
                    alt={b.label}
                    width={24}
                    height={24}
                    className="sm:w-8 sm:h-8"
                    style={{ objectFit: 'contain' }}
                    onError={e => {
                      // Fallback: show placeholder letter if SVG not yet uploaded
                      const el = e.currentTarget
                      el.style.display = 'none'
                      const parent = el.parentElement
                      if (parent && !parent.querySelector('span')) {
                        const s = document.createElement('span')
                        s.textContent = String(i + 1)
                        s.style.cssText = 'color:rgba(255,255,255,0.3);font-size:18px;font-family:Inter Tight,sans-serif;font-weight:600'
                        parent.appendChild(s)
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN — registration form card, pinned to grid's right edge */}
          <div
            id="wb-hero-form"
            className="w-full lg:justify-self-end"
            style={{ maxWidth: '26rem' }}
          >
            <div
              className="relative w-full"
              style={{
                background: 'rgba(14,14,14,0.72)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '1.5rem',
                padding: 'clamp(1.25rem, 2vw, 1.75rem)',
                boxShadow: '0 24px 48px -16px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.02) inset',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
              }}
            >
              {/* Form heading — center aligned, no '7.0 Регистрация' label */}
              <div className="flex flex-col items-center text-center mb-5" style={{ gap: '0.375rem' }}>
                <h2
                  className="font-inter-tight font-semibold text-white"
                  style={{ fontSize: 'clamp(1.375rem, 2vw, 1.625rem)', lineHeight: 1.15, letterSpacing: '-0.02em' }}
                >
                  {t.form.heading}
                </h2>
                <p
                  className="font-inter-tight font-medium text-white/55"
                  style={{ fontSize: 'var(--font-s)' }}
                >
                  {t.form.sub}
                </p>
              </div>

              <WBRegistrationForm submitVariant="cta" disclaimerAlign="center" />
            </div>
          </div>
        </div>
      </div>
      {/* No bottom border — removed per feedback */}
    </section>
  )
}
