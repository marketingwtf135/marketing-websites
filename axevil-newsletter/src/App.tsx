import Newsletter from './pages/Newsletter'
import { Agentation } from 'agentation'

/**
 * Canonical URL: m.axevil.com/pdf/pre-ipo-insider/
 * Folder nesting handled at build time — see vite.config.ts (base + outDir) and
 * scripts/postbuild.js (writes redirect HTMLs at dist/ root and dist/pdf/).
 */
export default function App() {
  return (
    <>
      <Newsletter />
      {import.meta.env.DEV && <Agentation copyToClipboard={true} />}
    </>
  )
}
