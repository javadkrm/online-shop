import type { ReactNode } from "react"

type ChildrenProps = {
    children : ReactNode
}

function ProductsList ({children}: ChildrenProps) {

    return (
        <div className="products-list">
            <div className="product-items">
                {children}
            </div>
        </div>
    )
}

export default ProductsList