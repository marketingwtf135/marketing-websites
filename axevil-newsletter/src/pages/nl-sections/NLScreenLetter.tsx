import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import NLLetterPreview, { LETTER_BASE_WIDTH } from './NLLetterPreview'

export interface ScreenRect { left: number; top: number; width: number; height: number }

/**
 * Письмо, вставленное в экран планшета на сцене.
 *
 * Общий компонент для десктопа и мобильной вёрстки: сцены разные, а задача одна — посадить
 * письмо ровно в экран и отмасштабировать под него.
 *
 * Масштаб компонент считает сам, замеряя свою ширину. Задать его в CSS нельзя: внутренности
 * письма свёрстаны в пикселях (scale × базовые значения), а чтобы получить из ширины
 * безразмерный множитель, надо поделить длину на длину — calc так не умеет.
 *
 * @param screen — область экрана планшета в долях от кадра сцены
 * @param light  — слой лучей поверх письма; на мобильной сцене его нет
 */
export default function ScreenLetter({ screen, light }: { screen: ScreenRect; light?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [letterScale, setLetterScale] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      setLetterScale(entry.contentRect.width / LETTER_BASE_WIDTH)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      className="absolute overflow-hidden"
      style={{
        left: `${screen.left}%`, top: `${screen.top}%`,
        width: `${screen.width}%`, height: `${screen.height}%`,
        // Фон в цвет поверхности письма. Пропорции письма и экрана совпадают не идеально
        // (0.710 против 0.699), поэтому по ширине письмо садится точно, а по высоте не
        // достаёт до низа экрана нескольких пикселей. Без заливки в щели просвечивала бы
        // серая заглушка экрана из макета.
        background: 'var(--black-500)',
      }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      {letterScale > 0 && (
        // width: max-content, иначе обёртка растягивается на всю ширину экрана и после
        // масштабирования выходит за него. Сама она ничего не рисует, но по её габаритам
        // легко ошибиться при замерах — я на этом один раз попалась.
        <div style={{ width: 'max-content', transform: `scale(${letterScale})`, transformOrigin: 'top left' }}>
          <NLLetterPreview scale={1} bare />
        </div>
      )}

      {/* Лучи света поверх письма.
          В макете слой «Свет 1» лежит выше всего, но в сцену-картинку он запечён под письмом,
          поэтому на экран планшета лучи не попадали. Здесь тот же слой ложится вторым, уже
          над письмом.

          Режим screen, а не прозрачность: слой пришёл из Figma полностью непрозрачным — это
          лучи на чёрном фоне, и его подмешивают режимом наложения, а не альфой. При screen
          чёрное не даёт ничего, а светлое высветляет — ровно как в макете.

          Картинка размером во всю сцену, поэтому её положение задано в долях от экрана:
          внутри экрана сцена шире в 100/screen.width раза и сдвинута влево на
          screen.left/screen.width. Обрезает всё сам экран своим overflow — снаружи лучи уже
          есть в сцене, и второй раз накладывать их там не нужно. */}
      {light && (
        <img
          src={light} alt="" aria-hidden loading="eager"
          className="absolute pointer-events-none max-w-none"
          style={{
            left: `${-screen.left / screen.width * 100}%`,
            top: `${-screen.top / screen.height * 100}%`,
            width: `${100 / screen.width * 100}%`,
            height: `${100 / screen.height * 100}%`,
            mixBlendMode: 'screen',
          }}
        />
      )}
    </motion.div>
  )
}

