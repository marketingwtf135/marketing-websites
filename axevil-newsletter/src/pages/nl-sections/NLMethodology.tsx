import { useRef } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import NLLetterPreview from './NLLetterPreview'
import NLLeadForm from './NLLeadForm'
import { LAST_ISSUE } from './NLHero'

/**
 * "Так выглядит один выпуск" — the preview, enlarged, with the ask right beside it.
 *
 * Was a small centred letter card floating on the rock background with no way to act on
 * it (client feedback 2026-07-23: "preview мелкий и без CTA рядом. Увеличить + справа CTA
 * «Прочитать выпуск целиком», email + телефон inline или полный выпуск после subscribe").
 * The letter is now the left column at up to 1.4× its old scale, clipped at the fold with
 * a fade so it reads as "continues below", and the right column carries the offer and the
 * same short form as the hero.
 */
export default function NLMethodology() {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])

  /** The letter is fixed-width per scale, so each breakpoint renders its own size. */
  const clip: React.CSSProperties = {
    maxHeight: 'clamp(21rem, 40vw, 34rem)',
    overflow: 'hidden',
    maskImage: 'linear-gradient(to bottom, black 78%, transparent 100%)',
    WebkitMaskImage: 'linear-gradient(to bottom, black 78%, transparent 100%)',
  }

  return (
    <section id="nl-methodology" className="relative w-full bg-page-bg">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-0 py-[3.75rem] sm:py-[5rem] lg:py-[6.25rem]">
        <div className="flex flex-col gap-6 sm:gap-8 items-center w-full">

          {/* Text heading */}
          <div className="flex flex-col gap-4 sm:gap-6 items-center text-center w-full lg:px-[80px]">
            <div className="flex gap-2 font-inter-tight font-medium items-center justify-center whitespace-nowrap"
              style={{ fontSize: 'clamp(14px, 1.1vw, 18px)', lineHeight: 1.35, letterSpacing: '-0.36px' }}>
              <span style={{ color: 'var(--black-800)' }}>3.0</span>
              {/* Mobile: "Пример выпуска", Desktop: "Методология" */}
              <span className="sm:hidden" style={{ color: 'var(--black-900)' }}>Пример выпуска</span>
              <span className="hidden sm:inline" style={{ color: 'var(--black-900)' }}>Методология</span>
            </div>
            <h2 className="font-inter-tight font-semibold text-transparent bg-clip-text text-center"
              style={{
                fontSize: 'clamp(2.25rem, 4.4vw, 4rem)', lineHeight: 1, letterSpacing: '-0.02em',
                backgroundImage: 'linear-gradient(141.44deg, rgb(162,162,162) 15.766%, rgb(255,255,255) 49.286%, rgb(162,162,162) 82.806%)',
                maxWidth: 1075,
              }}>
              Так выглядит один выпуск
            </h2>
            <p className="font-inter-tight font-medium text-center"
              style={{ fontSize: 'clamp(0.875rem, 1.25vw, 1.125rem)', lineHeight: 1.35, color: 'var(--white-300)', letterSpacing: '-0.36px', maxWidth: 540 }}>
              Лидерборд secondary, открывшиеся тендер-оферы, новые раунды, 1 sector deep-dive — всё в одном письме.
            </p>
          </div>

          {/* Dark card — letter on the left, the ask on the right */}
          <div
            ref={cardRef}
            className="relative w-full overflow-hidden"
            style={{
              borderRadius: 'clamp(24px, 2.2vw, 32px)',
              padding: 'clamp(1.5rem, 3vw, 3.5rem)',
            }}
          >
            {/* Parallax rock background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden
              style={{ borderRadius: 'clamp(24px, 2.2vw, 32px)' }}>
              <div className="absolute inset-0" style={{ background: 'var(--black-300)', borderRadius: 'clamp(24px, 2.2vw, 32px)' }} />
              <motion.img
                src="/img/newsletter/hero-bg-rock.png"
                alt=""
                className="absolute max-w-none object-cover"
                style={{
                  top: 'calc(-10% + 50px)', left: 0, right: 0,
                  width: '100%', height: '130%',
                  objectFit: 'cover', borderRadius: 'clamp(24px, 2.2vw, 32px)',
                  y: bgY,
                }}
                loading="lazy"
              />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-10 w-full">
              {/* Letter — one render per breakpoint, the component sizes in px */}
              <div className="flex justify-center lg:justify-start w-full" style={clip}>
                <div className="lg:hidden shrink-0"><NLLetterPreview scale={0.845} /></div>
                <div className="hidden lg:block xl:hidden shrink-0"><NLLetterPreview scale={1.05} /></div>
                <div className="hidden xl:block shrink-0"><NLLetterPreview scale={1.4} /></div>
              </div>

              {/* The ask */}
              <div className="flex flex-col items-start gap-4 w-full">
                <p className="font-inter-tight font-medium"
                  style={{ fontSize: 'var(--font-xs)', lineHeight: 1.3, color: 'var(--white-400)' }}>
                  Выпуск №47 · {LAST_ISSUE.date} · {LAST_ISSUE.updates} · {LAST_ISSUE.reading}
                </p>

                <h3 className="font-inter-tight font-semibold text-white"
                  style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2.25rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
                  Прочитать выпуск целиком
                </h3>

                <p className="font-inter-tight font-medium"
                  style={{ fontSize: 'clamp(0.875rem, 1.25vw, 1.125rem)', lineHeight: 1.35, color: 'var(--white-300)', letterSpacing: '-0.02em', maxWidth: '28rem' }}>
                  Оставьте контакты — пришлём последний выпуск полностью, без сокращений, и подключим к рассылке по вторникам.
                </p>

                <NLLeadForm
                  source="preview"
                  align="left"
                  label="Прочитать выпуск целиком"
                  note="Полный выпуск приходит сразу после подписки. Отписка одной кнопкой."
                  className="max-w-[30rem]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
