import { Fragment } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import { asset } from '../../lib/asset'
import { FIGURES } from '../../lib/figures'
import { LAST_ISSUE } from '../../lib/lastIssue'
import NLLetterPreview from './NLLetterPreview'
import NLLeadForm from './NLLeadForm'

const heroBg = asset('/img/newsletter/hero-bg.png')

/** Reusable fade-up config for staggered hero elements */
function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: [0.4, 0, 0.2, 1] as const },
  }
}

/** Last-issue marker — dot · date · updates · reading time.
 *  Выравнивание задаётся снаружи: в мобильной вёрстке по центру, в десктопной колонке
 *  по левому краю. */
function LastIssueMarker({ className = '' }: { className?: string }) {
  return (
    <p
      className={`font-inter-tight font-medium flex flex-wrap items-center gap-x-2 gap-y-1 ${className}`}
      style={{ fontSize: 'var(--font-xs)', lineHeight: 1.3, color: 'var(--white-400)', letterSpacing: '-0.01em' }}
    >
      <span className="shrink-0 block rounded-full" aria-hidden
        style={{ width: '0.375rem', height: '0.375rem', background: 'var(--status-open)' }} />
      <span style={{ color: 'var(--white-300)' }}>Последний выпуск: {LAST_ISSUE.date}</span>
      <span aria-hidden>·</span>
      <span>{LAST_ISSUE.updates}</span>
      <span aria-hidden>·</span>
      <span>{LAST_ISSUE.reading}</span>
    </p>
  )
}

/**
 * Строка-доказательство под формой (ТЗ, Блок 1 — четвёртый элемент первого экрана после
 * заголовка, подзаголовка и CTA).
 *
 * Те же цифры показаны в блоке «О платформе», но до него дочитывают единицы, а решение
 * «оставлять ли адрес» принимается здесь. Значения берутся из общего модуля, поэтому два
 * места на странице не могут разойтись.
 */
function ProofLine({ className = '' }: { className?: string }) {
  return (
    <p
      className={`font-inter-tight font-medium flex flex-wrap items-center gap-x-2 gap-y-1 ${className}`}
      style={{ fontSize: 'var(--font-xs)', lineHeight: 1.3, color: 'var(--white-400)', letterSpacing: '-0.01em' }}
    >
      {/* Разделитель — самостоятельный элемент, а не часть следующего показателя. Когда
          строка переносится (на 1024 она не влезает в одну), точка остаётся в конце
          предыдущей строки, а не открывает новую. */}
      {FIGURES.map((f, i) => (
        <Fragment key={f.inline}>
          {i > 0 && <span aria-hidden style={{ color: 'var(--black-800)' }}>·</span>}
          <span className="whitespace-nowrap">{f.inline}</span>
        </Fragment>
      ))}
    </p>
  )
}

export default function NLHero() {
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 800], ['0%', '-12%'])

  return (
    <section className="relative w-full overflow-hidden" style={{ background: 'var(--black-100)', paddingTop: '72px' }}>

      {/* ── Background stone — outer wrapper animates entry, inner handles parallax ── */}
      <motion.div
        className="absolute pointer-events-none"
        aria-hidden
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35, ease: [0.4, 0, 0.2, 1] }}
        style={{ top: 'calc(-15% + 150px)', left: 0, right: 0, bottom: '-15%' }}
      >
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          {/* Mobile */}
          <img src={heroBg} alt="" className="absolute max-w-none lg:hidden"
            style={{ height: '100%', left: '-188.07%', top: '16.41%', width: '476.13%' }}
            loading="eager" />
          {/* Desktop */}
          <img src={heroBg} alt="" className="absolute max-w-none hidden lg:block w-full h-full object-cover"
            style={{ inset: 0 }}
            loading="eager" />
        </motion.div>
      </motion.div>

      {/* ── Затемняющая подложка под текст ──
          Фон первого экрана — фотография камня, и её яркость по кадру гуляет. Пока текст
          стоял по центру, он попадал на тёмную часть; после перевёрстки в две колонки
          мелкие строки под формой легли на светлый склон и перестали читаться — «150+
          WM-партнёров» просто исчезало. Поднимать цвет текста бессмысленно: он бы начал
          спорить с заголовком и всё равно проигрывал бы самым светлым пятнам.

          Поэтому не трогаем ни фото, ни цвета, а гасим фон под текстом. На десктопе
          градиент идёт слева направо: густой там, где колонка с формой, и полностью
          прозрачный там, где стоит письмо. На мобильной вёрстке текст по центру, поэтому
          там градиент вертикальный. */}
      <div className="absolute inset-0 pointer-events-none lg:hidden" aria-hidden
        style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.86) 0%, rgba(10,10,10,0.62) 45%, rgba(10,10,10,0.15) 80%, rgba(10,10,10,0) 100%)' }} />
      <div className="absolute inset-0 pointer-events-none hidden lg:block" aria-hidden
        style={{ background: 'linear-gradient(96deg, rgba(10,10,10,0.94) 0%, rgba(10,10,10,0.88) 30%, rgba(10,10,10,0.55) 52%, rgba(10,10,10,0.12) 70%, rgba(10,10,10,0) 82%)' }} />

      {/* ── MOBILE (< lg) ──
          Headline → form → marker must all sit inside the first screen at 375 (client
          feedback 2026-07-23: "hero + форма в один экран на 375px без прокрутки").
          The letter preview is no longer absolutely pinned at a fixed 453px — it takes
          whatever vertical space is left over (flex-1 + overflow hidden), so it peeks
          on a tall phone and quietly shrinks on a short one instead of pushing the form
          below the fold. */}
      <div className="lg:hidden relative w-full flex flex-col items-center overflow-hidden"
        style={{ minHeight: 'calc(100svh - 72px)', padding: '1.5rem 1rem 0' }}>

        <div className="flex flex-col items-center w-full shrink-0">
          {/* Badge */}
          <motion.div {...fadeUp(0.1)} className="flex items-center gap-2 px-3 py-2 rounded-full shrink-0 mb-[0.75rem]"
            style={{ background: 'rgba(77,186,121,0.05)', border: '1px solid rgba(77,186,121,0.15)' }}>
            <span className="badge-pulse shrink-0 block rounded-full" style={{ width: 8, height: 8, background: 'var(--status-open)' }} aria-hidden />
            <p className="font-inter-tight font-medium text-white whitespace-nowrap" style={{ fontSize: 'var(--font-xs)', lineHeight: 1.3 }}>
              Axevil дайджест · еженедельно
            </p>
          </motion.div>

          <div className="flex flex-col gap-3 items-center w-full text-center">
            {/* Heading */}
            <motion.h1 {...fadeUp(0.15)}
              className="font-inter-tight font-semibold text-transparent bg-clip-text w-full"
              style={{ fontSize: 'clamp(1.75rem, 8vw, 2.25rem)', lineHeight: 1.05, letterSpacing: '-0.72px', backgroundImage: 'linear-gradient(103.344deg, rgb(162,162,162) 8.73%, rgb(255,255,255) 50.65%, rgb(162,162,162) 92.57%)' }}>
              Дайджест частного рынка — раз в неделю на почту
            </motion.h1>

            {/* Paragraph */}
            <motion.p {...fadeUp(0.20)}
              className="font-inter-tight font-medium w-full"
              style={{ fontSize: 'var(--font-s)', lineHeight: 1.3, color: 'var(--white-400)', letterSpacing: '-0.28px' }}>
              Крупнейшие переоценки, лидеры роста и падения на secondary, тендер-оферы, новые раунды. Каждую среду.
            </motion.p>
          </div>

          {/* Lead form + freshness marker */}
          <motion.div {...fadeUp(0.25)} className="w-full mt-[1.25rem] flex flex-col items-center gap-2">
            <NLLeadForm source="hero" note={null} />
            <LastIssueMarker className="justify-center text-center" />
            <ProofLine className="justify-center text-center" />
          </motion.div>
        </div>

        {/* Letter preview — fills the leftover screen, clipped and faded at the fold */}
        <motion.div
          className="w-full flex justify-center mt-4"
          style={{
            flex: '1 1 0', minHeight: 0, overflow: 'hidden',
            maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="shrink-0 self-start">
            <NLLetterPreview scale={0.864} />
          </div>
        </motion.div>
      </div>

      {/* ── DESKTOP (lg+) ──
          Две колонки: слева текст и форма, справа макет письма.

          Раньше это была одна центрированная колонка, а письмо висело отдельно —
          `position: absolute`, прижатое к нижнему краю. Вырванное из потока, оно не могло
          ничего подвинуть, и подвинуть его тоже было нельзя: любой текст, выросший хоть на
          строку, оказывался под ним. К августу перекрытие было на всех десктопных
          разрешениях — от 79 px на 16-дюймовом макбуке до 392 px на ноутбуке 1366×768, и
          форма на первом экране становилась нерабочей.

          Теперь колонки — flex-соседи в потоке. Перекрытие невозможно геометрически: если
          левой колонке нужно больше высоты, контейнер растёт, а не наезжает сам на себя.

          Ширины намеренно неравные. Правая — ровно под письмо (396 px при scale 1,
          shrink-0), левая забирает весь остаток. На 1440 это даёт ей ~820 px, то есть
          заголовок почти не теряет в размере против прежних 858 px по центру; на 1024 —
          ~470 px, и форма всё ещё кладёт email с телефоном в один ряд (её порог — 640 px
          на всю форму, а не на колонку). */}
      <div className="hidden lg:flex relative mx-auto w-full flex-row items-center"
        style={{
          maxWidth: 1440,
          minHeight: 'max(calc(100svh - 72px), 45rem)',
          paddingTop: 40, paddingBottom: 40,
          paddingLeft: 'clamp(40px, 5.5vw, 80px)', paddingRight: 'clamp(40px, 5.5vw, 80px)',
          gap: 'clamp(40px, 4vw, 64px)',
        }}>

        <div className="flex flex-1 min-w-0 flex-col items-start gap-8">
          {/* Badge */}
          <motion.div {...fadeUp(0.1)}
            className="flex items-center gap-2 px-4 py-3 rounded-full"
            style={{ background: 'rgba(77,186,121,0.05)', border: '1px solid rgba(77,186,121,0.15)' }}>
            <span className="badge-pulse shrink-0 block rounded-full" style={{ width: 10, height: 10, background: 'var(--status-open)' }} aria-hidden />
            <p className="font-inter-tight font-medium text-white whitespace-nowrap" style={{ fontSize: 'var(--font-s)', lineHeight: 1.3 }}>
              Axevil дайджест · еженедельно
            </p>
          </motion.div>

          <div className="flex flex-col items-start gap-6 text-left w-full">
            {/* Heading — ширину задаёт колонка, отдельный maxWidth больше не нужен.
                Перенос после тире проставлен вручную: браузер сам ломал строку после «раз
                в», и предлог оставался висеть в конце первой строки. Мобильный заголовок
                отдельный (см. блок выше), поэтому здесь достаточно обычного <br> без
                адаптивных классов. */}
            <motion.h1 {...fadeUp(0.15)}
              className="font-inter-tight font-semibold text-transparent bg-clip-text"
              style={{ fontSize: 'clamp(1.875rem, 3.4vw, 3.5rem)', lineHeight: 1.02, letterSpacing: '-0.02em', backgroundImage: 'linear-gradient(116.594deg, rgb(162,162,162) 8.73%, rgb(255,255,255) 50.65%, rgb(162,162,162) 92.57%)' }}>
              Дайджест частного рынка —<br />раз в неделю на почту
            </motion.h1>

            {/* Paragraph */}
            <motion.p {...fadeUp(0.20)}
              className="font-inter-tight font-medium"
              style={{ fontSize: 'clamp(1rem,1.4vw,1.25rem)', lineHeight: 1.35, color: 'var(--white-400)', letterSpacing: '-0.02em', maxWidth: '34rem' }}>
              Крупнейшие переоценки, лидеры роста и падения на secondary, тендер-оферы, новые раунды. Каждую среду.
            </motion.p>
          </div>

          {/* Lead form — was a button that only scrolled to the closing block, an extra
              click and a drop-off point (client feedback 2026-07-23) */}
          <motion.div {...fadeUp(0.25)} className="w-full flex flex-col items-start gap-3" style={{ maxWidth: '38.75rem' }}>
            <NLLeadForm source="hero" note={null} />
            <LastIssueMarker className="justify-start" />
            <ProofLine className="justify-start" />
          </motion.div>
        </div>

        {/* Макет письма — правая колонка.
            Масштаб подобран по самому узкому десктопу. Правая колонка не сжимается
            (shrink-0), поэтому чем крупнее письмо, тем меньше остаётся левой: на 1024 при
            1.12 ей достаётся ~450 px, и форма всё ещё держит email с телефоном в одном
            ряду. Прежние 1.188 столько не оставляли. Один масштаб на все разрешения —
            письму больше не с чем конкурировать за место, оно стоит в своей колонке. */}
        <motion.div
          className="shrink-0"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.4, 0, 0.2, 1] }}
        >
          <NLLetterPreview scale={1.12} />
        </motion.div>
      </div>
    </section>
  )
}
