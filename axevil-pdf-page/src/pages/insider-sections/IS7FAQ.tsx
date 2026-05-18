import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FAQ_ITEMS = [
  { q: 'What is the subscription price?', a: 'At launch, access is invite-based for wealth managers, family offices, and accredited HNWI. Individual terms are available on request.' },
  { q: 'What do I receive immediately?', a: 'Two documents in one email: the Pre-IPO Insider Report with the full 2025 market review and 2026 outlook, plus the latest quarterly market review.' },
  { q: 'How often do emails arrive?', a: 'The weekly digest arrives every Monday at 9:00 CET. The quarterly review arrives every 3 months. The annual report is sent in January.' },
  { q: 'Who writes the analysis?', a: 'The Axevil Capital select team. Analysts include ex-SocGen and ex-McKinsey professionals with 8+ years of experience.' },
  { q: 'What is the difference between Axevil Pro and the subscription?', a: 'Axevil Pro is a deal flow and AI CRM platform. The subscription is market analytics. Together, they provide research plus access to selected SPV deals.' },
  { q: 'Can I unsubscribe?', a: 'Yes, at any time. Every email includes an unsubscribe link.' },
]

export default function IS7FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="insider-faq" className="w-full bg-page-bg px-5 md:px-10 lg:px-[15rem] py-12 md:py-16 lg:py-[7.5rem]">
      <div className="mx-auto w-full max-w-[90rem] flex flex-col gap-10 md:gap-12">

        <div className="flex flex-col gap-4 items-start">
          <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l text-neutral-30">
            <span className="opacity-50">7.0</span>
            <span className="opacity-80">FAQ</span>
          </div>
          <h2
            className="font-inter-tight font-semibold text-transparent bg-clip-text"
            style={{
              fontSize: 'clamp(2rem, 4vw, 4rem)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              backgroundImage: 'linear-gradient(93.581deg, #ffffff 0.176%, #b7b7b7 98.822%)',
            }}
          >
            FAQ
          </h2>
        </div>

        <div className="w-full flex flex-col">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-8 text-left outline-none"
                  style={{ padding: '1.75rem 0' }}
                >
                  <span className="font-inter-tight font-semibold text-text-xl text-white">{item.q}</span>
                  <motion.img
                    src="/icons/icon-dd-close.svg"
                    alt=""
                    width={64}
                    height={64}
                    className="shrink-0"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ paddingBottom: '1.75rem', paddingRight: '3.75rem' }}>
                        <p className="font-inter-tight font-medium text-text-l text-white/60">{item.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
