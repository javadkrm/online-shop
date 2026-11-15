import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import ProductItem from '../productItem/ProductItem'

const ProductsList = () => {
    const dispatch = useAppDispatch()

    return (
        <div>
            <ProductItem />
        </div>
    )
}



export default ProductsList