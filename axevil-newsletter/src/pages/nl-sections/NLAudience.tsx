import { asset } from '../../lib/asset'

/**
 * Three roles, one concrete job each.
 *
 * The cards used to carry a generic "какие компании растут…" quote per role — true of
 * everyone, useful to no one (client feedback 2026-07-23: "описания общие. Конкретный
 * use-case per роль"). `useCase` is the client's own phrasing; `body` says how the issue
 * delivers it.
 *
 * Иконки. Были big-icon-*.svg — плоские белые фигуры с серым градиентом: вектор, то есть
 * технически резкие, но выглядели дёшево (Татьяна, 2026-08-05: «иконки плохого качества»).
 * Заменены на фирменный набор из стекла на чёрном, который уже лежал в проекте и нигде не
 * использовался. Соответствие по смыслу карточки: график с трендом — недельный апдейт для
 * звонков, папка с отчётами — покрытие рынка, слои документов — спрос и предложение.
 *
 * Оговорка по разрешению: у этих файлов 194-249 px, а карточка рисует иконку на 88-120 px,
 * то есть на телефоне с тройной плотностью нужно ~264 px. На тёмном стекле с тонкими
 * светлыми кромками недостача почти не читается, но если понадобится идеальная резкость —
 * нужны выгрузки 2x/3x из макета.
 */
const CARDS = [
  {
    num: '1.0',
    icon: asset('/img/newsletter/icon-3d-graphic.png'),
    title: 'Wealth-менеджеры',
    useCase: 'Куда двинулся частный рынок за неделю',
    body: 'Axevil Pre-IPO Index против Nasdaq 100 — за неделю и с начала года. Карта заявок по секторам — обгоняет частный рынок публичный или отстаёт и где концентрируется интерес.',
  },
  {
    num: '2.0',
    icon: asset('/img/newsletter/icon-3d-documents.png'),
    title: 'Family offices',
    useCase: 'Покрытие частного рынка без штата аналитиков',
    body: 'Новости по компаниям за неделю — выручка, новые раунды, M&A, лицензии — и крупнейшие раунды по размеру чека. Позиции портфеля и watchlist в одном письме, без отдельной команды под мониторинг.',
  },
  {
    num: '3.0',
    icon: asset('/img/newsletter/icon-3d-news.png'),
    title: 'Private bankers',
    useCase: 'Спрос vs предложение на вторичном рынке',
    body: 'Объём заявок недели с разбивкой на покупку и продажу. Ориентир того, где рынок набирает позиции, а где сокращает.',
  },
]

export default function NLAudience() {
  return (
    <section id="nl-audience" className="relative w-full bg-page-bg">
      {/* Верхний отступ на мобильной вёрстке уменьшен со 120 до 64 px: между сценой первого
          экрана и этой секцией набегало 166 px пустоты — 38 px хвоста самой сцены плюс 128 px
          отступа. Стало около 110 px. На планшете и десктопе отступы прежние: там сцена
          заканчивается иначе и такой пустоты не возникает. */}
      <div className="pt-16 sm:pt-section-y mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-0 pb-[3.75rem] sm:pb-[5rem] lg:pt-[12.5rem] lg:pb-[6.25rem]">

        {/* Heading — has inner padding on desktop */}
        <div className="flex flex-col gap-6 items-center mb-10 sm:mb-12 lg:px-[80px]">
          <div className="flex gap-2 font-inter-tight font-medium items-center whitespace-nowrap"
            style={{ fontSize: 'var(--font-l)', lineHeight: 1.35, letterSpacing: '-0.36px' }}>
            <span style={{ color: 'var(--black-800)' }}>1.0</span>
            <span style={{ color: 'var(--black-900)' }}>Кому полезен дайджест</span>
          </div>
          <h2 className="font-inter-tight font-semibold text-transparent bg-clip-text text-center"
            style={{
              fontSize: 'clamp(2.25rem, 4.4vw, 4rem)',
              lineHeight: 1, letterSpacing: '-0.02em',
              backgroundImage: 'linear-gradient(103.344deg, rgb(162,162,162) 15.766%, rgb(255,255,255) 49.286%, rgb(162,162,162) 82.806%)',
              whiteSpace: 'pre-line',
            }}>
            {'Аналитика для тех, \nкто работает с частным рынком'}
          </h2>
          {/* Подзаголовок показывается и на телефоне. Скрытым он был с самой первой версии
              проекта, без чьей-то просьбы; теперь в нём конкретика — индекс, срез заявок,
              новости компаний, — и прятать её от мобильных посетителей незачем. */}
          <p className="font-inter-tight font-medium text-center"
            style={{ fontSize: 'var(--font-l)', lineHeight: 1.35, color: 'var(--white-300)', letterSpacing: '-0.36px', maxWidth: 580 }}>
            Каждую среду — динамика Axevil Pre-IPO Index,<br className="hidden md:inline" />
            {' '}срез заявок на вторичном рынке и новости частных компаний.<br className="hidden md:inline" />
            {' '}Один выпуск закрывает разные задачи по портфелю.
          </p>
        </div>

        {/* Cards — stacked on mobile, row on sm+, full 1440px on lg */}
        {/* Строки карточек выровнены между собой через subgrid: заголовки, плашки и текст
            стоят на одной линии, даже когда длина текста разная. Раньше содержимое было
            отцентровано по вертикали внутри каждой карточки, и всё расползалось.
            На телефоне карточки идут столбцом обычным flex — сеточные свойства там неактивны.
            Промежуток между строками единый (12 px), а увеличенные отступы после номера и
            иконки добраны их собственными margin: subgrid не умеет разные gap по строкам. */}
        <div
          className="flex flex-col sm:grid gap-4 items-stretch w-full lg:px-0"
          style={{
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gridTemplateRows: 'repeat(5, auto)',
            columnGap: 16,
            rowGap: 12,
          }}
        >
          {CARDS.map((card) => (
            <div key={card.num}
              className="flex flex-col items-center overflow-hidden rounded-[24px] min-w-0 sm:grid"
              style={{
                background: 'var(--black-300)',
                paddingTop: 24, paddingBottom: 24, paddingLeft: 20, paddingRight: 20,
                gap: 12,
                gridRow: 'span 5', gridTemplateRows: 'subgrid',
                // alignItems: start — иначе короткий текст центрируется внутри своей строки
                // сетки, и низ третьей карточки уезжал на 10 px относительно соседей.
                justifyItems: 'center', alignItems: 'start', alignContent: 'start',
              }}
            >
              {/* Number — centered */}
              <p className="font-inter-tight font-medium text-center whitespace-nowrap shrink-0 w-full"
                style={{ fontSize: 'var(--font-l)', lineHeight: 1.35, letterSpacing: '-0.36px', color: 'var(--black-700)', marginBottom: 20 }}>
                {card.num}
              </p>

              {/* Icon */}
              <img src={card.icon} alt="" loading="lazy" className="shrink-0 block"
                style={{ width: 'clamp(88px, 8.3vw, 120px)', height: 'clamp(88px, 8.3vw, 120px)', marginBottom: 20 }} />

              {/* Role → the job it does → how it is delivered */}
                <h3 className="font-inter-tight font-semibold text-white text-center whitespace-pre-line w-full"
                  style={{ fontSize: 'clamp(1.25rem, 1.67vw, 1.5rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                  {card.title}
                </h3>

                {/* The use-case sits in a chip so it reads as the card's promise, not as body copy */}
                <p className="font-inter-tight font-semibold text-white text-center w-full rounded-2xl"
                  style={{ fontSize: 'clamp(0.875rem, 1vw, 1rem)', lineHeight: 1.3, letterSpacing: '-0.02em', background: 'var(--black-600)', padding: '0.875rem 1.25rem' }}>
                  {card.useCase}
                </p>

                <p className="font-inter-tight font-medium text-center w-full"
                  style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1rem)', lineHeight: 1.3, color: 'rgba(255,255,255,0.55)', letterSpacing: '-0.02em' }}>
                  {card.body}
                </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
