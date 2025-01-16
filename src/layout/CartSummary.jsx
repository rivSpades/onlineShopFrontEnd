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
                  src={`${
                    item.variation[0].images.length > 0
                      ? item.variation[0].images[0].image_url
                      : item.images.length > 0 && item.images[0].image_url
                  }`}
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
                    <span className="product-price">
                      {item.variation[0].price} €
                    </span>
                  </strong>
                </div>
                {/* Display variations if available */}
                {item.variation?.map((variant) => (
                  <div
                    key={variant.variation_type.name}
                    className="product-variation"
                  >
                    {variant.variation_type.name}: {variant.value}{' '}
                    {variant.unit.symbol}
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
