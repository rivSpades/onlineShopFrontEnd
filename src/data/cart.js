import { getCookie } from './auth';

const urlBase = 'http://localhost:8000/cart'; // Update with your backend URL
const accessToken = getCookie('access_token');
const headers = {
  'Content-Type': 'application/json',
  ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {}), // Conditionally add the Authorization header
};

export const addToCart = async (productId, quantity, variations) => {
  // Use variations for clarity
  const url = `${urlBase}/add_cart/${productId}/`; // Adjust the endpoint accordingly

  const requestBody = {
    variations, // Use variations here
    quantity,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      credentials: 'include',
      body: JSON.stringify(requestBody), // Convert the body to JSON
    });

    if (!response.ok) {
      throw new Error('Failed to add item to cart');
    }

    const data = await response.json();
    return data; // Return the response data
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error; // Propagate error to the caller
  }
};

export const fetchCartItems = async () => {
  const url = urlBase; // The endpoint for retrieving cart items

  try {
    const response = await fetch(url + '/', {
      method: 'GET',
      headers: headers,
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch cart items');
    }

    const data = await response.json();
    return data; // Return the response data containing cart items
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error; // Propagate error to the caller
  }
};

export const removeFromCart = async (
  productId,
  cartItemId,
  removeItem = false
) => {
  const url = `${urlBase}/remove_cart/${productId}/${cartItemId}/`;

  try {
    const response = await fetch(url + `?remove_item=${removeItem}`, {
      method: 'DELETE',
      headers: headers,
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to remove item from cart');
    }

    const data = await response.json();
    return data; // Return the response data containing the result of the removal
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error; // Propagate error to the caller
  }
};
