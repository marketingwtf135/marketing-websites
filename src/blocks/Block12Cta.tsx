import CtaButton from '../components/CtaButton'

function CtaCard({
  title,
  subtitle,
  ctaLabel,
  device,
}: {
  title: string
  subtitle: string
  ctaLabel: string
  device: React.ReactNode
}) {
  return (
    <div
      className="relative border border-white/15 overflow-hidden rounded-3xl flex flex-col"
      style={{ width: '710px', height: '660px' }}
    >
      {/* Background gradient + noise */}
      <div
        className="absolute inset-0 pointer-events-none rounded-3xl"
        style={{ background: 'linear-gradient(to top, var(--surface-dark) 0%, var(--surface-mid) 42.523%, var(--page-bg) 85.046%)' }}
      />
      <div
        className="absolute inset-0 pointer-events-none rounded-3xl mix-blend-overlay"
        style={{ backgroundImage: "url('/img/block05/bg-texture.png')", backgroundSize: '1024px 1024px', backgroundPosition: 'top left' }}
      />

      {/* bg-shine glow */}
      <div className="absolute pointer-events-none" style={{ left: '-215px', bottom: '-273px', width: '1140px', height: '325px' }}>
        <img alt="" src="/img/block05/glow1.svg" className="w-full h-full" loading="lazy" />
      </div>
      <div className="absolute mix-blend-plus-lighter pointer-events-none" style={{ left: '307px', bottom: '-206px', width: '436px', height: '193px' }}>
        <img alt="" src="/img/block05/glow2.svg" className="w-full h-full" loading="lazy" />
      </div>

      {/* Device — absolute, z-index 1 (behind content) */}
      {device}

      {/* Copy + button — normal flow, full height, button fixed at bottom 24px */}
      <div className="relative flex flex-col h-full pt-8 pb-6 text-white z-10" style={{ paddingLeft: '32px', paddingRight: '32px' }}>
        <div className="flex flex-col gap-4 items-start">
          <h3 className="font-inter-tight font-semibold text-h4 w-full">{title}</h3>
          <p className="font-inter-tight font-medium text-text-xl text-white/60 w-full">{subtitle}</p>
        </div>
        <div className="flex-1" />
        <CtaButton className="self-start">{ctaLabel}</CtaButton>
      </div>
    </div>
  )
}

export default function Block12Cta() {
  return (
    <section className="relative w-full bg-page-bg" style={{ marginTop: '200px', paddingBottom: '100px' }}>
      <div className="relative mx-auto w-full max-w-content pt-section-y flex flex-col gap-15 items-center">

        {/* Heading */}
        <div className="flex flex-col gap-6 items-center">
          <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l text-neutral-30">
            <span className="opacity-50">12.0</span>
            <span className="opacity-80">Products</span>
          </div>
          <h2
            className="font-inter-tight font-semibold text-h2 pb-2 text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(110.721deg, var(--neutral-00) 2.5635%, var(--neutral-30) 99.06%)' }}
          >
            Heading 2
          </h2>
        </div>

        {/* Two CTA cards */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-5 w-full">
          <CtaCard
            title="For Investors"
            subtitle="Your private equity allocation starts here"
            ctaLabel="Request a Demo"
            device={
              <div className="absolute pointer-events-none" style={{ left: '394px', top: '168px', width: '360px', height: '772px', zIndex: 2 }}>
                <img alt="" src="/img/mobile-app-image-02.png" className="w-full h-full object-contain object-top" loading="lazy" />
              </div>
            }
          />
          <CtaCard
            title="For Wealth Managers"
            subtitle="The infrastructure your PE practice deserves"
            ctaLabel="Request a Demo"
            device={
              <div className="absolute pointer-events-none" style={{ left: '315px', top: '173px', width: '779px', height: '545px', zIndex: 2 }}>
                <img alt="" src="/img/laptop-app-image-02.png" className="w-full h-full object-contain object-left-top" loading="lazy" />
              </div>
            }
          />
        </div>
      </div>
    </section>
  )
}
