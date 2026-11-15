import { Provider } from 'react-redux'
import store from './app/store'
import './App.css'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'

function App() {

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <App/>
      </ErrorBoundary>
    </Provider>
  )
}

export default App
