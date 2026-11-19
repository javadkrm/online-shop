import { useState } from 'react';
import './Navbar.css';
import CartSummary from '../../../features/cart/components/CartSummary';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { increaseCartQuantity, decreaseCartQuantity, clearCart, removeFromCart } from '../../../features/cart/cartSlice';
import { addToast } from '../../../features/feedback/feedbackSlice';
import { Link } from 'react-router-dom';

function Navbar() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const cartItems = useAppSelector(state => state.cart.items);
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    const dispatch = useAppDispatch();

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    {/* بخش سمت راست (لوگو و منوها در کنار هم) */}
                    <div className="navbar-left-group">
                        <a href="/" className="navbar-brand">
                            <span className="brand-icon">🛍️</span> Shop Management
                        </a>

                        <ul className="navbar-nav-links">
                            <li><Link className='nav-link' to="/">Home</Link></li>
                            <li className="nav-link"><Link className='nav-link' to="/products">Products</Link></li>
                            <li className="nav-link"><Link className='nav-link' to="/categories">Categories</Link></li>
                            <li className="nav-link"><Link className='nav-link' to="/blog">Blog</Link></li>
                        </ul>
                    </div>

                    {/* دکمه سبد خرید در سمت چپ */}
                    <div className="navbar-actions">
                        <CartSummary onClick={() => setIsCartOpen(true)} />
                        <Link
                            className="navbar-account-link"
                            to={isAuthenticated ? "/profile" : "/login"}
                        >
                            {isAuthenticated ? "Profile" : "Login"}
                        </Link>
                    </div>
                </div>
            </nav>

            {/* مودال / کشویی سبد خرید */}
            {isCartOpen && (
                <div className="cart-modal-overlay" onClick={() => setIsCartOpen(false)}>
                    <div className="cart-modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="cart-modal-header">
                            <h3>Shopping Cart</h3>
                            <button
                                type="button"
                                className="close-modal-btn"
                                onClick={() => setIsCartOpen(false)}
                            >
                                &times;
                            </button>
                        </div>
                        <div className="cart-modal-body">
                            {cartItems.length === 0 ? (
                                <p className="empty-cart-text">
                                    Your selected products will appear here.
                                </p>
                            ) : (
                                <>
                                    <ul className='cartItems-list'>
                                        {cartItems.map(item => (
                                            <li className='cartItems-list-item' key={item.id}>
                                                <img src={item.image} alt={item.title} className="cartItems-list-item-image" />
                                                <div className="cart-item-details">
                                                    <p className="cart-item-title" title={item.title}>{item.title}</p>
                                                    <p className="cart-item-price">${item.price.toFixed(2)}</p>
                                                </div>
                                                <div className="cart-item-actions">
                                                    <button className="qty-btn" onClick={() => dispatch(increaseCartQuantity(item))}>
                                                        <i className="fa fa-solid fa-plus"></i>
                                                    </button>
                                                    <span className="cart-item-quantity">{item.quantity}</span>
                                                    <button className="qty-btn" onClick={() => dispatch(decreaseCartQuantity(item.id))}>
                                                        <i className="fa fa-solid fa-minus"></i>
                                                    </button>
                                                    <button className="qty-btn delete-btn" onClick={() => {
                                                        dispatch(removeFromCart(item.id))
                                                        dispatch(addToast({ id: `${Date.now()}-${item.id}`, type: "info", message: `${item.title} removed from cart` }))
                                                    }}>
                                                        <i className="fa fa-solid fa-trash"></i>
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="cart-modal-footer">
                                        <div className="cart-summary-total">
                                            <span>Total Amount:</span>
                                            <span className="cart-total-price">
                                                ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                                            </span>
                                        </div>

                                        <div className="cart-actions-container">
                                            <button className="checkout-btn" onClick={() => alert('Checkout button clicked!')}>
                                                Checkout
                                            </button>
                                            <button className="clear-cart-btn" onClick={() => dispatch(clearCart())}>
                                                Clear All
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Navbar;