import type { Product } from '../../services/productsApi'
import { useAppDispatch } from '../../../../app/hooks'
import { addToCart } from '../../../cart/cartSlice'

interface ProductItemProps {
    product: Product
}

function ProductItem({ product }: ProductItemProps) {
    const dispatch = useAppDispatch()

    return (
        <div className="product-card">
            <div className="product-image-container">
                <img 
                    src={product.image} 
                    alt={product.title} 
                    className="product-image" 
                />
            </div>
            <div className="product-info">
                <h2 className="product-title" title={product.title}>
                    {product.title}
                </h2>
                <div className="product-footer">
                    <p className="product-price">${product.price.toFixed(2)}</p>
                    <button 
                        type="button" 
                        className="add-to-cart-btn"
                        onClick={() => dispatch(addToCart(product))}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductItem