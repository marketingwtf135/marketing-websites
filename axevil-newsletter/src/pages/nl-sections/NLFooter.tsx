import { asset } from '../../lib/asset'

const footerLogo = asset('/img/newsletter/footer-logo.svg')

/**
 * Footer links used to be four labels on `href="#"` — they looked like a legal footer and
 * did nothing but jump the page to the top.
 *
 * The Russian legal pages already existed in the webinar project; they are copied into
 * `public/legal/` here and every path inside them rewritten relative, so they survive the
 * site's nested base (`/pdf/pre-ipo-insider/`). The hrefs below go through `asset()` for
 * the same reason. `Contacts` points at the address the legal pages themselves publish.
 */
const LINKS: { label: string; href: string }[] = [
  { label: 'Privacy',       href: asset('/legal/ru/privacy.html') },
  { label: 'Terms',         href: asset('/legal/ru/terms.html') },
  { label: 'Cookie policy', href: asset('/legal/ru/cookies.html') },
  { label: 'Contacts',      href: 'mailto:info@axevil.com' },
]

/**
 * Регуляторный дисклеймер.
 *
 * ТЗ требовало в футере строку «SEC ERA, CRD #802-126907, FINRA»; Павел (2026-08-04)
 * уточнил, что достаточно общего дисклеймера. Взят готовый русский текст, который уже
 * опубликован в футере лендинга вебинара (`axevil-webinar/src/lib/lang.tsx`) — он прошёл
 * юристов, содержит тот же регистрационный номер и, в отличие от строчки из ТЗ, ещё и
 * ограничивает аудиторию профессиональными инвесторами и снимает трактовку материалов
 * как инвестиционного совета. Один текст на два лендинга вместо двух разных формулировок.
 */
const DISCLAIMER =
  'Axevil Capital, LLC — компания, зарегистрированная в США (штат Делавэр, #6832739), со статусом Exempt Reporting Adviser (ERA), регулируется Комиссией по ценным бумагам и биржам США (SEC #802-126907). Только для профессиональных инвесторов, wealth-менеджеров, family offices и аккредитованных инвесторов. Материалы Сайта и дайджеста предоставлены в общих информационных и образовательных целях и не являются инвестиционным, юридическим, налоговым или иным профессиональным советом, офертой или приглашением совершить сделку с ценными бумагами или долями в фондах. Инвестиции в private markets неликвидны, носят долгосрочный характер и сопряжены с высокими рисками; прошлая доходность не гарантирует будущих результатов.'

export default function NLFooter() {
  return (
    <footer
      className="relative w-full"
      style={{ background: 'var(--black-100)' }}
    >
      <div
        className="mx-auto w-full flex flex-col gap-8"
        style={{
          maxWidth: '1440px',
          paddingTop: 'clamp(40px,4.2vw,60px)',
          paddingBottom: 'clamp(40px,4.2vw,60px)',
          paddingLeft: 'clamp(20px,5.5vw,80px)',
          paddingRight: 'clamp(20px,5.5vw,80px)',
        }}
      >
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 overflow-hidden">
        {/* Logo */}
        <div className="relative shrink-0" style={{ width: 207, height: 32 }}>
          <img src={footerLogo} alt="AXEVIL Capital" className="absolute block inset-0 max-w-none size-full" />
        </div>

        {/* Right: links + copyright */}
        <div
          className="flex flex-col font-inter-tight font-medium gap-3 items-start sm:items-end overflow-hidden shrink-0"
          style={{ fontSize: 'var(--font-xs)', lineHeight: 1.3, color: 'var(--black-800)', whiteSpace: 'nowrap' }}
        >
          <div className="flex gap-5 items-center overflow-hidden">
            {LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="hover:text-white/50 transition-colors"
                style={{ color: 'var(--black-800)' }}
              >
                {label}
              </a>
            ))}
          </div>
          <p>© 2026 Axevil Capital. All rights reserved.</p>
        </div>
      </div>

        {/* Регуляторный дисклеймер — отдельной строкой во всю ширину: текст длинный и в
            колонку со ссылками не встаёт.
            Цвет намеренно светлее, чем у ссылок рядом: те стоят на `--black-800` (#404040),
            что на чёрном фоне даёт контраст около 2.3:1 — для юридически значимого
            уведомления это уже декорация, а не текст. `--white-400` (#9b9b9b) даёт ~6.3:1
            и остаётся визуально второстепенным. */}
        <p
          className="font-inter-tight font-medium w-full"
          style={{
            fontSize: 'clamp(0.6875rem, 0.7vw, 0.75rem)',
            lineHeight: 1.45,
            color: 'var(--white-400)',
            borderTop: '1px solid #1a1a1a',
            paddingTop: '1.5rem',
            maxWidth: '80ch',
          }}
        >
          {DISCLAIMER}
        </p>
      </div>
    </footer>
  )
}
