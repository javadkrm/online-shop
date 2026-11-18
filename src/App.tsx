import { Provider } from 'react-redux'
import store from './app/store'
import './App.css'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import Navbar from './app/layout/Navbar/Navbar'
import ToastContainer from './components/ui/toast/ToastContainer'
import Home from './pages/home/Home'
import Footer from './app/layout/footer/Footer'


function App() {

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Navbar />
        <Home />
        <Footer />
      </ErrorBoundary>
      <ToastContainer />
    </Provider>
  )
}

export default App
