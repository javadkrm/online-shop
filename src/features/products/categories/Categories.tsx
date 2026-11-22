
import { Link, useParams } from 'react-router-dom'
import { useGetCategoriesQuery } from '../services/productsApi'
import './Categories.scss'

function Categories() {
    const { category } = useParams()
    const {
        data: categories,
        isLoading,
        isError,
    } = useGetCategoriesQuery()

    return (
        <section className="categories" aria-labelledby="categories-title">
            <div className="categories__header">
                <h2 className="categories__title" id="categories-title">
                    Shop by category
                </h2>
                <p className="categories__description">
                    Find the products you are looking for
                </p>
            </div>

            <nav className="categories__list" aria-label="Product categories" aria-busy={isLoading}>
                <Link
                    to="/products"
                    className={`categories__item${!category ? ' categories__item--active' : ''}`}
                    aria-current={!category ? 'page' : undefined}
                >
                    All products
                </Link>

                {isLoading &&
                    Array.from({ length: 5 }, (_, index) => (
                        <span
                            key={index}
                            className="categories__item categories__item--skeleton"
                            aria-hidden="true"
                        />
                    ))}

                {!isLoading &&
                    categories?.map((item) => {
                        const isActive = category === item.slug

                        return (
                            <Link
                                key={item.slug}
                                to={`/products/category/${item.slug}`}
                                className={`categories__item${isActive ? ' categories__item--active' : ''}`}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                {item.name}
                            </Link>
                        )
                    })}
            </nav>

            {isError && (
                <p className="categories__error" role="alert">
                    Categories could not be loaded. You can still browse all products.
                </p>
            )}
        </section>
    )
}

export default Categories
