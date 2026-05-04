import { useState } from 'react'

const FAQ_ITEMS = [
  {
    q: 'Is Anthropic publicly traded?',
    a: 'No, Anthropic is a private company. You cannot buy **Anthropic stock** on a public exchange like the NYSE. You can only invest through private secondary markets or platforms like Axevil.',
  },
  {
    q: 'Is Anthropic publicly traded?',
    a: 'Anthropic remains a private company with no plans for a near-term IPO.',
  },
  {
    q: 'How can I buy Anthropic stock?',
    a: 'You can buy Anthropic stock through AXEVIL — simply request access, complete onboarding, and we will allocate shares in the next available tender window.',
  },
  {
    q: 'What is the current Anthropic stock price?',
    a: 'The current consensus secondary-market price is $262.34 per share as of 2026.',
  },
  {
    q: 'How do I exit my investment?',
    a: 'You can exit through secondary tender events organized by Axevil or by requesting a transfer to a qualified buyer.',
  },
  {
    q: 'Is Anthropic a public company?',
    a: 'No. Anthropic is a private company.',
  },
  {
    q: 'How does Axevil help me invest?',
    a: 'Axevil provides a full-stack investment platform: deal flow, compliance, custody, and secondary liquidity — all in one interface.',
  },
  {
    q: 'What are the risks?',
    a: 'Pre-IPO investing carries significant risks including illiquidity, long holding periods, dilution, and total loss of capital.',
  },
]

/** Section 6 — FAQ (Figma 89:478) */
export default function CSFAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="w-full bg-page-bg" style={{ paddingBottom: '120px' }}>
      <div className="mx-auto w-full max-w-content flex flex-col gap-12 items-start">

        {/* Heading */}
        <div className="flex flex-col gap-6 items-start">
          <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l text-neutral-30">
            <span className="opacity-50">6.0</span>
            <span className="opacity-80">FAQ</span>
          </div>
          <h2
            className="font-inter-tight font-semibold text-white"
            style={{ fontSize: 88, lineHeight: 1, letterSpacing: '-0.02em' }}
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
                  className="w-full flex items-center justify-between gap-8 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                  style={{ padding: '28px 0' }}
                >
                  <span className="font-inter-tight font-semibold text-text-xl text-white">
                    {item.q}
                  </span>
                  {/* Icon: circle with + or × */}
                  <div
                    className="shrink-0 flex items-center justify-center"
                    style={{
                      width: 36, height: 36, borderRadius: '50%',
                      border: '1.5px solid rgba(255,255,255,0.3)',
                    }}
                  >
                    {isOpen ? (
                      /* × */
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 2L12 12M12 2L2 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    ) : (
                      /* + */
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M7 1V13M1 7H13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div style={{ paddingBottom: 28, paddingRight: 60 }}>
                    <p className="font-inter-tight font-medium text-text-l text-white/60">{item.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
