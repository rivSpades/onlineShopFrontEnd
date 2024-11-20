import React, { createContext, useContext, useState, useEffect } from 'react';
import { addToCart, removeFromCart, fetchCartItems } from '../data/cart';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartData, setCartData] = useState({
    total: 0,
    tax: 0,
    grand_total: 0,
  });
  const [showCart, setShowCart] = useState(false);

  const loadCartItems = async () => {
    setLoading(true);
    try {
      const data = await fetchCartItems();
      const { total, tax, grand_total, cart_items } = data;
      setCartItems(cart_items);
      setCartData({ total, tax, grand_total });
    } catch (error) {
      console.error('Error fetching cart items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCartItems();
  }, []);

  const handleAddToCart = async (productId, quantity, variations) => {
    try {
      await addToCart(productId, quantity, variations);
      await loadCartItems(); // Refetch cart items and totals after adding
      setShowCart(true);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleRemoveFromCart = async (
    productId,
    cartItemId,
    removeItem = false
  ) => {
    try {
      await removeFromCart(productId, cartItemId, removeItem);
      await loadCartItems(); // Refetch cart items and totals after removing
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartData,
        loading,
        addToCart: handleAddToCart,
        removeFromCart: handleRemoveFromCart,
        refetchCartItems: loadCartItems,
        setShowCart: setShowCart,
        showCart: showCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);
