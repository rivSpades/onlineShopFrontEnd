import React from 'react';

const CartItem = ({ item, onRemove, onAdd }) => {
  // Use the environment variable for the backend URL
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  const variationDetails =
    item.variation.length > 0
      ? { [item.variation[0].name]: item.variation[0].value }
      : {};

  return (
    <li className="single-item">
      <div className="item-area">
        <div className="item-img ">
          <img
            src={`${apiBaseUrl}${item.images[0].image}`}
            alt={item.product_name}
          />
        </div>
        <div className="content-and-quantity">
          <div className="content">
            <div className="price-and-btn d-flex align-items-center justify-content-between">
              <span>
                {item.variation.length > 0
                  ? item.variation[0].price
                  : item.price}{' '}
                €<del>{item.originalPrice}</del>
              </span>
              <button
                className="close-btn"
                onClick={() => onRemove(item.product_id, item.id, true)}
              >
                <i className="bi bi-trash" />
              </button>
            </div>
            <p>
              <a href="#">{item.product_name}</a>
            </p>
            {item.variation.length > 0 && (
              <p>
                {item.variation[0].variation_type.name}:{' '}
                {item.variation[0].value} {item.variation[0].unit.symbol}
              </p>
            )}
          </div>
          <div className="quantity-area">
            <div className="quantity">
              <a
                className="quantity__minus"
                onClick={() => {
                  if (item.quantity > 1) {
                    onRemove(item.product_id, item.id, false);
                  } else {
                    onRemove(item.product_id, item.id, true);
                  }
                }}
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
                readOnly={true}
              />
              <a
                onClick={() => {
                  onAdd(item.product_id, 1, variationDetails);
                }}
                className="quantity__plus"
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
