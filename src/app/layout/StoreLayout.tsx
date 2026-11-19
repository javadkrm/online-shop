import Navbar from './Navbar/Navbar'
import Footer from './footer/Footer'
import { Outlet } from 'react-router-dom'

function StoreLayout() {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  )
}

export default StoreLayout