import { Provider } from 'react-redux'
import store from './app/store'
import './App.css'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import Navbar from './app/layout/Navbar/Navbar'
import ProductsList from './features/products/components/productsList/ProductsList'
import ToastContainer from './components/ui/toast/ToastContainer'

function App() {

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Navbar />
        <ProductsList />
      </ErrorBoundary>
      <ToastContainer />
    </Provider>
  )
}

export default App
