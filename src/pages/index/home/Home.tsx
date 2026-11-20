import './Home.scss'
import ProductsList from '../../../features/products/components/productsList/ProductsList'
import Slider from '../slider/Slider'

function Home() {
    return (
        <div className="home">
            <Slider />

            <section className="home-products" aria-labelledby="home-products-title">
                <header className="home-products__header">
                    <div>
                        <p className="home-products__eyebrow">Explore our store</p>
                        <h1 id="home-products-title">Discover our products</h1>
                    </div>
                    <p className="home-products__description">
                        Browse our catalog and find the right products for you.
                    </p>
                </header>
                <ProductsList />
            </section>
        </div>
    )
}

export default Home