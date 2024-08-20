import AppRouter from './router/Router';
import useStore from './stores/useStore'

function App() {
  const { count, increaseCount } = useStore();

  return (
    <AppRouter />
  )
}

export default App
