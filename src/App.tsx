import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
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
import Nav from './components/Nav'
import Footer from './components/Footer'
import Quiz from './components/Quiz'
import CompanyStock from './pages/CompanyStock'
import Webinar from './pages/Webinar'
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
  // As user scrolls 0 → 500px:
  // - top corners round 0 → 64px
  // - rolling-cover scales from 0.8 → 1.0 (anchored to top so it grows downward)
  const { scrollY } = useScroll()
  const cornerRadius = useTransform(scrollY, [0, 500], [0, 64])
  const coverScale   = useTransform(scrollY, [0, 500], [0.8, 1])

  return (
    <main className="overflow-x-clip" style={{ background: '#000000' }}>
      <Nav />
      {/* Hero sits sticky behind everything; the rest of the page rolls UP and covers it */}
      <Block01Hero />
      <motion.div
        className="relative"
        style={{
          zIndex: 10,
          background: '#080808',
          paddingTop: 80,
          borderTopLeftRadius: cornerRadius,
          borderTopRightRadius: cornerRadius,
          scale: coverScale,
          transformOrigin: 'top center',
        }}
      >
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
        <Footer />
      </motion.div>
    </main>
  )
}

export default function App() {
  const hash = useRoute()
  const [quizOpen, setQuizOpen] = useState(false)

  useEffect(() => {
    const handler = () => setQuizOpen(true)
    window.addEventListener('open-quiz', handler)
    return () => window.removeEventListener('open-quiz', handler)
  }, [])

  return (
    <>
      {hash === '#company-stock' ? <CompanyStock /> : hash === '#webinar' ? <Webinar /> : <Home />}
      {import.meta.env.DEV && <Agentation />}
      <AnimatePresence>
        {quizOpen && <Quiz onClose={() => setQuizOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
