import React from 'react';
import Link from 'next/link';
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

SwiperCore.use([Pagination, Autoplay, EffectFade, Navigation]);

const Banner = ({ banners }) => {
  // Use environment variable for backend URL
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  const bannerSlideSetting = {
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 2000,
    loop: true,
    autoplay: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    pagination: {
      el: '.swiper-pagination2',
      clickable: true,
    },
  };
  console.log(banners);
  return (
    <div className="banner-2-section mb-110">
      <div className="container-fluid p-0">
        <div className="row">
          {/* Right Section */}
          <div className="col-xxl-12 col-xl-12">
            <div className="banner-2-right">
              <Swiper {...bannerSlideSetting} className="swiper banner2-slider">
                <div className="swiper-wrapper">
                  {banners.length > 0 ? (
                    banners.map((e) => {
                      const { id, banner_img, title, description, discount } =
                        e;
                      return (
                        <SwiperSlide className="swiper-slide" key={id}>
                          <div
                            className="banner-2-right-img-bg"
                            style={{
                              backgroundImage: `url(${apiBaseUrl}${banner_img})`,
                              backgroundSize: '100% 100%', // Ensures image is fully visible
                              backgroundPosition: 'center center', // Centers the image
                              backgroundRepeat: 'no-repeat', // Avoids repeating the image
                              height: '100%', // Ensures it stretches to fill the container
                            }}
                          >
                            <div className="banner-2-right-content">
                              <h2>{title} </h2>
                              <h2>
                                {1 === 0 && discount && discount > 0 && (
                                  <strong>{discount}% off</strong>
                                )}
                              </h2>
                              <p>{description}</p>
                              <Link legacyBehavior href="/shop">
                                <a className="primary-btn3 black-bg hover-btn5 hover-white">
                                  Shop Now
                                </a>
                              </Link>
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    })
                  ) : (
                    <SwiperSlide className="swiper-slide">
                      <div className="banner-2-right-img-bg">
                        <div className="banner-2-right-content">
                          <h2>No banners available</h2>
                          <p>Please check back later for exciting deals!</p>
                        </div>
                      </div>
                    </SwiperSlide>
                  )}
                </div>
                <div className="swiper-pagination2" />
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
