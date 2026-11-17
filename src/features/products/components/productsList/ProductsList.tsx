
import { useState } from 'react'
import ProductItem from '../productItem/ProductItem'
import './ProductList.css'
import { useGetProductsQuery } from '../../services/productsApi'

const ProductsList = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const limit = 12

    const {
        data,
        isLoading,
        isFetching,
        isError,
        error,
        refetch,
    } = useGetProductsQuery({ page: currentPage, limit }, { refetchOnMountOrArgChange: 30 })

    const totalPages = Math.ceil((data?.total ?? 0) / limit) || 1

    if (isLoading) {
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

    if (isError) {
        const errorMessage =
            'status' in error && error.status === 404
                ? 'محصول موردنظر پیدا نشد.'
                : 'خطایی در برقراری ارتباط با سرور رخ داده است.'

        return (
            <div className="products-status-container">
                <div className="status-card error-card">
                    <h3>خطا در بارگذاری</h3>
                    <p>{errorMessage}</p>
                    <button className="retry-btn" onClick={refetch}>
                        تلاش مجدد
                    </button>
                </div>
            </div>
        )
    }

    const items = data?.products ?? []

    if (items.length === 0) {
        return (
            <div className="products-status-container">
                <div className="status-card empty-card">
                    <h3>محصولی یافت نشد</h3>
                    <p>در حال حاضر محصولی برای نمایش در این صفحه وجود ندارد.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="products-container">

            {isFetching && !isLoading && (
                <p className="fetching-indicator">
                    در حال به‌روزرسانی محصولات...
                </p>
            )}
            
            <ul className="products-grid">
                {items.map((product) => (
                    <li key={product.id}>
                        <ProductItem product={product} />
                    </li>
                ))}
            </ul>

            <nav className="pagination" aria-label="Product Pagination">
                <button
                    type="button"
                    className="pagination-btn"
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                <div className="pagination-info">
                    <span className="current-page">{currentPage}</span>
                    {' '}of{' '}
                    <span className="total-pages">{totalPages}</span>
                </div>

                <button
                    type="button"
                    className="pagination-btn"
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </nav>
        </div>
    )
}

export default ProductsList
