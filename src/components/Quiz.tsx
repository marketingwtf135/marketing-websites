import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface QuizProps {
  onClose: () => void
}

const SLIDES = [
  {
    id: 0,
    heading: 'Pre-IPO leaders.\nNo middlemen.',
    body: 'The most sought-after private companies of our era —\nthe ones reshaping the technology of the next decade.',
    caption: 'SpaceX, xAI, Anthropic, Stripe, Cursor —\nand 30 more top companies in portfolio',
    img: '/img/ill-qwiz-01.png',
    label: 'Pre-IPO leaders',
  },
  {
    id: 1,
    heading: 'Capital secured by\nregulated structure',
    body: 'Every deal is structured through a dedicated SPV under SEC regulation —\nfully transparent, with annual reporting from the management companies.',
    caption: 'You receive equity documented to the same standards as leading\nventure capital funds — institutional-grade ownership.',
    img: '/img/ill-qwiz-02.png',
    label: 'Capital secured',
  },
  {
    id: 2,
    heading: 'Real access. Verified twice',
    body: 'Before a deal goes live on the platform, we run two independent reviews:',
    caption: "Actual allocation access, jurisdiction, SPV feasibility, liquidity\nIf either side doesn't add up — no deal, no matter how attractive the company.",
    img: '/img/ill-qwiz-03.png',
    label: 'Real access',
  },
]

const Q1_OPTIONS = [
  'Principal Investor (Investing personal or family capital directly)',
  'Wealth advisor / RIA  (Managing capital on behalf of clients)',
  'Family office (Single-family or multi-family office)',
  'Other',
]

const Q2_OPTIONS = [
  'Yes — actively (5+ private market transactions to date)',
  'Yes — selectively (1-4 deals completed)',
  'Not yet — evaluating (Building familiarity with the asset class)',
  'Not yet — exploring (Early interest, gathering information)',
]

export default function Quiz({ onClose }: QuizProps) {
  const [slide, setSlide] = useState(0)
  const [progress, setProgress] = useState(0)
  const [q1, setQ1] = useState<number | null>(null)
  const [q2, setQ2] = useState<number | null>(null)

  // Auto-advance slides every 5s, progress bar fills
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(0)
      setSlide((s) => (s + 1) % SLIDES.length)
    }, 5000)
    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + 1, 100))
    }, 50) // 50ms * 100 = 5000ms
    return () => { clearInterval(interval); clearInterval(progressInterval) }
  }, [slide])

  const currentSlide = SLIDES[slide]

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: '#080808' }}
    >
      {/* ── Left: sliding content ── */}
      <div className="flex flex-col justify-between" style={{ width: '50%', padding: '60px', background: '#0a0a0a', position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col gap-8 flex-1"
          >
            {/* Heading */}
            <div className="flex flex-col gap-4">
              <h2
                className="font-inter-tight font-semibold text-white whitespace-pre-line"
                style={{ fontSize: '48px', lineHeight: 1.1, letterSpacing: '-0.02em' }}
              >
                {currentSlide.heading}
              </h2>
              <p className="font-inter-tight font-medium text-white/60 whitespace-pre-line" style={{ fontSize: '18px', lineHeight: 1.4 }}>
                {currentSlide.body}
              </p>
            </div>

            {/* Illustration frame 672×225 */}
            <div
              className="rounded-2xl overflow-hidden border border-white/10"
              style={{ width: '100%', maxWidth: '672px', height: '225px' }}
            >
              <img src={currentSlide.img} alt="" className="w-full h-full object-cover" />
            </div>

            {/* Caption */}
            <p className="font-inter-tight font-semibold text-white whitespace-pre-line" style={{ fontSize: '18px', lineHeight: 1.4 }}>
              {currentSlide.caption}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Progress bar */}
        <div className="flex flex-col gap-3 mt-8">
          <div className="flex gap-3">
            {SLIDES.map((s, i) => (
              <div key={s.id} className="flex-1 h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.15)' }}>
                {i < slide && <div className="h-full w-full" style={{ background: '#fff' }} />}
                {i === slide && (
                  <motion.div
                    className="h-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    style={{ background: '#fff' }}
                    transition={{ duration: 0.05, ease: 'linear' }}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            {SLIDES.map((s, i) => (
              <span
                key={s.id}
                className="flex-1 font-inter-tight font-medium text-s-med"
                style={{ color: i <= slide ? 'white' : 'rgba(255,255,255,0.3)' }}
              >
                {s.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right: fixed form ── */}
      <div className="flex flex-col justify-between overflow-y-auto" style={{ width: '50%', padding: '60px' }}>
        {/* Close button */}
        <div className="flex justify-end mb-8">
          <button
            type="button"
            onClick={onClose}
            className="font-inter-tight font-medium text-text-m text-white/50 hover:text-white transition-colors outline-none"
          >
            ✕ Close
          </button>
        </div>

        <div className="flex flex-col gap-10 flex-1">
          <h2
            className="font-inter-tight font-semibold text-white"
            style={{ fontSize: '36px', lineHeight: 1.2, letterSpacing: '-0.02em' }}
          >
            Get an Access<br />to pre-IPO Infrastructure
          </h2>

          {/* Q1 */}
          <div className="flex flex-col gap-4">
            <p className="font-inter-tight font-semibold text-text-l text-white">Question 1: What best describes your role?</p>
            <div className="flex flex-col gap-2">
              {Q1_OPTIONS.map((opt, i) => (
                <motion.button
                  key={i}
                  type="button"
                  onClick={() => setQ1(i)}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-between gap-4 text-left outline-none transition-colors"
                  style={{
                    padding: '16px 20px',
                    borderRadius: '12px',
                    border: q1 === i ? '1px solid rgba(255,255,255,0.4)' : '1px solid rgba(255,255,255,0.1)',
                    background: q1 === i ? 'rgba(255,255,255,0.06)' : 'transparent',
                  }}
                >
                  <span className="font-inter-tight font-medium text-text-m text-white">{opt}</span>
                  <motion.div
                    className="shrink-0 rounded-full border-2 flex items-center justify-center"
                    style={{
                      width: 24, height: 24,
                      borderColor: q1 === i ? '#fff' : 'rgba(255,255,255,0.2)',
                      background: q1 === i ? '#fff' : 'transparent',
                    }}
                    animate={{ scale: q1 === i ? 1.1 : 1 }}
                    transition={{ duration: 0.15 }}
                  >
                    {q1 === i && (
                      <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                        <path d="M1 5L4.5 8.5L11 1" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </motion.div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Q2 */}
          <div className="flex flex-col gap-4">
            <p className="font-inter-tight font-semibold text-text-l text-white">Question 2: Have you participated in private markets before?</p>
            <div className="flex flex-col gap-2">
              {Q2_OPTIONS.map((opt, i) => (
                <motion.button
                  key={i}
                  type="button"
                  onClick={() => setQ2(i)}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-between gap-4 text-left outline-none transition-colors"
                  style={{
                    padding: '16px 20px',
                    borderRadius: '12px',
                    border: q2 === i ? '1px solid rgba(255,255,255,0.4)' : '1px solid rgba(255,255,255,0.1)',
                    background: q2 === i ? 'rgba(255,255,255,0.06)' : 'transparent',
                  }}
                >
                  <span className="font-inter-tight font-medium text-text-m text-white">{opt}</span>
                  <motion.div
                    className="shrink-0 rounded-full border-2 flex items-center justify-center"
                    style={{
                      width: 24, height: 24,
                      borderColor: q2 === i ? '#fff' : 'rgba(255,255,255,0.2)',
                      background: q2 === i ? '#fff' : 'transparent',
                    }}
                    animate={{ scale: q2 === i ? 1.1 : 1 }}
                    transition={{ duration: 0.15 }}
                  >
                    {q2 === i && (
                      <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                        <path d="M1 5L4.5 8.5L11 1" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </motion.div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Back + Next buttons */}
        <div className="flex items-center justify-between mt-10">
          <button
            type="button"
            onClick={onClose}
            className="font-inter-tight font-semibold text-text-l text-white/60 hover:text-white transition-colors outline-none"
          >
            Back
          </button>
          <button
            type="button"
            className="flex items-center justify-center h-14 px-8 rounded-full bg-white font-inter-tight font-semibold text-text-btn text-phone-bg hover:scale-[1.02] transition-transform outline-none"
          >
            Next
          </button>
        </div>
      </div>
    </motion.div>
  )
}
