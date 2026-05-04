import { useState } from 'react'

const FAQ_ITEMS = [
  { q: 'Is Anthropic publicly traded?',           a: 'No, Anthropic is a private company. You cannot buy **Anthropic stock** on a public exchange like the NYSE. You can only invest through private secondary markets or platforms like Axevil.' },
  { q: 'Is Anthropic publicly traded?',           a: 'Anthropic remains a private company with no plans for a near-term IPO.' },
  { q: 'How can I buy Anthropic stock?',          a: 'You can buy Anthropic stock through AXEVIL — simply request access, complete onboarding, and we will allocate shares in the next available tender window.' },
  { q: 'What is the current Anthropic stock price?', a: 'The current consensus secondary-market price is $262.34 per share as of 2026.' },
  { q: 'How do I exit my investment?',            a: 'You can exit through secondary tender events organized by Axevil or by requesting a transfer to a qualified buyer.' },
  { q: 'Is Anthropic a public company?',          a: 'No. Anthropic is a private company.' },
  { q: 'How does Axevil help me invest?',         a: 'Axevil provides a full-stack investment platform: deal flow, compliance, custody, and secondary liquidity — all in one interface.' },
  { q: 'What are the risks?',                     a: 'Pre-IPO investing carries significant risks including illiquidity, long holding periods, dilution, and total loss of capital.' },
]

/** Section 6 — FAQ (Figma 89:478)
 *  #6: 64px h2 with gradient  #7: smooth 0.5s animation  #8: icon from 89:500
 */
export default function CSFAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="w-full bg-page-bg" style={{ paddingBottom: '0' }}>
      <div className="mx-auto w-full max-w-content flex flex-col gap-12 items-start">

        {/* Heading — 64px gradient (Figma 89:478) */}
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

                  {/* Icons from public/icons: dd-open / dd-close */}
                  <div className="shrink-0" style={{ width: 36, height: 36 }}>
                    <img
                      src={isOpen ? '/icons/icon-dd-close.svg' : '/icons/icon-dd-open.svg'}
                      alt=""
                      width={36}
                      height={36}
                      style={{ transition: 'opacity 0.2s ease-in-out' }}
                    />
                  </div>
                </button>

                {/* Answer — smooth height animation via max-height */}
                <div
                  style={{
                    overflow: 'hidden',
                    maxHeight: isOpen ? '400px' : '0px',
                    transition: 'max-height 0.5s ease-in-out, opacity 0.5s ease-in-out',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div style={{ paddingBottom: 28, paddingRight: 60 }}>
                    <p className="font-inter-tight font-medium text-text-l text-white/60">{item.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
