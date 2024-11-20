import React from 'react';
import { useCart } from '../store/cartcontext';

function CostSummary({ data }) {
  const { cartData } = useCart();

  // Use props data if available, otherwise fallback to cartData
  const summaryData = data || {
    subtotal: cartData?.total || 0,
    tax: cartData?.tax || 0,
    total: cartData?.total + cartData?.tax || 0,
    grand_total: cartData?.grand_total || 0,
  };

  return (
    <>
      <div className="cost-summary mb-30">
        <table className="table cost-summary-table">
          <thead>
            <tr>
              <th>Subtotal</th>
              <th>${summaryData.subtotal.toFixed(2)}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="tax">Tax</td>
              <td>${summaryData.tax.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Total (tax excl.)</td>
              <td>${summaryData.subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Total (tax incl.)</td>
              <td>${summaryData.total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="cost-summary total-cost mb-30">
        <table className="table cost-summary-table total-cost">
          <thead>
            <tr>
              <th>Total</th>
              <th>${summaryData.grand_total.toFixed(2)}</th>
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
}

export default CostSummary;