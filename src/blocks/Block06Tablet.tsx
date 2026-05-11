import { useState } from 'react'
import CtaButton from '../components/CtaButton'

type TagId = 'Active Deals' | 'Portfolio' | 'Applications' | 'Clients' | 'CRM' | 'Secondary' | 'Market Intelligence' | 'AI'

const TAGS: TagId[] = ['Active Deals', 'Portfolio', 'Applications', 'Clients', 'CRM', 'Secondary', 'Market Intelligence', 'AI']

const FEATURES = [
  { num: '1.0', text: 'Live mandates with AI scoring and one-click referral' },
  { num: '2.0', text: 'Full portfolio visibility: NAV, IRR, MOIC per client' },
  { num: '3.0', text: 'Client pipeline tracking from submission to close' },
  { num: '4.0', text: 'AI-powered CRM with conversion intelligence' },
]

// --- Local icon paths ---
const imgActiveAxevilLogo = '/icons/db-icon-logo.svg'
const imgActiveAxevilPro  = '/icons/db-icon-logo.svg'
const imgActiveAvatar     = '/icons/db-icon-person.svg'
// Nav icons (Active Deals)
const imgNavHome          = '/icons/db-icon-home.svg'
const imgNavDeals         = '/icons/db-icon-deals.svg'
const imgNavMarket        = '/icons/db-icon-money.svg'
const imgNavCRM           = '/icons/db-icon-persons.svg'
const imgNavSecondary     = '/icons/db-icon-up-line.svg'
const imgNavInsights      = '/icons/db-icon-schedule.svg'
const imgNavKnowledge     = '/icons/db-icon-books.svg'

// Company logos inside deal cards
const imgSpaceXLogo       = '/icons/db-icon-spacex.svg'

// --- Portfolio screen icons ---
const imgPortAvatar       = '/icons/db-icon-person.svg'
const imgPortCapIcon      = '/icons/db-icon-money.svg'
const imgPortDealsIcon    = '/icons/db-icon-case.svg'
const imgPortInvestors    = '/icons/db-icon-persons.svg'
const imgPortTotalVal     = '/icons/db-icon-up-line.svg'
const imgPortSpaceXRow    = '/icons/db-icon-spacex.svg'
const imgPortKrakenRow    = '/icons/db-icon-kraken.svg'

// Portfolio nav icons
const imgPortNavHome      = '/icons/db-icon-home.svg'
const imgPortNavDeals     = '/icons/db-icon-deals.svg'
const imgPortNavMarket    = '/icons/db-icon-money.svg'
const imgPortNavCRM       = '/icons/db-icon-persons.svg'
const imgPortNavSecondary = '/icons/db-icon-up-line.svg'
const imgPortNavInsights  = '/icons/db-icon-schedule.svg'
const imgPortNavKnowledge = '/icons/db-icon-books.svg'

// ─── Shared sidebar nav data ───────────────────────────────────────────────
interface NavItem { label: string; icon: string; active?: boolean }

function Sidebar({ items, activeLabel }: { items: NavItem[]; activeLabel: string }) {
  return (
    <div
      className="relative flex-shrink-0 flex flex-col"
      style={{
        width: '243px',
        background: 'linear-gradient(to bottom, #171717, #212121)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Logo — fixed size, not stretched */}
      <div className="flex items-center px-5" style={{ height: '121px' }}>
        <img
          src={imgActiveAxevilLogo}
          alt="AXEVIL PRO"
          className="block flex-shrink-0"
          style={{ width: '28px', height: '28px', objectFit: 'contain' }}
        />
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '0' }} />

      {/* Nav items */}
      <nav className="flex flex-col py-4" style={{ gap: '2px' }}>
        {items.map((item) => {
          const isActive = item.label === activeLabel
          return (
            <div
              key={item.label}
              className="group flex items-center gap-[18px] mx-3 rounded-[8px] cursor-pointer transition-colors duration-150"
              style={{
                padding: '10px 14px',
                background: isActive
                  ? 'linear-gradient(-63.5deg, rgb(34,34,34) 15%, rgb(60,60,60) 83%)'
                  : 'transparent',
                border: isActive ? '1.35px solid #515151' : '1.35px solid transparent',
              }}
            >
              <img
                src={item.icon}
                alt=""
                aria-hidden="true"
                className="block flex-shrink-0"
                style={{ width: '20px', height: '20px', objectFit: 'contain' }}
              />
              <span
                className="font-inter-tight font-medium transition-colors duration-150"
                style={{
                  fontSize: '17px',
                  lineHeight: '1.3',
                  color: isActive ? '#ffffff' : '#7d7d7d',
                }}
              >
                {item.label}
              </span>
            </div>
          )
        })}
      </nav>

      {/* Bottom divider + logout */}
      <div className="mt-auto">
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)' }} />
        <div className="flex items-center gap-[18px] px-5 py-5 cursor-pointer group">
          <img
            src="/icons/db-icon-noti.svg"
            alt=""
            aria-hidden="true"
            className="block flex-shrink-0"
            style={{ width: '28px', height: '28px', objectFit: 'contain' }}
          />
          <span
            className="font-inter-tight font-medium group-hover:text-white transition-colors duration-150"
            style={{ fontSize: '17px', lineHeight: '1.3', color: '#7d7d7d' }}
          >
            Log out
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── Company logo box ────────────────────────────────────────────────────────
function CompanyLogo({ name, logoSrc }: { name: string; logoSrc?: string }) {
  return (
    <div
      className="flex-shrink-0 flex items-center justify-center rounded-[14px] bg-white"
      style={{ width: '68px', height: '68px', position: 'relative' }}
    >
      {logoSrc ? (
        <img src={logoSrc} alt={name} className="block" style={{ width: '68px', height: '68px', objectFit: 'cover', borderRadius: '14px' }} />
      ) : (
        <span
          className="font-inter-tight font-semibold text-black select-none"
          style={{ fontSize: '26px', lineHeight: 1 }}
        >
          {name.charAt(0)}
        </span>
      )}
    </div>
  )
}

// ─── Deal card ───────────────────────────────────────────────────────────────
interface DealCardData {
  name: string
  sector: string
  description: string
  entryVal: string
  pricePerShare: string
  growth: string
  exitHorizon: string
  logoSrc?: string
}

function DealCard({ deal }: { deal: DealCardData }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="relative flex flex-col rounded-[18px] transition-all duration-200 cursor-pointer"
      style={{
        background: 'linear-gradient(145deg, rgba(28,28,28,0.95) 0%, rgba(22,22,22,0.95) 100%)',
        border: hovered ? '1.5px solid rgba(255,255,255,0.2)' : '1.5px solid rgba(255,255,255,0.07)',
        boxShadow: hovered ? '0 0 0 1px rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.4)' : 'none',
        padding: '20px',
        gap: '12px',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Header row */}
      <div className="flex items-center gap-3">
        <CompanyLogo name={deal.name} logoSrc={deal.logoSrc} />
        <div className="flex flex-col gap-1">
          <span
            className="font-inter-tight font-medium text-white"
            style={{ fontSize: '27px', lineHeight: '1.3' }}
          >
            {deal.name}
          </span>
          <span
            className="font-inter-tight font-medium"
            style={{ fontSize: '16px', lineHeight: '1.3', color: '#7d7d7d' }}
          >
            {deal.sector}
          </span>
        </div>
      </div>

      {/* Description */}
      <p
        className="font-inter-tight"
        style={{ fontSize: '17px', lineHeight: '1.3', color: '#c6c6c6', fontWeight: 400 }}
      >
        {deal.description}
      </p>

      {/* Stats */}
      <div
        className="flex items-start"
        style={{
          borderTop: '1px solid rgba(255,255,255,0.07)',
          paddingTop: '12px',
          gap: '0',
        }}
      >
        {[
          { label: 'Entry\nvaluation:', value: deal.entryVal },
          { label: 'Price\nper share:', value: deal.pricePerShare },
          { label: 'Growth\npotential:', value: deal.growth },
          { label: 'Exit\nhorizon:', value: deal.exitHorizon },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1 flex-1">
            <span
              className="font-inter-tight font-medium whitespace-pre-line"
              style={{ fontSize: '12px', lineHeight: '1.2', color: '#7d7d7d' }}
            >
              {stat.label}
            </span>
            <span
              className="font-inter-tight font-medium text-white"
              style={{ fontSize: '17px', lineHeight: '1.3' }}
            >
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Active Deals screen ─────────────────────────────────────────────────────
const ACTIVE_DEALS_NAV: NavItem[] = [
  { label: 'Home',           icon: imgNavHome      },
  { label: 'Active Deals',   icon: imgNavDeals, active: true },
  { label: 'Market',         icon: imgNavMarket    },
  { label: 'CRM',            icon: imgNavCRM       },
  { label: 'Secondary Desk', icon: imgNavSecondary },
  { label: 'Insights',       icon: imgNavInsights  },
  { label: 'Knowledge Base', icon: imgNavKnowledge },
]

const DEAL_CARDS: DealCardData[] = [
  {
    name: 'SpaceX',
    sector: 'SpaceTech',
    description: 'Leader in space launches and satellite technologies',
    entryVal: '$30 B',
    pricePerShare: '$160',
    growth: '5x',
    exitHorizon: 'Q1 2030',
    logoSrc: imgSpaceXLogo,
  },
  {
    name: 'Neuralink',
    sector: 'Hardware',
    description: "Elon Musk's wireless neuroimplant heads to mass market",
    entryVal: '$30 B',
    pricePerShare: '$160',
    growth: '5x',
    exitHorizon: 'Q1 2030',
  },
  {
    name: 'Anthropic',
    sector: 'AI',
    description: 'Developer of leading safe AI models outperforming ChatGPT',
    entryVal: '$30 B',
    pricePerShare: '$160',
    growth: '5x',
    exitHorizon: 'Q1 2030',
  },
  {
    name: 'Stripe',
    sector: 'FinTech',
    description: 'Infrastructure for the global internet economy',
    entryVal: '$30 B',
    pricePerShare: '$160',
    growth: '5x',
    exitHorizon: 'Q1 2030',
  },
  {
    name: 'Revolut',
    sector: 'FinTech',
    description: 'Neobank for consumers and businesses',
    entryVal: '$30 B',
    pricePerShare: '$160',
    growth: '5x',
    exitHorizon: 'Q1 2030',
  },
  {
    name: 'Cursor',
    sector: 'AI',
    description: 'Revolutionary AI coding assistant',
    entryVal: '$30 B',
    pricePerShare: '$160',
    growth: '5x',
    exitHorizon: 'Q1 2030',
  },
]

function ActiveDealsScreen() {
  return (
    <div
      className="flex w-full h-full"
      style={{ background: '#101010', fontFamily: '"Inter Tight", sans-serif' }}
    >
      {/* Sidebar */}
      <Sidebar items={ACTIVE_DEALS_NAV} activeLabel="Active Deals" />

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top bar — profile only */}
        <div
          className="flex items-center justify-end flex-shrink-0"
          style={{
            height: '121px',
            padding: '0 28px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {/* Horizontal fade-out at sidebar edge */}
          <div
            aria-hidden="true"
            className="absolute pointer-events-none"
            style={{
              left: '243px',
              top: 0,
              width: '78px',
              height: '121px',
              background: 'linear-gradient(to right, #101010 8%, transparent 100%)',
              zIndex: 2,
            }}
          />

          {/* Profile card only */}
          <div className="flex items-center gap-4">
            {/* Profile */}
            <div
              className="flex items-center gap-3 rounded-[14px]"
              style={{
                padding: '10px 14px',
                border: '1.5px solid #3d3d3d',
                background: 'linear-gradient(-73deg, rgba(34,34,34,0.6) 15%, rgba(54,54,54,0.6) 83%)',
              }}
            >
              <div className="flex flex-col items-end gap-0.5">
                <span className="font-inter-tight font-medium text-white" style={{ fontSize: '21px', lineHeight: '1.3' }}>Alexander</span>
                <span className="font-inter-tight font-medium" style={{ fontSize: '14px', lineHeight: '1.3', color: '#848484' }}>View profile</span>
              </div>
              <img
                src={imgActiveAvatar}
                alt="Alexander"
                className="rounded-full flex-shrink-0"
                style={{ width: '53px', height: '53px', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>

        {/* Title + filter row — separate from profile */}
        <div
          className="flex items-center justify-between flex-shrink-0"
          style={{ padding: '20px 28px 0 28px' }}
        >
          <h1
            className="font-inter-tight font-medium text-white"
            style={{ fontSize: '45px', lineHeight: '1.3', letterSpacing: '-0.01em' }}
          >
            Active Deals
          </h1>
          <div
            className="flex items-center gap-2 rounded-[11px] bg-white cursor-pointer select-none"
            style={{ padding: '10px 18px', border: '1.4px solid #bdbdbd' }}
          >
            <span className="font-inter-tight font-medium" style={{ fontSize: '19px', color: '#2b2b2b', lineHeight: '1.3' }}>All</span>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
              <path d="M1 1L6 6L11 1" stroke="#2b2b2b" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Deal cards grid */}
        <div
          className="flex-1 overflow-y-auto"
          style={{ padding: '16px 28px 24px 28px' }}
        >
          <div
            className="grid"
            style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}
          >
            {DEAL_CARDS.map((deal) => (
              <DealCard key={deal.name} deal={deal} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Portfolio screen ────────────────────────────────────────────────────────
const PORTFOLIO_NAV: NavItem[] = [
  { label: 'Home',           icon: imgPortNavHome      },
  { label: 'Active Deals',   icon: imgPortNavDeals     },
  { label: 'Market',         icon: imgPortNavMarket    },
  { label: 'CRM',            icon: imgPortNavCRM, active: true },
  { label: 'Secondary Desk', icon: imgPortNavSecondary },
  { label: 'Insights',       icon: imgPortNavInsights  },
  { label: 'Knowledge Base', icon: imgPortNavKnowledge },
]

const PORTFOLIO_STAT_CARDS = [
  {
    label: 'Capital Raised',
    value: '$2 540 000',
    icon: imgPortCapIcon,
    iconBg: 'rgba(255,255,255,0.08)',
    iconBorder: 'rgba(255,255,255,0.1)',
    badge: null,
  },
  {
    label: 'Deals in Portfolio',
    value: '14',
    icon: imgPortDealsIcon,
    iconBg: '#2f2c26',
    iconBorder: '#706041',
    badge: null,
  },
  {
    label: 'Active Investors',
    value: '42',
    icon: imgPortInvestors,
    iconBg: '#262d43',
    iconBorder: '#434883',
    badge: null,
  },
  {
    label: 'Total Value',
    value: '$3 200 000',
    icon: imgPortTotalVal,
    iconBg: '#213130',
    iconBorder: '#27575b',
    badge: '+26%',
  },
]

const PORTFOLIO_ROWS = [
  {
    expandIcon: true,
    logo: imgPortSpaceXRow,
    logoText: 'SPACEX',
    date: 'Nov 4, 2024',
    entryVal: '$150B',
    entryPrice: '$102',
    investmentAmt: '$500 000',
    currentVal: '$210B',
    currentPrice: '$135',
    tag: { label: 'Secondary market', bg: 'rgba(99,255,250,0.1)', border: '#27575b', color: '#4dafba' },
  },
  {
    expandIcon: true,
    logo: imgPortKrakenRow,
    logoText: 'Kraken',
    date: 'Jan 21, 2025',
    entryVal: '$5.95B',
    entryPrice: '$22',
    investmentAmt: '$650 000',
    currentVal: '$10B',
    currentPrice: '$38',
    tag: { label: 'Investment round', bg: '#2f2c26', border: '#706041', color: '#c5b06f' },
  },
]

function PortfolioScreen() {
  return (
    <div
      className="flex w-full h-full"
      style={{ background: '#101010', fontFamily: '"Inter Tight", sans-serif' }}
    >
      {/* Sidebar */}
      <Sidebar items={PORTFOLIO_NAV} activeLabel="CRM" />

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top bar */}
        <div
          className="flex items-center justify-between flex-shrink-0"
          style={{
            height: '121px',
            padding: '0 28px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <h1
            className="font-inter-tight font-medium text-white"
            style={{ fontSize: '41px', lineHeight: '1.3', letterSpacing: '-0.01em' }}
          >
            My Portfolio
          </h1>

          <div className="flex items-center gap-4">
            {/* Period selector */}
            <div
              className="flex items-center rounded-[10px] overflow-hidden"
              style={{ border: '1.1px solid #3d3d3d', background: 'linear-gradient(-43deg, rgba(34,34,34,0.6) 15%, rgba(35,35,35,0.6) 83%)' }}
            >
              {['All Time', 'Year', 'Quarter', 'Month'].map((period) => (
                <div
                  key={period}
                  className="flex items-center justify-center cursor-pointer select-none"
                  style={{
                    padding: '9px 17px',
                    background: period === 'All Time' ? '#ffffff' : 'transparent',
                    borderRadius: period === 'All Time' ? '8px' : '0',
                  }}
                >
                  <span
                    className="font-inter-tight font-medium"
                    style={{
                      fontSize: '16px',
                      lineHeight: '1.3',
                      color: period === 'All Time' ? '#0b0b0b' : '#ffffff',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {period}
                  </span>
                </div>
              ))}
            </div>

            {/* Profile */}
            <div
              className="flex items-center gap-3 rounded-[14px]"
              style={{
                padding: '10px 14px',
                border: '1.5px solid #3d3d3d',
                background: 'linear-gradient(-73deg, rgba(34,34,34,0.6) 15%, rgba(54,54,54,0.6) 83%)',
              }}
            >
              <div className="flex flex-col items-end gap-0.5">
                <span className="font-inter-tight font-medium text-white" style={{ fontSize: '21px', lineHeight: '1.3' }}>Alexander</span>
                <span className="font-inter-tight font-medium" style={{ fontSize: '14px', lineHeight: '1.3', color: '#848484' }}>View profile</span>
              </div>
              <img
                src={imgPortAvatar}
                alt="Alexander"
                className="rounded-full flex-shrink-0"
                style={{ width: '53px', height: '53px', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>

        {/* Body scroll area */}
        <div
          className="flex-1 overflow-y-auto flex flex-col"
          style={{ padding: '16px 28px 20px' }}
        >
          {/* Subtitle */}
          <p
            className="font-inter-tight font-medium"
            style={{ fontSize: '19px', color: '#7d7d7d', lineHeight: '1.3', marginBottom: '16px' }}
          >
            Overview analytics across all deals, clients, and partners.
          </p>

          {/* Stat cards row */}
          <div
            className="grid"
            style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '11px', marginBottom: '16px' }}
          >
            {PORTFOLIO_STAT_CARDS.map((card) => (
              <div
                key={card.label}
                className="flex flex-col rounded-[19px]"
                style={{
                  padding: '16px',
                  border: '1.1px solid #3d3d3d',
                  background: 'linear-gradient(-78deg, rgba(34,34,34,0.6) 15%, rgba(35,35,35,0.6) 83%)',
                  gap: '8px',
                  minHeight: '130px',
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex-shrink-0 flex items-center justify-center rounded-[11px]"
                    style={{
                      width: '47px',
                      height: '47px',
                      background: card.iconBg,
                      border: `1.05px solid ${card.iconBorder}`,
                    }}
                  >
                    <img src={card.icon} alt="" aria-hidden="true" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                  </div>
                  <span
                    className="font-inter-tight font-medium"
                    style={{ fontSize: '16px', color: '#7d7d7d', lineHeight: '1.3' }}
                  >
                    {card.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="font-inter-tight font-medium text-white"
                    style={{ fontSize: '24px', lineHeight: '1.3' }}
                  >
                    {card.value}
                  </span>
                  {card.badge && (
                    <span
                      className="font-inter-tight font-medium rounded-full"
                      style={{
                        fontSize: '10px',
                        color: '#4dafba',
                        background: 'rgba(99,255,250,0.1)',
                        border: '0.72px solid #27575b',
                        padding: '3px 8px',
                        lineHeight: 'normal',
                      }}
                    >
                      {card.badge}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Deals table section */}
          <div
            className="flex flex-col flex-1 rounded-[19px] overflow-hidden"
            style={{
              border: '1.1px solid #3d3d3d',
              background: 'linear-gradient(-70deg, rgba(34,34,34,0.6) 15%, rgba(35,35,35,0.6) 83%)',
            }}
          >
            {/* Tab row */}
            <div
              className="flex items-center justify-between flex-shrink-0"
              style={{ padding: '12px 16px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-end gap-6">
                {['Deals', 'Investors', 'Deal Partners', 'Client Partners'].map((tab) => (
                  <div
                    key={tab}
                    className="flex items-center justify-center cursor-pointer select-none pb-3"
                    style={{
                      borderBottom: tab === 'Deals' ? '2px solid #ffffff' : '2px solid transparent',
                    }}
                  >
                    <span
                      className="font-inter-tight font-medium"
                      style={{ fontSize: '15px', color: tab === 'Deals' ? '#ffffff' : '#7d7d7d', lineHeight: '1.3' }}
                    >
                      {tab}
                    </span>
                  </div>
                ))}
              </div>
              {/* Search */}
              <div
                className="flex items-center gap-2 rounded-[8px]"
                style={{
                  padding: '8px 14px',
                  border: '1.1px solid #3d3d3d',
                  background: 'linear-gradient(-53deg, rgba(34,34,34,0.6) 15%, rgba(35,35,35,0.6) 83%)',
                }}
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                  <circle cx="5.5" cy="5.5" r="4.5" stroke="#7d7d7d" strokeWidth="1.2" />
                  <line x1="9" y1="9" x2="12" y2="12" stroke="#7d7d7d" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <span className="font-inter-tight font-medium" style={{ fontSize: '14px', color: '#7d7d7d', lineHeight: '1.3' }}>Search...</span>
              </div>
            </div>

            {/* Table header */}
            <div
              className="grid items-center flex-shrink-0"
              style={{
                gridTemplateColumns: '32px 1fr 90px 80px 70px 110px 100px 80px 120px',
                padding: '0 16px',
                height: '52px',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <span />
              <span className="font-inter-tight font-medium" style={{ fontSize: '13px', color: '#ffffff', lineHeight: '1.1' }}>Deal / Investor / Partner</span>
              <span className="font-inter-tight font-medium text-center" style={{ fontSize: '13px', color: '#ffffff', lineHeight: '1.1' }}>Date</span>
              <div className="flex flex-col items-center">
                <span className="font-inter-tight font-medium" style={{ fontSize: '13px', color: '#ffffff', lineHeight: '1.1' }}>Entry</span>
                <span className="font-inter-tight font-medium" style={{ fontSize: '13px', color: '#ffffff', lineHeight: '1.1' }}>Valuation</span>
              </div>
              <span className="font-inter-tight font-medium text-center" style={{ fontSize: '13px', color: '#ffffff', lineHeight: '1.1' }}>Entry Price</span>
              <div className="flex flex-col items-center">
                <span className="font-inter-tight font-medium" style={{ fontSize: '13px', color: '#ffffff', lineHeight: '1.1' }}>Investment</span>
                <span className="font-inter-tight font-medium" style={{ fontSize: '13px', color: '#ffffff', lineHeight: '1.1' }}>Amount</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-inter-tight font-medium" style={{ fontSize: '13px', color: '#ffffff', lineHeight: '1.1' }}>Current</span>
                <span className="font-inter-tight font-medium" style={{ fontSize: '13px', color: '#ffffff', lineHeight: '1.1' }}>Valuation</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-inter-tight font-medium" style={{ fontSize: '13px', color: '#ffffff', lineHeight: '1.1' }}>Current</span>
                <span className="font-inter-tight font-medium" style={{ fontSize: '13px', color: '#ffffff', lineHeight: '1.1' }}>Price</span>
              </div>
              <span />
            </div>

            {/* Table rows */}
            {PORTFOLIO_ROWS.map((row, i) => (
              <div
                key={i}
                className="grid items-center"
                style={{
                  gridTemplateColumns: '32px 1fr 90px 80px 70px 110px 100px 80px 120px',
                  padding: '0 16px',
                  height: '61px',
                  borderBottom: i < PORTFOLIO_ROWS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  background: i % 2 === 0 ? 'rgba(255,255,255,0.025)' : 'transparent',
                }}
              >
                {/* Expand chevron */}
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" aria-hidden="true">
                  <path d="M1 1L6 6L1 11" stroke="#7d7d7d" strokeWidth="1.5" strokeLinecap="round" />
                </svg>

                {/* Company name */}
                <div className="flex items-center gap-2">
                  <img src={row.logo} alt={row.logoText} style={{ width: '72px', height: 'auto', objectFit: 'contain' }} />
                </div>

                <span className="font-inter-tight font-medium text-center" style={{ fontSize: '13px', color: '#757474', lineHeight: '1.3', letterSpacing: '0.01em' }}>{row.date}</span>
                <span className="font-inter-tight font-medium text-center" style={{ fontSize: '13px', color: '#757474', lineHeight: '1.3', letterSpacing: '0.01em' }}>{row.entryVal}</span>
                <span className="font-inter-tight font-medium text-center" style={{ fontSize: '13px', color: '#757474', lineHeight: '1.3', letterSpacing: '0.01em' }}>{row.entryPrice}</span>
                <span className="font-inter-tight font-medium text-center" style={{ fontSize: '13px', color: '#757474', lineHeight: '1.3', letterSpacing: '0.01em' }}>{row.investmentAmt}</span>
                <span className="font-inter-tight font-medium text-center" style={{ fontSize: '13px', color: '#757474', lineHeight: '1.3', letterSpacing: '0.01em' }}>{row.currentVal}</span>
                <span className="font-inter-tight font-medium text-center" style={{ fontSize: '13px', color: '#757474', lineHeight: '1.3', letterSpacing: '0.01em' }}>{row.currentPrice}</span>

                {/* Badge */}
                <div className="flex justify-center">
                  <span
                    className="font-inter-tight font-medium rounded-full"
                    style={{
                      fontSize: '10px',
                      color: row.tag.color,
                      background: row.tag.bg,
                      border: `0.63px solid ${row.tag.border}`,
                      padding: '3px 8px',
                      lineHeight: 'normal',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {row.tag.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main Block ──────────────────────────────────────────────────────────────
export default function Block06Tablet() {
  const [active, setActive] = useState<TagId>('Active Deals')

  function handleKeyDown(e: React.KeyboardEvent, idx: number) {
    if (e.key === 'ArrowRight') {
      const next = TAGS[(idx + 1) % TAGS.length]
      setActive(next)
    } else if (e.key === 'ArrowLeft') {
      const prev = TAGS[(idx - 1 + TAGS.length) % TAGS.length]
      setActive(prev)
    } else if (e.key === 'Enter') {
      setActive(TAGS[idx])
    }
  }

  return (
    <section className="w-full bg-page-bg">
      <div className="mx-auto w-full max-w-content container-px flex flex-col gap-16 items-center pb-0" style={{ paddingTop: '200px' }}>

        {/* Heading */}
        <div className="flex flex-col gap-8 items-center" style={{ width: '1234px' }}>
          <div className="flex flex-col gap-8 items-center">
            <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l leading-[1.35] tracking-[-0.02em] text-neutral-30">
              <span className="opacity-50">5.0</span>
              <span className="opacity-80">Desktop</span>
            </div>
            <h2
              className="font-inter-tight font-semibold text-h2 leading-none tracking-[-0.02em] text-transparent bg-clip-text text-center whitespace-pre"
              style={{ backgroundImage: 'linear-gradient(95.539deg, var(--neutral-00) 0.176%, var(--neutral-30) 98.822%)' }}
            >
              {'One partner. Every client. \nOne interface.'}
            </h2>
          </div>

          {/* Tag switcher */}
          <div
            role="tablist"
            aria-label="Desktop features"
            className="flex flex-wrap gap-2 items-center justify-center" style={{ width: '744px' }}
          >
            {TAGS.map((tag, idx) => (
              <button
                key={tag}
                role="tab"
                aria-selected={active === tag}
                tabIndex={active === tag ? 0 : -1}
                onClick={() => setActive(tag)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={[
                  'flex h-13 items-center justify-center px-8 py-4 rounded-full font-inter-tight font-medium text-text-l leading-[1.35] tracking-[-0.02em] whitespace-nowrap transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white',
                  active === tag
                    ? 'bg-white text-black border border-white/25'
                    : 'bg-white/5 text-white',
                ].join(' ')}
                type="button"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop interface + feature list */}
        <div className="flex flex-col gap-8 items-start w-full">
          {/* Desktop frame — interactive screens */}
          <div
            className="relative w-full overflow-clip rounded-card-lg border border-border-subtle"
            style={{ height: '837px' }}
          >
            {active === 'Active Deals' && <ActiveDealsScreen />}
            {active === 'Portfolio'    && <PortfolioScreen />}
            {active !== 'Active Deals' && active !== 'Portfolio' && (
              /* Fallback for other tabs — keep the existing screenshot */
              <img
                alt={`Axevil Pro — ${active}`}
                src="/img/block06/axevill-pro-desktop.png"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                loading="lazy"
              />
            )}
          </div>

          {/* Feature list */}
          <div className="flex items-center justify-between w-full">
            {FEATURES.map((f) => (
              <div key={f.num} className="border-l border-white/30 flex flex-col gap-16 items-start pl-6 shrink-0" style={{ width: '345px' }}>
                <p className="font-inter-tight font-medium text-text-m text-white/60">{f.num}</p>
                <p className="font-inter-tight font-medium text-text-xl text-white flex-1 w-full">{f.text}</p>
              </div>
            ))}
          </div>
        </div>

        <CtaButton>Request a Demo</CtaButton>
      </div>
    </section>
  )
}
