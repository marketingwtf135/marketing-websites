import Newsletter from './pages/Newsletter'
import { Agentation } from 'agentation'

export default function App() {
  return (
    <>
      <Newsletter />
      {import.meta.env.DEV && <Agentation copyToClipboard={true} />}
    </>
  )
}
