import { useCart } from "../hooks/useCart";

interface CartSummaryProps {
    onClick: () => void;
}

function CartSummary({ onClick }: CartSummaryProps) {
    const { quantity } = useCart();

    return (
        <button
            type="button"
            className="cart-summary-btn"
            onClick={onClick}
            aria-label={`Shopping cart, ${quantity} ${quantity === 1 ? "item" : "items"}`}
        >
            <span className="cart-summary-label">🛒 Shopping Cart</span>
            <span className="cart-badge">{quantity || 0}</span>
        </button>
    );
}

export default CartSummary;