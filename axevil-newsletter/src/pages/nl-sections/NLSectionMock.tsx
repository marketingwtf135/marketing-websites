/**
 * Схемы разделов выпуска для блока «Что в каждом выпуске».
 *
 * Это намеренно моки, а не данные: формы и подписи показывают устройство раздела, но ни
 * одной цифры здесь нет. Так описал их Павел (2026-08-06), и это же снимает старую
 * проблему — прежние миниатюры показывали правдоподобные, но выдуманные значения вроде
 * «+12.4%» и «2.1× MOIC».
 *
 * Единственное, что здесь настоящее, — названия секторов и категорий новостей: они взяты
 * из описаний Павла и совпадают с реальным Private Markets Pulse.
 */
type Variant = 'index' | 'sectors' | 'supply' | 'balance' | 'news'

const LINE = 'rgba(255,255,255,0.07)'
const SKELETON = 'rgba(255,255,255,0.10)'

/** Прямоугольник-заглушка вместо текста, который в письме будет настоящим. */
function Bar({ w, h = 6, tone = SKELETON }: { w: string; h?: number; tone?: string }) {
  return <span className="block rounded-full shrink-0" style={{ width: w, height: h, background: tone }} aria-hidden />
}

function Legend({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1.5 whitespace-nowrap">
      <span className="block rounded-full shrink-0" style={{ width: 6, height: 6, background: color }} aria-hidden />
      {children}
    </span>
  )
}

/** 1.0 — две линии на пустой сетке, без значений по осям. */
function IndexMock() {
  return (
    <div className="flex flex-col gap-2.5 w-full">
      <div className="flex items-center gap-4" style={{ fontSize: '0.625rem', color: 'var(--white-400)' }}>
        <Legend color="rgba(255,255,255,0.85)">Axevil Pre-IPO Index</Legend>
        <Legend color="rgba(255,255,255,0.30)">Nasdaq 100</Legend>
      </div>
      <svg viewBox="0 0 300 92" className="w-full" style={{ height: 'auto' }} aria-hidden>
        {[0, 1, 2, 3].map(i => (
          <line key={i} x1="0" x2="300" y1={8 + i * 26} y2={8 + i * 26} stroke={LINE} strokeWidth="1" />
        ))}
        {[0, 1, 2, 3, 4].map(i => (
          <line key={i} x1={i * 75} x2={i * 75} y1="8" y2="86" stroke={LINE} strokeWidth="1" />
        ))}
        {/* Axevil выше, линии сближаются и расходятся — без привязки к значениям */}
        <polyline points="0,68 60,54 120,58 180,36 240,30 300,20"
          fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="0,74 60,66 120,56 180,62 240,52 300,50"
          fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span style={{ fontSize: '0.5625rem', color: 'var(--white-400)' }}>неделя · с начала года</span>
    </div>
  )
}

/** 2.0 — доли секторов полосами, без процентов. */
function SectorsMock() {
  const rows: [string, string][] = [
    ['AI-инфраструктура', '86%'],
    ['Вертикальный AI', '64%'],
    ['Робототехника', '48%'],
    ['Финтех', '37%'],
    ['Оборона', '26%'],
    ['Космос', '15%'],
  ]
  return (
    <div className="flex flex-col gap-[0.55rem] w-full">
      {rows.map(([name, w]) => (
        <div key={name} className="flex items-center gap-2 w-full">
          <span className="shrink-0 truncate" style={{ width: '42%', fontSize: '0.625rem', color: 'var(--white-400)' }}>{name}</span>
          <span className="block rounded-full" style={{ width: w, height: 9, background: 'rgba(255,255,255,0.22)' }} aria-hidden />
        </div>
      ))}
    </div>
  )
}

/** 3.0 — встречные шкалы покупки и продажи, под ними две строки-заглушки. */
function SupplyMock() {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex items-center justify-between" style={{ fontSize: '0.5625rem', color: 'var(--white-400)' }}>
        <span>покупка</span><span>продажа</span>
      </div>
      <div className="flex items-center w-full" style={{ gap: 2 }}>
        <span className="block rounded-l-full" style={{ width: '46%', height: 10, background: 'rgba(255,255,255,0.30)' }} aria-hidden />
        <span className="block rounded-r-full" style={{ width: '54%', height: 10, background: 'rgba(255,255,255,0.14)' }} aria-hidden />
      </div>
      {[['лидер спроса', '38%'], ['крупнейший навес', '30%']].map(([label, w]) => (
        <div key={label} className="flex items-center justify-between gap-2 w-full"
          style={{ borderTop: `1px solid ${LINE}`, paddingTop: '0.4rem' }}>
          <span className="shrink-0" style={{ fontSize: '0.5625rem', color: 'var(--white-400)' }}>{label}</span>
          <Bar w={w} />
        </div>
      ))}
    </div>
  )
}

/** 4.0 — две колонки односторонних заявок. */
function BalanceMock() {
  const col = (title: string, tone: string) => (
    <div className="flex flex-col gap-[0.4rem] flex-1 min-w-0">
      <span style={{ fontSize: '0.5625rem', color: 'var(--white-400)' }}>{title}</span>
      {['76%', '58%', '66%'].map((w, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span className="block rounded-full shrink-0" style={{ width: 3, height: 12, background: tone }} aria-hidden />
          <Bar w={w} />
        </span>
      ))}
    </div>
  )
  return (
    <div className="flex gap-4 w-full">
      {col('только покупка', 'var(--status-open)')}
      {col('только продажа', '#e05b5b')}
    </div>
  )
}

/** 5.0 — строки новостей: кружок вместо логотипа, заглушка и тег категории. */
function NewsMock() {
  const rows: [string, string][] = [
    ['58%', 'выручка'],
    ['46%', 'раунд'],
    ['62%', 'M&A'],
    ['40%', 'лицензия'],
  ]
  return (
    <div className="flex flex-col gap-[0.45rem] w-full">
      {rows.map(([w, tag]) => (
        <div key={tag} className="flex items-center gap-2.5 w-full">
          <span className="block rounded-full shrink-0" style={{ width: 16, height: 16, background: 'rgba(255,255,255,0.13)' }} aria-hidden />
          <Bar w={w} />
          <span className="ml-auto shrink-0 rounded-full whitespace-nowrap"
            style={{ fontSize: '0.5625rem', color: 'var(--white-300)', background: 'rgba(255,255,255,0.06)', padding: '0.15rem 0.5rem' }}>
            {tag}
          </span>
        </div>
      ))}
    </div>
  )
}

const MOCKS: Record<Variant, () => JSX.Element> = {
  index: IndexMock,
  sectors: SectorsMock,
  supply: SupplyMock,
  balance: BalanceMock,
  news: NewsMock,
}

export default function NLSectionMock({ variant, className = '' }: { variant: Variant; className?: string }) {
  const Mock = MOCKS[variant]
  return (
    <div
      className={`flex items-center ${className}`}
      aria-hidden
      style={{
        background: 'var(--black-400)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '0.75rem',
        padding: '0.75rem',
      }}
    >
      <Mock />
    </div>
  )
}
