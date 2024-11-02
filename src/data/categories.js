// src/data/categories/fetchCategories.js
export const fetchCategories = async () => {
  try {
    const response = await fetch(
      'http://localhost:8000/category/category-list'
    ); // Replace with your API URL
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data; // Return the fetched categories
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};
