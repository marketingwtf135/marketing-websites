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
    caption: null,
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
        height: '64px',
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

      {/* Icon */}
      <motion.div
        className="shrink-0 flex items-center justify-center"
        animate={{ scale: selected ? 1.05 : 1 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        style={{
          width: 28, height: 28,
          borderRadius: '160px',
          ...(selected
            ? { background: '#FFF', boxShadow: '-1px -1px 4px 0 rgba(0,0,0,0.50) inset' }
            : { border: '1px dashed #A8A8A8', background: 'transparent' }),
        }}
      >
        {selected && (
          <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
            <path d="M1.5 5L5 8.5L11.5 1.5" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </motion.div>
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
        className="flex flex-col overflow-hidden"
        style={{ width: '50%', height: '100%', padding: '60px', background: '#080808' }}
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
            {/* Heading — outside the card */}
            <div className="flex flex-col gap-4 shrink-0">
              <h2
                className="font-inter-tight font-semibold text-white whitespace-pre-line"
                style={{ fontSize: '48px', lineHeight: 1.05, letterSpacing: '-0.02em' }}
              >
                {cur.heading}
              </h2>
              <p className="font-inter-tight font-medium text-white/60 whitespace-pre-line" style={{ fontSize: '18px', lineHeight: 1.5 }}>
                {cur.body}
              </p>
            </div>

            {/* 64px gap to card */}
            <div style={{ height: '64px', flexShrink: 0 }} />

            {/* Content card: 760×400, bg #141414, r:24 — flex column, image centred, text below */}
            <div
              className="flex flex-col rounded-3xl shrink-0 overflow-hidden"
              style={{ width: '760px', height: '400px', background: '#141414' }}
            >
              {/* Image frame — flex-1, centres image both axes */}
              <div
                className="flex items-center justify-center flex-1"
                style={{ overflow: 'hidden' }}
              >
                <img
                  src={cur.img}
                  alt=""
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }}
                />
              </div>

              {/* Text row at bottom — always inside the card */}
              <div className="shrink-0 flex flex-col gap-1" style={{ padding: '16px 24px' }}>
                {cur.subheading && (
                  <h3 className="font-inter-tight font-semibold text-white" style={{ fontSize: '18px', lineHeight: 1.3 }}>
                    {cur.subheading}
                  </h3>
                )}
                {cur.caption ? (
                  /* Slides 1&2: caption — medium 24px */
                  <p className="font-inter-tight font-medium text-white whitespace-pre-line" style={{ fontSize: '24px', fontWeight: 500, lineHeight: '120%', letterSpacing: '-0.48px', color: '#FFF' }}>{cur.caption}</p>
                ) : cur.body ? (
                  /* Slide 3: body — text-L 18px 500 */
                  <p className="font-inter-tight font-medium text-white whitespace-pre-line" style={{ fontSize: '18px', fontWeight: 500, lineHeight: '135%', letterSpacing: '-0.36px', color: '#FFF' }}>{cur.body}</p>
                ) : null}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress bar */}
        <div className="flex flex-col gap-2 mt-auto pt-8 shrink-0">
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

      {/* ── RIGHT SIDE ────────────────────────────────── */}
      <div
        className="flex flex-col"
        style={{ width: '50%', height: '100%', padding: '40px 64px', background: '#141414', overflowY: 'auto', justifyContent: 'flex-start' }}
      >
        {/* Close */}
        <div className="flex justify-end mb-8 shrink-0">
          <button type="button" onClick={onClose} className="font-inter-tight font-medium text-text-m text-white/40 hover:text-white transition-colors outline-none">
            ✕ Close
          </button>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-6 flex-1">
          <h2 className="font-inter-tight font-semibold text-white shrink-0" style={{ fontSize: '36px', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            Get an Access<br />to pre-IPO Infrastructure
          </h2>

          {/* Q1 */}
          <div className="flex flex-col gap-3 shrink-0">
            <p className="font-inter-tight font-semibold shrink-0" style={{ fontSize: '20px', fontWeight: 600, lineHeight: '120%', letterSpacing: '-0.4px', color: '#E5E5E5' }}>
              Question 1: What best describes your role?
            </p>
            <div className="flex flex-col gap-2">
              {Q1.map((opt, i) => (
                <AnswerBtn key={i} opt={opt} selected={q1 === i} onClick={() => setQ1(q1 === i ? null : i)} />
              ))}
            </div>
          </div>

          {/* Q2 */}
          <div className="flex flex-col gap-3 shrink-0">
            <p className="font-inter-tight font-semibold shrink-0" style={{ fontSize: '20px', fontWeight: 600, lineHeight: '120%', letterSpacing: '-0.4px', color: '#E5E5E5' }}>
              Question 2: Have you participated in private markets before?
            </p>
            <div className="flex flex-col gap-2">
              {Q2.map((opt, i) => (
                <AnswerBtn key={i} opt={opt} selected={q2 === i} onClick={() => setQ2(q2 === i ? null : i)} />
              ))}
            </div>
          </div>
        </div>

        {/* Back + Next � fixed at bottom via mt-auto */}
        <div className="flex items-center justify-between mt-auto pt-8 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center font-inter-tight font-semibold text-text-m text-white outline-none hover:opacity-70 transition-opacity"
            style={{ height: '48px', padding: '0 24px', borderRadius: '160px', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            Back
          </button>
          <button
            type="button"
            className="flex items-center justify-center font-inter-tight font-semibold text-text-m text-phone-bg outline-none hover:scale-[1.02] transition-transform"
            style={{ height: '48px', padding: '0 36px', borderRadius: '160px', background: '#fff' }}
          >
            Next
          </button>
        </div>
      </div>
    </motion.div>
  )
}
