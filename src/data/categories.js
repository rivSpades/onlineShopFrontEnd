// src/data/categories/fetchCategories.js
export const fetchCategories = async () => {
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/category/category-list`; // Use environment variable for the base URL

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data; // Return the fetched categories
  } catch (error) {
    console.error('Error fetching categories:', error);
    return []; // Return an empty array if there is an error
  }
};
