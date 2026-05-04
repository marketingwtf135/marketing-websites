import Nav from '../components/Nav'
import CSHero from './cs-sections/CSHero'
import CSTrackPrice from './cs-sections/CSTrackPrice'
import CSCompanyInfo from './cs-sections/CSCompanyInfo'
import CSYearlyPerformance from './cs-sections/CSYearlyPerformance'
import CSFAQ from './cs-sections/CSFAQ'
import CSGetUpdates from './cs-sections/CSGetUpdates'

/** Uniform spacing wrapper — 100px top + 100px bottom = 200px between adjacent blocks */
function S({ children }: { children: React.ReactNode }) {
  return <div style={{ marginTop: 100, marginBottom: 100 }}>{children}</div>
}

export default function CompanyStock() {
  return (
    <main className="bg-page-bg overflow-x-clip" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      <Nav active="Company Stock" />
      {/* Spacer to push content below fixed nav (80px) */}
      <div style={{ height: 80, flexShrink: 0 }} />
      <CSHero />
      <S><CSTrackPrice /></S>
      <S><CSCompanyInfo /></S>
      <S><CSYearlyPerformance /></S>
      <S><CSFAQ /></S>
      <CSGetUpdates />
    </main>
  )
}
