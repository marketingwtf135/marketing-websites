import { useState } from 'react'
import CtaButton from '../components/CtaButton'

type TagId = 'Active Deals' | 'Portfolio' | 'Applications' | 'Clients' | 'CRM' | 'Secondary' | 'Market Intelligence' | 'AI'

const TAGS: TagId[] = ['Active Deals', 'Portfolio', 'Applications', 'Clients', 'CRM', 'Secondary', 'Market Intelligence', 'AI']

const FEATURES = [
  { num: '1.0', text: 'Live mandates with AI scoring and one-click referral' },
  { num: '2.0', text: 'Full portfolio visibility: NAV, IRR, MOIC per client' },
  { num: '3.0', text: 'Client pipeline tracking from submission to close' },
  { num: '4.0', text: 'AI-powered CRM with conversion intelligence' },
]

export default function Block06Tablet() {
  const [active, setActive] = useState<TagId>('Active Deals')

  function handleKeyDown(e: React.KeyboardEvent, idx: number) {
    if (e.key === 'ArrowRight') {
      const next = TAGS[(idx + 1) % TAGS.length]
      setActive(next)
    } else if (e.key === 'ArrowLeft') {
      const prev = TAGS[(idx - 1 + TAGS.length) % TAGS.length]
      setActive(prev)
    } else if (e.key === 'Enter') {
      setActive(TAGS[idx])
    }
  }

  return (
    <section className="w-full bg-page-bg">
      <div className="mx-auto w-full max-w-content flex flex-col gap-16 items-center pb-0" style={{ paddingTop: '200px' }}>

        {/* Heading */}
        <div className="flex flex-col gap-8 items-center" style={{ width: '1234px' }}>
          <div className="flex flex-col gap-8 items-center">
            <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l leading-[1.35] tracking-[-0.02em] text-neutral-30">
              <span className="opacity-50">5.0</span>
              <span className="opacity-80">Desktop</span>
            </div>
            <h2
              className="font-inter-tight font-semibold text-h2 leading-none tracking-[-0.02em] text-transparent bg-clip-text text-center whitespace-pre"
              style={{ backgroundImage: 'linear-gradient(95.539deg, var(--neutral-00) 0.176%, var(--neutral-30) 98.822%)' }}
            >
              {'One partner. Every client. \nOne interface.'}
            </h2>
          </div>

          {/* Tag switcher */}
          <div
            role="tablist"
            aria-label="Desktop features"
            className="flex flex-wrap gap-2 items-center justify-center" style={{ width: '744px' }}
          >
            {TAGS.map((tag, idx) => (
              <button
                key={tag}
                role="tab"
                aria-selected={active === tag}
                tabIndex={active === tag ? 0 : -1}
                onClick={() => setActive(tag)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={[
                  'flex h-13 items-center justify-center px-8 py-4 rounded-full font-inter-tight font-medium text-text-l leading-[1.35] tracking-[-0.02em] whitespace-nowrap transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white',
                  active === tag
                    ? 'bg-white text-black border border-white/25'
                    : 'bg-white/5 text-white',
                ].join(' ')}
                type="button"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop interface + feature list */}
        <div className="flex flex-col gap-8 items-start w-full">
          {/* Desktop frame — axevill-pro-desktop, fill, 837px */}
          <div className="relative w-full overflow-clip rounded-card-lg border border-border-subtle" style={{ height: '837px' }}>
            <img
              alt="Axevil Pro desktop interface — Active Deals"
              src="/img/block06/axevill-pro-desktop.png"
              width={1660}
              height={948}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Feature list */}
          <div className="flex items-center justify-between w-full">
            {FEATURES.map((f) => (
              <div key={f.num} className="border-l border-white/30 flex flex-col gap-16 items-start pl-6 shrink-0" style={{ width: '345px' }}>
                <p className="font-inter-tight font-medium text-text-m text-white/60">{f.num}</p>
                <p className="font-inter-tight font-medium text-text-xl text-white flex-1 w-full">{f.text}</p>
              </div>
            ))}
          </div>
        </div>

        <CtaButton>Request a Demo</CtaButton>
      </div>
    </section>
  )
}
