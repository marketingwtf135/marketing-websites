const STATS = ['$150M AUM', '1,000+ investors', '33 portfolio companies', '150+ WM partners']

export default function WBFooter() {
  return (
    <footer className="relative w-full bg-page-bg" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-[80px] py-[48px] sm:py-[60px]">

        {/* Stats — centered */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10 sm:mb-12">
          {STATS.map((s) => (
            <span key={s} className="font-inter-tight font-semibold text-white text-text-m sm:text-text-l">
              {s}
            </span>
          ))}
        </div>

        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '32px' }}
        >
          <div className="flex flex-col gap-3">
            <a href="#" aria-label="AXEVIL Capital">
              <img src="/img/block01/logo.svg" alt="AXEVIL Capital" width={110} height={18} />
            </a>
            <p className="font-inter-tight font-medium text-white/25 text-text-s-med leading-[1.5] max-w-[280px]">
              Axevil Capital — SEC ERA · CRD #802-126907 · FINRA member · Reg D 506(b)
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-3">
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {['Privacy', 'Terms', 'Cookie policy'].map((l) => (
                <a key={l} href="#"
                  className="font-inter-tight font-medium text-white/35 text-text-s-med hover:text-white/60 transition-colors"
                >
                  {l}
                </a>
              ))}
            </div>
            <a href="mailto:hello@axevil.com"
              className="font-inter-tight font-medium text-white/35 text-text-s-med hover:text-white/60 transition-colors"
            >
              hello@axevil.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
