import React from 'react';
import { useCart } from '../store/cartcontext';

// Get the base URL from environment variables
const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

function CartSummary({ data }) {
  const { cartItems } = useCart();

  // Use props data if available, otherwise fallback to cartItems from the hook
  const items = data ? data.cartItems : cartItems;
  console.log(items);

  return (
    <div className="added-product-summary mb-30">
      <h5>Cart Summary</h5>
      <ul className="added-products">
        {items.map((item) => (
          <li className="single-product" key={item.id}>
            <div className="product-area">
              <div className="product-img">
                <img
                  src={
                    item.images[0]?.image
                      ? `${apiBaseUrl}${item.images[0]?.image}` // Use dynamic base URL
                      : '/assets/img/default-image.png'
                  }
                  alt={item.product_name}
                />
              </div>

              <div className="product-info">
                <h5>{item.product_name}</h5>

                <div className="product-total">
                  <strong>
                    <span className="product-price">{item.quantity}</span>
                  </strong>
                  <strong>
                    <i className="bi bi-x-lg px-2" />
                    <span className="product-price">${item.price}</span>
                  </strong>
                </div>
                {/* Display variations if available */}
                {item.variation?.map((variant) => (
                  <div key={variant.name} className="product-variation">
                    {variant.name}: {variant.value}
                  </div>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CartSummary;
