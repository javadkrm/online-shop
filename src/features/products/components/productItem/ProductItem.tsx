import type { Product } from '../../types/Product'
import { useAppDispatch } from '../../../../app/hooks'
import { increaseCartQuantity } from '../../../cart/cartSlice'
import './ProductItem.css'

interface ProductItemProps {
    product: Product
}

function ProductItem({ product }: ProductItemProps) {
    const dispatch = useAppDispatch()

    const hasDiscount = product.discountPercentage > 0
    const discountedPrice = hasDiscount
        ? product.price * (1 - product.discountPercentage / 100)
        : product.price

    const productImage = product.thumbnail || product.images?.[0] || ''

    return (
        <div className="product-card">
            {hasDiscount && (
                <span className="discount-badge">
                    {Math.round(product.discountPercentage)}% تخفیف
                </span>
            )}

            <div className="product-image-container">
                <img 
                    src={productImage} 
                    alt={product.title} 
                    className="product-image" 
                    loading="lazy"
                />
            </div>

            <div className="product-info">
                <div className="product-meta-header">
                    {product.brand && <span className="product-brand">{product.brand}</span>}
                    <div className="product-rating" aria-label={`امتیاز ${product.rating} از 5`}>
                        <svg className="star-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>{product.rating.toFixed(1)}</span>
                    </div>
                </div>

                <h2 className="product-title" title={product.title}>
                    {product.title}
                </h2>

                <div className="product-footer">
                    <div className="product-price-box">
                        <span className="product-price">${discountedPrice.toFixed(2)}</span>
                        {hasDiscount && (
                            <span className="product-original-price">${product.price.toFixed(2)}</span>
                        )}
                    </div>
                    <button
                        type="button"
                        className="add-to-cart-btn"
                        onClick={() => dispatch(increaseCartQuantity({
                            id: product.id,
                            title: product.title,
                            price: product.price,
                            image: productImage,
                        }))}
                    >
                        افزودن
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductItem