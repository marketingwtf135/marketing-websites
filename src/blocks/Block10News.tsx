const NEWS = [
  {
    id: 1,
    img: '/img/block10/news1.png',
    title: 'Institutional Intelligence',
    desc: 'Intelligence. The level of analysis previously reserved for institutional allocators.',
    date: '19 November, 2026',
    isNew: true,
  },
  {
    id: 2,
    img: '/img/block10/news2.png',
    title: 'Pre-IPO Insider',
    desc: 'Pre-IPO Insider — The essential digest. Published twice a year.',
    date: '11 October, 2026',
    isNew: false,
  },
  {
    id: 3,
    img: '/img/block10/news3.png',
    title: 'IPO Calendar',
    desc: 'IPO Calendar — Upcoming liquidity events, tracked in real time.',
    date: '6 October, 2026',
    isNew: false,
  },
  {
    id: 4,
    img: '/img/block10/news4.png',
    title: 'Market Analysis',
    desc: 'Market Analysis — Sector and company-level research on pre-IPO names',
    date: '16 September, 2026',
    isNew: false,
  },
]

export default function Block10News() {
  return (
    <section className="w-full bg-page-bg">
      <div className="mx-auto w-full max-w-content pt-[120px] pb-0 flex flex-col gap-12 items-start">

        {/* Heading row */}
        <div className="flex items-end justify-between w-full">
          <div className="flex flex-col gap-6 items-start">
            <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l leading-[1.35] tracking-[-0.02em] text-neutral-30 whitespace-nowrap">
              <span className="opacity-50">10.0</span>
              <span className="opacity-80">Our news</span>
            </div>
            <h2
              className="font-inter-tight font-semibold text-h2 leading-none tracking-[-0.02em] text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(157.333deg, var(--neutral-00) 2.4356%, var(--neutral-30) 19.927%)', width: '1075px' }}
            >
              Market Intelligence
            </h2>
          </div>
          <button
            type="button"
            className="flex gap-2 h-12 items-center justify-center px-6 py-4 rounded-xl bg-white font-inter-tight font-semibold text-text-btn text-page-bg hover:scale-[1.02] transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-page-bg shrink-0"
          >
            <img src="/img/block10/notebook-icon.svg" alt="" aria-hidden="true" width={20} height={20} />
            All articles
          </button>
        </div>

        {/* Cards */}
        <div className="flex flex-wrap md:flex-nowrap gap-5 items-start w-full">
          {NEWS.map((item) => (
            <a
              key={item.id}
              href="#"
              className="flex flex-col gap-8 items-start shrink-0 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded-card transition-transform duration-200 ease-out hover:scale-[1.02] hover:-translate-y-1"
              style={{ width: '345px' }}
            >
              {/* Image */}
              <div
                className="border-[3px] border-border-subtle rounded-card shrink-0 w-full overflow-hidden relative"
                style={{ height: '345px' }}
              >
                <img
                  alt={item.title}
                  src={item.img}
                  className="absolute inset-0 w-full h-full object-cover rounded-card transition-transform duration-200 pointer-events-none"
                  loading="lazy"
                />

                {/* Date pill(s) */}
                <div className="absolute top-4 left-4 flex gap-2 items-center">
                  {item.isNew && (
                    <div className="backdrop-blur-[8px] bg-white flex gap-2 items-center justify-center px-4 py-3 rounded-2xl shrink-0" style={{ WebkitBackdropFilter: 'blur(8px)' }}>
                      <span className="bg-status-open rounded-lg shrink-0 size-2" />
                      <span className="font-inter-tight font-semibold text-text-s-semi leading-[1.2] tracking-[-0.02em] text-black whitespace-nowrap">New</span>
                    </div>
                  )}
                  <div className="backdrop-blur-[8px] bg-[rgba(116,116,116,0.2)] flex items-center justify-center px-4 py-3 rounded-2xl shrink-0" style={{ WebkitBackdropFilter: 'blur(8px)' }}>
                    <span className="font-inter-tight font-semibold text-text-s-semi leading-[1.2] tracking-[-0.02em] text-white whitespace-nowrap">{item.date}</span>
                  </div>
                </div>
              </div>

              {/* Copy */}
              <div className="flex flex-col gap-4 items-start px-4 text-white w-full">
                <p className="font-inter-tight font-semibold text-h5 leading-[1.1] tracking-[-0.02em] w-full">{item.title}</p>
                <p className="font-inter-tight font-medium text-text-l leading-[1.35] tracking-[-0.02em] text-white/50 w-full">{item.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
