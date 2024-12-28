import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../store/cartcontext';
const Product = ({ product }) => {
  const [selectedVariation, setSelectedVariation] = useState(
    product.variations && product.variations.length > 0
      ? product.variations[0]
      : null
  );

  const { addToCart } = useCart(); // Use the Cart context for adding items to the cart

  const handleVariationChange = (variation) => {
    setSelectedVariation(variation);
  };

  const handleAddToCart = async () => {
    await addToCart(product.id, 1, selectedVariation);
  };

  return (
    <div
      className={
        product.activeColumn &&
        `col${
          product.activeColumn === 'column-4'
            ? '-lg-3'
            : product.activeColumn === 'column-3'
            ? '-md-4'
            : product.activeColumn === 'column-2'
            ? '-sm-6'
            : 'nop'
        }`
      }
    >
      <div className="product-card style-3 hover-btn">
        <div className="product-card-img">
          <Link
            legacyBehavior
            href={`/shop/product-detail?slug=${product.slug}`}
          >
            <a>
              <img
                src={
                  selectedVariation?.images &&
                  selectedVariation.images.length > 0
                    ? selectedVariation.images[0].image_url
                    : product.images && product.images.length > 0
                    ? product.images[0].image_url
                    : '/path/to/placeholder.jpg'
                }
                alt={product.name}
              />
              <div className="batch">
                {product.discount && <span>{product.discount}</span>}
              </div>
            </a>
          </Link>
          {product.stock < 1 && (
            <div className="out-of-stock">
              <span>Out Of Stock</span>
            </div>
          )}
          <div className="overlay">
            <div className="cart-area">
              {product.stock > 0 && (
                <button
                  className="hover-btn3 add-cart-btn"
                  onClick={handleAddToCart}
                >
                  <i className="bi bi-bag-check" /> Add To Cart
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="product-card-content">
          <h6>
            <Link
              legacyBehavior
              href={`/shop/product-detail?slug=${product.slug}`}
            >
              <a className="hover-underline">{product.name}</a>
            </Link>
          </h6>
          <p>
            <Link legacyBehavior href="/shop">
              <a>{product.description}</a>
            </Link>
          </p>
          <p className="price">
            {selectedVariation ? selectedVariation.price : product.price}€
          </p>
          {product.variations && product.variations.length > 0 && (
            <ul className="product-size">
              {product.variations.map((variation) => (
                <li
                  key={variation.id}
                  className={
                    selectedVariation?.id === variation.id ? 'selected' : ''
                  }
                  onClick={() => handleVariationChange(variation)}
                >
                  {variation.value} {variation.unit.symbol}
                </li>
              ))}
            </ul>
          )}
        </div>
        <span className="for-border" />
      </div>
    </div>
  );
};

export default Product;
