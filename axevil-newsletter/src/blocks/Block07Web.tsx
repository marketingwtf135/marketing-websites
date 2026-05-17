export default function Block07Web() {
  return (
    <section
      className="relative w-full bg-page-bg overflow-clip"
      style={{ minHeight: 'clamp(400px, 80vh, 1060px)', height: 'auto' }}
    >
      {/* Background PNG */}
      <img
        alt=""
        src="/img/bg/web-app-cta-bg.png"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        aria-hidden="true"
      />

      {/* Content — flex column, fluid */}
      <div
        className="relative flex flex-col items-center"
        style={{ paddingTop: 'clamp(2.5rem, 4.2vw, 3.75rem)', gap: 'clamp(2rem, 4vw, 4rem)', paddingBottom: '4rem' }}
      >
        {/* Heading */}
        <div className="flex flex-col gap-8 items-center px-4">
          <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l text-neutral-30 whitespace-nowrap">
            <span className="opacity-50">6.0</span>
            <span className="opacity-80">Web version</span>
          </div>
          <h2
            className="font-inter-tight font-semibold text-transparent bg-clip-text text-center"
            style={{
              backgroundImage: 'linear-gradient(94.044deg, var(--neutral-00) 0.176%, var(--neutral-30) 98.822%)',
              fontSize: 'clamp(1.75rem, 4vw, 4rem)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}
          >
            Featured deals
          </h2>
        </div>

        {/* App illustration — responsive width */}
        <div className="flex justify-center pointer-events-none w-full px-4">
          <img
            alt="Axevil Pro web app interface"
            src="/img/block07/web-app-cta.png"
            className="object-contain w-full"
            style={{ maxWidth: '65.9375rem', height: 'auto' }}
            loading="lazy"
          />
        </div>

        {/* CTA button */}
        <button
          type="button"
          className="relative flex items-center justify-center gap-2.5 h-16 px-8 rounded-2xl font-inter-tight font-semibold text-text-btn text-btn-label hover:scale-[1.02] transition-transform border-b-4 border-btn-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          style={{ boxShadow: '32px 32px 32px rgba(255,255,255,0.25), 12px 12px 16px rgba(255,255,255,0.25), 2px 2px 8px rgba(255,255,255,0.5)' }}
        >
          <div className="absolute inset-0 rounded-2xl bg-white pointer-events-none" />
          <img alt="" src="/img/block01/btn-overlay.png" className="absolute inset-0 w-full h-full rounded-2xl object-bottom mix-blend-overlay pointer-events-none" />
          <img src="/icons/Lock.svg" alt="" aria-hidden="true" width={24} height={24} className="relative z-10" style={{ filter: 'brightness(0)' }} />
          <span className="relative z-10">Request access</span>
        </button>
      </div>
    </section>
  )
}
