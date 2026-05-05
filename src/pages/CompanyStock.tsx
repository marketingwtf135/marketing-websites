import Nav from '../components/Nav'
import Footer from '../components/Footer'
import CSHero from './cs-sections/CSHero'
import CSTrackPrice from './cs-sections/CSTrackPrice'
import CSCompanyInfo from './cs-sections/CSCompanyInfo'
import CSYearlyPerformance from './cs-sections/CSYearlyPerformance'
import CSFAQ from './cs-sections/CSFAQ'
import CSGetUpdates from './cs-sections/CSGetUpdates'

export default function CompanyStock() {
  return (
    <main className="bg-page-bg overflow-x-clip">
      <Nav active="Company Stock" />
      {/* Spacer: pushes content below fixed nav (80px) */}
      <div style={{ height: 80 }} />
      {/* Block 1 — Hero: no padding class */}
      <CSHero />
      {/* Block 2 — Track Price: padding-section-t12-b6 lives in the section itself */}
      <CSTrackPrice />
      {/* Remaining blocks use padding-section-t6-b6 from their own section class */}
      <CSCompanyInfo />
      <CSYearlyPerformance />
      <CSFAQ />
      <CSGetUpdates />
      <Footer />
    </main>
  )
}
