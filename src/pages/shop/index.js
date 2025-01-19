import React, { useEffect, useRef, useState } from 'react';
import ProductViewModal from '@/src/components/common/ProductViewModal';
import Link from 'next/link';
import Product from '@/src/layout/Product';
import { fetchProducts } from '@/src/data/productList';
import { useRouter } from 'next/router'; // Import useRouter
import Filters from '@/src/layout/Filters';
import CategoryTop from '@/src/components/Home/CategoryTop';
const ShopPage = () => {
  const [isOpenSiebar, setIsOpenSidebar] = useState(false);
  const sidebarRef = useRef(null);
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const sidebarBtnRef = useRef(null);
  const [activeColumn, setActiveColumn] = useState('column-4');
  const [products, setProducts] = useState([]); // State to hold fetched products

  const router = useRouter();
  const { query } = router; // Destructure query from router
  const page = parseInt(query.page || 1, 10); // Current page (default to 1)

  const searchKeyword = query.keyword || '';

  // Fetch products when the component mounts
  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts(query); // Call your API
      setProducts(data.results);

      setTotalPages(Math.ceil(data.count / 10)); // Assuming 10 products per page
    };

    loadProducts();
    console.log('passa aqui');
    console.log(router.query);
  }, [router.query]);

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
  useEffect(() => {
    const allProductsDiv = document.querySelector('.filter-dropdown-section');
    if (
      allProductsDiv &&
      (router.query.category || router.query.main_category)
    ) {
      allProductsDiv.scrollIntoView({
        behavior: 'smooth',
        block: 'start', // Scroll to the top of the "all-products" div
      });
    }
  }, []); // This effect runs only once when the component is mounted

  const toggleSidebar = () => {
    setIsOpenSidebar(!isOpenSiebar);
  };

  console.log(products);

  return (
    <>
      <CategoryTop />
      <div className="filter-dropdown-section mt-110 mb-110">
        <div className="container-fluid container-xl">
          <div className="shop-columns-title-section mb-40 d-block">
            <Filters query={query} isdropdown={true} />
            <div className="d-block">
              {searchKeyword && (
                <p className="mb-2">Searched for "{searchKeyword}"</p>
              )}
              <p>Showing {products.length} results</p>
            </div>
          </div>
          <div className="all-products list-grid-product-wrap">
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 gy-4 mb-80">
              {products.map((product, index) => (
                <Product key={index} product={{ ...product, activeColumn }} />
              ))}
            </div>
          </div>
          {/* Pagination */}
          <ProductViewModal />

          <nav className="shop-pagination">
            <ul className="pagination-list">
              {/* Previous Page */}
              {page > 1 && (
                <li>
                  <Link
                    href={{
                      pathname: '/shop',
                      query: { ...query, page: page - 1 },
                    }}
                    className="shop-pagi-btn"
                  >
                    <i className="bi bi-chevron-left" />
                  </Link>
                </li>
              )}

              {/* Page Numbers */}
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <li key={pageNumber}>
                    <Link
                      href={{
                        pathname: '/shop',
                        query: { ...query, page: pageNumber },
                      }}
                      className={page === pageNumber ? 'active' : ''}
                    >
                      {pageNumber}
                    </Link>
                  </li>
                );
              })}

              {/* Next Page */}
              {page < totalPages && (
                <li>
                  <Link
                    href={{
                      pathname: '/shop',
                      query: { ...query, page: page + 1 },
                    }}
                    className="shop-pagi-btn"
                  >
                    <i className="bi bi-chevron-right" />
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default ShopPage;
