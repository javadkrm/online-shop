import { Provider } from 'react-redux'
import store from './app/store'
import './App.css'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import Navbar from './app/layout/Navbar'
import ProductsList from './features/products/components/productsList/ProductsList'

function App() {

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Navbar />
        <ProductsList />
      </ErrorBoundary>
    </Provider>
  )
}

export default App
