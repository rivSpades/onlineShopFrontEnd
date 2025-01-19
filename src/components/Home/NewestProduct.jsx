import React, { useMemo } from 'react';
import Link from 'next/link';

import Product from '@/src/layout/Product';
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useCountdownTimer } from '@/src/hooks/useCountdownTimer';
import QuantityCounter from '@/src/uitils/QuantityCounter';
SwiperCore.use([Pagination, Autoplay, EffectFade, Navigation]);
const NewestProduct = ({ products }) => {
  const newestSlideSetting = useMemo(() => {
    return {
      slidesPerView: 'auto',
      spaceBetween: 30,
      loop: false,
      navigation: {
        nextEl: '.next-btn',
        prevEl: '.prev-btn',
      },
      breakpoints: {
        280: {
          slidesPerView: 2,
        },
        386: {
          slidesPerView: 2,
        },
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 4,
        },
        1200: {
          slidesPerView: 4,
        },
        1400: {
          slidesPerView: 4,
        },
      },
    };
  }, []);

  return (
    <>
      <div className="newest-product-section mb-110">
        <div className="container">
          <div className="section-title2 style-2">
            <div className="d-flex flex-column    ">
              {/* Title */}
              <h3>Newest Product</h3>

              {/* View All Link */}
              <div className="all-product hover-underline  mt-md-4">
                <Link legacyBehavior href="/shop">
                  <a>
                    View All Product
                    <svg
                      width={33}
                      height={13}
                      viewBox="0 0 33 13"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M25.5083 7.28L0.491206 7.25429C0.36093 7.25429 0.23599 7.18821 0.143871 7.0706C0.0517519 6.95299 0 6.79347 0 6.62714C0 6.46081 0.0517519 6.3013 0.143871 6.18369C0.23599 6.06607 0.36093 6 0.491206 6L25.5088 6.02571C25.6391 6.02571 25.764 6.09179 25.8561 6.2094C25.9482 6.32701 26 6.48653 26 6.65286C26 6.81919 25.9482 6.9787 25.8561 7.09631C25.764 7.21393 25.6386 7.28 25.5083 7.28Z" />
                      <path d="M33.0001 6.50854C29.2204 7.9435 24.5298 10.398 21.623 13L23.9157 6.50034L21.6317 0C24.5358 2.60547 29.2224 5.06539 33.0001 6.50854Z" />
                    </svg>
                  </a>
                </Link>
              </div>
            </div>

            {/* Slider Controls */}
            <div className="slider-btn mt-3">
              <div className="prev-btn">
                <i className="bi bi-arrow-left" />
              </div>
              <div className="next-btn">
                <i className="bi bi-arrow-right" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Swiper {...newestSlideSetting} className="swiper newest-slider">
                <div className="swiper-wrapper">
                  {products.map((product, index) => (
                    <SwiperSlide className="swiper-slide">
                      <Product key={index} product={{ ...product }} />
                    </SwiperSlide>
                  ))}
                </div>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewestProduct;
