import { Provider } from 'react-redux'
import store from './store/store'
import './App.css'
import ProductsList from './components/productsList/ProductsLit'
import { products } from './data/products'
import Product from './components/products/products'

function App() {

  return (
    <Provider store={store}>
      <ProductsList>
        {products.map((pro) => (
          <div key={pro.id}>
            <Product {...pro} />
          </div>
        ))}
      </ProductsList>
    </Provider>
  )
}

export default App
