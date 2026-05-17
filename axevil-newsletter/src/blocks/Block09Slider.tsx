import { useRef, useState, useEffect } from 'react'

const TEAM = [
  { id: 1, name: 'Alexander Ivanov',   role: 'Co-founder & Managing Partner', desc: '12+ years of investment banking experience. Led wealth management development initiatives.', ex: 'ex-Finam, ex-Otkritie, ex-Aton.', photo: '/img/block09/team09.png' },
  { id: 2, name: 'Taras Chumachenko',  role: 'Co-founder & Managing Partner', desc: '10+ years of experience in alternative investments. Held senior positions at Societe Generale, managing investment products.', ex: 'ex-Societe Generale', photo: '/img/block09/team08.png' },
  { id: 3, name: 'Vladislav Solovev',  role: 'Head of Research', desc: '5+ years of experience analyzing companies across private and public markets.', ex: 'Member of Angel Squad, the largest angel investor community in the US.', photo: '/img/block09/team07.png' },
  { id: 4, name: 'Andrey Revenko',     role: 'Co-founder & Managing Partner', desc: 'Two line sentence Two line sentence Two line sentence.', ex: 'ex. Name companies', photo: '/img/block09/team06.png' },
  { id: 5, name: 'Danil Yakovlev',     role: 'Co-founder & Managing Partner', desc: 'Two line sentence Two line sentence Two line sentence.', ex: 'ex. Name companies', photo: '/img/block09/team05.png' },
  { id: 6, name: 'Artem Duz',          role: 'Co-founder & Managing Partner', desc: 'Two line sentence Two line sentence Two line sentence.', ex: 'ex. Name companies', photo: '/img/block09/team04.png' },
  { id: 7, name: 'Anna Babak',         role: 'Co-founder & Managing Partner', desc: 'Two line sentence Two line sentence Two line sentence.', ex: 'ex. Name companies', photo: '/img/block09/team03.png' },
  { id: 8, name: 'Georgy Manasov',     role: 'Co-founder & Managing Partner', desc: 'Two line sentence Two line sentence Two line sentence.', ex: 'ex. Name companies', photo: '/img/block09/team02.png' },
  { id: 9, name: 'Pavel Rasputin',     role: 'Co-founder & Managing Partner', desc: 'Two line sentence Two line sentence Two line sentence.', ex: 'ex. Name companies', photo: '/img/block09/team01.png' },
]

const CARD_W = 465
const CARD_GAP = 20

export default function Block09Slider() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  function updateBounds() {
    const t = trackRef.current
    if (!t) return
    setAtStart(t.scrollLeft <= 0)
    setAtEnd(t.scrollLeft + t.clientWidth >= t.scrollWidth - 1)
  }

  useEffect(() => { updateBounds() }, [])

  function scroll(dir: 'prev' | 'next') {
    const t = trackRef.current
    if (!t) return
    const amount = CARD_W + CARD_GAP
    t.scrollBy({ left: dir === 'next' ? amount : -amount, behavior: 'smooth' })
  }

  return (
    <section className="w-full bg-page-bg">
      <div className="mx-auto w-full max-w-content container-px py-[60px] md:py-[120px] flex flex-col gap-12 items-start">

        {/* Heading row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between w-full gap-6 md:gap-0">
          <div className="flex flex-col gap-10 items-start w-full md:w-auto" style={{ maxWidth: '820px' }}>
            <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l leading-[1.35] tracking-[-0.02em] text-neutral-30 whitespace-nowrap">
              <span className="opacity-50">8.0</span>
              <span className="opacity-80">Professionals</span>
            </div>
            <div className="flex flex-col gap-6 items-start">
              <h2
                className="font-inter-tight font-semibold text-h2 leading-none tracking-[-0.02em] text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(94deg, #A2A2A2 4.07%, #FFF 49.51%, #A2A2A2 94.94%)', fontSize: 'clamp(1.75rem, 4vw, 4rem)', width: '100%' }}
              >
                Industry leading experts, at your side
              </h2>
              <p className="font-inter-tight font-medium tracking-[-0.02em] text-white/50" style={{ width: '100%', maxWidth: '710px', fontSize: 'clamp(1rem, 1.25vw, 1.25rem)', lineHeight: '130%' }}>
                Axevil's team brings institutional-grade judgment and a curated pre-IPO network — equipping you to navigate late-stage venture with confidence
              </p>
            </div>
          </div>

          {/* Slider buttons — new self-contained 64×64 SVGs */}
          <div className="flex gap-2 items-center shrink-0">
            <button
              type="button"
              aria-label="Previous slide"
              aria-controls="team-track"
              disabled={atStart}
              onClick={() => scroll('prev')}
              onKeyDown={(e) => { if (e.key === 'Enter') scroll('prev') }}
              className="flex items-center justify-center disabled:opacity-30 hover:scale-110 hover:opacity-100 opacity-70 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              <img src="/icons/slider-buttons-left.svg" alt="" aria-hidden="true" width={64} height={64} />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              aria-controls="team-track"
              disabled={atEnd}
              onClick={() => scroll('next')}
              onKeyDown={(e) => { if (e.key === 'Enter') scroll('next') }}
              className="flex items-center justify-center disabled:opacity-30 hover:scale-110 hover:opacity-100 opacity-70 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              <img src="/icons/slider-buttons-right.svg" alt="" aria-hidden="true" width={64} height={64} />
            </button>
          </div>
        </div>

        {/* Slides */}
        <div
          id="team-track"
          ref={trackRef}
          onScroll={updateBounds}
          className="flex gap-5 items-start overflow-x-auto w-full"
          style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {TEAM.map((member) => (
            <div
              key={member.id}
              className="flex flex-col gap-6 items-start shrink-0 relative"
              style={{ width: `min(${CARD_W}px, 85vw)`, scrollSnapAlign: 'start' }}
            >
              {/* Photo card */}
              <div
                className="relative rounded-card shrink-0 w-full overflow-hidden border-[3px] border-border-subtle"
                style={{ height: '500px' }}
              >
                <div
                  className="absolute inset-0 rounded-card"
                  style={{ background: 'linear-gradient(to top, var(--surface-dark) 0%, var(--surface-mid) 42.523%, var(--page-bg) 85.046%)' }}
                />
                <div
                  className="absolute inset-0 rounded-card mix-blend-overlay"
                  style={{
                    backgroundImage: "url('/img/block05/bg-texture.png')",
                    backgroundSize: '1024px 1024px',
                    backgroundPosition: 'top left',
                  }}
                />
                <img
                  alt={member.name}
                  src={member.photo}
                  className="absolute inset-0 w-full h-full object-contain object-top rounded-card"
                  loading="lazy"
                />
                {/* Role tag */}
                <div className="absolute top-5 left-5 bg-surface-3 flex gap-2 items-center justify-center px-4 py-3 rounded-2xl">
                  <span className="bg-white/50 rounded-dot shrink-0 size-2" />
                  <span className="font-inter-tight font-semibold text-text-s-semi leading-[1.2] tracking-[-0.02em] text-white whitespace-nowrap">{member.role}</span>
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-col gap-6 items-start px-4 text-white w-full">
                <div className="flex flex-col gap-4 items-start w-full">
                  <p className="font-inter-tight font-semibold text-h5 leading-[1.1] tracking-[-0.02em] w-full">{member.name}</p>
                  <p className="font-inter-tight font-medium text-text-l leading-[1.35] tracking-[-0.02em] text-white/50 w-full">{member.desc}</p>
                </div>
                <p className="font-inter-tight font-medium text-text-l leading-[1.35] tracking-[-0.02em] text-white w-full">{member.ex}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
