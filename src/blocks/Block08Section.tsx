export default function Block08Section() {
  const cards = [
    { img: '/img/ill-legal-01.png', title: 'SEC Registered', sub: '# 802-126907' },
    { img: '/img/ill-legal-02.png', title: 'ERA Status', sub: 'Approved' },
    { img: '/img/ill-legal-03.png', title: 'FINRA CRD', sub: '323970' },
    { img: '/img/ill-legal-04.png', title: 'Delaware Corp.', sub: 'Since 2021' },
  ]
  return (
    <section className="w-full bg-page-bg" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
      <div className="mx-auto w-full max-w-content flex flex-col gap-16 items-center">
        <div className="flex flex-col gap-8 items-center text-center">
          <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l text-neutral-30">
            <span className="opacity-50">8.0</span>
            <span className="opacity-80">Everything is legal</span>
          </div>
          <h2 className="font-inter-tight font-semibold text-h2 text-white text-center">
            Best Venture Practices<br />for Investor Capital Protection.
          </h2>
          <p className="font-inter-tight font-medium text-text-xl text-white/60 text-center" style={{ maxWidth: '460px' }}>
            A technology platform for private equity — for professional investors and wealth managers.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-5 w-full">
          {cards.map((card) => (
            <div key={card.title} className="rounded-3xl border border-white/10 bg-surface-1 overflow-hidden flex flex-col">
              {/* Illustration frame: 672px × 225px scaled to card width */}
              <div className="w-full overflow-hidden" style={{ height: '225px' }}>
                <img
                  alt={card.title}
                  src={card.img}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6 flex flex-col gap-2">
                <span className="font-inter-tight font-semibold text-h5 text-white">{card.title}</span>
                <span className="font-inter-tight font-medium text-text-m text-white/60">{card.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
