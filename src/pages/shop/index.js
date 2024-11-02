import React, { useEffect, useRef, useState } from 'react';
import ProductViewModal from '@/src/components/common/ProductViewModal';

import Product from '@/src/layout/Product';
import { fetchProducts } from '@/src/data/productList';
import { useRouter } from 'next/router'; // Import useRouter
import Filters from '@/src/layout/Filters';

const ShopPage = () => {
  const [isOpenSiebar, setIsOpenSidebar] = useState(false);
  const sidebarRef = useRef(null);

  const sidebarBtnRef = useRef(null);
  const [activeColumn, setActiveColumn] = useState('column-4');
  const [products, setProducts] = useState([]); // State to hold fetched products

  const router = useRouter();
  const { query } = router; // Destructure query from router
  const searchKeyword = query.keyword || '';
  // Fetch products when the component mounts
  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts(query); // Call your API
      setProducts(
        data.results.map((product) => ({
          id: product.id,
          slug: product.slug,
          name: product.name,
          description: product.description, // Assuming category name is used as brand
          images: product.images, // Assuming images is a single URL string
          price: `$${product.price}`, // Format price
          oldPrice: null, // Set old price if applicable
          outOfStock: product.stock <= 0, // Determine stock status
          activeColumn: activeColumn, // Use activeColumn state
          variations: product.variations,
          // Add any other properties that your Product component expects
        }))
      );
    };

    loadProducts();
  }, [router]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        isOpenSiebar &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target)
      ) {
        setIsOpenSidebar(false);
      }
      if (
        isOpenSiebar &&
        sidebarBtnRef.current &&
        !sidebarBtnRef.current.contains(e.target)
      ) {
        setIsOpenSidebar(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpenSiebar]);

  const toggleSidebar = () => {
    setIsOpenSidebar(!isOpenSiebar);
  };

  return (
    <>
      <div className="filter-dropdown-section mt-110 mb-110">
        <div className="container-fluid container-xl">
          <div className="shop-columns-title-section mb-40 d-block">
            <Filters query={query} isdropdown={true} />
            <div className="d-block">
              {searchKeyword && (
                <p className="mb-2">Searched for "{searchKeyword}"</p>
              )}
              <p>Showing {products.length} results </p>
            </div>
          </div>
          <div className="all-products list-grid-product-wrap">
            <div className="row gy-4 mb-80">
              {products.map((product, index) => (
                <Product key={index} product={{ ...product, activeColumn }} />
              ))}
            </div>
          </div>
          {/* Pagination */}
          <ProductViewModal />

          <nav className="shop-pagination">
            <ul className="pagination-list">
              <li>
                <a href="#" className="shop-pagi-btn">
                  <i className="bi bi-chevron-left" />
                </a>
              </li>
              <li>
                <a href="#">1</a>
              </li>
              <li>
                <a href="#" className="active">
                  2
                </a>
              </li>
              <li>
                <a href="#">3</a>
              </li>
              <li>
                <a href="#">
                  <i className="bi bi-three-dots" />
                </a>
              </li>
              <li>
                <a href="#">6</a>
              </li>
              <li>
                <a href="#" className="shop-pagi-btn">
                  <i className="bi bi-chevron-right" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default ShopPage;
