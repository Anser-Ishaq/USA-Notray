import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Suspense, lazy } from 'react'
import './index.css'
import BackdropLoader from './components/BackdropLoader/index'

const LazyApp = lazy(() => import('./App.jsx'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<BackdropLoader />}>
      <LazyApp />
    </Suspense>
  </StrictMode>
)
