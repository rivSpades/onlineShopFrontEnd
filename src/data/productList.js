// src/data/products/fetchProducts.js

// Get the base URL from environment variable or default to localhost
const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchProducts = async (filters = {}, page = 1) => {
  try {
    const queryParams = new URLSearchParams({ ...filters, page }).toString();
    const url = `${process.env.NEXT_PUBLIC_API_URL}/store/products/?${queryParams}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return { count: 0, results: [] };
  }
};

export const fetchProductDetail = async (slug) => {
  try {
    const url = `${apiBaseUrl}/store/products/${slug}/`;
    const response = await fetch(url);

    // Check if the response is okay (status 200-299)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Parse the JSON data from the response
    const data = await response.json();
    console.log(data);
    return data; // Return the fetched product data
  } catch (error) {
    console.error('Error fetching product:', error);
    return null; // Return null to indicate failure
  }
};

export const fetchProductSearch = async (keyword) => {
  try {
    const url = `${apiBaseUrl}/store/search?${keyword}/`;
    const response = await fetch(url);

    // Check if the response is okay (status 200-299)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Parse the JSON data from the response
    const data = await response.json();
    console.log(data);
    return data; // Return the fetched product data
  } catch (error) {
    console.error('No products found', error);
    return null; // Return null to indicate failure
  }
};
