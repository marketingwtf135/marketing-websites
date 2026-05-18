import Newsletter from './pages/Newsletter'
import { Agentation } from 'agentation'

export default function App() {
  return (
    <>
      <Newsletter />
      <Agentation copyToClipboard={true} />
    </>
  )
}
