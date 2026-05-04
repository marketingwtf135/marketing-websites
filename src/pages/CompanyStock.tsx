
import Nav from '../components/Nav'
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
      <CSHero />
      <CSTrackPrice />
      <CSCompanyInfo />
      <CSYearlyPerformance />
      <CSFAQ />
      <CSGetUpdates />
    </main>
  )
}
