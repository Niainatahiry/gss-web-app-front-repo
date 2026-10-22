import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import './index.css'
import './App.css'
import App from './App.jsx'

// Font Awesome injects its CSS at runtime by default; we import it above instead
// so icons don't flash at the wrong size before the stylesheet loads.
config.autoAddCss = false

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
