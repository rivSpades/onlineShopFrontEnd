import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Topbar = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  // Handle form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    if (searchTerm.trim()) {
      // Redirect to /shop with the search keyword as a query parameter
      router.push(`/shop?keyword=${encodeURIComponent(searchTerm)}`);
      setSearchTerm(''); // Clear the input field after submission
    }
  };

  return (
    <div className="top-bar">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 d-flex align-items-center justify-content-between gap-3">
            <div className="company-logo">
              <Link legacyBehavior href="/">
                <a>
                  <img src="/assets/img/logo.svg" alt="Company Logo" />
                </a>
              </Link>
            </div>
            <div className="search-area">
              <form className="form-inner" onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Search for Category, Product or Description"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                />
                <button type="submit">
                  <i className="bx bx-search" style={{ color: 'white' }} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
