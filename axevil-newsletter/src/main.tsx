import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Clipboard fallback for iframe/webview contexts where navigator.clipboard is restricted
;(function patchClipboard() {
  function execCommandFallback(text: string) {
    const el = document.createElement('textarea')
    el.value = text
    el.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none'
    document.body.appendChild(el)
    el.focus()
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }

  const orig = navigator.clipboard?.writeText?.bind(navigator.clipboard)
  const patched = {
    ...navigator.clipboard,
    writeText(text: string): Promise<void> {
      if (orig) {
        return orig(text).catch(() => { execCommandFallback(text) })
      }
      execCommandFallback(text)
      return Promise.resolve()
    },
  }
  try {
    Object.defineProperty(navigator, 'clipboard', { value: patched, configurable: true, writable: true })
  } catch { /* already defined non-configurable */ }
})()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
