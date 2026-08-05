import { motion } from 'framer-motion'
import { asset } from '../../lib/asset'
import ScreenLetter from './NLScreenLetter'

const ipadFrame = asset('/img/newsletter/ipad-frame.webp')

/**
 * Планшет с письмом внутри — тот же мокап, что на первом экране, но отдельным элементом.
 *
 * Нужен там, где сцены нет: в разделе «Пример выпуска» письмо стояло в простой рамке из
 * padding и border, и Татьяна попросила заменить её на настоящий мокап (2026-08-05).
 *
 * Рамка — картинка с прозрачным экраном, собранная из мокапа Figma (узел 2805:744):
 *
 *   1. Экспорт приходит полностью непрозрачным, и за скруглёнными углами корпуса остаются
 *      чёрные уголки. На тёмном фоне раздела они бы читались квадратами, поэтому силуэт
 *      вырезан скруглённым прямоугольником: радиус 88 px при ширине 1602 измерен по самой
 *      кривой угла, а не подобран.
 *   2. Экран сделан прозрачной дыркой. Форма взята не «скруглённый прямоугольник на глаз»,
 *      а по однородной заливке экрана в самом файле — так углы получились настоящие.
 *      Дырка расширена на 2 px, иначе по краю письма оставалась серая каёмка заглушки.
 *
 * Порядок: письмо под рамкой. Рамка сверху прикрывает углы письма — у него прямые углы, а
 * у экрана скруглённые, и без этого углы письма выступали бы на корпус.
 */
const IPAD_RATIO = 0.71903

/** Экран внутри мокапа — доля от габаритов планшета. */
const IPAD_SCREEN = { left: 4.870, top: 3.653, width: 90.259, height: 92.808 }

export default function NLDevice({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div
      // self-start обязателен: в flex-контейнере по умолчанию действует align-items: stretch,
      // высота элемента задаётся строкой, и aspect-ratio игнорируется — планшет выходил
      // 325×336 вместо 325×452. Без растягивания высоту считает соотношение сторон.
      className={`relative shrink-0 self-start ${className}`}
      style={{ aspectRatio: `${IPAD_RATIO}`, ...style }}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
    >
      <ScreenLetter screen={IPAD_SCREEN} />
      <img
        src={ipadFrame} alt="" aria-hidden loading="lazy"
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </motion.div>
  )
}
