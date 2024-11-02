// CartItem.js
import React from 'react';

const CartItem = ({ item, onRemove, onQuantityChange }) => {
  const handleQuantityChange = (event) => {
    const newQuantity = event.target.value;
    onQuantityChange(item.id, newQuantity);
  };

  return (
    <li className="single-item">
      <div className="item-area">
        <div className="item-img ">
          <img
            src={'http://localhost:8000' + item.images[0].image}
            alt={item.product_name}
          />
        </div>
        <div className="content-and-quantity">
          <div className="content">
            <div className="price-and-btn d-flex align-items-center justify-content-between">
              <span>
                {item.price} <del>${item.originalPrice}</del>
              </span>
              <button className="close-btn" onClick={() => onRemove(item.id)}>
                <i className="bi bi-trash" />
              </button>
            </div>
            <p>
              <a href="#">{item.product_name}</a>
            </p>
            {item.variation.length > 0 && (
              <p>
                {item.variation[0].name}: {item.variation[0].value}{' '}
              </p>
            )}
          </div>
          <div className="quantity-area">
            <div className="quantity">
              <a
                className="quantity__minus"
                onClick={() => onQuantityChange(item.id, item.quantity - 1)}
              >
                <span>
                  <i className="bi bi-dash" />
                </span>
              </a>
              <input
                name="quantity"
                type="text"
                className="quantity__input"
                value={item.quantity}
                onChange={handleQuantityChange}
              />
              <a
                className="quantity__plus"
                onClick={() => onQuantityChange(item.id, item.quantity + 1)}
              >
                <span>
                  <i className="bi bi-plus" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
