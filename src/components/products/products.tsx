import { useDispatch } from "react-redux"
import { addToCart } from "../../store/cart-slice"

type ProductProp = {
    id: number,
    title: string,
    price: number,
    image: string,
    count : number
}

function Product ({id, title , price, image, count}: ProductProp) {

    const dispatch = useDispatch()

    const addDispatchHandler = () => {
        dispatch(addToCart({id, title, price, image, count}))
    }

    return (
        <>
        <div className="products">
            <img src={image}/>
            <div>
                <p>{title}</p>
                <p>{price}</p>
            </div>
            <button onClick={addDispatchHandler}>Add To Basket</button>
        </div>
        </>
    )
}

export default Product