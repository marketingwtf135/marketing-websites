import About from './pages/About'
import { Agentation } from 'agentation'

export default function App() {
  return (
    <>
      <About />
      {import.meta.env.DEV && <Agentation copyToClipboard={true} />}
    </>
  )
}
