const letterLogo = '/img/newsletter/letter-logo.svg'

/** Reusable newsletter letter preview card.
 *  scale=1.0 → base (320px inner, mobile/desktop hero)
 *  scale=1.188 → methodology section (411px inner)
 */
export default function NLLetterPreview({ scale = 1 }: { scale?: number }) {
  const s = (v: number) => v * scale

  return (
    <div
      className="flex items-center"
      style={{
        padding: s(12),
        borderRadius: s(32),
        border: `${s(1)}px solid #202020`,
      }}
    >
      <div
        className="flex items-center"
        style={{
          background: '#1a1a1a',
          padding: s(12),
          borderRadius: s(24),
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
                  Axevil Digest · вып. №47
                </span>
                <span
                  className="font-inter-tight font-medium shrink-0"
                  style={{ fontSize: s(8.6), lineHeight: 1.3, color: '#bcbcbc', letterSpacing: -s(0.172) }}
                >
                  12.05.2026 · 09:00 CET
                </span>
              </div>

              {/* Article */}
              <div className="flex flex-col items-start w-full" style={{ gap: s(8.6) }}>
                <p
                  className="font-inter-tight font-semibold text-white w-full"
                  style={{ fontSize: s(19.35), lineHeight: 1.1 }}
                >
                  AI Infrastructure: новая $200B гонка за compute — кто впереди и куда смотрят LP
                </p>
                <p
                  className="font-inter-tight font-medium w-full"
                  style={{ fontSize: s(9.675), lineHeight: 1.35, color: '#bcbcbc', letterSpacing: -s(0.1935) }}
                >
                  За последние 12 месяцев AI Infrastructure-сегмент привлёк $80+ млрд венчурного капитала — больше, чем все остальные вертикали вместе взятые.
                </p>
              </div>
            </div>

            {/* Portfolio context */}
            <div className="flex flex-col items-start w-full" style={{ gap: s(8.6) }}>
              <p
                className="font-inter-tight font-semibold text-white w-full"
                style={{ fontSize: s(12.9), lineHeight: 1.1, letterSpacing: -s(0.258) }}
              >
                Что это значит для портфеля:
              </p>
              <p
                className="font-inter-tight font-medium w-full"
                style={{ fontSize: s(8.6), lineHeight: 1.3, color: '#bcbcbc', letterSpacing: -s(0.172) }}
              >
                3 уровня экспозиции: GPU-производители (NVDA, AMD), neoclouds (CoreWeave, Lambda), модель-вертикаль (Anthropic, OpenAI). Каждый уровень — свой риск-профиль и горизонт.
              </p>
            </div>

            {/* Calc card + footer */}
            <div className="flex flex-col items-start w-full" style={{ gap: s(25.8) }}>
              <div
                className="flex flex-col items-start w-full"
                style={{ background: '#151515', padding: s(12.9), borderRadius: s(8.6), gap: s(12.9) }}
              >
                <div className="flex flex-col items-start w-full" style={{ gap: s(8.6) }}>
                  <p
                    className="font-inter-tight font-semibold text-white w-full"
                    style={{ fontSize: s(12.9), lineHeight: 1.1, letterSpacing: -s(0.258) }}
                  >
                    Calc доходности pre-IPO
                  </p>
                  <p
                    className="font-inter-tight font-medium w-full"
                    style={{ fontSize: s(8.6), lineHeight: 1.3, color: '#bcbcbc', letterSpacing: -s(0.172) }}
                  >
                    3 уровня экспозиции: GPU, neoclouds, модель-вертикаль. Каждый уровень — свой риск-профиль.
                  </p>
                </div>
                <div className="flex items-start w-full" style={{ gap: s(4.3) }}>
                  {[['$10K','Вход на secondary'],['2.4×','Проектируемый MOIC'],['28%','IRR (24m horizon)']].map(([val, label]) => (
                    <div
                      key={val}
                      className="flex flex-col flex-1 items-start min-w-0"
                      style={{ background: '#202020', padding: s(8.6), borderRadius: s(8.6), gap: s(4.3) }}
                    >
                      <span
                        className="font-inter-tight font-semibold text-white whitespace-nowrap"
                        style={{ fontSize: s(10.75), lineHeight: 1.3, letterSpacing: -s(0.215) }}
                      >
                        {val}
                      </span>
                      <span
                        className="font-inter-tight font-medium"
                        style={{ fontSize: s(7.525), lineHeight: 1.3, color: '#9b9b9b' }}
                      >
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="flex items-start justify-center w-full"
                style={{ borderTop: `${s(0.538)}px solid #202020`, paddingTop: s(8.6) }}
              >
                <p
                  className="font-inter-tight font-medium text-center whitespace-nowrap"
                  style={{ fontSize: s(8.6), lineHeight: 1.3, color: '#bcbcbc', letterSpacing: -s(0.172) }}
                >
                  Каждый вторник в 9 часов полный выпуск на почте
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
