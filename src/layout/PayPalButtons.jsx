import React, { useState, useEffect } from 'react';
import {
  PayPalScriptProvider,
  PayPalButtons as PayPalButtonsComponent,
} from '@paypal/react-paypal-js';
import { placeOrder } from '../data/orders'; // Import the API function for placing an order
import { useFeedback } from '../store/feedbackcontext';
import { useRouter } from 'next/router';
const PayPalButtons = ({
  orderTotal,
  paypalOptions,
  refreshKey,
  orderData,
}) => {
  const [error, setError] = useState(null); // To handle errors in PayPal payment
  const { setFeedback } = useFeedback();
  const router = useRouter();
  // Handle PayPal order approval
  const handleApprove = async (data, actions) => {
    try {
      const order = await actions.order.capture();

      const response = await placeOrder({ ...orderData, order });

      if (response) {
        // Set success feedback and redirect
        setFeedback({
          type: 'success',
          title: 'Payment Successful',
          message: 'Your order has been placed successfully!',
        });
        router.push('/feedback');
      }
    } catch (err) {
      // Set error feedback and redirect
      setFeedback({
        type: 'error',
        title: 'Payment Error',
        message: err.message || 'An error occurred during the payment process.',
      });
      router.push('/feedback');
    }
  };

  // Handle errors in the PayPal transaction
  const handleError = (err) => {
    setFeedback({
      type: 'error',
      title: 'Payment Error',
      message: err.message || 'An error occurred during the payment process.',
    });
    router.push('/feedback');
  };

  useEffect(() => {
    // Dynamically load the PayPal script when the component mounts or refreshKey changes
    return () => {
      // Cleanup PayPal script if component unmounts or refreshKey changes
      const existingScript = document.querySelector(
        'script[src*="paypal.com"]'
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [refreshKey]);

  return (
    <div>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <PayPalScriptProvider options={paypalOptions}>
        <PayPalButtonsComponent
          style={{
            shape: 'rect',
            layout: 'vertical',
            color: 'blue',
            label: 'buynow',
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: orderTotal, // Use orderTotal prop here
                  },
                },
              ],
            });
          }}
          onApprove={handleApprove}
          onError={handleError}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default PayPalButtons;
