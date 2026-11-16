import { useGetProductsQuery } from '../../services/productsApi'
import ProductItem from '../productItem/ProductItem'
import './ProductList.css'

const ProductsList = () => {
    const { data: products, isLoading, isError } = useGetProductsQuery()
    // const {data : Products, isLoading, isError} = useAppDispatch((state: any) => state.products)

    if (isLoading) {
        return <p className="products-status">در حال دریافت محصولات...</p>
    }

    if (isError) {
        return <p className="products-status error">دریافت محصولات با خطا مواجه شد.</p>
    }

    if (!products?.length) {
        return <p className="products-status">محصولی یافت نشد.</p>
    }

    return (
        <div className="products-container">
            <ul className="products-grid">
                {products.length > 0 ? products.map(product => (
                    <li key={product.id}>
                        <ProductItem product={product} />
                    </li>
                )) : <p className="products-status">محصولی یافت نشد.</p>}
            </ul>
        </div>
    )
}

export default ProductsList