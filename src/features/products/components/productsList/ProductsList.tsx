import { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../../../app/hooks'
import ProductItem from '../productItem/ProductItem'
import './ProductList.css'
import { fetchProducts } from '../../ProductSlice'

const ProductsList = () => {
    const dispatch = useAppDispatch()
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        dispatch(fetchProducts({ page: currentPage, limit }))
    }, [dispatch, currentPage])

    const limit = 10
    const { items, loading, error, total } = useAppSelector((state) => state.products)// Assuming 10 items per page
    const totalPages = Math.ceil(total / limit)

    if (loading) {
        return <p className="products-status">در حال دریافت محصولات...</p>
    }

    if (error) {
        const errorMessage =
            error.status === 404
                ? "محصول موردنظر پیدا نشد."
                : error.status === 403
                    ? "شما اجازه دسترسی ندارید."
                    : "خطایی در سرور رخ داده است.";

        return <p className="products-status error">{errorMessage}</p>;
    }

    return (
        <div className="products-container">
            {items.length === 0 ? (
                <p className="products-status">محصولی یافت نشد.</p>
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
                            Previous
                        </button>

                        <div className="pagination-info">
                            <span className="current-page">{currentPage}</span>
                            <span className="total-pages"> / {totalPages}</span>
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
                </>
            )}
        </div>
    )
}

export default ProductsList