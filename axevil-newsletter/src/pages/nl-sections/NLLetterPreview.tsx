import { asset } from '../../lib/asset'
import { LAST_ISSUE } from '../../lib/lastIssue'

const letterLogo = asset('/img/newsletter/letter-logo.svg')

/**
 * Ширина письма при scale = 1 в режиме bare.
 *
 * Ровно значение `width` внутреннего блока, без добавления отступов: в проекте глобально
 * действует `box-sizing: border-box`, поэтому padding уже внутри этой ширины. Сначала я
 * прибавила 12+12 сверху и получила 370.5 — письмо вставало в экран планшета на 6.5% уже,
 * чем нужно, с ровной щелью справа.
 *
 * Экспортируется, чтобы hero считал масштаб под экран из макета от этого числа и не хранил
 * свою копию, которая разъедется при первой правке вёрстки письма.
 */
export const LETTER_BASE_WIDTH = 346.5

/** Reusable newsletter letter preview card.
 *  scale=1.0 → base (320px inner, mobile/desktop hero)
 *  scale=1.188 → methodology section (411px inner)
 */
/**
 * @param bare — убрать собственную внешнюю рамку письма. Нужно, когда письмо вставляется в
 * NLDeviceFrame: там уже есть корпус и скруглённый экран, и вторая рамка вокруг письма
 * читалась бы как рамка в рамке. Скругление тоже снимается — экран обрезает содержимое сам.
 */
export default function NLLetterPreview({ scale = 1, bare = false }: { scale?: number; bare?: boolean }) {
  const s = (v: number) => v * scale

  const surface = (
    <div
      className="flex items-center"
      style={{
        background: 'var(--black-500)',
        padding: s(12),
        borderRadius: bare ? 0 : s(24),
        width: s(346.5),
      }}
    >
        <div className="flex flex-col items-start w-full" style={{ gap: s(34.4) }}>
          {/* Logo */}
          <img
            src={letterLogo}
            alt="AXEVIL"
            style={{ width: s(83.3), height: s(12.9) }}
            className="shrink-0"
          />

          <div className="flex flex-col items-start w-full" style={{ gap: s(25.8) }}>
            {/* Issue header */}
            <div className="flex flex-col items-start w-full" style={{ gap: s(17.2) }}>
              <div
                className="flex items-start justify-between w-full"
                style={{ borderBottom: `${s(0.538)}px solid #202020`, paddingBottom: s(8.6) }}
              >
                <span
                  className="font-inter-tight font-semibold text-white whitespace-nowrap shrink-0"
                  style={{ fontSize: s(7.525), lineHeight: 1.2, letterSpacing: -s(0.15) }}
                >
                  Axevil Digest · вып. №{LAST_ISSUE.number}
                </span>
                <span
                  className="font-inter-tight font-medium shrink-0"
                  style={{ fontSize: s(8.6), lineHeight: 1.3, color: 'var(--white-300)', letterSpacing: -s(0.172) }}
                >
                  {LAST_ISSUE.date}
                </span>
              </div>

              {/* Article */}
              <div className="flex flex-col items-start w-full" style={{ gap: s(8.6) }}>
                <p
                  className="font-inter-tight font-semibold text-white w-full"
                  style={{ fontSize: s(19.35), lineHeight: 1.1 }}
                >
                  AI Infrastructure: новая $200B гонка за compute — кто впереди и куда смотрят LP
                </p>
                <p
                  className="font-inter-tight font-medium w-full"
                  style={{ fontSize: s(9.675), lineHeight: 1.35, color: 'var(--white-300)', letterSpacing: -s(0.1935) }}
                >
                  За последние 12 месяцев AI Infrastructure-сегмент привлёк $80+ млрд венчурного капитала — больше, чем все остальные вертикали вместе взятые.
                </p>
              </div>
            </div>

            {/* Portfolio context */}
            <div className="flex flex-col items-start w-full" style={{ gap: s(8.6) }}>
              <p
                className="font-inter-tight font-semibold text-white w-full"
                style={{ fontSize: s(12.9), lineHeight: 1.1, letterSpacing: -s(0.258) }}
              >
                Что это значит для портфеля:
              </p>
              <p
                className="font-inter-tight font-medium w-full"
                style={{ fontSize: s(8.6), lineHeight: 1.3, color: 'var(--white-300)', letterSpacing: -s(0.172) }}
              >
                3 уровня экспозиции: GPU-производители (NVDA, AMD), neoclouds (CoreWeave, Lambda), модель-вертикаль (Anthropic, OpenAI). Каждый уровень — свой риск-профиль и горизонт.
              </p>
            </div>

            {/* Calc card + footer */}
            <div className="flex flex-col items-start w-full" style={{ gap: s(25.8) }}>
              {/* Здесь был блок «Calc доходности pre-IPO» с плашками «$10K вход»,
                  «2.4× проектируемый MOIC» и «28% IRR (24m horizon)».

                  Убран по двум причинам сразу. Такого калькулятора в продукте нет — Павел
                  подтвердил это прямо (2026-08-04), и обещания инструментов уже сняты с
                  формы, FAQ и «Состава выпуска». А проектируемая доходность вдобавок
                  противоречила и Tone of voice из ТЗ («без обещаний доходностей»), и
                  дисклеймеру, который мы сами поставили в футер: «прошлая доходность не
                  гарантирует будущих результатов». Блок стоял на первом экране — то есть
                  страница спорила сама с собой в самом видном месте.

                  На его месте — состав выпуска теми же четырьмя названиями, что и в
                  секции «Что в каждом выпуске». Ничего нового не обещаем, только
                  повторяем уже сказанное на странице. */}
              <div
                className="flex flex-col items-start w-full"
                style={{ background: 'var(--black-400)', padding: s(12.9), borderRadius: s(8.6), gap: s(12.9) }}
              >
                <p
                  className="font-inter-tight font-semibold text-white w-full"
                  style={{ fontSize: s(12.9), lineHeight: 1.1, letterSpacing: -s(0.258) }}
                >
                  В этом выпуске
                </p>
                <div className="grid w-full" style={{ gridTemplateColumns: '1fr 1fr', gap: s(4.3) }}>
                  {['События недели', 'Рейтинги и лидеры', 'Тендер-оферы и окна входа', 'Новые инвест-идеи'].map(name => (
                    <div
                      key={name}
                      className="flex items-center min-w-0"
                      style={{ background: 'var(--black-600)', padding: s(8.6), borderRadius: s(8.6) }}
                    >
                      <span
                        className="font-inter-tight font-medium text-white"
                        style={{ fontSize: s(8.6), lineHeight: 1.25, letterSpacing: -s(0.172) }}
                      >
                        {name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Здесь была подпись «Каждую среду полный выпуск на почте». Убрана: в сцене
                  первого экрана низ письма закрывает ближний камень, и подпись читалась
                  наполовину. Мысль не потеряна — про среду сказано и в подзаголовке первого
                  экрана, и в маркере последнего выпуска под формой. */}
            </div>
          </div>
        </div>
      </div>
  )

  if (bare) return surface

  return (
    <div
      className="flex items-center"
      style={{
        padding: s(12),
        borderRadius: s(32),
        border: `${s(1)}px solid #202020`,
      }}
    >
      {surface}
    </div>
  )
}
