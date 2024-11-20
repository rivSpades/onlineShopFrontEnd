import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useOrderContext } from '@/src/store/ordercontext';

const BillingDetailsSummary = ({ order }) => {
  const { orderData: contextOrderData } = useOrderContext(); // Data from context
  const router = useRouter();

  // Give priority to the `order` prop, fallback to context data
  const orderData = order || contextOrderData;

  // Redirect to homepage if there's no order data
  useEffect(() => {
    if (!orderData) {
      router.push('/');
    }
  }, [orderData, router]);

  // Render nothing if there is no orderData (until redirect completes)
  if (!orderData) return null;

  return (
    <div className="added-product-summary mb-30">
      <h4>Order Summary</h4>
      <table className="table order-summary-table">
        <tbody>
          <tr>
            <td>First Name</td>
            <td>{orderData.first_name}</td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td>{orderData.last_name}</td>
          </tr>
          <tr>
            <td>Country</td>
            <td>{orderData.country}</td>
          </tr>
          <tr>
            <td>Address Line 1</td>
            <td>{orderData.address_line_1}</td>
          </tr>
          {orderData.address_line_2 && (
            <tr>
              <td>Address Line 2</td>
              <td>{orderData.address_line_2}</td>
            </tr>
          )}
          <tr>
            <td>City</td>
            <td>{orderData.city}</td>
          </tr>
          <tr>
            <td>State</td>
            <td>{orderData.state}</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>{orderData.phone}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{orderData.email}</td>
          </tr>
          {orderData.order_note && (
            <tr>
              <td>Order Note</td>
              <td>{orderData.order_note}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BillingDetailsSummary;
