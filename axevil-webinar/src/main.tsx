import React from 'react'
import ReactDOM from 'react-dom/client'
import Webinar from './pages/Webinar'
import { LangProvider } from './lib/lang'
import { captureTrackingContextOnLoad } from './lib/tracking'
import './index.css'

captureTrackingContextOnLoad()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LangProvider>
      <Webinar />
    </LangProvider>
  </React.StrictMode>
)
