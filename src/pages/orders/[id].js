import React from 'react';
import { useRouter } from 'next/router';

import CostSummary from '@/src/layout/CostSummary';
import CartSummary from '@/src/layout/CartSummary';
import { fetchOrderDetails } from '@/src/data/orders'; // Assuming this function exists
import BillingDetailsSummary from '@/src/layout/BillingDetailsSummary';
const OrderDetail = ({ order }) => {
  const router = useRouter();

  // If there's no order data, display an error message
  if (!order) {
    return <div>Order not found</div>;
  }

  const costData = {
    subtotal: order.order_total,
    tax: order.tax,
    total: order.order_total,
    grand_total: order.tax + order.order_total,
  };

  console.log(order);

  const cartData = {
    cartItems: order.ordered_products.map((item) => ({
      product_name: item.product_name, // Direct access to product name
      quantity: item.quantity,
      price: item.product_price, // Direct access to product price
      images: item.images, // Direct access to images
      variation: item.variation, // Handle variations if any
    })),
  };

  return (
    <div className="checkout-section">
      <div className="container my-5">
        <div className="row gy-5">
          <h1 className="text-center mb-4">Order Details</h1>
          <div className="col-lg-7">
            {/* Order Summary */}
            <div className="added-product-summary mb-30">
              <h5>Order Summary</h5>
              <table className="table order-summary-table">
                <tbody>
                  <tr>
                    <td>Order ID</td>
                    <td>{order.order_number}</td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td>
                      {new Date(
                        order.payment_details.created_at
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td>
                      <span
                        className={`badge ${
                          order.status === 'Completed'
                            ? 'bg-success'
                            : 'bg-warning'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Payment Method</td>
                    <td>{order.payment_details.payment_method}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <BillingDetailsSummary order={order} />
          </div>
          <div className="col-lg-5">
            <CartSummary data={cartData} />
            <CostSummary data={costData} />
          </div>

          {/* Navigation Buttons */}
          <div className="button-group d-flex justify-content-center gap-3 mt-6">
            <button
              className="primary-btn3 black-bg hover-btn5 hover-white"
              onClick={() => router.push('/shop')}
            >
              Shop more
            </button>
            <button
              className="primary-btn3 hover-btn5"
              onClick={() => router.push('/orders')}
            >
              View All Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ req, params }) {
  const parseCookies = (cookieHeader) => {
    const cookies = {};
    if (!cookieHeader) return cookies;

    // Split cookie string by '; ' and iterate over the resulting array
    cookieHeader.split('; ').forEach((cookie) => {
      const [key, value] = cookie.split('=');
      cookies[key] = decodeURIComponent(value);
    });

    return cookies;
  };
  const cookies = parseCookies(req.headers.cookie);
  console.log('Parsed Cookies:', cookies);
  const token = cookies.access_token;
  const { id } = params; // Get the order number from the URL params
  console.log(params.id);
  try {
    // Use the existing fetchOrderDetail function to get the order details
    const orderData = await fetchOrderDetails(id, token);
    console.log(orderData);
    if (!orderData) {
      return { notFound: true }; // If no data is found, return 404 page
    }

    return {
      props: {
        order: orderData, // Pass the order data to the component as a prop
      },
    };
  } catch (error) {
    console.error('Error fetching order details:', error);
    return { notFound: true }; // Handle errors and return a 404 page if necessary
  }
}

export default OrderDetail;
