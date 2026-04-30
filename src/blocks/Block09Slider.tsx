import { useRef, useState, useEffect } from 'react'

const TEAM = [
  { id: 1, name: 'Alexander Ivanov', role: 'Co-founder & Managing Partner', desc: 'Two line sentence Two line sentence Two line sentence Two line sentence Two line sentence Two line sentence', ex: 'ex. Name companies ex. Name companies', photo: '/img/block09/person1.png' },
  { id: 2, name: 'Taras Chumachenko', role: 'Co-founder & Managing Partner', desc: 'Two line sentence Two line sentence Two line sentence Two line sentence Two line sentence Two line sentence', ex: 'ex. Name companies ex. Name companies', photo: '/img/block09/person2.png' },
  { id: 3, name: 'Vladislav Solovev', role: 'Co-founder & Managing Partner', desc: 'Two line sentence Two line sentence Two line sentence Two line sentence Two line sentence Two line sentence', ex: 'ex. Name companies ex. Name companies', photo: '/img/block09/person3.png' },
  { id: 4, name: 'Andrey Revenko', role: 'Co-founder & Managing Partner', desc: 'Two line sentence Two line sentence Two line sentence Two line sentence Two line sentence Two line sentence', ex: 'ex. Name companies ex. Name companies', photo: '/img/block09/person4.png' },
  { id: 5, name: 'Danil Yakovlev', role: 'Co-founder & Managing Partner', desc: 'Two line sentence Two line sentence Two line sentence Two line sentence Two line sentence Two line sentence', ex: 'ex. Name companies ex. Name companies', photo: '/img/block09/person5.png' },
  { id: 6, name: 'Artem Duz', role: 'Co-founder & Managing Partner', desc: 'Two line sentence Two line sentence Two line sentence Two line sentence Two line sentence Two line sentence', ex: 'ex. Name companies ex. Name companies', photo: '/img/block09/person6.png' },
  { id: 7, name: 'Anna Babak', role: 'Co-founder & Managing Partner', desc: 'Two line sentence Two line sentence Two line sentence Two line sentence Two line sentence Two line sentence', ex: 'ex. Name companies ex. Name companies', photo: '/img/block09/person7.png' },
  { id: 8, name: 'Georgy Manasov', role: 'Co-founder & Managing Partner', desc: 'Two line sentence Two line sentence Two line sentence Two line sentence Two line sentence Two line sentence', ex: 'ex. Name companies ex. Name companies', photo: '/img/block09/person8.png' },
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
      <div className="mx-auto w-full max-w-content py-[120px] flex flex-col gap-12 items-start">

        {/* Heading row */}
        <div className="flex items-end justify-between w-full">
          <div className="flex flex-col gap-10 items-start" style={{ width: '820px' }}>
            <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l leading-[1.35] tracking-[-0.02em] text-neutral-30 whitespace-nowrap">
              <span className="opacity-50">9.0</span>
              <span className="opacity-80">Professionals</span>
            </div>
            <div className="flex flex-col gap-6 items-start">
              <h2
                className="font-inter-tight font-semibold text-h2 leading-none tracking-[-0.02em] text-transparent bg-clip-text whitespace-nowrap"
                style={{ backgroundImage: 'linear-gradient(88.856deg, var(--neutral-00) 0.414%, var(--neutral-30) 99.509%)' }}
              >
                Our team
              </h2>
              <p className="font-inter-tight font-medium text-text-xl leading-[1.3] tracking-[-0.02em] text-white/50 whitespace-pre-wrap" style={{ width: '490px' }}>
                {'Founded by professionals with deep roots \nin institutional finance and frontier technology.'}
              </p>
            </div>
          </div>

          {/* Slider buttons */}
          <div className="flex gap-2 items-center shrink-0">
            <button
              type="button"
              aria-label="Previous slide"
              aria-controls="team-track"
              disabled={atStart}
              onClick={() => scroll('prev')}
              onKeyDown={(e) => { if (e.key === 'Enter') scroll('prev') }}
              className="size-16 rounded-full overflow-hidden disabled:opacity-30 hover:opacity-100 transition-opacity duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              <img alt="" src="/img/block09/btn-left.svg" className="w-full h-full" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              aria-controls="team-track"
              disabled={atEnd}
              onClick={() => scroll('next')}
              onKeyDown={(e) => { if (e.key === 'Enter') scroll('next') }}
              className="size-16 rounded-full overflow-hidden disabled:opacity-30 hover:opacity-100 transition-opacity duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              <img alt="" src="/img/block09/btn-right.svg" className="w-full h-full" />
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
              style={{ width: `${CARD_W}px`, scrollSnapAlign: 'start' }}
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
                  className="absolute inset-0 w-full h-full object-cover rounded-card"
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
