/**
 * Miniature previews of the four sections of an actual issue.
 *
 * The "Что в каждом выпуске" cards used to show abstract 3D icons — a document, a chart,
 * a lightbulb — which say nothing about what lands in the inbox (client feedback
 * 2026-07-23: "четыре карточки абстрактные, заменить на реальные скриншоты разделов из
 * последнего выпуска").
 *
 * These are rendered in the DOM rather than exported as PNGs, exactly like
 * `NLLetterPreview`: same technique, no new assets, crisp at every DPI, and the copy
 * stays editable when the issue format changes.
 *
 * ⚠ The rows below are representative sample content in the real issue's format, not a
 * verbatim dump of issue №47 — hence the "пример" tag in every preview header. When the
 * content team exports true screenshots, drop them in as <img> and delete the variant.
 */

interface NLIssuePreviewProps {
  variant: 'events' | 'ratings' | 'deals' | 'ideas'
  className?: string
  style?: React.CSSProperties
}

/**
 * Вариант `tools` («Трекер портфеля») удалён 2026-08-05. Он показывал демо-портфель с
 * «2.1× MOIC», трекер доходности с «24% IRR» и калькулятор входа — Павел подтвердил, что
 * ничего из этого в продукте нет, а показанная доходность вдобавок противоречила
 * редполитике и дисклеймеру в футере.
 *
 * На его месте `deals` — тендер-оферы и окна входа. Это не новое обещание: тендер-оферы
 * названы в подзаголовке первого экрана и в блоке «Кому полезен дайджест» («открывшиеся
 * тендер-оферы») ещё до правок, а в реальном макете Pulse есть раздел «Открытые сделки».
 */
const HEADERS: Record<NLIssuePreviewProps['variant'], string> = {
  events:  'События недели',
  ratings: 'Лидерборд secondary',
  deals:   'Открытые оферы',
  ideas:   'Инвест-идеи недели',
}

/** Chip colours follow the page's status tokens — green up, red down, amber pending. */
const TONE = {
  up:      { color: 'var(--status-open)',   bg: 'rgba(77,186,121,0.1)' },
  down:    { color: '#e05b5b',              bg: 'rgba(224,91,91,0.1)' },
  neutral: { color: 'var(--white-300)',     bg: 'rgba(255,255,255,0.06)' },
} as const

type Tone = keyof typeof TONE

function Chip({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  return (
    <span
      className="font-inter-tight font-semibold shrink-0 rounded-full whitespace-nowrap"
      style={{
        fontSize: '0.5625rem', lineHeight: 1.4, padding: '0.125rem 0.375rem',
        fontVariantNumeric: 'tabular-nums',
        color: TONE[tone].color, background: TONE[tone].bg,
      }}
    >
      {children}
    </span>
  )
}

/** One list row: name on the left, meta under it, value chip on the right. */
function Row({ name, meta, value, tone }: { name: string; meta: string; value: string; tone: Tone }) {
  return (
    <div className="flex items-center justify-between gap-2 w-full"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.375rem', paddingBottom: '0.375rem' }}>
      <span className="flex flex-col min-w-0">
        <span className="font-inter-tight font-semibold text-white truncate" style={{ fontSize: '0.625rem', lineHeight: 1.2 }}>
          {name}
        </span>
        <span className="font-inter-tight font-medium truncate" style={{ fontSize: '0.5625rem', lineHeight: 1.3, color: 'var(--white-400)' }}>
          {meta}
        </span>
      </span>
      <Chip tone={tone}>{value}</Chip>
    </div>
  )
}

const ROWS: Record<NLIssuePreviewProps['variant'], { name: string; meta: string; value: string; tone: Tone }[]> = {
  events: [
    // Тендер-офер отсюда убран: он стал темой отдельной карточки 3.0, и один и тот же
    // раздел не должен показываться в двух миниатюрах.
    { name: 'SpaceX',    meta: 'переоценка после нового раунда', value: 'переоценка', tone: 'up' },
    { name: 'Anthropic', meta: 'новый раунд, вторичка сузилась', value: 'раунд', tone: 'up' },
    { name: 'Stripe',    meta: 'обратный выкуп сотрудников',   value: 'buyback', tone: 'neutral' },
    { name: 'Databricks',meta: 'M&A: покупка data-стартапа',    value: 'M&A', tone: 'neutral' },
  ],
  ratings: [
    { name: 'Anduril',   meta: 'объём сделок ×2 к прошлой неделе', value: '+12.4%', tone: 'up' },
    { name: 'Figma',     meta: 'спред bid/ask сузился',            value: '+6.1%',  tone: 'up' },
    { name: 'Canva',     meta: 'без изменений в объёме',           value: '−2.8%',  tone: 'down' },
    { name: 'Klarna',    meta: 'давление на мультипликатор',       value: '−5.3%',  tone: 'down' },
  ],
  // Ни доходностей, ни мультипликаторов: только статус офера и срок — то, что дайджест
  // действительно сообщает.
  deals: [
    { name: 'Figma',   meta: 'окно входа на secondary', value: 'открыто',    tone: 'up' },
    { name: 'Anduril', meta: 'сбор заявок до 05.08',    value: 'офер открыт', tone: 'neutral' },
    { name: 'Klarna',  meta: 'офер закрылся 22.07',     value: 'закрыт',     tone: 'down' },
  ],
  ideas: [
    { name: 'AI Infrastructure', meta: '3 уровня экспозиции: GPU → neoclouds → модели', value: 'идея №1', tone: 'neutral' },
    { name: 'Defense tech',      meta: 'переоценка сектора после контрактов',           value: 'идея №2', tone: 'neutral' },
    { name: 'Fintech-вторичка',  meta: 'дисконты к последнему раунду 20–40%',           value: 'идея №3', tone: 'neutral' },
  ],
}

export default function NLIssuePreview({ variant, className = '', style }: NLIssuePreviewProps) {
  return (
    <div
      className={`flex flex-col ${className}`}
      aria-hidden
      style={{
        background: 'var(--black-400)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '0.75rem',
        padding: '0.75rem',
        gap: '0.5rem',
        ...style,
      }}
    >
      {/* Header — section name + the "sample" tag that keeps this honest */}
      <div className="flex items-center justify-between gap-2">
        <span className="font-inter-tight font-semibold text-white whitespace-nowrap" style={{ fontSize: '0.6875rem', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
          {HEADERS[variant]}
        </span>
        <span className="font-inter-tight font-medium whitespace-nowrap rounded-full"
          style={{ fontSize: '0.5rem', lineHeight: 1.4, padding: '0.125rem 0.375rem', color: 'var(--white-400)', background: 'rgba(255,255,255,0.05)' }}>
          пример
        </span>
      </div>

      <div className="flex flex-col w-full">
        {ROWS[variant].map(r => <Row key={r.name} {...r} />)}
      </div>
    </div>
  )
}
