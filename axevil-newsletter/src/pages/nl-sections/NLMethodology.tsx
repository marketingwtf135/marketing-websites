import { useRef } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import { asset } from '../../lib/asset'
import NLDevice from './NLDevice'
import NLLeadForm from './NLLeadForm'
import { LAST_ISSUE } from '../../lib/lastIssue'

/**
 * "Так выглядит один выпуск" — the preview, enlarged, with the ask above it.
 *
 * Was a small centred letter card floating on the rock background with no way to act on
 * it (client feedback 2026-07-23: "preview мелкий и без CTA рядом. Увеличить + справа CTA
 * «Прочитать выпуск целиком», email + телефон inline или полный выпуск после subscribe").
 * First pass put the letter and the ask side by side (letter left, ask right); client
 * feedback 2026-07-27 asked for a vertical stack instead, text above the photo. The
 * letter renders at up to 1.4× its old scale, clipped at the fold with a fade so it
 * reads as "continues below", underneath the offer + the same short form as the hero.
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
              {/* Название было разным на мобильной и десктопной вёрстке («Пример выпуска»
                  против «Методологии»), а в меню стояло второе — с телефона человек жал
                  «Методология» и попадал в раздел с другим заголовком. Оставлено одно на
                  всех, оно же теперь в меню. */}
              <span style={{ color: 'var(--black-900)' }}>Пример выпуска</span>
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
              {/* Было «1 sector deep-dive» — остаток от ТЗ. Павел сказал, что sector deep-dive
                  не будет в каждом письме, и в «Составе выпуска» его уже нет; здесь упоминание
                  осталось от прошлой чистки. Заменено на раздел, который есть всегда. */}
              Лидерборд secondary, открывшиеся тендер-оферы, новые раунды,
              новые инвест-идеи — всё в одном письме.
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
                src={asset('/img/newsletter/hero-bg-rock.png')}
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

            {/* Vertical stack — text first, letter preview below (client feedback
                2026-07-27: "по вертикали выравнивание и текст над фото, а не наоборот";
                was a 2-col grid with the letter on the left and the ask on the right). */}
            <div className="relative z-10 flex flex-col items-center gap-8 lg:gap-10 w-full">
              {/* The ask */}
              <div className="flex flex-col items-center text-center gap-4 w-full">
                <p className="font-inter-tight font-medium"
                  style={{ fontSize: 'var(--font-xs)', lineHeight: 1.3, color: 'var(--white-400)' }}>
                  Выпуск №{LAST_ISSUE.number} · {LAST_ISSUE.date} · {LAST_ISSUE.updates} · {LAST_ISSUE.reading}
                </p>

                <h3 className="font-inter-tight font-semibold text-white"
                  style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2.25rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
                  Прочитать выпуск целиком
                </h3>

                <p className="font-inter-tight font-medium"
                  style={{ fontSize: 'clamp(0.875rem, 1.25vw, 1.125rem)', lineHeight: 1.35, color: 'var(--white-300)', letterSpacing: '-0.02em', maxWidth: '28rem' }}>
                  Оставьте контакты — пришлём последний выпуск полностью, без сокращений, и подключим к рассылке по средам.
                </p>

                <NLLeadForm
                  source="preview"
                  align="center"
                  label="Прочитать выпуск целиком"
                  note="Полный выпуск приходит сразу после подписки. Отписка одной кнопкой."
                  className="max-w-[30rem]"
                />
              </div>

              {/* Планшет с письмом. Раньше здесь было письмо в собственной рамке из padding
                  и border, по три фиксированных масштаба на breakpoint. Теперь тот же мокап,
                  что на первом экране, а письмо внутри подстраивается под экран само —
                  поэтому хватает одной ширины на clamp вместо трёх вариантов.
                  Ширины подобраны под прежние размеры письма: 293 px на мобильном, 485 px на
                  широком экране, плюс поправка на рамку (экран занимает 90.26% планшета).
                  Client 2026-07-27: отступ сверху 4rem, письмо ниже блока с призывом. */}
              <div className="flex justify-center w-full" style={{ ...clip, marginTop: '4rem' }}>
                <NLDevice style={{ width: 'clamp(325px, 36vw, 537px)' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
