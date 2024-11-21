// src/data/banners/fetchBanners.js

export const fetchBanners = async () => {
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/cms/banners-list`; // Use environment variable for the base URL

  try {
    const response = await fetch(API_URL);
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
