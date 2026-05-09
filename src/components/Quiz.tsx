import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface QuizProps { onClose: () => void }

/* ── Slide data ─────────────────────────────────────────── */
const SLIDES = [
  {
    id: 0,
    heading: 'Pre-IPO leaders.\nNo middlemen.',
    subheading: null,
    body: 'The most sought-after private companies of our era —\nthe ones reshaping the technology of the next decade.',
    img: '/img/ill-qwiz-01.png',
    caption: 'SpaceX, xAI, Anthropic, Stripe, Cursor —\nand 30 more top companies in portfolio',
    label: 'Pre-IPO leaders',
  },
  {
    id: 1,
    heading: 'Capital secured by\nregulated structure',
    subheading: null,
    body: 'Every deal is structured through a dedicated SPV under SEC regulation —\nfully transparent, with annual reporting.',
    img: '/img/ill-qwiz-02.png',
    caption: 'You receive equity documented to the same standards as leading\nventure capital funds — institutional-grade ownership.',
    label: 'Capital secured',
  },
  {
    id: 2,
    heading: 'Real access. Verified twice',
    subheading: 'Structural',
    body: 'Before a deal goes live on the platform, we run two independent reviews:\nactual allocation access, jurisdiction, SPV feasibility, liquidity.',
    img: '/img/ill-qwiz-03.png',
    caption: 'Actual allocation access, jurisdiction, SPV feasibility, liquidity\nIf either side doesn\'t add up — no deal, no matter how attractive the company.',
    label: 'Real access',
  },
]

/* ── Questions ─────────────────────────────────────────── */
const Q1 = [
  'Principal investor (Investing personal or family capital directly)',
  'Wealth advisor / RIA  (Managing capital on behalf of clients)',
  'Family office (Single-family or multi-family office)',
  'Other',
]
const Q2 = [
  'Yes — actively (5+ private market transactions to date)',
  'Yes — selectively (1–4 deals completed)',
  'Not yet — evaluating (Building familiarity with the asset class)',
  'Not yet — exploring (Early interest, gathering information)',
]

/* ── Answer button ─────────────────────────────────────── */
function AnswerBtn({ opt, selected, onClick }: { opt: string; selected: boolean; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.99 }}
      className="flex items-center justify-between outline-none w-full"
      style={{
        height: '60px',
        padding: '20px 16px',
        borderRadius: '16px',
        background: '#1A1A1A',
        border: 'none',
        flexShrink: 0,
      }}
    >
      <span
        className="font-inter-tight font-medium text-text-m"
        style={{ color: selected ? '#FFFFFF' : '#A8A8A8' }}
      >
        {opt}
      </span>

      {/* Icon — new self-contained 24×24 True/True-innactive SVGs */}
      <motion.img
        src={selected ? '/icons/True.svg' : '/icons/True-innactive.svg'}
        alt=""
        aria-hidden="true"
        className="shrink-0"
        width={24}
        height={24}
        animate={{ scale: selected ? 1.05 : 1 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      />
    </motion.button>
  )
}

/* ── Main ──────────────────────────────────────────────── */
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
      {/* ── LEFT SIDE ─────────────────────────────────── */}
      <div
        className="flex flex-col overflow-hidden items-center"
        style={{ width: '50%', height: '100%', padding: '60px', background: '#080808' }}
      >
        <div className="flex flex-col overflow-hidden w-full h-full" style={{ maxWidth: '760px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col flex-1 overflow-hidden"
          >
            {/* Heading — outside the card */}
            <div className="flex flex-col gap-6 shrink-0">
              <h2
                className="font-inter-tight font-semibold text-transparent bg-clip-text whitespace-pre-line"
                style={{
                  fontSize: '64px', lineHeight: 1, letterSpacing: '-0.02em',
                  backgroundImage: 'linear-gradient(116.928deg, #ffffff 2.5635%, #8f8f8f 99.06%)',
                }}
              >
                {cur.heading}
              </h2>
              <p className="font-inter-tight font-medium whitespace-pre-line" style={{ fontSize: '20px', lineHeight: 1.3, letterSpacing: '-0.02em', color: '#9b9b9b' }}>
                {cur.body}
              </p>
            </div>

            {/* 64px gap to card */}
            <div style={{ height: '64px', flexShrink: 0 }} />

            {/* Content card — full width of the left panel content area, bg #141414, r:24 */}
            <div
              className="flex flex-col rounded-3xl shrink-0 overflow-hidden w-full"
              style={{ height: '400px', background: '#141414' }}
            >
              {/* Image frame — natural proportions, centred */}
              <div
                className="flex items-center justify-center flex-1"
                style={{ overflow: 'hidden', minHeight: 0 }}
              >
                <img
                  src={cur.img}
                  alt=""
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }}
                />
              </div>

              {/* Text row at bottom */}
              <div className="shrink-0 flex flex-col gap-1" style={{ padding: '0 24px 24px' }}>
                {cur.subheading && (
                  <h3 className="font-inter-tight font-semibold text-white" style={{ fontSize: '24px', lineHeight: '120%', letterSpacing: '-0.48px' }}>
                    {cur.subheading}
                  </h3>
                )}
                {cur.caption ? (
                  cur.id === 2 ? (
                    /* Slide 3: caption — text-L 18px, #9B9B9B */
                    <p className="font-inter-tight font-medium whitespace-pre-line" style={{ fontSize: '18px', fontWeight: 500, lineHeight: '135%', letterSpacing: '-0.36px', color: '#9B9B9B' }}>{cur.caption}</p>
                  ) : (
                    /* Slides 1&2: caption — 24px white */
                    <p className="font-inter-tight font-medium whitespace-pre-line" style={{ fontSize: '24px', fontWeight: 500, lineHeight: '120%', letterSpacing: '-0.48px', color: '#FFF' }}>{cur.caption}</p>
                  )
                ) : null}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress bar */}
        <div className="flex gap-5 mt-auto pt-8 shrink-0">
          {SLIDES.map((s, i) => (
            <div key={s.id} className="flex flex-col gap-3 flex-1">
              <div className="rounded-full overflow-hidden" style={{ height: '3px', background: 'rgba(255,255,255,0.15)' }}>
                {i < slide && <div className="h-full w-full bg-white" />}
                {i === slide && (
                  <motion.div className="h-full bg-white" initial={{ width: '0%' }} animate={{ width: `${progress}%` }} transition={{ duration: 0.05, ease: 'linear' }} />
                )}
              </div>
              <span className="font-inter-tight font-medium text-s-med" style={{ color: i <= slide ? '#fff' : 'rgba(255,255,255,0.3)' }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
        </div>
      </div>

      {/* ── RIGHT SIDE ────────────────────────────────── */}
      <div
        className="flex flex-col items-center"
        style={{ width: '50%', height: '100%', padding: '40px 64px', background: '#141414', overflowY: 'auto', justifyContent: 'flex-start' }}
      >
        <div className="flex flex-col w-full h-full" style={{ maxWidth: '760px' }}>
        {/* Close */}
        <div className="flex justify-end mb-8 shrink-0">
          <button type="button" onClick={onClose} className="font-inter-tight font-medium text-text-m text-white/40 hover:text-white transition-colors outline-none">
            ✕ Close
          </button>
        </div>

        {/* Form */}
        <div className="flex flex-col flex-1" style={{ gap: '40px' }}>
          <h2 className="font-inter-tight font-semibold text-white shrink-0" style={{ fontSize: '36px', lineHeight: 1.1, letterSpacing: '0' }}>
            Get an Access{' '}
            <br />to pre-IPO Infrastructure
          </h2>

          <div className="flex flex-col shrink-0" style={{ gap: '32px' }}>
            {/* Q1 */}
            <div className="flex flex-col gap-4 shrink-0">
              <p className="font-inter-tight font-semibold shrink-0" style={{ fontSize: '24px', lineHeight: '1.2', letterSpacing: '-0.02em', color: '#E6E6E6' }}>
                Question 1: What best describes your role?
              </p>
              <div className="flex flex-col gap-2">
                {Q1.map((opt, i) => (
                  <AnswerBtn key={i} opt={opt} selected={q1 === i} onClick={() => setQ1(q1 === i ? null : i)} />
                ))}
              </div>
            </div>

            {/* Q2 */}
            <div className="flex flex-col gap-4 shrink-0">
              <p className="font-inter-tight font-semibold shrink-0" style={{ fontSize: '24px', lineHeight: '1.2', letterSpacing: '-0.02em', color: '#E6E6E6' }}>
                Question 2: Have you participated in private markets before?
              </p>
              <div className="flex flex-col gap-2">
                {Q2.map((opt, i) => (
                  <AnswerBtn key={i} opt={opt} selected={q2 === i} onClick={() => setQ2(q2 === i ? null : i)} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Back + Next — anchored to bottom */}
        <div className="flex items-center justify-between mt-auto pt-8 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center font-inter-tight font-semibold text-text-m text-white outline-none hover:opacity-70 transition-opacity"
            style={{ height: '56px', padding: '0 32px', borderRadius: '16px', border: '1px solid #303030' }}
          >
            Back
          </button>
          <button
            type="button"
            className="flex items-center justify-center font-inter-tight font-semibold text-text-m text-phone-bg outline-none hover:scale-[1.02] transition-transform"
            style={{ height: '56px', padding: '0 32px', borderRadius: '16px', background: '#fff' }}
          >
            Next
          </button>
        </div>
        </div>
      </div>
    </motion.div>
  )
}
