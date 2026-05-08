import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FAQ_ITEMS = [
  { q: 'Is Anthropic publicly traded?',              a: 'No, Anthropic is a private company. You cannot buy Anthropic stock on a public exchange like the NYSE. You can only invest through private secondary markets or platforms like Axevil.' },
  { q: 'Is Anthropic publicly traded?',              a: 'Anthropic remains a private company with no plans for a near-term IPO.' },
  { q: 'How can I buy Anthropic stock?',             a: 'You can buy Anthropic stock through AXEVIL — simply request access, complete onboarding, and we will allocate shares in the next available tender window.' },
  { q: 'What is the current Anthropic stock price?', a: 'The current consensus secondary-market price is $262.34 per share as of 2026.' },
  { q: 'How do I exit my investment?',               a: 'You can exit through secondary tender events organized by Axevil or by requesting a transfer to a qualified buyer.' },
  { q: 'Is Anthropic a public company?',             a: 'No. Anthropic is a private company.' },
  { q: 'How does Axevil help me invest?',            a: 'Axevil provides a full-stack investment platform: deal flow, compliance, custody, and secondary liquidity — all in one interface.' },
  { q: 'What are the risks?',                        a: 'Pre-IPO investing carries significant risks including illiquidity, long holding periods, dilution, and total loss of capital.' },
]

/** Section 6 — FAQ (padding-section-t6-b0: 100px top, 0 bottom) */
export default function CSFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="w-full bg-page-bg padding-section-t6-b0" style={{ position: 'relative', zIndex: 1 }}>
      <div className="mx-auto w-full max-w-content flex flex-col gap-12 items-start">

        {/* Heading */}
        <div className="flex flex-col gap-6 items-start">
          <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l text-neutral-30">
            <span className="opacity-50">6.0</span>
            <span className="opacity-80">FAQ</span>
          </div>
          <h2
            className="font-inter-tight font-semibold text-transparent bg-clip-text pb-1"
            style={{
              fontSize: 64,
              lineHeight: 1,
              letterSpacing: '-0.02em',
              backgroundImage: 'linear-gradient(93.581deg, #ffffff 0.176%, #b7b7b7 98.822%)',
            }}
          >
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion */}
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
                  style={{ padding: '28px 0' }}
                >
                  <span className="font-inter-tight font-semibold text-text-xl text-white">{item.q}</span>

                  {/* Single icon — rotates 45° on open, no src swap */}
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

                {/* Answer — framer-motion height animation (smooth, no jerk) */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ paddingBottom: 28, paddingRight: 60 }}>
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
