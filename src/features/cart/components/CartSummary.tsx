import { useCart } from "../hooks/useCart";

function CartSummary() {
  const { quantity } = useCart();

  return <span>Cart Quantity: {quantity}</span>;
}

export default CartSummary;
