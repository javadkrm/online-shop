import { useState } from 'react';
import './Navbar.css';
import CartSummary from '../../../features/cart/components/CartSummary';
import { useAppSelector } from '../../hooks';

function Navbar() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const cartItems = useAppSelector(state => state.cart.items);

    return (
        <>
            <nav className="navbar">
                <a href="/" className="navbar-brand">فروشگاه من</a>
                <CartSummary onClick={() => setIsCartOpen(true)} />
            </nav>

            {/* مودال سبد خرید */}
            {isCartOpen && (
                <div className="cart-modal-overlay" onClick={() => setIsCartOpen(false)}>
                    <div className="cart-modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="cart-modal-header">
                            <h3>سبد خرید شما</h3>
                            <button 
                                type="button" 
                                className="close-modal-btn" 
                                onClick={() => setIsCartOpen(false)}
                            >
                                &times;
                            </button>
                        </div>
                        <div className="cart-modal-body">
                            {/* اینجا می‌توانید محتویات و لیست آیتم‌های سبد خرید را قرار دهید */}
                            {cartItems.length === 0 ? (
                                <p style={{ color: '#718096', textAlign: 'center', marginTop: '2rem' }}>
                                    محصولات انتخاب شده شما اینجا نمایش داده می‌شوند.
                                </p>
                            ) : (
                                <ul className='cartItems-list'>
                                    {cartItems.map(item => (
                                        <li className='cartItems-list-item' key={item.id}>
                                            <img src={item.image} alt={item.title} className="cartItems-list-item-image" />
                                            {item.title} - {item.price}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Navbar;