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
import { Agentation } from 'agentation'

export default function App() {
  return (
    <main className="bg-page-bg overflow-x-clip">
      {/* Block01 is above the fold — eager, no fade */}
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
      {/* Agentation — visual feedback tool for AI agents (dev only) */}
      {import.meta.env.DEV && <Agentation />}
    </main>
  )
}
