import { getCookie } from './auth';

// Use environment variable for the base URL, defaulting to localhost if not set
const urlBase = `${process.env.NEXT_PUBLIC_API_URL}/orders`;

const accessToken = getCookie('access_token');
const headers = {
  'Content-Type': 'application/json',
  ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {}), // Conditionally add the Authorization header
};

export async function placeOrder(orderData) {
  try {
    const response = await fetch(`${urlBase}/place_order`, {
      method: 'POST',
      headers: headers,
      credentials: 'include',
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to place order');
    }

    const data = await response.json();
    console.log('Order placed successfully:', data);

    return data; // Return the data to handle it in the calling function if needed
  } catch (error) {
    console.error('Error placing order:', error.message);
    return null; // Return null or handle errors as needed
  }
}

export async function fetchOrderDetails(orderNumber, token) {
  try {
    const response = await fetch(`${urlBase}/order/${orderNumber}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Add the token to the Authorization header
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch order details');
    }

    const data = await response.json();

    console.log('Order details fetched successfully:', data);

    return data; // Return the data to handle it in the calling function if needed
  } catch (error) {
    console.error('Error fetching order details:', error.message);
    return null; // Return null or handle errors as needed
  }
}

export async function fetchOrders(page = 1, token) {
  try {
    const response = await fetch(`${urlBase}?page=${page}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch orders');
    }

    const data = await response.json();
    console.log('Orders fetched successfully:', data);

    return data; // Return paginated data (count, next, previous, results)
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    return null; // Handle errors or return null if needed
  }
}
