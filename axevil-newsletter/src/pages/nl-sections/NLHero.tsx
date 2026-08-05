import { Fragment, useEffect, useRef, useState } from 'react'
import { useScroll, useTransform, motion, type MotionValue } from 'framer-motion'
import { asset } from '../../lib/asset'
import { FIGURES } from '../../lib/figures'
import { LAST_ISSUE } from '../../lib/lastIssue'
import NLLetterPreview, { LETTER_BASE_WIDTH } from './NLLetterPreview'
import NLLeadForm from './NLLeadForm'

const heroBg = asset('/img/newsletter/hero-bg.png')
const heroScene = asset('/img/newsletter/hero-scene.webp')
const heroRockFront = asset('/img/newsletter/hero-rock-front.webp')

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

/**
 * Сцена первого экрана — из макета, который прислала Татьяна (Figma AI-TASKS, узел 2805:742).
 *
 * До этого сцена собиралась кодом: рамка планшета рисовалась CSS-градиентами, а перекрытие
 * камнем изображалось второй копией фона с градиентной маской. Работало, но маску камня
 * приходилось подгонять по замерам яркости фотографии, и она всё равно оставалась прямой
 * полосой вместо силуэта. В макете и планшет настоящий, и камень обведён вручную — поэтому
 * весь самодельный слой выброшен, а сцена взята картинкой.
 *
 * Слои и порядок:
 *   1. hero-scene.webp   — фон, камни, планшет, затемнение слева. Всё, кроме содержимого экрана.
 *   2. письмо            — живой компонент, вставлен в экран планшета.
 *   3. hero-rock-front.webp — ближний камень, лежит поверх письма и подрезает его снизу.
 *
 * Координаты взяты из макета, а не на глаз. В мокапе планшета есть слой «Image HERE» —
 * это область экрана: x 2126.89, y 347.54, 720.21×1029.92 в кадре 3190×1800, то есть
 * 66.674% / 19.308% / 22.577% / 57.218%. Соотношение сторон экрана 0.6993 практически
 * совпадает с письмом (370.5 / 529 = 0.700), поэтому письмо встаёт без искажений.
 *
 * Положение переднего камня найдено поиском совмещения: слой из Figma выгрузился без
 * прозрачности (сверху от гряды просто чёрное), альфа восстановлена по силуэту, а смещение
 * подобрано так, чтобы наложение камня на сцену её не меняло — средняя разница вышла 7.65
 * из 255, то есть пиксели совпали. Отсюда 1.066% / 68.472% / 98.887% / 31.389%.
 *
 * Сцена подставляется по правилу object-cover, но сам `object-fit: cover` тут не годится:
 * письмо надо позиционировать в процентах от картинки, а cover прячет, насколько её
 * обрезало. Поэтому размер и сдвиг сцены считаются явно — см. ResizeObserver ниже.
 */
const SCENE_W = 3190
const SCENE_H = 1800
const SCENE_RATIO = SCENE_W / SCENE_H

/** Экран планшета в макете — доля от кадра сцены. */
const SCREEN = { left: 66.674, top: 19.308, width: 22.577, height: 57.218 }

/** Корпус планшета целиком — по нему проверяем, что он не уехал за правый край. */
const IPAD = { left: 65.456, width: 25.014 }

/** Минимальный зазор от правого края окна до планшета, px. */
const IPAD_MARGIN = 24

/** Передний камень — доля от кадра сцены. */
const ROCK = { left: 1.066, top: 68.472, width: 98.887, height: 31.389 }

/** Фон для мобильной вёрстки: там макета нет, остаётся прежняя фотография с параллаксом. */
function MobileStone({ bgY }: { bgY: MotionValue<string> }) {
  return (
    <div className="absolute inset-0 pointer-events-none lg:hidden" aria-hidden>
      <motion.div
        className="absolute"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35, ease: [0.4, 0, 0.2, 1] }}
        style={{ top: 'calc(-15% + 150px)', left: 0, right: 0, bottom: '-15%' }}
      >
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <img src={heroBg} alt="" className="absolute max-w-none"
            style={{ height: '100%', left: '-188.07%', top: '16.41%', width: '476.13%' }}
            loading="eager" />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function NLHero() {
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 800], ['0%', '-12%'])

  /**
   * Геометрия сцены считается здесь, а не в CSS, по трём причинам.
   *
   * Первая: масштаб письма. Внутренности письма свёрстаны в пикселях (scale × базовые
   * значения), поэтому в блок, заданный процентами, оно само не впишется. CSS тут не
   * поможет — чтобы получить из ширины безразмерный множитель, надо поделить длину на
   * длину, а calc так не умеет.
   *
   * Вторая: сцену надо подставить по правилу object-cover, но при этом знать, насколько её
   * обрезало — иначе не разместить письмо в экране планшета по процентам из макета.
   *
   * Третья, и она решает главную проблему: при простом кроп-по-центру планшет уезжает за
   * правый край. На 1024×792 сцена растягивается по высоте до 1404 px, лишние 380 срезаются
   * пополам, и правый край планшета оказывается на 1080 при ширине окна 1024 — обрезан на
   * 56 px вместе с частью письма. Поэтому сцена сдвигается влево ровно настолько, чтобы
   * планшет уместился, и ни пикселем больше: на широких экранах сдвиг нулевой и кадр
   * остаётся центрированным, как в макете.
   */
  const clipRef = useRef<HTMLDivElement>(null)
  const [scene, setScene] = useState({ width: 0, left: 0, letterScale: 0 })

  useEffect(() => {
    const el = clipRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const { width: W, height: H } = entry.contentRect
      if (!W || !H) return

      // object-cover: сцена накрывает контейнер целиком
      const width = Math.max(W, H * SCENE_RATIO)

      // по центру, но с гарантией, что правый край планшета остаётся в кадре
      const centred = (W - width) / 2
      const iPadRightFrac = (IPAD.left + IPAD.width) / 100
      const overhang = centred + width * iPadRightFrac - (W - IPAD_MARGIN)
      // сдвигаем только влево и не дальше, чем до правого края сцены — иначе справа щель
      const left = Math.max(W - width, centred - Math.max(0, overhang))

      setScene({ width, left, letterScale: (width * SCREEN.width / 100) / LETTER_BASE_WIDTH })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <section className="relative w-full overflow-hidden" style={{ background: 'var(--black-100)', paddingTop: '72px' }}>

      <MobileStone bgY={bgY} />

      {/* Затемнение под текст — только для мобильной вёрстки. На десктопе оно уже внутри
          сцены из макета (слой «Затемнение»), поэтому второй раз не нужно. */}
      <div className="absolute inset-0 pointer-events-none lg:hidden" aria-hidden
        style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.86) 0%, rgba(10,10,10,0.62) 45%, rgba(10,10,10,0.15) 80%, rgba(10,10,10,0) 100%)' }} />

      {/* ── СЦЕНА ИЗ МАКЕТА (lg+) ──
          Контейнер только обрезает, размеры сцены считаются от него в единицах контейнера. */}
      <div ref={clipRef} className="absolute inset-0 overflow-hidden hidden lg:block">
        <div
          className="absolute top-1/2"
          style={{
            left: scene.left,
            width: scene.width,
            aspectRatio: `${SCENE_W} / ${SCENE_H}`,
            transform: 'translateY(-50%)',
            visibility: scene.width ? 'visible' : 'hidden',
          }}
        >
          <motion.img
            src={heroScene} alt="" aria-hidden loading="eager"
            className="absolute inset-0 w-full h-full pointer-events-none"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.4, 0, 0.2, 1] }}
          />

          {/* Письмо в экране планшета */}
          <motion.div
            className="absolute overflow-hidden"
            style={{
              left: `${SCREEN.left}%`, top: `${SCREEN.top}%`,
              width: `${SCREEN.width}%`, height: `${SCREEN.height}%`,
              // Фон в цвет поверхности письма. Пропорции письма и экрана совпадают не
              // идеально (0.710 против 0.699), поэтому по ширине письмо садится точно, а по
              // высоте не достаёт до низа экрана нескольких пикселей. Без этой заливки в
              // щели просвечивала бы серая заглушка экрана из макета.
              background: 'var(--black-500)',
            }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            {scene.letterScale > 0 && (
              // width: max-content, иначе обёртка растягивается на всю ширину экрана и после
              // масштабирования выходит за него. Сама она ничего не рисует, но по её
              // габаритам легко ошибиться при замерах — я на этом один раз попалась.
              <div style={{ width: 'max-content', transform: `scale(${scene.letterScale})`, transformOrigin: 'top left' }}>
                <NLLetterPreview scale={1} bare />
              </div>
            )}
          </motion.div>

          {/* Ближний камень поверх письма */}
          <motion.img
            src={heroRockFront} alt="" aria-hidden loading="eager"
            className="absolute pointer-events-none"
            style={{
              left: `${ROCK.left}%`, top: `${ROCK.top}%`,
              width: `${ROCK.width}%`, height: `${ROCK.height}%`,
            }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
      </div>

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
          Только текст и форма. Планшет теперь часть сцены-картинки, поэтому вторая колонка
          не нужна: вместо неё справа зарезервировано место отступом.

          История, ради которой это всё переделывалось: сначала макет письма висел на
          `position: absolute`, прижатый к низу, и наезжал на форму на всех десктопных
          разрешениях — от 79 px на 16-дюймовом макбуке до 392 px на 1366×768. Потом стал
          второй колонкой в потоке, и перекрытие стало невозможным геометрически. Теперь
          планшет ушёл в картинку, но принцип сохранён: колонка с текстом и область планшета
          не могут пересечься, потому что первая ограничена отступом справа.

          38% отступа — с запасом. Сцена подставляется по object-cover, и при разных
          пропорциях экрана планшет гуляет по горизонтали: левый край его корпуса приходится
          на 65.5% ширины при широком экране и на 69.3% при высоком. Текст, ограниченный
          62%, не достаёт до него ни в одном случае. */}
      <div className="hidden lg:flex relative mx-auto w-full flex-col items-start justify-center"
        style={{
          maxWidth: 1440,
          minHeight: 'max(calc(100svh - 72px), 45rem)',
          paddingTop: 40, paddingBottom: 40,
          paddingLeft: 'clamp(40px, 5.5vw, 80px)', paddingRight: '38%',
        }}>

        <div className="flex w-full min-w-0 flex-col items-start gap-8">
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

      </div>

    </section>
  )
}
