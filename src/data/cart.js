const urlBase = 'http://localhost:8000/cart'; // Update with your backend URL

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
      headers: {
        'Content-Type': 'application/json',
      },
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
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies with the request
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
