import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useMagneticHover from '@/src/hooks/useMagneticHover';
import QuantityCounter from '@/src/uitils/QuantityCounter';
import { addToCart } from '@/src/data/cart';
import { fetchProductDetail } from '@/src/data/productList';
import { useCart } from '@/src/store/cartcontext';
const ProductDefaultPage = ({ product, error }) => {
  const [selectedVariation, setSelectedVariation] = useState(
    product.variations && product.variations.length > 0
      ? product.variations[0]
      : null
  );
  const [quantity, setQuantity] = useState(1); // Default quantity to 1
  console.log(product);
  useMagneticHover();
  const { addToCart, refetchCartItems } = useCart();
  const handleVariationChange = (variation) => {
    setSelectedVariation(variation);
  };
  const handleAddToCart = async () => {
    await addToCart(product.id, quantity, {
      'id': selectedVariation.id,
    });
  };
  console.log(selectedVariation);
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found</p>;
  return (
    <>
      <div className="shop-details-top-section mt-110 mb-110">
        <div className="container-xl container-fluid-lg container">
          <div className="row gy-5">
            <div className="col-lg-6">
              <div className="shop-details-img">
                <div className="tab-content" id="v-pills-tabContent">
                  {selectedVariation?.images &&
                  selectedVariation.images.length > 0
                    ? selectedVariation.images.map((image, index) => (
                        <div
                          key={image.id}
                          style={{ overflow: 'hidden' }}
                          className={`tab-pane fade ${
                            index === 0 ? 'show active' : ''
                          }`}
                          id={`v-pills-img${index + 1}`}
                          role="tabpanel"
                          aria-labelledby={`v-pills-img${index + 1}-tab`}
                        >
                          <div
                            className="shop-details-tab-img product-img--main"
                            data-scale="1.4"
                          >
                            <img src={image.image_url} alt={product.name} />
                          </div>
                        </div>
                      ))
                    : product.images.map((image, index) => (
                        <div
                          key={image.id}
                          style={{ overflow: 'hidden' }}
                          className={`tab-pane fade ${
                            index === 0 ? 'show active' : ''
                          }`}
                          id={`v-pills-img${index + 1}`}
                          role="tabpanel"
                          aria-labelledby={`v-pills-img${index + 1}-tab`}
                        >
                          <div
                            className="shop-details-tab-img product-img--main"
                            data-scale="1.4"
                          >
                            <img src={image.image_url} alt={product.name} />
                          </div>
                        </div>
                      ))}
                </div>
                <div
                  className="nav nav-pills"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  {(selectedVariation?.images &&
                  selectedVariation.images.length > 0
                    ? selectedVariation.images
                    : product.images
                  ).map((image, index) => (
                    <button
                      key={image.id}
                      className={`nav-link ${index === 0 ? 'active' : ''}`}
                      id={`v-pills-img${index + 1}-tab`}
                      data-bs-toggle="pill"
                      data-bs-target={`#v-pills-img${index + 1}`}
                      type="button"
                      role="tab"
                      aria-controls={`v-pills-img${index + 1}`}
                      aria-selected={index === 0}
                    >
                      <img src={image.image_url} alt={product.name} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="shop-details-content  style-3">
                <h1>{product.name}</h1>

                <p>{product.description}</p>
                {selectedVariation.quantity < 1 && (
                  <h6>
                    Availability: <span>Out of Stock</span>
                  </h6>
                )}
                <div className="price-area">
                  <p className="price">
                    {' '}
                    {selectedVariation
                      ? selectedVariation.price
                      : product.price}
                    €
                  </p>
                </div>

                <div className="quantity-color-area">
                  {selectedVariation.quantity > 0 && (
                    <div className="quantity-color">
                      <h6 className="widget-title text-center">Quantity</h6>
                      <QuantityCounter
                        quantity={quantity}
                        setQuantity={setQuantity}
                      />
                    </div>
                  )}

                  <div className="quantity-color">
                    <h6 className="widget-title">Options</h6>
                    <ul className="product-size">
                      {product.variations.map((variation) => (
                        <li
                          key={variation.id}
                          className={
                            selectedVariation?.id === variation.id
                              ? 'selected'
                              : ''
                          }
                          onClick={() => handleVariationChange(variation)}
                        >
                          {variation.value} {variation.unit.symbol}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {selectedVariation.quantity > 0 && (
                  <div className="shop-details-btn">
                    <button
                      className="primary-btn1 hover-btn3"
                      onClick={handleAddToCart} // Attach the click handler here
                    >
                      Add to Cart
                    </button>
                  </div>
                )}

                <div className="product-info">
                  <ul className="product-info-list">
                    <li>
                      {' '}
                      <span>Category:</span> {product.category.name}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="shop-details-description mb-110" id="reviews">
        <div className="container-xl container-lg-fluid container">
          <div className="row">
            <div className="col-12">
              <div className="shop-details-description-nav mb-50">
                <nav>
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button
                      className="nav-link active"
                      id="nav-description-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-description"
                      type="button"
                      role="tab"
                      aria-controls="nav-description"
                      aria-selected="true"
                    >
                      Description
                    </button>
                    <button
                      className="nav-link"
                      id="nav-add-info-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-add-info"
                      type="button"
                      role="tab"
                      aria-controls="nav-add-info"
                      aria-selected="false"
                    >
                      Additional Information
                    </button>
                  </div>
                </nav>
              </div>
              <div className="shop-details-description-tab">
                <div className="tab-content" id="nav-tabContent">
                  <div
                    className="tab-pane fade show"
                    id="nav-add-info"
                    role="tabpanel"
                    aria-labelledby="nav-add-info-tab"
                  >
                    <div className="addithonal-information">
                      <table className="table total-table2">
                        <tbody>
                          <tr>
                            <td>Name</td>
                            <td>{product.name}</td>
                          </tr>
                          <tr>
                            <td>Category</td>
                            <td>{product.category.name}</td>
                          </tr>

                          <tr>
                            <td>Brand</td>
                            <td>{product.brand.name} </td>
                          </tr>
                          <tr>
                            <td>Gender</td>
                            <td>{product.gender.name} </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade show active"
                    id="nav-description"
                    role="tabpanel"
                    aria-labelledby="nav-description-tab"
                  >
                    <div className="row gy-5">
                      <div className="col-lg-8">
                        <div className="description-content">
                          <div className="description-left-content1">
                            <p>{product.long_description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { slug } = context.query; // Get slug from query parameters
  try {
    const product = await fetchProductDetail(slug); // Fetch product details based on slug
    if (!product) {
      return { props: { error: 'Product not found' } };
    }
    return { props: { product } }; // Pass product as prop to the component
  } catch (err) {
    console.error('Error fetching product:', err);
    return {
      props: { error: 'An error occurred while fetching the product.' },
    };
  }
}

export default ProductDefaultPage;
