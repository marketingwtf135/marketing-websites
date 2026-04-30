import CtaButton from '../components/CtaButton'

export default function Block01Hero() {
  return (
    <section className="relative w-full bg-page-bg overflow-clip" style={{ height: '1080px' }}>

      {/* Background left texture overlay */}
      <div className="absolute inset-0 opacity-25 pointer-events-none" style={{ width: '754px' }}>
        <img
          alt=""
          src="/img/block01/bg-texture.png"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Nav — bg full-width, inner content capped at 1440px */}
      <nav className="absolute top-0 left-0 w-full z-10 border-b border-nav-border bg-nav-bg" style={{ height: '80px' }}>
        <div className="mx-auto max-w-content h-full flex items-center justify-between px-content-edge">
          {/* Logo */}
          <a href="/" aria-label="AXEVIL Capital" className="shrink-0">
            <img src="/img/block01/logo.svg" alt="AXEVIL" width={155} height={24} />
          </a>

          {/* Nav links — all identical: no fill by default, slightly grey text; bg-white/5 on hover */}
          <div className="flex items-center gap-1">
            {['Invest', 'Company Stock', 'Product', 'Compare', 'Resources', 'Company'].map((label) => (
              <button
                key={label}
                type="button"
                className="flex items-center gap-1 px-4 py-2 rounded-full font-inter-tight font-medium text-s-med text-white/60 hover:text-white hover:bg-white/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              >
                {label}
                <img src="/img/block01/arrow-down.svg" alt="" aria-hidden="true" width={16} height={16} />
              </button>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button type="button" className="flex items-center justify-center px-4 py-2.5 rounded-full bg-white/5 font-inter-tight font-semibold text-s-semi text-white hover:bg-white/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
              Sign In
            </button>
            <button type="button" className="flex items-center justify-center px-4 py-2.5 rounded-full bg-white font-inter-tight font-semibold text-s-semi text-phone-bg hover:scale-[1.02] transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-phone-bg">
              Request access
            </button>
          </div>
        </div>
      </nav>

      {/* Hero illustration — top-right, max-width 1600px */}
      <div
        className="absolute top-0 right-0 pointer-events-none overflow-clip"
        style={{ width: '50%', height: '100%' }}
      >
        <img
          alt=""
          src="/img/hero-image.png"
          width={1597}
          height={869}
          className="absolute top-0 right-0 h-auto"
          style={{ maxWidth: '1600px', width: '100%' }}
        />
        {/* Fade left + bottom edges */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, var(--page-bg) 0%, rgba(8,8,8,0) 35%), linear-gradient(0deg, var(--page-bg) 0%, rgba(8,8,8,0) 35%)' }}
        />
      </div>

      {/* Copy + CTA */}
      <div
        className="absolute flex flex-col gap-12 items-start"
        style={{ left: 'calc(50% - 418px)', top: '662px' }}
      >
        <div className="flex flex-col gap-6 items-start">
          <h1
            className="font-inter-tight font-semibold text-h1-semi leading-none tracking-[-0.02em] text-transparent bg-clip-text whitespace-pre-line"
            style={{
              backgroundImage: 'linear-gradient(104.211deg, var(--neutral-00) 2.5635%, var(--neutral-35) 99.06%)',
            }}
          >
            {'Pre-IPO \nInfrastructure'}
          </h1>
          <p className="font-inter-tight font-medium text-text-xl leading-[1.3] tracking-[-0.02em] text-white/60" style={{ width: '604px' }}>
            A platform for investing in the world's leading private technology companies. Built for professional investors and wealth managers.
          </p>
        </div>

        <CtaButton>Request Access</CtaButton>
      </div>
    </section>
  )
}
