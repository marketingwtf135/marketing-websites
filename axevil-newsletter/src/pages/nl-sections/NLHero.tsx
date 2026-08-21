import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { asset } from '../../lib/asset'
import NLLeadForm from './NLLeadForm'

const heroDesktop = asset('/img/newsletter/hero-desktop.webp')
const heroBgM = asset('/img/newsletter/hero-bg-m.webp')
const heroIllM = asset('/img/newsletter/hero-ill-m.webp')

/** Reusable fade-up config for staggered hero elements */
function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: [0.4, 0, 0.2, 1] as const },
  }
}

/**
 * Сцена первого экрана — из макета Figma «AXEVIL | New Site», узел 3129:4495.
 *
 * Прежняя сцена (камни, планшет, живое письмо в экране, лучи света) заменена целиком
 * на новую: точечный фон и мокап почтового клиента. Правка от Татьяны 2026-08-21,
 * «меняем только фон и иллюстрацию» — текст, форма и шапка остались прежними.
 *
 * Картинка собрана из исходников дизайнера: «Фон абстракция.jpg» (4536×2562, ровно 3×
 * от кадра) и «Иллюстрация письма.png» (2456×2884, ровно 4× от рамки узла 614×721) —
 * лежат в ~/Work Dump. Иллюстрация вставлена на своё место в кадре, (872, 147). Сходится
 * с рендером Figma до 0.87 из 255 в зоне письма и 0.40 на фоне.
 *
 * Первая версия собиралась из экспортов Figma MCP, и это была ошибка: экспорт группы
 * приходит сплющенным на подложку #060606, шириной ~33 px вокруг окна. Точечное полотно
 * обрывалось об неё прямоугольником — «чёрные полоски по краям письма». Снять подложку
 * заливкой не вышло: фон шапки письма ровно такой же черноты и связан с внешней областью
 * через скругления углов, так что заливка съедала и его — шапка становилась прозрачной.
 * В исходном PNG альфа-канал настоящий, и вопрос закрыт по построению.
 *
 * Затемнение внизу кадра в сборку не входит: в макете это два отдельных прямоугольника
 * поверх всего (3129:4573 и 3129:4654, по 144 px у нижнего края). Запечённые в картинку,
 * они привязаны к пропорциям макета — сцена подставляется по object-cover, и на широком
 * коротком окне низ кадра срезается вместе с затемнением, иллюстрация обрывалась бы по
 * нижней границе экрана. Поэтому затемнение в CSS, от реальной высоты первого экрана.
 *
 * Сцена подставляется по правилу object-cover, но сам `object-fit: cover` не годится:
 * от положения мокапа зависит правая граница текстовой колонки, а cover прячет, насколько
 * картинку обрезало. Поэтому геометрия считается явно — см. ResizeObserver ниже.
 */
const SCENE_W = 1512
const SCENE_H = 854
const SCENE_RATIO = SCENE_W / SCENE_H

/**
 * Правый край иллюстрации — доля от кадра. По нему проверяем, что мокап не уехал за край
 * окна. Значение из альфа-канала исходника: содержимое доходит до правой границы рамки
 * узла (1486 из 1512).
 */
const ILL_RIGHT = 98.28

/**
 * Левая граница видимого мокапа — доля от кадра. Рамка узла начинается с 57.67%, но слева
 * в ней прозрачное поле; по альфа-каналу исходника содержимое начинается с 59.028%.
 * Сюда упирается текстовая колонка.
 */
const ILL_CONTENT_LEFT = 59.028

/** Минимальный зазор от правого края окна до иллюстрации, px. */
const SCENE_MARGIN = 24

/** Зазор между текстовой колонкой и мокапом, px. */
const TEXT_GAP = 48

/** Ширина контентного контейнера страницы. */
const CONTAINER_MAX = 1440

/**
 * Затемнение внизу первого экрана — два одинаковых градиента из макета, по 144 px при
 * высоте кадра 854 (16.9%). Наложенные друг на друга, они гасят низ до 0.46 от исходной
 * яркости — замер по рендеру Figma.
 *
 * У нас градиент доведён до полной черноты и растянут до 22%. В макете кадр на этом
 * кончается, и остаточной яркости 0.46 не с чем спорить; на странице под первым экраном
 * идёт следующая секция, и на стыке было видно, где обрывается точечное полотно и низ
 * конверта. Полная чернота встречается с фоном страницы (#080808) без ступеньки.
 */
const FADE_HEIGHT = '22%'
const FADE = 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.30) 45%, rgba(0,0,0,0.75) 78%, rgba(0,0,0,1) 100%)'

/**
 * Мобильная сцена — те же фон и иллюстрация, что на десктопе (Татьяна, 2026-08-21:
 * «меняем только фон и иллюстрацию»). Структура блока прежняя: текст и форма сверху,
 * картинка под ними — в макете планшет начинался ниже формы, и требование «первый экран
 * без прокрутки на 375» держится с 23 июля.
 *
 * Прежняя сцена (камни, планшет, живое письмо в экране) убрана вместе с десктопной.
 *
 * Фон — вертикальный кусок того же точечного полотна: x 900..2400 из 3024. Правее в
 * исходнике яркий «вихрь», под текстом он бы мешал читать; левее точки почти гаснут.
 *
 * Иллюстрация — тот же мокап почтового клиента, соотношение 0.868, то есть портретное:
 * во всю ширину телефона он встаёт без обрезки. Конверт внизу срезан краем самой
 * картинки, как и в макете, — стык гасит затемнение внизу секции.
 */
const FADE_HEIGHT_M = '22%'

export default function NLHero() {
  /**
   * Геометрия десктопной сцены считается здесь, а не в CSS, по двум причинам.
   *
   * Первая: сцену надо подставить по правилу object-cover, но при этом знать, насколько её
   * обрезало — от левого края мокапа зависит, где обрывать текстовую колонку.
   *
   * Вторая: при простом кропе по центру мокап уезжает за правый край. Он занимает в кадре
   * почти всю правую половину и упирается в границу (98.3%), поэтому на узком высоком окне
   * сцена сдвигается влево ровно настолько, чтобы мокап уместился, и ни пикселем больше:
   * на широких экранах сдвиг нулевой и кадр остаётся центрированным, как в макете.
   *
   * Правая граница текста считается из той же геометрии, а не задаётся процентом. Раньше
   * тут стоял фиксированный отступ 38%: он был подобран под прежнюю сцену, где планшет
   * начинался на 65.5% кадра. Новая иллюстрация начинается на 59.5% и при кропе уходит
   * влево сильнее — фиксированный процент либо оставлял дыру, либо пускал текст под мокап.
   */
  const clipRef = useRef<HTMLDivElement>(null)
  const [scene, setScene] = useState({ width: 0, left: 0, textPaddingRight: 0 })

  useEffect(() => {
    const el = clipRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const { width: W, height: H } = entry.contentRect
      if (!W || !H) return

      // object-cover: сцена накрывает контейнер целиком
      const width = Math.max(W, H * SCENE_RATIO)

      // по центру, но с гарантией, что правый край иллюстрации остаётся в кадре
      const centred = (W - width) / 2
      const overhang = centred + width * (ILL_RIGHT / 100) - (W - SCENE_MARGIN)
      // сдвигаем только влево и не дальше, чем до правого края сцены — иначе справа щель
      const left = Math.max(W - width, centred - Math.max(0, overhang))

      // текст обрывается по левому краю мокапа; контейнер уже окна, если окно шире 1440
      const illLeft = left + width * (ILL_CONTENT_LEFT / 100)
      const containerW = Math.min(W, CONTAINER_MAX)
      const offset = (W - containerW) / 2
      // верхняя граница — чтобы на узком высоком окне колонка не схлопнулась под форму
      const textPaddingRight = Math.min(
        containerW * 0.55,
        Math.max(0, W - offset - illLeft + TEXT_GAP)
      )

      setScene({ width, left, textPaddingRight })
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
            src={heroDesktop} alt="" aria-hidden loading="eager"
            className="absolute inset-0 w-full h-full pointer-events-none"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>

        {/* Затемнение из макета — от нижнего края экрана, а не от нижнего края картинки:
            при кропе по высоте низ кадра срезается, и запечённый градиент туда не попал бы. */}
        <div className="absolute left-0 right-0 bottom-0 pointer-events-none"
          style={{ height: FADE_HEIGHT, background: FADE }} aria-hidden />
      </div>

      {/* ── MOBILE (< lg) ──
          Headline → form → marker must all sit inside the first screen at 375 (client
          feedback 2026-07-23: "hero + форма в один экран на 375px без прокрутки").
          The letter preview is no longer absolutely pinned at a fixed 453px — it takes
          whatever vertical space is left over (flex-1 + overflow hidden), so it peeks
          on a tall phone and quietly shrinks on a short one instead of pushing the form
          below the fold. */}
      <div className="lg:hidden relative w-full flex flex-col items-center overflow-hidden"
        // 1.25rem вместо 1.5: перенос перед «Каждую неделю» добавил подзаголовку
        // четвёртую строку, и на iPhone SE (320×568) кнопка формы вылезала за экран на
        // 3 px. Требование «первый экран без прокрутки» держится с 23 июля.
        style={{ padding: '1.25rem 0 0' }}>

        {/* Точечный фон — за текстом и за иллюстрацией, на всю высоту блока */}
        <img src={heroBgM} alt="" aria-hidden loading="eager"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none" />

        {/* Притенение под текстом. На десктопе текст лежит на тёмной левой части полотна,
            а на телефоне он приходится на середину, где точки плотные, и подзаголовок
            (--white-400) с ними спорит. Гаснет к иллюстрации, чтобы фон вокруг мокапа
            остался таким же, как в макете. */}
        <div className="absolute inset-x-0 top-0 pointer-events-none"
          style={{ height: '68%', background: 'linear-gradient(to bottom, rgba(6,6,6,0.78) 0%, rgba(6,6,6,0.66) 60%, rgba(6,6,6,0) 100%)' }}
          aria-hidden />

        {/* Затемнение внизу: гасит срез конверта по нижнему краю картинки */}
        <div className="absolute left-0 right-0 bottom-0 z-10 pointer-events-none"
          style={{ height: FADE_HEIGHT_M, background: FADE }} aria-hidden />

        <div className="relative flex flex-col items-center w-full shrink-0 px-4">
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
              Крупнейшие переоценки, лидеры роста и падения на secondary, тендер-оферы, новые раунды.<br />Каждую неделю.
            </motion.p>
          </div>

          {/* Lead form + freshness marker.
              Между кнопкой и строками под ней отдельный отступ 1.25rem: раньше всю группу
              держал общий gap-2, и дата выпуска прилипала к кнопке. Между самими строками
              зазор остался маленьким — они читаются как один блок. */}
          <motion.div {...fadeUp(0.25)} className="w-full mt-4 flex flex-col items-center">
            <NLLeadForm source="hero" note={null} maxWidth="34rem" />
            <div className="flex flex-col items-center gap-1.5 mt-[1.25rem]">
            </div>
          </motion.div>
        </div>

        {/* ── ИЛЛЮСТРАЦИЯ ──
            Стоит в потоке под формой, а не фоном за ней. Высоту задаёт сама картинка
            (width: 100% + натуральные пропорции), поэтому первый экран получается выше
            окна — мокап виден наполовину и открывается при небольшой прокрутке. */}
        <div className="relative w-full mt-[1.5rem] px-4 mx-auto" style={{ maxWidth: '30rem' }}>
          <motion.img
            src={heroIllM} alt="" aria-hidden loading="eager"
            className="block w-full pointer-events-none"
            width={820} height={996}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
      </div>

      {/* ── DESKTOP (lg+) ──
          Только текст и форма. Иллюстрация — часть сцены-картинки, поэтому второй колонки
          нет: справа зарезервировано место отступом, который считается от самой сцены.

          История, ради которой это всё переделывалось: сначала макет письма висел на
          `position: absolute`, прижатый к низу, и наезжал на форму на всех десктопных
          разрешениях — от 79 px на 16-дюймовом макбуке до 392 px на 1366×768. Потом стал
          второй колонкой в потоке, и перекрытие стало невозможным геометрически. Теперь
          иллюстрация ушла в картинку, но принцип сохранён: колонка с текстом и мокап не
          могут пересечься, потому что граница колонки берётся из левого края мокапа. */}
      <div className="hidden lg:flex relative mx-auto w-full flex-col items-start justify-center"
        style={{
          maxWidth: CONTAINER_MAX,
          // Высота ограничена пропорцией сцены: если окно уже, чем нужно кадру, экран
          // делается ниже, и сцену не приходится раздувать по ширине под object-cover.
          // Иначе на 1024–1280 кадр растягивался до 1400 px, мокап уезжал влево и
          // отбирал место у формы (на 1024 оставалось 405 px, плейсхолдер телефона
          // обрезался). Теперь на этих ширинах кадр встаёт без горизонтальной обрезки.
          minHeight: `min(max(calc(100svh - 72px), 45rem), calc(100vw / ${SCENE_RATIO} - 72px))`,
          paddingTop: 40, paddingBottom: 40,
          paddingLeft: 'clamp(40px, 5.5vw, 80px)',
          paddingRight: scene.textPaddingRight,
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
              Крупнейшие переоценки, лидеры роста и падения на secondary, тендер-оферы, новые раунды.<br />Каждую неделю.
            </motion.p>
          </div>

          {/* Lead form — was a button that only scrolled to the closing block, an extra
              click and a drop-off point (client feedback 2026-07-23) */}
          <motion.div {...fadeUp(0.25)} className="w-full flex flex-col items-start gap-3" style={{ maxWidth: '38.75rem' }}>
            <NLLeadForm source="hero" note={null} maxWidth="34rem" />
          </motion.div>
        </div>

      </div>

    </section>
  )
}
