import FadeIn from '../components/FadeIn'
import PDFNav from './pdf-sections/PDFNav'
import PS1Hero from './pdf-sections/PS1Hero'
import PS2KeyQuestions from './pdf-sections/PS2KeyQuestions'
import PS3Preview from './pdf-sections/PS3Preview'
import PS4Methodology from './pdf-sections/PS4Methodology'
import PS5StayCurrent from './pdf-sections/PS5StayCurrent'
import PS6WhoFor from './pdf-sections/PS6WhoFor'
import PS7About from './pdf-sections/PS7About'
import PS8Form from './pdf-sections/PS8Form'
import PS9Footer from './pdf-sections/PS9Footer'

export default function InsiderPage() {
  return (
    <main className="bg-page-bg overflow-x-clip">
      <PDFNav />
      <PS1Hero />
      <FadeIn><PS2KeyQuestions /></FadeIn>
      <FadeIn><PS3Preview /></FadeIn>
      <FadeIn><PS4Methodology /></FadeIn>
      <FadeIn><PS5StayCurrent /></FadeIn>
      <FadeIn><PS6WhoFor /></FadeIn>
      <FadeIn><PS7About /></FadeIn>
      <PS8Form />
      <PS9Footer />
    </main>
  )
}
