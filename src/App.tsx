import { useEffect, useState } from 'react'
import Block01Hero from './blocks/Block01Hero'
import Block02Logos from './blocks/Block02Logos'
import Block03Cards from './blocks/Block03Cards'
import Block04Features from './blocks/Block04Features'
import Block05Mobile from './blocks/Block05Mobile'
import Block06Tablet from './blocks/Block06Tablet'
import Block07Web from './blocks/Block07Web'
import Block08Section from './blocks/Block08Section'
import Block09Slider from './blocks/Block09Slider'
import Block10News from './blocks/Block10News'
import Block11Logos from './blocks/Block11Logos'
import Block12Cta from './blocks/Block12Cta'
import FadeIn from './components/FadeIn'
import CompanyStock from './pages/CompanyStock'
import { Agentation } from 'agentation'

/** Lightweight hash-based router. Avoids adding react-router-dom for two routes. */
function useRoute() {
  const [hash, setHash] = useState(() => window.location.hash)
  useEffect(() => {
    const onHash = () => {
      setHash(window.location.hash)
      // Scroll to top when navigating
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return hash
}

function Home() {
  return (
    <main className="bg-page-bg overflow-x-clip">
      <Block01Hero />
      <FadeIn><Block02Logos /></FadeIn>
      <FadeIn><Block03Cards /></FadeIn>
      <FadeIn><Block04Features /></FadeIn>
      <FadeIn><Block05Mobile /></FadeIn>
      <FadeIn><Block06Tablet /></FadeIn>
      <FadeIn><Block07Web /></FadeIn>
      <FadeIn><Block08Section /></FadeIn>
      <FadeIn><Block09Slider /></FadeIn>
      <FadeIn><Block10News /></FadeIn>
      <FadeIn><Block11Logos /></FadeIn>
      <FadeIn><Block12Cta /></FadeIn>
    </main>
  )
}

export default function App() {
  const hash = useRoute()
  return (
    <>
      {hash === '#company-stock' ? <CompanyStock /> : <Home />}
      {import.meta.env.DEV && <Agentation />}
    </>
  )
}
