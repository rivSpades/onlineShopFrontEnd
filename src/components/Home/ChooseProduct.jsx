import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { fetchCategories } from '@/src/data/categories';

const ChooseProduct = () => {
  const [categories, setCategories] = useState([]);

  // Use the environment variable for the backend URL
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  // Fetch categories from API on component mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        // Set the main categories to state
        setCategories(data); // Assuming data is an array of categories
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    loadCategories();
  }, []);

  return (
    <div className="choose-product-section mb-110">
      <div className="container">
        <div className="section-title text-center">
          <h3>Choose What You Want</h3>
        </div>
        <div className="row gy-4 justify-content-center">
          {categories.map((category) => (
            <div className="col-lg-4 col-md-6" key={category.id}>
              <div className="choose-product-card hover-img style-2">
                <Link
                  legacyBehavior
                  href={`/shop?main_category=${category.slug}`}
                >
                  <a>
                    <img
                      src={`${apiBaseUrl}${category.image}`} // Use environment variable for image URL
                      alt={category.name}
                    />
                  </a>
                </Link>
                <div className="choose-product-card-content">
                  <h2 className="first-text">{category.name}</h2>
                  {/* Optionally, display a second line if you have a specific format */}
                  <h2 className="second-text">{category.description || ''}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChooseProduct;
