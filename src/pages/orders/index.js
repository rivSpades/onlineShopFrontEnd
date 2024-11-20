import { fetchOrders } from '@/src/data/orders';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Orders({ orders, page, totalPages }) {
  // Helper function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Helper function to format the shipping address
  const formatAddress = (order) => {
    return `${order.address_line_1}, ${order.address_line_2} ${order.city}, ${order.state}`;
  };

  return (
    <div className="container my-5">
      {/* table title */}
      <div className="table-title-area">
        <h3>My Orders</h3>
      </div>
      {/* table */}
      <div className="table-wrapper">
        <table className="eg-table order-table  table-hover  mb-0">
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Date</th>
              <th>Ship to</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.order_number}
                className="clickable-row"
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  (window.location.href = `/orders/${order.order_number}`)
                }
              >
                <td data-label="Order Number">{order.order_number}</td>
                <td data-label="Date">
                  {formatDate(order?.payment_details?.created_at)}
                </td>
                <td data-label="Ship to">
                  {order.first_name} {order.last_name}
                  <br />
                  {formatAddress(order)}
                </td>
                <td data-label="Total">${order.order_total}</td>
                <td
                  data-label="Status"
                  className={
                    order.status === 'Shipped' ? 'text-success' : 'text-danger'
                  }
                >
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* pagination area */}
      <div className="table-pagination">
        <p>Showing {orders.length} orders</p>
        <nav className="shop-pagination">
          <ul className="pagination-list">
            {page > 1 && (
              <li>
                <a href={`?page=${page - 1}`} className="shop-pagi-btn">
                  <i className="bi bi-chevron-left" />
                </a>
              </li>
            )}
            <li>
              <a href={`?page=1`} className={page === 1 ? 'active' : ''}>
                1
              </a>
            </li>
            {page < totalPages && (
              <li>
                <a
                  href={`?page=${page + 1}`}
                  className={page === totalPages ? 'active' : ''}
                >
                  {totalPages}
                </a>
              </li>
            )}
            {page < totalPages && (
              <li>
                <a href={`?page=${page + 1}`} className="shop-pagi-btn">
                  <i className="bi bi-chevron-right" />
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req, query }) {
  const parseCookies = (cookieHeader) => {
    const cookies = {};
    if (!cookieHeader) return cookies;

    cookieHeader.split('; ').forEach((cookie) => {
      const [key, value] = cookie.split('=');
      cookies[key] = decodeURIComponent(value);
    });

    return cookies;
  };

  const cookies = parseCookies(req.headers.cookie);
  const token = cookies.access_token;

  // Extract page from query params (defaults to 1 if not provided)
  const page = query.page || 1;

  try {
    // Fetch orders for the specific page
    const orderData = await fetchOrders(page, token);
    if (!orderData) {
      return { notFound: true }; // If no data is found, return 404 page
    }

    // You can extract totalPages from your API response if available (e.g., 'count' and 'results')
    const totalPages = Math.ceil(orderData.count / 10); // Assuming 10 orders per page

    return {
      props: {
        orders: orderData.results,
        page: parseInt(page, 10), // Current page number
        totalPages, // Total pages for pagination
      },
    };
  } catch (error) {
    console.error('Error fetching orders:', error);
    return { notFound: true }; // Handle errors and return a 404 page if necessary
  }
}

export default Orders;
