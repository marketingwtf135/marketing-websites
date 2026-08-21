import { asset } from '../../lib/asset'
import { FIGURES } from '../../lib/figures'

const texture = asset('/img/newsletter/bg-texture.webp')

export default function NLAbout() {
  return (
    /*
      Section: padding-section-t0-b6 (top:0, bottom:100px)
      + padding-global for mobile/tablet horizontal spacing
    */
    <section
      id="nl-about"
      className="relative w-full bg-page-bg padding-section-t0-b6 padding-global"
    >
      {/*
        Inner wrapper: bg #0c0c0c, rounded, 16px horizontal, 100px top, 1rem bottom
        padding-section-t6-b6 gives 100px top — override bottom to 1rem
      */}
      <div
        className="about-inner-padding mx-auto w-full max-w-[1440px] flex flex-col items-center overflow-visible"
        style={{
          background: 'var(--bg-100)',
          borderRadius: 'clamp(1.5rem, 4.4vw, 4rem)',
          gap: 'clamp(1.5rem, 4.4vw, 4rem)',
          padding: '1.5rem 1rem 1rem',
        }}
      >
        {/* Heading */}
        <div className="flex flex-col gap-[1.5rem] items-center">
          <div className="flex gap-[0.5rem] font-inter-tight font-medium items-center justify-center whitespace-nowrap"
            style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1.125rem)', lineHeight: 1.35, letterSpacing: '-0.36px' }}>
            <span style={{ color: 'var(--black-800)' }}>4.0</span>
            <span style={{ color: 'var(--black-900)' }}>О платформе</span>
          </div>
          <div className="flex flex-col gap-[1rem] items-center">
            <h2 className="font-inter-tight font-semibold text-transparent bg-clip-text whitespace-nowrap"
              style={{ fontSize: 'clamp(2.25rem, 4.4vw, 4rem)', lineHeight: 1, letterSpacing: '-0.02em', backgroundImage: 'linear-gradient(113.522deg, rgb(162,162,162) 15.766%, rgb(255,255,255) 49.286%, rgb(162,162,162) 82.806%)' }}>
              Axevil Capital
            </h2>
            <p className="font-inter-tight font-medium text-center"
              style={{ fontSize: 'clamp(0.875rem, 1.25vw, 1.125rem)', lineHeight: 1.35, color: 'var(--white-300)', letterSpacing: '-0.36px', maxWidth: '35.625rem' }}>
              Axevil — технологическая платформа, предоставляющая профессиональным инвесторам и управляющим капиталом прямой доступ к лучшим инвестиционным возможностям частного рынка.
            </p>
          </div>
        </div>

        {/* Блок взят с лендинга Pre-IPO Insider (axevil.com/promo/pdf-report/v1) —
            Татьяна попросила продублировать его целиком (2026-08-21).

            Устройство блока там такое: одна панель с overflow, внутри неё слоями идут
            градиент, текстура, сами устройства и плашки с показателями. Плашки лежат
            внутри панели абсолютом снизу, а не под ней — в первой версии я вынесла их
            наружу, и они уехали далеко вниз.

            Все значения сняты с эталона: панель 1383×799 со скруглением 24, градиент
            и текстура — как в его инлайн-стилях, устройства и плашки — по тем же
            координатам. Текстура и картинки скачаны оттуда же. */}
        <div className="flex flex-col gap-[1rem] w-full">
          {/* Телефон: панель с устройствами не показываем — композиция рассчитана на
              широкий кадр. Показатели остаются, столбиком. Так же сделано на эталоне. */}
          <div className="flex flex-col sm:hidden gap-[0.5rem] w-full">
            {FIGURES.map(stat => (
              <div key={stat.value}
                className="flex flex-col gap-[0.25rem] p-[1rem] rounded-[1rem]"
                style={{ background: 'var(--black-500)' }}>
                <span className="font-inter-tight font-semibold text-white"
                  style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
                  {stat.value}
                </span>
                <span className="font-inter-tight font-medium"
                  style={{ fontSize: 'clamp(0.875rem, 1.25vw, 1.125rem)', lineHeight: 1.35, color: 'var(--white-400)', letterSpacing: '-0.02em' }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <div className="relative hidden sm:block w-full overflow-hidden"
            style={{ aspectRatio: '1383 / 799', borderRadius: 24 }}>

            {/* Слой 1 — градиент от светлого верха к чёрному низу */}
            <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden
              style={{ backgroundImage: 'linear-gradient(rgb(123, 128, 134) 0%, rgb(36, 36, 36) 38.083%, rgb(5, 5, 5) 76.167%), linear-gradient(90deg, rgb(17, 17, 17) 0%, rgb(17, 17, 17) 100%)' }} />

            {/* Слой 2 — зерно поверх градиента, режимом overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden
              style={{
                backgroundImage: `url(${texture})`,
                backgroundSize: '64rem 64rem',
                backgroundPosition: 'left top',
                mixBlendMode: 'overlay',
                opacity: 0.35,
              }} />

            {/* Слой 3 — устройства */}
            <div className="absolute inset-0 z-[1]" aria-hidden>
              <img src={asset('/img/newsletter/tablet-ecosystem.webp')} alt=""
                className="absolute -translate-x-1/2 h-auto"
                style={{ left: '44%', top: '8%', width: 'clamp(34rem, 55.5vw, 50rem)' }}
                loading="lazy" />
              <img src={asset('/img/newsletter/phone-ecosystem.webp')} alt=""
                className="absolute h-auto"
                style={{ left: '64%', top: '22%', width: 'clamp(11rem, 18.5vw, 16.6875rem)', zIndex: 2 }}
                loading="lazy" />
            </div>

            {/* Слой 4 — показатели внутри панели, прижаты к её низу */}
            <div className="absolute z-[2] flex gap-[0.5rem]"
              style={{ left: '2.5rem', right: '2.5rem', bottom: '2.5rem' }}>
              {FIGURES.map(stat => (
                <div key={stat.value}
                  className="flex flex-col gap-[0.25rem] p-[1rem] rounded-[1rem] flex-1 min-w-0"
                  style={{ background: 'var(--black-500)' }}>
                  <span className="font-inter-tight font-semibold text-white"
                    style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
                    {stat.value}
                  </span>
                  <span className="font-inter-tight font-medium"
                    style={{ fontSize: 'clamp(0.875rem, 1.25vw, 1.125rem)', lineHeight: 1.35, color: 'var(--white-400)', letterSpacing: '-0.02em' }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
