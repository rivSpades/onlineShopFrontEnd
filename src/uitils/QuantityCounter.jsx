import React from 'react';
import useQuantityCounter from '../hooks/useQuantityCounter';

function QuantityCounter({ quantity, setQuantity }) {
  return (
    <div className="quantity-counter">
      <div
        className="quantity__minus"
        style={{ cursor: 'pointer' }}
        onClick={() => setQuantity((prevValue) => prevValue - 1)}
      >
        <i className="bx bx-minus" />
      </div>
      <input
        name="quantity"
        type="text"
        className="quantity__input"
        value={quantity}
      />
      <div
        className="quantity__plus"
        style={{ cursor: 'pointer' }}
        onClick={() => setQuantity((prevValue) => prevValue + 1)}
      >
        <i className="bx bx-plus" />
      </div>
    </div>
  );
}

export default QuantityCounter;
