export default function Block07Web() {
  return (
    <section className="relative w-full bg-page-bg overflow-clip" style={{ height: '1060px', marginTop: '200px' }}>

      {/* bg-shine layers */}
      <div className="absolute pointer-events-none" style={{ left: '-2px', top: '-48px', width: '1930px', height: '479px' }}>
        <img alt="" src="/img/block07/bg-shine1.svg" className="absolute w-full h-full" style={{ inset: '-33.51% -8.32%', width: 'calc(100% + 16.64%)', height: 'calc(100% + 67.02%)' }} />
      </div>
      <div className="absolute pointer-events-none" style={{ left: '-2px', top: '439px', width: '1930px', height: '675px' }}>
        <img alt="" src="/img/block07/bg-shine2.svg" className="w-full h-full" style={{ transform: 'scaleY(-1)' }} />
      </div>
      <div className="absolute pointer-events-none" style={{ left: '-186px', top: '240px', width: '2500px', height: '604px' }}>
        <img alt="" src="/img/block07/bg-shine3.svg" className="w-full h-full" />
      </div>

      {/* Edge glow ellipses */}
      <div className="absolute mix-blend-plus-lighter pointer-events-none" style={{ left: '-227px', top: '381px', width: '367px', height: '396px' }}>
        <img alt="" src="/img/block07/ellipse-glow.svg" className="w-full h-full" />
      </div>
      <div className="absolute mix-blend-plus-lighter pointer-events-none" style={{ right: '-291px', top: '381px', width: '367px', height: '396px' }}>
        <img alt="" src="/img/block07/ellipse-glow.svg" className="w-full h-full" />
      </div>

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
          src="/img/web-app-cta.png"
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
