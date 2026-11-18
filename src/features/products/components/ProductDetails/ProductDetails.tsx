import { useState, useEffect } from 'react';
import { useGetProductByIdQuery } from '../../services/productsApi';
import './ProductDetails.scss';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../app/hooks';
import { addToCart } from '../../../cart/cartSlice';
import { addToast } from '../../../feedback/feedbackSlice';

function ProductDetails() {
    const productId = useParams().id;
    const { data: product, isLoading, isError } = useGetProductByIdQuery(Number(productId));

    const [activeImage, setActiveImage] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('warranty');

    const dispatch = useAppDispatch();

    const handleAddToCart = () => {
        if (!product) return;
        if (product.stock <= 0) return

        dispatch(addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            quantity,
            image: product.thumbnail || product.images?.[0] || '',
        }));
        dispatch(addToast({ message: 'Product added to cart successfully!', type: 'success', id: new Date().toISOString() }));
    };

    useEffect(() => {
        if (product) {
            setActiveImage(product.thumbnail || product.images?.[0] || '');
            setQuantity(product.minimumOrderQuantity || 1);
        }
    }, [product]);

    if (isLoading) {
        return (
            <div className="product-status-container">
                <div className="spinner"></div>
                <p className="loading-text">Loading product information...</p>
            </div>
        );
    }

    if (isError || !product) {
        return (
            <div className="product-status-container error">
                <span className="error-icon">⚠️</span>
                <p className="error-text">Unable to load product information or product not found!</p>
            </div>
        );
    }

    const discountedPrice = (product.price - (product.price * product.discountPercentage) / 100).toFixed(2);

    return (
        <div className="product-details-container">
            {/* بخش اصلی محصول: گالری و اطلاعات خرید */}
            <div className="product-main-grid">

                {/* ستون چپ: گالری تصاویر */}
                <div className="product-gallery">
                    <div className="main-image-wrapper">
                        {product.discountPercentage > 0 && (
                            <span className="discount-float-badge">{product.discountPercentage}% OFF</span>
                        )}
                        <img
                            src={activeImage}
                            alt={product.title}
                        />
                    </div>
                    {product.images && product.images.length > 1 && (
                        <div className="thumbnails-list">
                            {product.images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveImage(img)}
                                    className={`thumbnail-btn ${activeImage === img ? 'active' : ''}`}
                                >
                                    <img src={img} alt={`thumbnail-${index}`} />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* ستون راست: اطلاعات و مشخصات */}
                <div className="product-info">
                    <div className="product-info-top">
                        <div className="category-stock-wrapper">
                            <span className="category-badge">
                                {product.category} {product.brand && `• ${product.brand}`}
                            </span>
                            <span className={`stock-badge ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                                <span className="dot"></span>
                                {product.availabilityStatus} ({product.stock} in stock)
                            </span>
                        </div>

                        <h1 className="product-title">{product.title}</h1>

                        {product.rating && (
                            <div className="rating-wrapper">
                                <div className="stars">
                                    {'★'.repeat(Math.round(product.rating))}
                                    <span className="empty-stars">{'★'.repeat(5 - Math.round(product.rating))}</span>
                                </div>
                                <span className="rating-number">{product.rating}</span>
                                <span className="reviews-count">({product.reviews?.length || 0} reviews)</span>
                            </div>
                        )}

                        <div className="price-box">
                            <div className="price-row">
                                <span className="current-price">${discountedPrice}</span>
                                {product.discountPercentage > 0 && (
                                    <span className="original-price">${product.price}</span>
                                )}
                            </div>
                        </div>

                        <p className="product-description">{product.description}</p>

                        <div className="specs-grid">
                            {product.sku && <div className="spec-item"><span>SKU:</span> <strong>{product.sku}</strong></div>}
                            {product.brand && <div className="spec-item"><span>Brand:</span> <strong>{product.brand}</strong></div>}
                            {product.weight && <div className="spec-item"><span>Weight:</span> <strong>{product.weight} g</strong></div>}
                            {product.dimensions && (
                                <div className="spec-item"><span>Dimensions:</span> <strong>{product.dimensions.width}×{product.dimensions.height}×{product.dimensions.depth}</strong></div>
                            )}
                        </div>
                    </div>

                    <div className="cart-action-wrapper">
                        <div className="quantity-cart-group">
                            <div className="quantity-selector">
                                <button onClick={() => setQuantity(q => Math.max(product.minimumOrderQuantity || 1, q - 1))}>-</button>
                                <span className="quantity-number">{quantity}</span>
                                <button onClick={() => setQuantity(q => q + 1)}>+</button>
                            </div>
                            <button
                                className="add-to-cart-btn"
                                onClick={handleAddToCart}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" /></svg>
                                Add to Cart
                            </button>
                        </div>
                        {product.minimumOrderQuantity && (
                            <p className="min-order-text">
                                Minimum order quantity: <strong>{product.minimumOrderQuantity}</strong>
                                {product.shippingInformation ? ` | ${product.shippingInformation}` : ''}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* بخش پایین: تب‌های اطلاعات تکمیلی و نظرات */}
            <div className="product-footer-section">
                <div className="tabs-header">
                    <button
                        className={`tab-btn ${activeTab === 'warranty' ? 'active' : ''}`}
                        onClick={() => setActiveTab('warranty')}
                    >
                        Shipping & Warranty
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                        onClick={() => setActiveTab('reviews')}
                    >
                        Customer Reviews ({product.reviews?.length || 0})
                    </button>
                </div>

                <div className="tab-content">
                    {activeTab === 'warranty' && (
                        <div className="card-box warranty-box">
                            <ul className="warranty-list">
                                {product.warrantyInformation && <li><span className="icon">🛡️</span> {product.warrantyInformation}</li>}
                                {product.shippingInformation && <li><span className="icon">📦</span> {product.shippingInformation}</li>}
                                {product.returnPolicy && <li><span className="icon">🔄</span> {product.returnPolicy}</li>}
                            </ul>
                        </div>
                    )}

                    {activeTab === 'reviews' && (
                        <div className="card-box reviews-box">
                            {product.reviews && product.reviews.length > 0 ? (
                                <div className="reviews-list">
                                    {product.reviews.map((review, idx) => (
                                        <div key={idx} className="review-item">
                                            <div className="review-header">
                                                <span className="reviewer-name">{review.reviewerName}</span>
                                                <div className="stars-sm">{'★'.repeat(review.rating)}</div>
                                            </div>
                                            <p className="review-comment">{review.comment}</p>
                                            <span className="review-date">
                                                {new Date(review.date).toLocaleDateString('en-US')}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="no-reviews">No reviews yet. Be the first to review this product!</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;