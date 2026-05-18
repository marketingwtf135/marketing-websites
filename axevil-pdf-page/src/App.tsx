import InsiderPage from './pages/InsiderPage'
import { Agentation } from 'agentation'

function handleCopy(markdown: string) {
  // Fallback for localhost where clipboard API may be blocked
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(markdown).catch(() => fallbackCopy(markdown))
  } else {
    fallbackCopy(markdown)
  }
}

function fallbackCopy(text: string) {
  const ta = document.createElement('textarea')
  ta.value = text
  ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0'
  document.body.appendChild(ta)
  ta.focus()
  ta.select()
  document.execCommand('copy')
  document.body.removeChild(ta)
}

export default function App() {
  return (
    <>
      <InsiderPage />
      <Agentation onCopy={handleCopy} copyToClipboard={false} />
    </>
  )
}
