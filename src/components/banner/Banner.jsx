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
  const bannerSlideSetting = {
    slidesPerView: 'auto',
    speed: 1500,
    loop: true,
    autoplay: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    pagination: {
      el: '.swiper-pagination1',
      clickable: true,
    },
  };

  return (
    <div className="banner-section mb-110">
      <div className="container-fluid p-0">
        <div className="row">
          <div className="col-lg-12">
            <Swiper {...bannerSlideSetting} className="swiper banner1-slider">
              <div className="swiper-wrapper">
                {banners.length > 0 ? (
                  banners.map((e) => {
                    const { id, banner_img, title, description } = e;
                    return (
                      <SwiperSlide className="swiper-slide" key={id}>
                        <div className="banner-wrapper">
                          <div className="banner-left">
                            <img
                              src="/assets/img/home1/icon/banner-vector1.svg"
                              alt=""
                              className="banner-vector1"
                            />
                            <img
                              src="/assets/img/home1/icon/banner-vector2.svg"
                              alt=""
                              className="banner-vector2"
                            />
                            <img
                              src="/assets/img/home1/icon/banner-vector3.svg"
                              alt=""
                              className="banner-vector3"
                            />
                            <div className="banner-content">
                              <h1>{title}</h1>
                              <p>{description}</p>
                              <Link legacyBehavior href="/shop">
                                <a className="primary-btn1 hover-btn3">
                                  *Shop Now*
                                </a>
                              </Link>
                            </div>
                          </div>
                          <div className="banner-right-wrapper">
                            <div className="banner-right-img">
                              <img
                                src={'http://localhost:8000' + banner_img}
                                alt=""
                                className="banner-right-bg"
                              />
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })
                ) : (
                  <SwiperSlide className="swiper-slide">
                    <div>No banners available</div>
                  </SwiperSlide>
                )}
              </div>
              <div className="swiper-pagination1" />
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
