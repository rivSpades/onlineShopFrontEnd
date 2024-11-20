import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useOrderContext } from '@/src/store/ordercontext';
import PayPalButtons from '@/src/layout/PayPalButtons';
import CartSummary from '@/src/layout/CartSummary';
import CostSummary from '@/src/layout/CostSummary';
import BillingDetailsSummary from '@/src/layout/BillingDetailsSummary';
import { useCart } from '@/src/store/cartcontext';

const ReviewCheckout = () => {
  const router = useRouter();
  const { orderData } = useOrderContext();
  const { cartData } = useCart();

  const [refreshKey, setRefreshKey] = useState(0); // Key to trigger reinitialization

  // Redirect to homepage if there is no order data
  useEffect(() => {
    if (!orderData) {
      router.push('/');
    }
  }, [orderData, router]);

  // Effect to trigger PayPal button re-initialization
  useEffect(() => {
    // If the order data changes, increment the refreshKey
    if (orderData) {
      setRefreshKey((prevKey) => prevKey + 1);
    }
  }, [orderData]);

  // Memoized PayPal options to avoid recalculating unless orderData changes
  const paypalOptions = useMemo(
    () => ({
      'client-id':
        'AaScZ1BGoi5rQ0S-MiA5xmnMrw3VfiurnRNtOLMCwYCEOngHGVXLWNc7eI4mtRy3SLGoFtMlxFv-SWaL',
      'enable-funding': 'venmo,applepay',
      'buyer-country': orderData?.countryCode || 'PT', // Fallback if countryCode isn't available
      currency: 'EUR',
      'data-page-type': 'product-details',
      components: 'buttons',
      'data-sdk-integration-source': 'developer-studio',
    }),
    [orderData]
  );

  // Render the order summary components only if orderData exists
  if (!orderData) {
    return null;
  }

  return (
    <div className="checkout-section pt-110 mb-110">
      <div className="container">
        <div className="row gy-5">
          <div className="col-lg-7">
            <div className="form-wrap mb-30">
              <BillingDetailsSummary />
            </div>
          </div>
          <div className="col-lg-5">
            <CartSummary />
            <CostSummary />
            {/* Using refreshKey to force re-initialization of PayPalButtons */}
            <PayPalButtons
              key={refreshKey} // Forces re-initialization every time refreshKey changes
              orderTotal={cartData.grand_total}
              paypalOptions={paypalOptions}
              refreshKey={refreshKey}
              orderData={orderData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCheckout;
