import './App.css'
import { router } from './app/router'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import ToastContainer from './components/ui/toast/ToastContainer'
import { RouterProvider } from 'react-router-dom'


function App() {

  return (
   <ErrorBoundary>
    <RouterProvider router={router} />
    <ToastContainer />
   </ErrorBoundary>
  )
}

export default App
