import About from './pages/About'
import { Agentation } from 'agentation'
import DsAgent from './dev/DsAgent'

export default function App() {
  return (
    <>
      <About />
      {import.meta.env.DEV && <Agentation copyToClipboard={true} />}
      {import.meta.env.DEV && <DsAgent />}
    </>
  )
}
