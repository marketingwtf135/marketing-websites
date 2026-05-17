/**
 * Block 06 — "One partner. Every client. One interface."
 * Rebuilt 1:1 from Figma node 619:4109
 */
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CtaButton from '../components/CtaButton'

type TabId = 'Command Center' | 'Active Deals' | 'Portfolio' | 'Market Intelligence' | 'Secondary desk'

const TABS: TabId[] = [
  'Command Center',
  'Active Deals',
  'Portfolio',
  'Market Intelligence',
  'Secondary desk',
]

const TAB_IMAGES: Record<TabId, string> = {
  'Command Center':      '/img/block06/tab-command-center.png',
  'Active Deals':        '/img/block06/tab-active-deals.png',
  'Portfolio':           '/img/block06/tab-portfolio.png',
  'Market Intelligence': '/img/block06/tab-market-intelligence.png',
  'Secondary desk':      '/img/block06/tab-secondary-desk.png',
}

const FEATURES: Record<TabId, { num: string; text: string }[]> = {
  'Command Center': [
    { num: '1.0', text: 'Aggregated portfolio dynamics with real-time updates' },
    { num: '2.0', text: 'Top clients ranked by activity and return' },
    { num: '3.0', text: 'Open Deals Digest, events, and market intelligence' },
    { num: '4.0', text: 'Personal manager and one-click invitation links' },
  ],
  'Active Deals': [
    { num: '1.0', text: 'Live pipeline of every currently open Axevil deal' },
    { num: '2.0', text: 'Sector tags and concise thesis for rapid triage' },
    { num: '3.0', text: 'Built-in pre-scoring inputs: entry, exit, upside, horizon' },
    { num: '4.0', text: 'Deep-dive into full materials with a single click' },
  ],
  'Portfolio': [
    { num: '1.0', text: 'Live P&L across the full book with one-glance KPIs' },
    { num: '2.0', text: 'Entry vs current valuation for every position' },
    { num: '3.0', text: 'Filter by time period, deal, investor or partner' },
    { num: '4.0', text: 'Export-ready data for client statements and reviews' },
  ],
  'Market Intelligence': [
    { num: '1.0', text: 'Live coverage of leading private companies' },
    { num: '2.0', text: 'Valuation, ARR, growth and key metrics in a single card' },
    { num: '3.0', text: 'Filter by Portfolio, Watchlist or all tracked names' },
    { num: '4.0', text: 'Spot trends and movers before they hit the public news cycle' },
  ],
  'Secondary desk': [
    { num: '1.0', text: 'Built-in liquidity — exit positions before IPO' },
    { num: '2.0', text: 'Live order book: buy and sell interest across Axevil names' },
    { num: '3.0', text: 'Real-time matched trades' },
    { num: '4.0', text: 'Place orders or accept tender offers in a few clicks' },
  ],
}

const GRAD = 'linear-gradient(112.36deg, #A2A2A2 4.07%, #FFF 49.5%, #A2A2A2 94.94%)'

export default function Block06Tablet() {
  const [active, setActive] = useState<TabId>('Command Center')

  return (
    <section className="w-full bg-page-bg overflow-x-clip">
      <div
        className="mx-auto w-full flex flex-col items-center"
        style={{
          maxWidth: '90rem',
          paddingTop: 'clamp(3.75rem, 12.5vw, 12.5rem)',
          paddingBottom: 'clamp(3.75rem, 6.25vw, 6.25rem)',
          paddingLeft: '1.25rem',
          paddingRight: '1.25rem',
        }}
      >
        <div className="flex flex-col items-center w-full" style={{ gap: '3rem' }}>

          <div className="flex flex-col items-center w-full" style={{ gap: '2rem' }}>

            <div
              className="flex items-center font-inter-tight font-medium"
              style={{ gap: '0.5rem', fontSize: '1.125rem', lineHeight: '1.35', letterSpacing: '-0.02em' }}
            >
              <span style={{ color: '#404040' }}>5.0</span>
              <span style={{ color: '#848484' }}>Web</span>
            </div>

            <h2
              className="font-inter-tight font-semibold text-transparent bg-clip-text text-center"
              style={{
                backgroundImage: GRAD,
                fontSize: 'clamp(1.75rem, 5vw, 4rem)',
                lineHeight: '1',
                letterSpacing: '-0.02em',
                whiteSpace: 'pre-wrap',
              }}
            >
              {'One partner. Every client.\nOne interface.'}
            </h2>

            <div
              role="tablist"
              className="flex flex-nowrap items-center justify-center overflow-x-auto w-full"
            style={{ WebkitOverflowScrolling: 'touch', gap: '0.5rem', scrollbarWidth: 'none' } as React.CSSProperties}
            >
              {TABS.map((tab) => {
                const isActive = tab === active
                return (
                  <button
                    key={tab}
                    role="tab"
                    aria-selected={isActive}
                    type="button"
                    onClick={() => setActive(tab)}
                    className="flex-shrink-0 font-inter-tight font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                    style={{
                      height: '3.25rem',
                      padding: '0.75rem 1rem',
                      borderRadius: '1rem',
                      fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)',
                      lineHeight: '1.35',
                      letterSpacing: '-0.02em',
                      whiteSpace: 'nowrap',
                      background: isActive ? '#ffffff' : '#151515',
                      color: isActive ? '#000000' : '#9B9B9B',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {tab}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-start w-full" style={{ gap: '1.5rem' }}>

            <div
              className="flex-1 flex-shrink-0 overflow-clip"
              style={{
                border: '1px solid #111111',
                padding: '0.5rem',
                borderRadius: '2rem',
                height: 'clamp(22rem, 38.75vw, 38.75rem)',
                minWidth: 0,
                position: 'relative',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={active}
                  alt={`Axevil Pro — ${active}`}
                  src={TAB_IMAGES[active]}
                  className="w-full block"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{
                    height: 'calc(clamp(22rem, 38.75vw, 38.75rem) - 1rem)',
                    objectFit: 'cover',
                    objectPosition: 'top',
                    borderRadius: '1.75rem',
                  }}
                  loading="lazy"
                />
              </AnimatePresence>
            </div>

            <div
              className="flex flex-col self-stretch flex-shrink-0"
              style={{
                width: '100%',
              maxWidth: '21.5625rem',
                gap: '1rem',
              }}
            >
              {FEATURES[active].map((f) => (
                <div
                  key={f.num}
                  className="flex flex-col items-start justify-between"
                  style={{
                    flex: '1 0 0',
                    background: '#111111',
                    padding: '1rem',
                    borderRadius: '1rem',
                    minHeight: 0,
                  }}
                >
                  <span
                    className="font-inter-tight font-medium w-full"
                    style={{
                      fontSize: '1rem',
                      lineHeight: '1.3',
                      letterSpacing: '-0.02em',
                      color: '#ffffff',
                      opacity: 0.6,
                    }}
                  >
                    {f.num}
                  </span>
                  <span
                    className="font-inter-tight font-medium w-full"
                    style={{
                      fontSize: '1.25rem',
                      lineHeight: '1.3',
                      letterSpacing: '-0.025em',
                      color: '#ffffff',
                    }}
                  >
                    {f.text}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>

        <div style={{ marginTop: '4rem' }}>
          <CtaButton>Request a Demo</CtaButton>
        </div>

      </div>
    </section>
  )
}
