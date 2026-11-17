import { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../../../app/hooks'
import ProductItem from '../productItem/ProductItem'
import './ProductList.css'
import { fetchProducts } from '../../ProductSlice'

const ProductsList = () => {
    const dispatch = useAppDispatch()
    const [currentPage, setCurrentPage] = useState(1)
    const limit = 10

    const { items, loading, error, total } = useAppSelector((state) => state.products)
    const totalPages = Math.ceil(total / limit) || 1

    useEffect(() => {
        dispatch(fetchProducts({ page: currentPage, limit }))
    }, [dispatch, currentPage])

    const handleRetry = () => {
        dispatch(fetchProducts({ page: currentPage, limit }))
    }

    // لودینگ حرفه‌ای با Skeleton
    if (loading) {
        return (
            <div className="products-container">
                <div className="products-grid">
                    {Array.from({ length: limit }).map((_, index) => (
                        <div key={index} className="product-card skeleton-card">
                            <div className="skeleton-image"></div>
                            <div className="product-info">
                                <div className="skeleton-line title-line"></div>
                                <div className="skeleton-line title-line short"></div>
                                <div className="product-footer">
                                    <div className="skeleton-line price-line"></div>
                                    <div className="skeleton-line btn-line"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    // حالت خطای پیشرفته با دکمه تلاش مجدد
    if (error) {
        const errorMessage =
            error.status === 404
                ? "محصول موردنظر پیدا نشد."
                : error.status === 403
                ? "شما اجازه دسترسی به این بخش را ندارید."
                : "خطایی در برقراری ارتباط با سرور رخ داده است.";

        return (
            <div className="products-status-container">
                <div className="status-card error-card">
                    <svg className="status-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h3>خطا در بارگذاری</h3>
                    <p>{errorMessage}</p>
                    <button className="retry-btn" onClick={handleRetry}>
                        تلاش مجدد
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="products-container">
            {items.length === 0 ? (
                <div className="products-status-container">
                    <div className="status-card empty-card">
                        <svg className="status-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <h3>محصولی یافت نشد</h3>
                        <p>در حال حاضر محصولی برای نمایش در این صفحه وجود ندارد.</p>
                    </div>
                </div>
            ) : (
                <>
                    <ul className="products-grid">
                        {items.map((product) => (
                            <li key={product.id}>
                                <ProductItem product={product} />
                            </li>
                        ))}
                    </ul>

                    {/* بخش صفحه‌بندی پیشرفته */}
                    <nav className="pagination" aria-label="Product Pagination">
                        <button
                            type="button"
                            className="pagination-btn"
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            قبلی
                        </button>

                        <div className="pagination-info">
                            صفحه <span className="current-page">{currentPage}</span> از <span className="total-pages">{totalPages}</span>
                        </div>

                        <button
                            type="button"
                            className="pagination-btn"
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            بعدی
                        </button>
                    </nav>
                </>
            )}
        </div>
    )
}

export default ProductsList