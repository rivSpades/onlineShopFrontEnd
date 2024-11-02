// src/data/banners/fetchBanners.js

export const fetchBanners = async () => {
  try {
    const response = await fetch('http://localhost:8000/cms/banners-list'); // Replace with your actual API URL
    console.log(response);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data; // Return the fetched banner data
  } catch (error) {
    console.error('Error fetching banners:', error);
    return []; // Return an empty array if there is an error
  }
};
