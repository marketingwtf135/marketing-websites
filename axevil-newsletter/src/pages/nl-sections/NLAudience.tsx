/** Card icons — swapped: portfolio→card1, analytics→card2, persons→card3 */
const CARDS = [
  {
    num: '1.0',
    icon: '/img/newsletter/big-icon-portfolio.svg',
    title: 'Family Offices',
    quote: '«Какие компании растут и падают на secondary на этой неделе, где ловить точку входа и стоит ли пересматривать позиции в watch-list?»',
  },
  {
    num: '2.0',
    icon: '/img/newsletter/big-icon-analytics.svg',
    title: 'Независимые финансовые советники',
    quote: '«О чём говорить с клиентами на этой неделе, какие компании добавить в инвест-предложения, какие тендер-оферы открылись — готовая карта рынка для клиентского звонка.»',
  },
  {
    num: '3.0',
    icon: '/img/newsletter/big-icon-persons.svg',
    title: 'Управляющие капиталом\nи инвест-банкиры',
    quote: '«Как реальная оценка соотносится с ценами на secondary, какие сектора переоцениваются, как открывшиеся раунды и тендер-оферы меняют структуру рынка?»',
  },
]

export default function NLAudience() {
  return (
    <section id="nl-audience" className="relative w-full bg-page-bg">
      {/* Mobile: pt-section-y 120px. Desktop: 200px top, 100px bottom (Figma). */}
      <div className="pt-section-y mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-0 pb-[3.75rem] sm:pb-[5rem] lg:pt-[12.5rem] lg:pb-[6.25rem]">

        {/* Heading — has inner padding on desktop */}
        <div className="flex flex-col gap-6 items-center mb-10 sm:mb-12 lg:px-[80px]">
          <div className="flex gap-2 font-inter-tight font-medium items-center whitespace-nowrap"
            style={{ fontSize: 18, lineHeight: 1.35, letterSpacing: '-0.36px' }}>
            <span style={{ color: '#404040' }}>1.0</span>
            <span style={{ color: '#848484' }}>Кому полезен дайджест</span>
          </div>
          <h2 className="font-inter-tight font-semibold text-transparent bg-clip-text text-center"
            style={{
              fontSize: 'clamp(2.25rem, 4.4vw, 4rem)',
              lineHeight: 1, letterSpacing: '-0.02em',
              backgroundImage: 'linear-gradient(103.344deg, rgb(162,162,162) 15.766%, rgb(255,255,255) 49.286%, rgb(162,162,162) 82.806%)',
              whiteSpace: 'pre-line',
            }}>
            {'Аналитика для тех, \nкто работает с частным рынком'}
          </h2>
          <p className="hidden md:block font-inter-tight font-medium text-center"
            style={{ fontSize: 18, lineHeight: 1.35, color: '#bcbcbc', letterSpacing: '-0.36px', maxWidth: 580 }}>
            Регулярно освещаем ключевые события рынка частных компаний — переоценки, рейтинги, тендер-оферы, раунды. Чтобы вы могли использовать эту информацию в своей работе.
          </p>
        </div>

        {/* Cards — stacked on mobile, row on sm+, full 1440px on lg */}
        <div className="flex flex-col sm:flex-row gap-4 items-start overflow-hidden w-full lg:px-0">
          {CARDS.map((card) => (
            <div key={card.num}
              className="flex flex-col items-center overflow-hidden rounded-[24px] flex-1 min-w-0"
              style={{ background: '#111111', minHeight: 'clamp(280px, 31.25vw, 450px)', paddingTop: 24, paddingBottom: 24, paddingLeft: 24, paddingRight: 24, gap: 48 }}
            >
              {/* Number — centered */}
              <p className="font-inter-tight font-medium text-center whitespace-nowrap shrink-0 w-full"
                style={{ fontSize: 18, lineHeight: 1.35, letterSpacing: '-0.36px', color: '#303030' }}>
                {card.num}
              </p>

              {/* Icon */}
              <img src={card.icon} alt="" loading="lazy" className="shrink-0 block"
                style={{ width: 'clamp(88px, 8.3vw, 120px)', height: 'clamp(88px, 8.3vw, 120px)' }} />

              {/* Title + quote — centered */}
              <div className="flex flex-col items-center justify-center flex-1 min-h-0 w-full gap-4">
                <h3 className="font-inter-tight font-semibold text-white text-center whitespace-pre-line w-full"
                  style={{ fontSize: 'clamp(1rem, 1.67vw, 1.5rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                  {card.title}
                </h3>
                <p className="font-inter-tight font-medium text-center w-full"
                  style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1rem)', lineHeight: 1.3, color: 'rgba(255,255,255,0.55)', letterSpacing: '-0.02em' }}>
                  {card.quote}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
