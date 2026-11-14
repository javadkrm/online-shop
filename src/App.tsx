import { lazy, Suspense } from 'react'
import { Provider } from 'react-redux'
import store from './store/store'
import './App.css'
import ProductsList from './components/productsList/ProductsLit'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'

function App() {

  const Counter = lazy(() => import('./components/Counter/Counter'))

  return (
    <Provider store={store}>
      <ProductsList />
      <ErrorBoundary>
        <Suspense fallback={<p>loading...</p>}>
          <Counter />
        </Suspense>
      </ErrorBoundary>
    </Provider>
  )
}

export default App
