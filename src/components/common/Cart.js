import Link from 'next/link';
import React, { useState, useEffect, useRef, useContext } from 'react';
import CartItem from './CartItem'; // Import the CartItem component
import { useCart } from '@/src/store/cartcontext';
import { AuthContext } from '@/src/store/authcontext';

const Cart = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const cartButtonRef = useRef(null);
  const cartMenuRef = useRef(null);

  const {
    cartItems,
    cartData,
    removeFromCart,
    loading,
    showCart,
    setShowCart,
    addToCart,
  } = useCart();

  const handleCartButtonClick = () => {
    setShowCart(!showCart);
  };

  const handleOutsideClick = (event) => {
    if (
      cartMenuRef.current &&
      !cartMenuRef.current.contains(event.target) &&
      cartButtonRef.current &&
      !cartButtonRef.current.contains(event.target)
    ) {
      setShowCart(false);
    }
  };

  const handleRemoveItem = async (
    productId,
    cartItemId,
    removeItem = false
  ) => {
    await removeFromCart(productId, cartItemId, removeItem); // Pass only the item ID to remove the item
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <>
      <button
        ref={cartButtonRef}
        onClick={handleCartButtonClick}
        type="button"
        className="modal-btn header-cart-btn"
      >
        <svg
          width={18}
          height={18}
          viewBox="0 0 18 18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14.0139 18H3.98532C1.86389 18 0.128174 16.2643 0.128174 14.1429V14.0143L0.513888 3.72857C0.578174 1.60714 2.31389 0 4.37103 0H13.6282C15.6853 0 17.421 1.60714 17.4853 3.72857L17.871 14.0143C17.9353 15.0429 17.5496 16.0071 16.8425 16.7786C16.1353 17.55 15.171 18 14.1425 18H14.0139ZM4.37103 1.28571C2.95675 1.28571 1.86389 2.37857 1.7996 3.72857L1.41389 14.1429C1.41389 15.5571 2.57103 16.7143 3.98532 16.7143H14.1425C14.8496 16.7143 15.4925 16.3929 15.9425 15.8786C16.3925 15.3643 16.6496 14.7214 16.6496 14.0143L16.2639 3.72857C16.1996 2.31429 15.1067 1.28571 13.6925 1.28571H4.37103Z" />
          <path d="M8.99951 7.71427C6.49237 7.71427 4.49951 5.72141 4.49951 3.21427C4.49951 2.82855 4.75665 2.57141 5.14237 2.57141C5.52808 2.57141 5.78523 2.82855 5.78523 3.21427C5.78523 5.01427 7.19951 6.42855 8.99951 6.42855C10.7995 6.42855 12.2138 5.01427 12.2138 3.21427C12.2138 2.82855 12.4709 2.57141 12.8567 2.57141C13.2424 2.57141 13.4995 2.82855 13.4995 3.21427C13.4995 5.72141 11.5067 7.71427 8.99951 7.71427Z" />
        </svg>
        <span>
          {!loading && cartItems.length > 0
            ? cartItems.reduce((sum, item) => sum + item.quantity, 0)
            : 0}
        </span>
      </button>
      <div
        ref={cartMenuRef}
        className={`cart-menu ${showCart ? 'active' : ''}`}
      >
        <div className="cart-body">
          <ul>
            {loading ? (
              <p>Loading...</p>
            ) : cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={handleRemoveItem}
                  onAdd={addToCart}
                />
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
          </ul>
        </div>
        <div className="cart-footer">
          <div className="pricing-area">
            <ul>
              <li>
                <span>Sub Total</span>
                <span>{cartData.total} €</span>
              </li>
              <li>
                <span>Tax</span>
                <span>{cartData.tax} €</span>
              </li>
            </ul>
            <ul className="total">
              <li>
                <span>Total</span>
                <span>{cartData.grand_total} €</span>
              </li>
            </ul>
          </div>
          <div className="footer-button">
            <ul>
              <li>
                <button
                  onClick={handleCartButtonClick}
                  className="w-100 primary-btn1 hover-btn4"
                >
                  Continue Shopping
                </button>
              </li>
              <li>
                {/* Check if cart has items before showing checkout button */}
                {cartItems.length > 0 &&
                  (isLoggedIn ? (
                    <Link legacyBehavior href={'/shop/checkout'}>
                      <a
                        onClick={handleCartButtonClick}
                        className="primary-btn1 hover-btn3"
                      >
                        Product Checkout
                      </a>
                    </Link>
                  ) : (
                    <button
                      onClick={handleCartButtonClick}
                      data-bs-toggle="modal"
                      data-bs-target="#user-login"
                      className="primary-btn1 hover-btn3 w-100"
                    >
                      Product Checkout
                    </button>
                  ))}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
