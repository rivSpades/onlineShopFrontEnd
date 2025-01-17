import React, { useEffect, useMemo, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from 'swiper';
import { fetchCategories } from '@/src/data/categories';
import Link from 'next/link';
import { useRouter } from 'next/router';

SwiperCore.use([Pagination, Autoplay, EffectFade, Navigation]);

function CategoryTop() {
  const [categories, setCategories] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null); // State for active category
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter(); // Use router to get the query parameters
  const categoryRefs = useRef({}); // To store references to each category item

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories(); // Fetch the categories from the API
      setCategories(data);
    };

    loadCategories();
  }, []);

  useEffect(() => {
    if (router.query.category) {
      // Preselect category if 'category' query parameter exists
      setActiveCategory(router.query.category);
    } else {
      setActiveCategory(null);
    }
  }, [router.query]);

  const subcategories = categories
    ? categories.flatMap((category) => category.categories)
    : [];

  // Helper function to find the main category (parent category) of the subcategory
  const getMainCategory = (slug) => {
    const category = categories.find((cat) =>
      cat.categories.some((subcategory) => subcategory.slug === slug)
    );
    return category ? category.slug : null;
  };

  const slideSettings = useMemo(() => {
    return {
      slidesPerView: 'auto',
      spaceBetween: 30,
      loop: true,
      navigation: {
        nextEl: '.ct-top-next-btn',
        prevEl: '.ct-top-prev-btn',
      },
      breakpoints: {
        280: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        350: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        500: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 4,
        },
        992: {
          slidesPerView: 4,
        },
        1200: {
          slidesPerView: 5,
        },
        1400: {
          slidesPerView: subcategories.length < 6 ? 2 : 6,
        },
      },
    };
  }, [subcategories]);

  const handleCategoryClick = async (slug, e) => {
    e.preventDefault(); // Prevent the default behavior of the link
    setActiveCategory(slug);

    // Get the main category (parent category) slug
    const mainCategorySlug = getMainCategory(slug);

    // Use router.push to programmatically navigate, adding both category and main_category to the URL
    await router.push(
      `/shop/?main_category=${mainCategorySlug}&category=${slug}`
    );

    // Scroll the page to the "all-products" div after navigation
    const allProductsDiv = document.querySelector('.filter-dropdown-section');
    if (allProductsDiv) {
      allProductsDiv.scrollIntoView({
        behavior: 'smooth',
        block: 'start', // Scroll to the top of the "all-products" div
      });
    }
  };

  return (
    <div className="category-on-top-section">
      <div className="container position-relative">
        <div className="nav nav-pills" id="pills-tab" role="tablist">
          <Swiper {...slideSettings} className="swiper category-top-slider">
            <div className="swiper-wrapper">
              {subcategories.map((subcategory) => (
                <div
                  className="nav-item"
                  role="presentation"
                  key={subcategory.id}
                >
                  <SwiperSlide className="swiper-slide">
                    <a
                      href={`/shop/?main_category=${getMainCategory(
                        subcategory.slug
                      )}&category=${subcategory.slug}`}
                      className={`nav-link ${
                        activeCategory === subcategory.slug ? 'active' : ''
                      }`} // Apply active class conditionally
                      id={`${subcategory.slug}-tab`}
                      role="tab"
                      aria-controls={subcategory.slug}
                      aria-selected={
                        activeCategory === subcategory.slug ? 'true' : 'false'
                      }
                      onClick={(e) => handleCategoryClick(subcategory.slug, e)} // Handle click
                    >
                      <img
                        src={
                          apiBaseUrl + subcategory.image ||
                          '/assets/img/inner-page/category-top-nav-img1.png'
                        } // Fallback image if none exists
                        alt={subcategory.name}
                      />
                    </a>
                    <h6
                      ref={(el) =>
                        (categoryRefs.current[subcategory.slug] = el)
                      }
                    >
                      {subcategory.name}
                    </h6>
                  </SwiperSlide>
                </div>
              ))}
            </div>
          </Swiper>
        </div>
        <div className="slider-btn">
          <div className="ct-top-prev-btn">
            <i className="bi bi-arrow-left" />
          </div>
          <div className="ct-top-next-btn">
            <i className="bi bi-arrow-right" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryTop;
