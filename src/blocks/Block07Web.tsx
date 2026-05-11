export default function Block07Web() {
  return (
    <section className="relative w-full bg-page-bg overflow-clip" style={{ height: '1060px', marginTop: '200px' }}>

      {/* Background PNG */}
      <img
        alt=""
        src="/img/bg/web-app-cta-bg.png"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        aria-hidden="true"
      />

      {/* Heading — centered at top */}
      <div className="absolute inset-x-0 flex flex-col items-center gap-8" style={{ top: '60px' }}>
        <div className="flex flex-col gap-8 items-center">
          <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l text-neutral-30 whitespace-nowrap">
            <span className="opacity-50">6.0</span>
            <span className="opacity-80">Download App</span>
          </div>
          <h2
            className="font-inter-tight font-semibold text-h2 text-transparent bg-clip-text text-center whitespace-nowrap"
            style={{ backgroundImage: 'linear-gradient(94.044deg, var(--neutral-00) 0.176%, var(--neutral-30) 98.822%)' }}
          >
            Featured deals
          </h2>
        </div>
      </div>

      {/* App illustration — absolute centered, 1055x788 */}
      <div className="absolute inset-x-0 flex justify-center pointer-events-none" style={{ top: '211px' }}>
        <img
          alt="Axevil Pro web app interface"
          src="/img/block07/web-app-cta.png"
          width={1055}
          height={788}
          className="object-contain"
          style={{ width: '1055px', height: '788px' }}
          loading="lazy"
        />
      </div>

      {/* CTA button — standalone (not shared CtaButton), centered at y=805 */}
      <div className="absolute inset-x-0 flex justify-center" style={{ top: '805px' }}>
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
