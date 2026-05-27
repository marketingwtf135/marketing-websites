import { useEffect } from 'react'
import Newsletter from './pages/Newsletter'
import { Agentation } from 'agentation'

/**
 * Canonical URL for this site: m.axevil.com/pdf/pre-ipo-insider
 * The app has no real routing — Newsletter renders for any path. To keep the
 * browser URL consistent with marketing materials, redirect every path to the
 * canonical one on mount. Old links to /pdf still land here.
 */
const CANONICAL = '/pdf/pre-ipo-insider'

export default function App() {
  useEffect(() => {
    const p = window.location.pathname
    if (p !== CANONICAL && p !== CANONICAL + '/') {
      window.history.replaceState({}, '', CANONICAL + window.location.search + window.location.hash)
    }
  }, [])

  return (
    <>
      <Newsletter />
      {import.meta.env.DEV && <Agentation copyToClipboard={true} />}
    </>
  )
}
