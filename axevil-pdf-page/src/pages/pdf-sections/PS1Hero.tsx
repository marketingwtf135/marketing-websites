import { useScroll, useTransform, motion } from 'framer-motion'
import PDFLeadForm from '../../components/PDFLeadForm'

// Stagger animation helper — badge → h1 → p → btn, +0.05s each
const E = [0.4, 0, 0.2, 1] as const

/** Freshness stamp. One constant so the hero, the badge and the stat row can never
 *  disagree about which edition this page is selling — bump it with the report. */
const EDITION = 'Q1 2026'

/** The hero's proof, in numbers (client feedback 2026-07-23: "абстракция «один отчёт
 *  вместо десятка» не убеждает без цифр... нужна конкретика: 51 стр, топ-15 компаний,
 *  обогнали Nasdaq в 7 раз"). Figures are the client's own, verbatim. */
const HERO_STATS: { value: string; label: string }[] = [
  { value: '51',      label: 'страница разбора' },
  { value: 'Топ-15',  label: 'частных компаний' },
  { value: '×7',      label: 'к доходности Nasdaq' },
  { value: EDITION,   label: 'свежий выпуск' },
]
function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: E },
  } as const
}

export default function PS1Hero() {
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 800], ['0%', '-12%'])

  return (
    <section
      id="hero"
      style={{
        // min- rather than a fixed height: the hero now carries a stat row and a
        // two-field form, which on a short laptop viewport would otherwise be clipped.
        minHeight: '100svh',
        background: '#010101',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '4.25rem',
      }}
    >
      {/* Rocky background — fades in first, then parallax takes over */}
      <motion.div
        className="absolute pointer-events-none"
        aria-hidden="true"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0, ease: E }}
        style={{ top: 'calc(-15% + 50px)', left: 0, right: 0, bottom: '-15%' }}
      >
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          {/* Mobile */}
          <img src="/img/hero-bg-rock.png" alt="" className="absolute max-w-none lg:hidden"
            style={{ height: '100%', left: '-50%', top: '5%', width: '200%', objectFit: 'cover' }}
          />
          {/* Desktop */}
          <img src="/img/hero-bg-rock.png" alt="" className="absolute max-w-none hidden lg:block w-full h-full object-cover"
            style={{ inset: 0 }}
          />
        </motion.div>
      </motion.div>

      {/* Content wrapper */}
      <div
        className="nl-wrapper"
        style={{
          minHeight: 'calc(100svh - 4.25rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 'clamp(2rem, 3vw, 2.5rem)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Top content — each element fades up with 0.05s stagger */}
        <div
          className="pdf-hero-top"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem',
            width: '100%',
          }}
        >
          {/* Badge block */}
          <div
            className="pdf-hero-head"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem',
              width: '100%',
            }}
          >
            {/* Badge — first, delay 0.1s */}
            <motion.div {...fadeUp(0.1)} className="flex items-center gap-2 px-4 py-3 rounded-full shrink-0"
              style={{ background: 'rgba(77,186,121,0.05)', border: '1px solid rgba(77,186,121,0.15)' }}>
              <span
                className="badge-pulse shrink-0 block rounded-full"
                style={{ width: '0.625rem', height: '0.625rem', background: '#4DBA79' }}
                aria-hidden="true"
              />
              <p className="font-inter-tight font-medium text-white text-center sm:whitespace-nowrap"
                style={{ fontSize: '0.875rem', lineHeight: 1.3 }}>
                PRE-IPO INSIDER · {EDITION} · обновлён к выходу SpaceX на IPO
              </p>
            </motion.div>

            {/* H1 + subtitle */}
            <div
              className="pdf-hero-copy"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                width: '100%',
              }}
            >
              {/* H1 — delay 0.15s */}
              <motion.h1 {...fadeUp(0.15)}
                style={{
                  fontFamily: 'Inter Tight, sans-serif',
                  fontWeight: 600,
                  fontSize: 'clamp(2.25rem, 4.5vw, 4rem)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  color: 'transparent',
                  backgroundImage:
                    'linear-gradient(103.37deg, rgb(162,162,162) 8.73%, rgb(255,255,255) 50.65%, rgb(162,162,162) 92.57%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  width: '100%',
                  maxWidth: '38.75rem',
                  textAlign: 'center',
                  margin: 0,
                }}
              >
                51 страница о рынке,
                <br />
                который обогнал Nasdaq в 7 раз
              </motion.h1>

              {/* Subtitle — delay 0.2s */}
              <motion.p {...fadeUp(0.2)}
                style={{
                  fontFamily: 'Inter Tight, sans-serif',
                  fontWeight: 500,
                  fontSize: 'clamp(0.875rem, 1.2vw, 1.125rem)',
                  lineHeight: 1.35,
                  letterSpacing: '-0.02em',
                  color: '#9b9b9b',
                  width: '100%',
                  maxWidth: '38.75rem',
                  textAlign: 'center',
                  margin: 0,
                }}
              >
                Pre-IPO Insider — квартальный разбор частного рынка от инвест-команды Axevil:
                топ-15 компаний, динамика индекса, крупнейшие переоценки и кандидаты на IPO.
              </motion.p>
            </div>

            {/* Proof row — delay 0.22s. The numbers do the convincing before the form
                asks for anything (client feedback 2026-07-23). */}
            <motion.ul
              {...fadeUp(0.22)}
              className="hero-stats"
              style={{
                display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
                gap: 'clamp(1rem, 3vw, 2.5rem)', listStyle: 'none', padding: 0, margin: 0,
                width: '100%', maxWidth: '38.75rem',
              }}
            >
              {HERO_STATS.map((s) => (
                <li key={s.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.125rem' }}>
                  <span
                    style={{
                      fontFamily: 'Inter Tight, sans-serif', fontWeight: 600,
                      fontSize: 'clamp(1.25rem, 2vw, 1.75rem)', lineHeight: 1.1,
                      letterSpacing: '-0.02em', color: 'white', fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {s.value}
                  </span>
                  <span
                    style={{
                      fontFamily: 'Inter Tight, sans-serif', fontWeight: 500,
                      fontSize: 'clamp(0.75rem, 1vw, 0.875rem)', lineHeight: 1.3,
                      letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap',
                    }}
                  >
                    {s.label}
                  </span>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Lead form — delay 0.25s. Was a "Скачать PDF" button that only scrolled to
              the form at the foot of the page: an extra click and a drop-off point
              (client feedback 2026-07-23). */}
          <motion.div {...fadeUp(0.25)} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <PDFLeadForm />
          </motion.div>
        </div>

        {/* Preview card — opacity fade in, delay 0.35s */}
        <motion.div
          className="w-full lg:w-[32.5rem]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35, ease: E }}
          style={{
            display: 'flex',
            maxWidth: '100%',
            padding: '1.5rem',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            background: '#111',
            borderRadius: '1.5rem',
            filter: 'drop-shadow(2rem 4rem 1.5rem rgba(0,0,0,0.8))',
            marginBottom: '2.5rem',
            overflow: 'visible',
          }}
        >
          {/* Image */}
          <div
            style={{
              width: 'clamp(5rem, 9.1875vw, 9.1875rem)',
              height: 'clamp(5.4375rem, 9.9375vw, 9.9375rem)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'visible',
              flexShrink: 0,
            }}
            aria-hidden="true"
          >
            <img
              src="/img/image-left-card-hero.png"
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center',
                filter: 'drop-shadow(1rem 3rem 4rem rgba(0,0,0,0.9)) drop-shadow(0 0.5rem 1rem rgba(0,0,0,0.7))',
              }}
            />
          </div>
          {/* Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'center', width: '100%' }}>
            <p style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 600, fontSize: 'clamp(1.25rem, 1.7vw, 1.5rem)', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'white', margin: 0 }}>
              Ключевые события рынка
            </p>
            <p style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 500, fontSize: 'clamp(0.875rem, 1.2vw, 1.125rem)', lineHeight: 1.35, letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.55)', margin: 0 }}>
              Axevil capital - квартальный брифинг инвест-команды
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
