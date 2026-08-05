import { Fragment, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { asset } from '../../lib/asset'
import { FIGURES } from '../../lib/figures'
import { LAST_ISSUE } from '../../lib/lastIssue'
import ScreenLetter from './NLScreenLetter'
import NLLeadForm from './NLLeadForm'

const heroScene = asset('/img/newsletter/hero-scene.webp')
const heroRockFront = asset('/img/newsletter/hero-rock-front.webp')
const heroLight = asset('/img/newsletter/hero-light.webp')
const heroSceneM = asset('/img/newsletter/hero-scene-m.webp')
const heroRockFrontM = asset('/img/newsletter/hero-rock-front-m.webp')

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
 *   1. hero-scene.webp      — фон, камни, планшет, затемнение слева.
 *   2. письмо               — живой компонент, вставлен в экран планшета.
 *   3. hero-light.webp      — лучи света поверх письма, режимом screen, обрезаны экраном.
 *   4. hero-rock-front.webp — ближний камень, лежит поверх письма и подрезает его снизу.
 *
 * Координаты взяты из макета, а не на глаз. В мокапе планшета есть слой «Image HERE» —
 * это область экрана: x 2126.89, y 347.54, 720.21×1029.92 в кадре 3190×1800, то есть
 * 66.674% / 19.308% / 22.577% / 57.218%. Соотношение сторон экрана 0.6993 практически
 * совпадает с письмом (370.5 / 529 = 0.700), поэтому письмо встаёт без искажений.
 *
 * Передний камень и лучи света собраны из тех же исходников, что и сцена, — подробности у
 * констант ROCK и в разметке слоя света.
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

/**
 * Передний камень — доля от кадра сцены, из рамки слоя «Камень перекрывающий» (51, 1252.71,
 * 3435×646.07), обрезанной по правому и нижнему краю кадра.
 *
 * Сначала я собирала этот слой из отдельного экспорта Figma: он приходил без прозрачности,
 * и альфу приходилось восстанавливать поиском границы по яркости. В части столбцов граница
 * находилась почти у верхнего края кадра, и там оставалась непрозрачная чернота — та самая
 * тёмная полоса над камнем.
 *
 * Теперь слой собран из самой сцены плюс маска из макета: в узле есть готовый контур гряды
 * (Vector 1194234003), он растеризуется и становится альфа-каналом. Пиксели берутся из того
 * же файла, что и фон, поэтому совмещение точное по построению — подбирать смещение больше
 * не нужно. Контур размыт на 6 px, чтобы край переходил плавно, как в макете.
 */
const ROCK = { left: 1.599, top: 69.595, width: 98.401, height: 30.405 }

/**
 * Мобильная сцена — из отдельного макета (Figma AI-TASKS, узел 2811:880).
 *
 * Кадр макета 440×1315, но нижним слоем в нём лежит скриншот текущего сайта — он там как
 * подложка, чтобы было видно, как сцена стыкуется с текстом. В сцену его брать нельзя,
 * поэтому кадр обрезан сверху по y=600: выше камней там чистая чернота (яркость 7 из 255),
 * скриншот не просвечивает, и стык с нашим текстом не виден. Остаётся 440×715.
 *
 * Сцена стоит в потоке под текстом, а не фоном за ним: в макете планшет начинается ниже
 * формы, и накладывать его на текст нельзя. Прежний фон-фотография с параллаксом и
 * затемнением убраны — в макете за текстом просто тёмный фон.
 */
const SCENE_M = { width: 440, height: 715 }

/** Экран планшета в мобильном макете — доля от кадра сцены. */
const SCREEN_M = { left: 18.356, top: 12.471, width: 61.249, height: 53.900 }

/** Передний камень в мобильном макете — доля от кадра сцены. */
const ROCK_M = { top: 59.842, height: 33.811 }

export default function NLHero() {
  /**
   * Геометрия десктопной сцены считается здесь, а не в CSS, по двум причинам.
   *
   * Первая: сцену надо подставить по правилу object-cover, но при этом знать, насколько её
   * обрезало — иначе не разместить письмо в экране планшета по процентам из макета.
   *
   * Вторая, и она решает главную проблему: при простом кроп-по-центру планшет уезжает за
   * правый край. На 1024×792 сцена растягивается по высоте до 1404 px, лишние 380 срезаются
   * пополам, и правый край планшета оказывается на 1080 при ширине окна 1024 — обрезан на
   * 56 px вместе с частью письма. Поэтому сцена сдвигается влево ровно настолько, чтобы
   * планшет уместился, и ни пикселем больше: на широких экранах сдвиг нулевой и кадр
   * остаётся центрированным, как в макете.
   */
  const clipRef = useRef<HTMLDivElement>(null)
  const [scene, setScene] = useState({ width: 0, left: 0 })

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

      setScene({ width, left })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <section className="relative w-full overflow-hidden" style={{ background: 'var(--black-100)', paddingTop: '72px' }}>


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

          <ScreenLetter screen={SCREEN} light={heroLight} />

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
        style={{ padding: '1.5rem 0 0' }}>

        <div className="flex flex-col items-center w-full shrink-0 px-4">
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
              Дайджест частного рынка — раз в неделю на почту
            </motion.h1>

            {/* Paragraph */}
            <motion.p {...fadeUp(0.20)}
              className="font-inter-tight font-medium w-full"
              style={{ fontSize: 'var(--font-s)', lineHeight: 1.3, color: 'var(--white-400)', letterSpacing: '-0.28px' }}>
              Крупнейшие переоценки, лидеры роста и падения на secondary, тендер-оферы, новые раунды. Каждую среду.
            </motion.p>
          </div>

          {/* Lead form + freshness marker.
              Между кнопкой и строками под ней отдельный отступ 1.25rem: раньше всю группу
              держал общий gap-2, и дата выпуска прилипала к кнопке. Между самими строками
              зазор остался маленьким — они читаются как один блок. */}
          <motion.div {...fadeUp(0.25)} className="w-full mt-[1.25rem] flex flex-col items-center">
            <NLLeadForm source="hero" note={null} />
            <div className="flex flex-col items-center gap-1.5 mt-[1.25rem]">
              <LastIssueMarker className="justify-center text-center" />
              <ProofLine className="justify-center text-center" />
            </div>
          </motion.div>
        </div>

        {/* ── СЦЕНА ИЗ МОБИЛЬНОГО МАКЕТА ──
            Стоит в потоке под текстом, а не фоном за ним: в макете планшет начинается ниже
            формы. Высоту задаёт сама картинка (width: 100% + натуральные пропорции), поэтому
            первый экран получается выше окна — планшет виден наполовину и открывается при
            небольшой прокрутке, как в макете. */}
        <div className="relative w-full mt-[1.5rem]">
          <motion.img
            src={heroSceneM} alt="" aria-hidden loading="eager"
            className="block w-full pointer-events-none"
            width={SCENE_M.width} height={SCENE_M.height}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          />

          <ScreenLetter screen={SCREEN_M} />

          <motion.img
            src={heroRockFrontM} alt="" aria-hidden loading="eager"
            className="absolute left-0 w-full pointer-events-none"
            style={{ top: `${ROCK_M.top}%`, height: `${ROCK_M.height}%` }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
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
              Дайджест частного рынка —<br />раз в неделю на почту
            </motion.h1>

            {/* Paragraph */}
            <motion.p {...fadeUp(0.20)}
              className="font-inter-tight font-medium"
              style={{ fontSize: 'clamp(1rem,1.4vw,1.25rem)', lineHeight: 1.35, color: 'var(--white-400)', letterSpacing: '-0.02em', maxWidth: '34rem' }}>
              Крупнейшие переоценки, лидеры роста и падения на secondary, тендер-оферы, новые раунды. Каждую среду.
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
