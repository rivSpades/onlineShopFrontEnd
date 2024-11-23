// Product.js
import React from 'react';
import Link from 'next/link';

const Product = ({ product }) => {
  console.log(product);
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
              {/* Display the first image or a placeholder if there are no images */}
              <img
                src={
                  product.images.length > 0
                    ? product.images[0].image
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
                <Link legacyBehavior href="/shop/cart">
                  <a className="hover-btn3 add-cart-btn">
                    {product.variations ? 'Select Options' : 'Add To Cart'}
                  </a>
                </Link>
              )}
            </div>
          </div>
          <div className="view-and-favorite-area">
            <ul>
              <li>
                <a data-bs-toggle="modal" data-bs-target="#product-view">
                  {/* View Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={22}
                    height={22}
                    viewBox="0 0 22 22"
                  >
                    <path d="M21.8601 10.5721C21.6636 10.3032 16.9807 3.98901 10.9999 3.98901C5.019 3.98901 0.335925 10.3032 0.139601 10.5718C0.0488852 10.6961 0 10.846 0 10.9999C0 11.1537 0.0488852 11.3036 0.139601 11.4279C0.335925 11.6967 5.019 18.011 10.9999 18.011C16.9807 18.011 21.6636 11.6967 21.8601 11.4281C21.951 11.3039 21.9999 11.154 21.9999 11.0001C21.9999 10.8462 21.951 10.6963 21.8601 10.5721ZM10.9999 16.5604C6.59432 16.5604 2.77866 12.3696 1.64914 10.9995C2.77719 9.62823 6.58487 5.43955 10.9999 5.43955C15.4052 5.43955 19.2206 9.62969 20.3506 11.0005C19.2225 12.3717 15.4149 16.5604 10.9999 16.5604Z" />
                    <path d="M10.9999 6.64832C8.60039 6.64832 6.64819 8.60051 6.64819 11C6.64819 13.3994 8.60039 15.3516 10.9999 15.3516C13.3993 15.3516 15.3515 13.3994 15.3515 11C15.3515 8.60051 13.3993 6.64832 10.9999 6.64832ZM10.9999 13.9011C9.40013 13.9011 8.09878 12.5997 8.09878 11C8.09878 9.40029 9.40017 8.0989 10.9999 8.0989C12.5995 8.0989 13.9009 9.40029 13.9009 11C13.9009 12.5997 12.5996 13.9011 10.9999 13.9011Z" />
                  </svg>
                </a>
              </li>
            </ul>
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
            {product.price} {product.oldPrice && <del>{product.oldPrice}</del>}
          </p>
        </div>
        <span className="for-border" />
      </div>
    </div>
  );
};

export default Product;
