import { useAppSelector } from '../../app/hooks'

function Navbar() {

    const cartQuantity = useAppSelector(
        state =>
            state.cart.items.reduce((total, item) => total + item.quantity, 0)
    )
    return (
        <div>
            Navbar
            <span>Cart Quantity: {cartQuantity}</span>
        </div>
    )
}

export default Navbar