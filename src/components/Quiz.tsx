import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface QuizProps { onClose: () => void }

const SLIDES = [
  { id: 0, heading: 'Pre-IPO leaders.\nNo middlemen.', body: 'The most sought-after private companies of our era —\nthe ones reshaping the technology of the next decade.', caption: 'SpaceX, xAI, Anthropic, Stripe, Cursor —\nand 30 more top companies in portfolio', img: '/img/ill-qwiz-01.png', label: 'Pre-IPO leaders' },
  { id: 1, heading: 'Capital secured by\nregulated structure', body: 'Every deal is structured through a dedicated SPV under SEC regulation —\nfully transparent, with annual reporting from the management companies.', caption: 'You receive equity documented to the same standards as leading\nventure capital funds — institutional-grade ownership.', img: '/img/ill-qwiz-02.png', label: 'Capital secured' },
  { id: 2, heading: 'Real access. Verified twice', body: 'Before a deal goes live on the platform, we run two independent reviews:', caption: "Actual allocation access, jurisdiction, SPV feasibility, liquidity.\nIf either side doesn't add up — no deal, no matter how attractive the company.", img: '/img/ill-qwiz-03.png', label: 'Real access' },
]

const Q1 = ['Principal Investor (Investing personal or family capital directly)', 'Wealth advisor / RIA  (Managing capital on behalf of clients)', 'Family office (Single-family or multi-family office)', 'Other']
const Q2 = ['Yes — actively (5+ private market transactions to date)', 'Yes — selectively (1-4 deals completed)', 'Not yet — evaluating (Building familiarity with the asset class)', 'Not yet — exploring (Early interest, gathering information)']

function AnswerBtn({ opt, selected, onClick }: { opt: string; selected: boolean; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.99 }}
      className="flex items-center justify-between gap-4 text-left outline-none w-full"
      style={{
        padding: '14px 20px',
        borderRadius: '12px',
        background: selected ? 'rgba(255,255,255,0.04)' : '#141414',
        border: selected ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.08)',
        transition: 'border-color 0.15s, background 0.15s',
      }}
    >
      <span className="font-inter-tight font-medium text-text-m" style={{ color: selected ? '#fff' : 'rgba(255,255,255,0.6)' }}>
        {opt}
      </span>
      {/* Circle indicator */}
      <motion.div
        className="shrink-0 rounded-full flex items-center justify-center"
        style={{
          width: 28, height: 28,
          border: selected ? 'none' : '1.5px solid rgba(255,255,255,0.3)',
          background: selected ? '#fff' : 'transparent',
        }}
        animate={{ scale: selected ? 1.05 : 1 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      >
        {selected && (
          <svg width="13" height="11" viewBox="0 0 13 11" fill="none">
            <path d="M1.5 5.5L5 9L11.5 1.5" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </motion.div>
    </motion.button>
  )
}

export default function Quiz({ onClose }: QuizProps) {
  const [slide, setSlide] = useState(0)
  const [progress, setProgress] = useState(0)
  const [q1, setQ1] = useState<number | null>(null)
  const [q2, setQ2] = useState<number | null>(null)

  useEffect(() => {
    setProgress(0)
    const pInt = setInterval(() => setProgress((p) => Math.min(p + 1, 100)), 50)
    const sInt = setInterval(() => { setProgress(0); setSlide((s) => (s + 1) % SLIDES.length) }, 5000)
    return () => { clearInterval(pInt); clearInterval(sInt) }
  }, [slide])

  const cur = SLIDES[slide]

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex overflow-hidden"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ height: '100vh', background: '#080808' }}
    >
      {/* ── Left: animated slides, #11: color #141414 ── */}
      <div
        className="flex flex-col overflow-hidden"
        style={{ width: '50%', height: '100%', padding: '48px 60px', background: '#141414', position: 'relative' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col flex-1 overflow-hidden"
          >
            {/* #16: card with heading + illustration + caption all inside */}
            <div
              className="flex flex-col overflow-hidden rounded-2xl border border-white/10 flex-1"
              style={{ background: '#1a1a1a', padding: '32px', gap: '24px' }}
            >
              {/* Heading + body */}
              <div className="flex flex-col gap-3">
                <h2
                  className="font-inter-tight font-semibold text-white whitespace-pre-line"
                  style={{ fontSize: '40px', lineHeight: 1.1, letterSpacing: '-0.02em' }}
                >
                  {cur.heading}
                </h2>
                <p className="font-inter-tight font-medium text-white/60 whitespace-pre-line" style={{ fontSize: '16px', lineHeight: 1.5 }}>
                  {cur.body}
                </p>
              </div>

              {/* Illustration 672×225 */}
              <div className="rounded-xl overflow-hidden shrink-0" style={{ height: '225px' }}>
                <img src={cur.img} alt="" className="w-full h-full object-cover" />
              </div>

              {/* Caption */}
              <p className="font-inter-tight font-semibold text-white whitespace-pre-line" style={{ fontSize: '16px', lineHeight: 1.5 }}>
                {cur.caption}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress bar */}
        <div className="flex flex-col gap-2 mt-6 shrink-0">
          <div className="flex gap-2">
            {SLIDES.map((s, i) => (
              <div key={s.id} className="flex-1 rounded-full overflow-hidden" style={{ height: '2px', background: 'rgba(255,255,255,0.15)' }}>
                {i < slide && <div className="h-full w-full bg-white" />}
                {i === slide && (
                  <motion.div className="h-full bg-white" initial={{ width: '0%' }} animate={{ width: `${progress}%` }} transition={{ duration: 0.05, ease: 'linear' }} />
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            {SLIDES.map((s, i) => (
              <span key={s.id} className="flex-1 font-inter-tight font-medium text-s-med" style={{ color: i <= slide ? '#fff' : 'rgba(255,255,255,0.3)' }}>
                {s.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right: fixed form, #15: overflow hidden, #14: full height ── */}
      <div
        className="flex flex-col overflow-hidden"
        style={{ width: '50%', height: '100%', padding: '40px 60px' }}
      >
        {/* Close */}
        <div className="flex justify-end mb-6 shrink-0">
          <button type="button" onClick={onClose} className="font-inter-tight font-medium text-text-m text-white/40 hover:text-white transition-colors outline-none">
            ✕ Close
          </button>
        </div>

        {/* Form content — #15: no scroll, compact */}
        <div className="flex flex-col flex-1 overflow-hidden gap-6">
          <h2 className="font-inter-tight font-semibold text-white shrink-0" style={{ fontSize: '32px', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            Get an Access<br />to pre-IPO Infrastructure
          </h2>

          {/* Q1 */}
          <div className="flex flex-col gap-3 shrink-0">
            <p className="font-inter-tight font-semibold text-text-m text-white">Question 1: What best describes your role?</p>
            <div className="flex flex-col gap-2">
              {Q1.map((opt, i) => <AnswerBtn key={i} opt={opt} selected={q1 === i} onClick={() => setQ1(i)} />)}
            </div>
          </div>

          {/* Q2 */}
          <div className="flex flex-col gap-3 shrink-0">
            <p className="font-inter-tight font-semibold text-text-m text-white">Question 2: Have you participated in private markets before?</p>
            <div className="flex flex-col gap-2">
              {Q2.map((opt, i) => <AnswerBtn key={i} opt={opt} selected={q2 === i} onClick={() => setQ2(i)} />)}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between mt-6 shrink-0">
          <button type="button" onClick={onClose} className="font-inter-tight font-semibold text-text-l text-white/50 hover:text-white transition-colors outline-none">
            Back
          </button>
          <button type="button" className="flex items-center justify-center h-14 px-8 rounded-full bg-white font-inter-tight font-semibold text-text-btn text-phone-bg hover:scale-[1.02] transition-transform outline-none">
            Next
          </button>
        </div>
      </div>
    </motion.div>
  )
}
