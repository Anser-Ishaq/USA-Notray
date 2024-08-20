import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Suspense, lazy } from 'react'
import './index.css'
import BackdropLoader from './components/BackdropLoader/index'
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

const LazyApp = lazy(() => import('./App.jsx'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<BackdropLoader />}>
      <ThemeProvider theme={theme}>
        <LazyApp />
      </ThemeProvider>
    </Suspense>
  </StrictMode>
)
