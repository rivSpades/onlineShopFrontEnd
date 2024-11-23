import React, { useEffect, useReducer, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Cart from '../components/common/Cart';
const initialState = {
  activeMenu: '',
  activeSubMenu: '',
  isSidebarOpen: false,
  isLeftSidebarOpen: false,
};
function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_MENU':
      return {
        ...state,

        activeMenu: state.activeMenu === action.menu ? '' : action.menu,
        activeSubMenu:
          state.activeMenu === action.menu ? state.activeSubMenu : '',
      };
    case 'TOGGLE_SUB_MENU':
      return {
        ...state,
        activeSubMenu:
          state.activeSubMenu === action.subMenu ? '' : action.subMenu,
      };
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      };
    case 'setScrollY':
      return { ...state, scrollY: action.payload };
    case 'TOGGLE_LEFT_SIDEBAR':
      return {
        ...state,
        isLeftSidebarOpen: !state.isLeftSidebarOpen,
      };
    default:
      return state;
  }
}

const Header = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const headerRef = useRef(null);
  const handleScroll = () => {
    const { scrollY } = window;
    dispatch({ type: 'setScrollY', payload: scrollY });
  };
  const currentRoute = useRouter().pathname;
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const toggleMenu = (menu) => {
    dispatch({ type: 'TOGGLE_MENU', menu });
  };

  const toggleSubMenu = (subMenu) => {
    dispatch({ type: 'TOGGLE_SUB_MENU', subMenu });
  };
  const toggleSidebar = () => {
    dispatch({ type: 'TOGGLE_MENU', menu: '' });
    dispatch({ type: 'TOGGLE_SUB_MENU', subMenu: '' });
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  };
  return (
    <header
      ref={headerRef}
      className={`header-area ${state.scrollY > 10 ? 'sticky' : ''}`}
    >
      <div className="container-xxl container-fluid position-relative  d-flex flex-nowrap align-items-center justify-content-between">
        <div className="header-logo d-lg-none d-flex">
          <Link legacyBehavior href="/">
            <a>
              <img
                alt="image"
                className="img-fluid"
                src="/assets/img/logo.svg"
              />
            </a>
          </Link>
        </div>
        <div className="category-dropdown">
          <div
            className="category-button"
            onClick={() => toggleMenu('categoryModal')}
          >
            <img src="/assets/img/home1/icon/category-icon.svg" alt="" />
            <span>Category</span>
          </div>
          <div
            className={`category-menu ${
              state.activeMenu === 'categoryModal' ? 'active' : ''
            }`}
          >
            <ul>
              <li>
                <Link legacyBehavior href="/index">
                  <a>Home</a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/our-brand">
                  <a>Our Brands</a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/shop">
                  <a>Skin Care</a>
                </Link>
              </li>
              <li className="category-has-child">
                <Link legacyBehavior href="/shop">
                  <a>Personal Care </a>
                </Link>
                <i className="bx bx-chevron-right" />
                <ul className="sub-menu">
                  <li>
                    <Link legacyBehavior href="/shop">
                      <a>Body Treatments</a>
                    </Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="/shop">
                      <a>
                        Face Care
                        <i className="bx bx-chevron-right" />
                      </a>
                    </Link>
                    <ul className="sub-menu">
                      <li>
                        <Link legacyBehavior href="/shop">
                          <a>Face Oil</a>
                        </Link>
                      </li>
                      <li>
                        <Link legacyBehavior href="/shop">
                          <a>Sunscreen</a>
                        </Link>
                      </li>
                      <li>
                        <Link legacyBehavior href="/shop">
                          <a>Face Mask</a>
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <Link legacyBehavior href="/shop">
                  <a>Makeup</a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/shop">
                  <a>Fragrance</a>
                </Link>
              </li>
              <li className="category-has-child">
                <Link legacyBehavior href="/shop">
                  <a>Mens Collections</a>
                </Link>
                <i className="bx bx-chevron-right" />
                <ul className="sub-menu">
                  <li>
                    <Link legacyBehavior href="/shop">
                      <a>Hair Gel</a>
                    </Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="/shop">
                      <a>Face Wash</a>
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link legacyBehavior href="/shop">
                  <a>Summer Product</a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/shop">
                  <a>Kids &amp; Baby</a>
                </Link>
              </li>
              <li className="category-has-child">
                <Link legacyBehavior href="/shop">
                  <a>Maternity Care</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={`main-menu ${state.isSidebarOpen ? 'show-menu' : ''}`}>
          <div className="mobile-logo-area d-lg-none d-flex justify-content-between align-items-center">
            <div className="mobile-logo-wrap">
              <Link legacyBehavior href="/">
                <a>
                  <img alt="image" src="/assets/img/logo.svg" />
                </a>
              </Link>
            </div>
          </div>
          <ul className="menu-list">
            <li
              className={`menu-item-has-children ${
                currentRoute === '/' ? 'active' : ''
              }`}
            >
              <a
                href="#"
                className={`drop-down ${
                  state.activeMenu === 'home-one' ? 'active' : ''
                }`}
              >
                Home
              </a>
              <i
                onClick={() => toggleMenu('home-one')}
                className={`bi bi-${
                  state.activeMenu === 'home-one' ? 'dash' : 'plus'
                } dropdown-icon`}
              />
              <ul
                className={`sub-menu ${
                  state.activeMenu === 'home-one' ? 'd-block' : ''
                }`}
              >
                <li>
                  <Link legacyBehavior href="/">
                    <a>Home 1</a>
                  </Link>
                </li>
                <li>
                  <Link legacyBehavior href="/index2">
                    <a>Home 2</a>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menu-item-has-children position-inherit">
              <a href="#" className="drop-down">
                Face
              </a>
              <i
                onClick={() => toggleMenu('new-car')}
                className={`bi bi-${
                  state.activeMenu === 'new-car' ? 'dash' : 'plus'
                } dropdown-icon`}
              />
              <div
                className={`mega-menu2 ${
                  state.activeMenu === 'new-car' ? 'd-block' : ''
                }`}
                style={{
                  backgroundImage:
                    'url("/assets/img/home1/megamenu2-face-bg.png")',
                }}
              >
                <div className="megamenu-wrap">
                  <ul className="menu-row">
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Cleanser
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Exfoliator
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Serum
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Face Oil
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Sunscreen
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Moisturizer
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Chemical Peel
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Toner
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Face Mask
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Eye Cream
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Face Wash
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Setting spray
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Concealer
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Exfoliant
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Primer
                        </a>
                      </Link>
                    </li>
                  </ul>
                  <div className="all-product">
                    <Link legacyBehavior href="/shop">
                      <a className="hover-underline ">
                        *View All Product
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
              </div>
            </li>
            <li className="menu-item-has-children position-inherit">
              <a href="#" className="drop-down">
                Body
              </a>
              <i
                onClick={() => toggleMenu('body')}
                className={`bi bi-${
                  state.activeMenu === 'body' ? 'dash' : 'plus'
                } dropdown-icon`}
              />
              <div
                className={`mega-menu2 ${
                  state.activeMenu === 'body' ? 'd-block' : ''
                }`}
                style={{
                  backgroundImage:
                    'url("/assets/img/home1/megamenu2-body-bg.png")',
                }}
              >
                <div className="megamenu-wrap">
                  <ul className="menu-row">
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Body Wash
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Body Scrub
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Body Lotion
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Body Butter
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Body Oil
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Body Mist
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Body Serum
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Body Gel
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Body Cleanser
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Body Polish
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Body Balm
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Bath Salts
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Shower Gel
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Exfoliating Gloves
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Cellulite Cream
                        </a>
                      </Link>
                    </li>
                  </ul>
                  <div className="all-product">
                    <Link legacyBehavior href="/shop">
                      <a className="hover-underline ">
                        *View All Product
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
              </div>
            </li>
            <li className="menu-item-has-children position-inherit">
              <a href="#" className="drop-down">
                Hair
              </a>
              <i
                onClick={() => toggleMenu('hair')}
                className={`bi bi-${
                  state.activeMenu === 'hair' ? 'dash' : 'plus'
                } dropdown-icon`}
              />
              <div
                className={`mega-menu2 ${
                  state.activeMenu === 'hair' ? 'd-block' : ''
                }`}
                style={{
                  backgroundImage:
                    'url("/assets/img/home1/megamenu2-hair-bg.png")',
                }}
              >
                <div className="megamenu-wrap">
                  <ul className="menu-row">
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Shampoo
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Conditioner
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Hair Mask
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Hair Color
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Hair Oil
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Hair Rollers
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Hair Spray
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Hair Mousse
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Curling Iron
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Dry Shampoo
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Hair Detangler
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Hair Cream
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Hair Wax
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Hair Pomade
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Hair Texturizer
                        </a>
                      </Link>
                    </li>
                  </ul>
                  <div className="all-product">
                    <Link legacyBehavior href="/shop">
                      <a className="hover-underline">
                        *View All Product
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
              </div>
            </li>
            <li className="menu-item-has-children position-inherit">
              <a href="#" className="drop-down">
                Makeup
              </a>
              <i
                onClick={() => toggleMenu('makeup')}
                className={`bi bi-${
                  state.activeMenu === 'makeup' ? 'dash' : 'plus'
                } dropdown-icon`}
              />
              <div
                className={`mega-menu2 ${
                  state.activeMenu === 'makeup' ? 'd-block' : ''
                }`}
                style={{
                  backgroundImage: 'url("/assets/img/home1/megamenu2-bg1.png")',
                }}
              >
                <div className="megamenu-wrap">
                  <ul className="menu-row">
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Primer
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Foundation
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Concealer
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Powder
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Blush
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Bronzer
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Highlighter
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Contour
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Eyeshadow
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Eyeliner
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Mascara
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Lip Balm
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Lipstick
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Lip Gloss
                        </a>
                      </Link>
                    </li>
                    <li className="menu-single-item">
                      <Link legacyBehavior href="/shop">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={8}
                            viewBox="0 0 16 8"
                          >
                            <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                            <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                          </svg>
                          Setting Spray
                        </a>
                      </Link>
                    </li>
                  </ul>
                  <div className="all-product">
                    <Link legacyBehavior href="/shop">
                      <a className="hover-underline ">
                        *View All Product
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
              </div>
            </li>
            <li className="menu-item-has-children position-inherit for-dropdown">
              <a href="#" className="drop-down">
                Shop
                <i className="bi bi-plus dropdown-icon d-lg-flex d-none" />
              </a>

              <i
                onClick={() => toggleMenu('shop')}
                className={`bi bi-${
                  state.activeMenu === 'shop' ? 'dash' : 'plus'
                } dropdown-icon d-lg-none d-block`}
              />
              <div
                className={`mega-menu ${
                  state.activeMenu === 'shop' ? 'd-block' : ''
                }`}
              >
                <div className="megamenu-wrap">
                  <div className="single-menu one">
                    <div className="menu-header">
                      <h4>Shop</h4>
                    </div>
                    <ul className="menu-row">
                      <li className="menu-single-item">
                        <h6>Shop Layout</h6>
                        <ul>
                          <li>
                            <Link legacyBehavior href="/shop/right-sidebar">
                              <a>Right Sidebar</a>
                            </Link>
                          </li>
                          <li>
                            <Link legacyBehavior href="/shop/left-sidebar">
                              <a>Left Sidebar</a>
                            </Link>
                          </li>
                          <li>
                            <Link legacyBehavior href="/shop">
                              <a>Shop List</a>
                            </Link>
                          </li>
                          <li>
                            <Link legacyBehavior href="/shop/category-on-top">
                              <a>Category Top</a>
                            </Link>
                          </li>
                          <li>
                            <Link legacyBehavior href="/shop/standard">
                              <a>Standard</a>
                            </Link>
                          </li>
                          <li>
                            <Link legacyBehavior href="/shop/slider">
                              <a>Slider</a>
                            </Link>
                          </li>
                          <li>
                            <Link legacyBehavior href="/shop/full-width">
                              <a>Full Width</a>
                            </Link>
                          </li>
                        </ul>
                        <ul className="menu-rows">
                          <li className="menu-single-item">
                            <h6>Cart &amp; Checkout</h6>
                            <ul>
                              <li>
                                <Link legacyBehavior href="/shop/cart">
                                  <a>Cart Page</a>
                                </Link>
                              </li>
                              <li>
                                <Link legacyBehavior href="/shop/checkout">
                                  <a>Checkout</a>
                                </Link>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li className="menu-single-item">
                        <h6>Filter Layout</h6>
                        <ul>
                          <li>
                            <Link legacyBehavior href="/shop/left-sidebar">
                              <a>Left Sidebar</a>
                            </Link>
                          </li>
                          <li>
                            <Link legacyBehavior href="/shop/right-sidebar">
                              <a>Right Sidebar</a>
                            </Link>
                          </li>
                          <li>
                            <Link legacyBehavior href="/shop">
                              <a>Filter Hidden</a>
                            </Link>
                          </li>
                          <li>
                            <Link legacyBehavior href="/shop/filter-top">
                              <a>Filter Top</a>
                            </Link>
                          </li>
                          <li>
                            <Link legacyBehavior href="/shop/filter-dropdown">
                              <a>Filter Dropdown</a>
                            </Link>
                          </li>
                        </ul>
                        <ul className="menu-rows">
                          <li className="menu-single-item">
                            <h6>Woo Pages</h6>
                            <ul>
                              <li>
                                <Link legacyBehavior href="/my-account">
                                  <a>My Account</a>
                                </Link>
                              </li>
                              <li>
                                <Link legacyBehavior href="/order-tracking">
                                  <a>Order Tracking</a>
                                </Link>
                              </li>
                              <li>
                                <Link legacyBehavior href="/shop/whistlist">
                                  <a>Wishlist</a>
                                </Link>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li className="menu-single-item">
                        <h6>Page Loading</h6>
                        <ul>
                          <li>
                            <Link legacyBehavior href="/shop">
                              <a>Pagination</a>
                            </Link>
                          </li>
                          <li>
                            <Link legacyBehavior href="/load-more">
                              <a>Load More</a>
                            </Link>
                          </li>
                          <li>
                            <Link legacyBehavior href="/infinity">
                              <a>Infinity</a>
                            </Link>
                          </li>
                        </ul>
                        <ul className="menu-rows">
                          <li className="menu-single-item">
                            <h6>Hover Style</h6>
                            <ul>
                              <li>
                                <Link legacyBehavior href="/shop/left-sidebar">
                                  <a>Add To Cart</a>
                                </Link>
                              </li>
                              <li>
                                <Link legacyBehavior href="/shop/quick-view">
                                  <a>Quick View</a>
                                </Link>
                              </li>
                              <li>
                                <Link legacyBehavior href="/shop/double-image">
                                  <a>Icon</a>
                                </Link>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className="single-menu">
                    <div className="menu-header">
                      <h4>Product</h4>
                    </div>
                    <ul className="menu-row">
                      <li className="menu-single-item">
                        <h6>Product Type</h6>
                        <ul>
                          <li>
                            <Link legacyBehavior href="/shop/video-popup">
                              <a>Video Popup</a>
                            </Link>
                          </li>
                          <li>
                            <Link legacyBehavior href="/shop/countdown">
                              <a>Countdown</a>
                            </Link>
                          </li>
                          <li>
                            <Link
                              legacyBehavior
                              href="/shop/product-with-size-variation"
                            >
                              <a>Size Variation</a>
                            </Link>
                          </li>
                          <li>
                            <Link legacyBehavior href="/shop/notify-me">
                              <a>Notify Me</a>
                            </Link>
                          </li>
                          <li>
                            <Link legacyBehavior href="/shop/low-stock-notice">
                              <a>Low Stock Notice</a>
                            </Link>
                          </li>
                          <li>
                            <Link legacyBehavior href="/shop/out-of-stock">
                              <a>Out Of Stock</a>
                            </Link>
                          </li>
                        </ul>
                        <ul className="menu-rows">
                          <li className="menu-single-item">
                            <h6>Description Style</h6>
                            <ul>
                              <li>
                                <Link
                                  legacyBehavior
                                  href="/shop/product-detail"
                                >
                                  <a>Tab Default</a>
                                </Link>
                              </li>
                              <li>
                                <Link legacyBehavior href="/shop/accordion">
                                  <a>Accordion</a>
                                </Link>
                              </li>
                              <li>
                                <Link legacyBehavior href="/shop/vertical">
                                  <a>Verticle</a>
                                </Link>
                              </li>
                              <li>
                                <Link legacyBehavior href="/shop/full-content">
                                  <a>Full Content</a>
                                </Link>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li className="menu-single-item">
                        <h6>Product Gallery</h6>
                        <ul>
                          <li>
                            <Link legacyBehavior href="/shop/product-detail">
                              <a>Product Default</a>
                            </Link>
                          </li>
                          <li>
                            <Link
                              legacyBehavior
                              href="/shop/product-thumb-left"
                            >
                              <a>Product Thumbnail Left</a>
                            </Link>
                          </li>
                          <li>
                            <Link
                              legacyBehavior
                              href="/shop/product-thumb-bottom"
                            >
                              <a>Product Thumbnail Bottom</a>
                            </Link>
                          </li>
                          <li>
                            <Link
                              legacyBehavior
                              href="/shop/product-full-width"
                            >
                              <a>Product Full Width</a>
                            </Link>
                          </li>
                          <li>
                            <Link
                              legacyBehavior
                              href="/shop/product-thumb-bottom"
                            >
                              <a>Product Slider</a>
                            </Link>
                          </li>
                          <li>
                            <Link legacyBehavior href="/shop/scroll-1-column">
                              <a>Scroll 1 Column</a>
                            </Link>
                          </li>
                          <li>
                            <Link legacyBehavior href="/shop/gallery-grid">
                              <a>Gallery Grid</a>
                            </Link>
                          </li>
                          <li>
                            <Link legacyBehavior href="/shop/product-detail">
                              <a>Image Zoom</a>
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li className="menu-item-has-children">
              <a href="#" className="drop-down">
                Pages
              </a>
              <i
                onClick={() => toggleMenu('pages')}
                className={`bi bi-${
                  state.activeMenu === 'pages' ? 'dash' : 'plus'
                } dropdown-icon`}
              />
              <ul
                className={`sub-menu ${
                  state.activeMenu === 'pages' ? 'd-block' : ''
                }`}
              >
                <li>
                  <Link legacyBehavior href="/about-us">
                    <a>About Us</a>
                  </Link>
                </li>
                <li>
                  <Link legacyBehavior href="/our-brand">
                    <a>Our Brand</a>
                  </Link>
                </li>
                <li>
                  <Link legacyBehavior href="/category">
                    <a>Category</a>
                  </Link>
                </li>
                <li>
                  <Link legacyBehavior href="/blog-grid">
                    <a>Blog</a>
                  </Link>
                  <i className="d-lg-flex d-none bi bi-chevron-right dropdown-icon" />

                  <i
                    onClick={() => toggleSubMenu('submenu1')}
                    className={`d-lg-none d-flex bi bi-${
                      state.activeSubMenu === 'submenu1' ? 'dash' : 'plus'
                    } dropdown-icon `}
                  />
                  <ul
                    className={`sub-menu ${
                      state.activeSubMenu === 'submenu1' ? 'd-block' : ''
                    }`}
                  >
                    <li>
                      <Link legacyBehavior href="/blog-grid">
                        <a>Blog Grid</a>
                      </Link>
                    </li>
                    <li>
                      <Link legacyBehavior href="/blog-masonary">
                        <a>Blog Masonary</a>
                      </Link>
                    </li>
                    <li>
                      <Link legacyBehavior href="/blog-grid-right-sidebar">
                        <a>Blog Grid Right Sidebar</a>
                      </Link>
                    </li>
                    <li>
                      <Link legacyBehavior href="/blog-grid-left-sidebar">
                        <a>Blog Grid Left Sidebar</a>
                      </Link>
                    </li>
                    <li>
                      <Link legacyBehavior href="/blog-standard-right-sidebar">
                        <a>Standard Right Sidebar</a>
                      </Link>
                    </li>
                    <li>
                      <Link legacyBehavior href="/blog-standard-left-sidebar">
                        <a>Standard Left Sidebar</a>
                      </Link>
                    </li>
                    <li>
                      <Link legacyBehavior href="/blog-details">
                        <a>Blog Details</a>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link legacyBehavior href="/gift-card">
                    <a>Gift card</a>
                  </Link>
                </li>
                <li>
                  <Link legacyBehavior href="/faq">
                    <a>FAQ</a>
                  </Link>
                </li>
                <li>
                  <Link legacyBehavior href="/error">
                    <a>Error</a>
                  </Link>
                </li>
                <li>
                  <Link legacyBehavior href="/contact">
                    <a>Contact Us</a>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <div className="d-lg-none d-block">
            <form className="mobile-menu-form d-lg-none d-block pt-50">
              <div className="input-with-btn d-flex flex-column">
                <input type="text" placeholder="Search here..." />
                <button type="submit" className="primary-btn1 hover-btn3">
                  Search
                </button>
              </div>
            </form>
            <form className="mobile-menu-form">
              <div className="hotline pt-40">
                <div className="hotline-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={18}
                    height={18}
                    viewBox="0 0 18 18"
                  >
                    <path d="M14.2333 11.1504C13.8642 10.7667 13.4191 10.5615 12.9473 10.5615C12.4794 10.5615 12.0304 10.7629 11.6462 11.1466L10.4439 12.3433C10.345 12.2901 10.2461 12.2407 10.151 12.1913C10.014 12.1229 9.88467 12.0583 9.77433 11.9899C8.64819 11.2757 7.62476 10.345 6.64319 9.14067C6.16762 8.54043 5.84804 8.03516 5.61596 7.52229C5.92793 7.23736 6.21708 6.94104 6.49861 6.65611C6.60514 6.54974 6.71167 6.43957 6.8182 6.33319C7.61715 5.5354 7.61715 4.50207 6.8182 3.70427L5.77955 2.66714C5.66161 2.54937 5.53987 2.4278 5.42573 2.30623C5.19746 2.07069 4.95777 1.82755 4.71047 1.59961C4.34143 1.2349 3.9001 1.04115 3.43595 1.04115C2.97179 1.04115 2.52286 1.2349 2.1424 1.59961L2.13479 1.60721L0.841243 2.91027C0.35426 3.39655 0.076528 3.9892 0.0156552 4.67682C-0.0756541 5.78614 0.251537 6.81947 0.502638 7.4957C1.11898 9.15587 2.03968 10.6945 3.41312 12.3433C5.07952 14.3301 7.08452 15.8991 9.37486 17.0047C10.2499 17.4187 11.4179 17.9088 12.7229 17.9924C12.8028 17.9962 12.8865 18 12.9626 18C13.8414 18 14.5795 17.6847 15.1578 17.0578C15.1616 17.0502 15.1692 17.0464 15.173 17.0388C15.3708 16.7995 15.5991 16.583 15.8388 16.3512C16.0024 16.1955 16.1698 16.0321 16.3334 15.8611C16.71 15.4698 16.9079 15.014 16.9079 14.5467C16.9079 14.0756 16.7062 13.6235 16.322 13.2436L14.2333 11.1504ZM15.5953 15.1507C15.5915 15.1545 15.5915 15.1507 15.5953 15.1507C15.4469 15.3103 15.2947 15.4547 15.1311 15.6142C14.8838 15.8498 14.6327 16.0967 14.3969 16.374C14.0126 16.7843 13.5599 16.9781 12.9664 16.9781C12.9093 16.9781 12.8484 16.9781 12.7913 16.9743C11.6614 16.9021 10.6113 16.4614 9.82379 16.0853C7.67042 15.0444 5.77955 13.5665 4.20827 11.6936C2.91092 10.1322 2.04348 8.68859 1.46899 7.13859C1.11517 6.19263 0.985816 5.45562 1.04288 4.7604C1.08093 4.31591 1.25214 3.94741 1.56791 3.63209L2.86527 2.33662C3.05169 2.16187 3.24953 2.06689 3.44356 2.06689C3.68324 2.06689 3.87728 2.21125 3.99902 2.33282L4.01044 2.34422C4.24251 2.56076 4.46318 2.78491 4.69526 3.02424C4.8132 3.14581 4.93494 3.26738 5.05669 3.39275L6.09533 4.42988C6.49861 4.83258 6.49861 5.20488 6.09533 5.60758C5.985 5.71775 5.87847 5.82792 5.76814 5.9343C5.44856 6.26101 5.14419 6.56494 4.8132 6.86126C4.80559 6.86886 4.79798 6.87266 4.79417 6.88025C4.46698 7.20697 4.52786 7.52609 4.59634 7.74263L4.60775 7.77682C4.87787 8.43026 5.25833 9.0457 5.83662 9.77891L5.84043 9.78271C6.89048 11.0744 7.99761 12.0811 9.21887 12.8523C9.37486 12.9511 9.53465 13.0309 9.68683 13.1069C9.82379 13.1752 9.95315 13.2398 10.0635 13.3082C10.0787 13.3158 10.0939 13.3272 10.1091 13.3348C10.2385 13.3994 10.3602 13.4298 10.4858 13.4298C10.8016 13.4298 10.9994 13.2322 11.0641 13.1676L12.3652 11.8684C12.4946 11.7392 12.7 11.5834 12.9397 11.5834C13.1756 11.5834 13.3696 11.7316 13.4876 11.8608L13.4952 11.8684L15.5915 13.9616C15.9834 14.3491 15.9834 14.748 15.5953 15.1507ZM9.72868 4.28172C10.7255 4.44888 11.631 4.91996 12.3538 5.64177C13.0767 6.36359 13.5446 7.26775 13.7159 8.2631C13.7577 8.51383 13.9746 8.68859 14.2219 8.68859C14.2523 8.68859 14.2789 8.68479 14.3094 8.68099C14.5909 8.6354 14.7773 8.36947 14.7317 8.08834C14.5262 6.88405 13.9555 5.78614 13.0843 4.91616C12.2131 4.04618 11.1135 3.47633 9.90749 3.27118C9.62596 3.22559 9.36344 3.41175 9.31398 3.68907C9.26452 3.9664 9.44714 4.23613 9.72868 4.28172ZM17.9922 7.94018C17.6536 5.95709 16.7176 4.15255 15.2795 2.71652C13.8414 1.28049 12.0342 0.345932 10.0483 0.00781895C9.77053 -0.0415684 9.50802 0.148383 9.45856 0.425712C9.4129 0.70684 9.59932 0.968972 9.88086 1.01836C11.6538 1.31848 13.2707 2.15807 14.5567 3.43834C15.8426 4.72241 16.6796 6.33699 16.9802 8.10734C17.022 8.35808 17.2389 8.53283 17.4862 8.53283C17.5166 8.53283 17.5432 8.52903 17.5737 8.52523C17.8514 8.48344 18.0416 8.21751 17.9922 7.94018Z" />
                  </svg>
                </div>
                <div className="hotline-info">
                  <span>Call Us Now</span>
                  <h6>
                    <a href="tel:+8801701111000">+880 170 1111 000</a>
                  </h6>
                </div>
              </div>
              <div className="email pt-20 d-flex align-items-center">
                <div className="email-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={18}
                    height={18}
                    viewBox="0 0 20 20"
                  >
                    <path d="M19.9018 8.6153C19.5412 5.99522 18.1517 3.62536 16.0393 2.02707C13.9268 0.428777 11.2643 -0.267025 8.63745 0.0927308C6.01063 0.452486 3.63468 1.83833 2.03228 3.94539C0.42988 6.05245 -0.267711 8.70813 0.0929693 11.3282C0.388972 13.4966 1.38745 15.509 2.9363 17.0589C4.48516 18.6088 6.49948 19.6113 8.67243 19.9136C9.11786 19.9713 9.56656 20.0002 10.0157 20C11.8278 20.0033 13.606 19.5101 15.1563 18.5744C15.2358 18.5318 15.3058 18.4735 15.362 18.4031C15.4182 18.3326 15.4595 18.2516 15.4833 18.1648C15.5072 18.078 15.5131 17.9872 15.5007 17.8981C15.4884 17.8089 15.458 17.7232 15.4114 17.6461C15.3648 17.569 15.303 17.5021 15.2298 17.4496C15.1565 17.397 15.0733 17.3599 14.9853 17.3403C14.8972 17.3208 14.806 17.3193 14.7173 17.336C14.6287 17.3527 14.5443 17.3871 14.4694 17.4373C12.7129 18.4904 10.6392 18.8886 8.61629 18.5613C6.59339 18.2339 4.75224 17.2022 3.4197 15.6492C2.08717 14.0962 1.34948 12.1225 1.3376 10.0784C1.32573 8.03438 2.04043 6.05225 3.35483 4.48397C4.66923 2.91568 6.49828 1.86271 8.51723 1.512C10.5362 1.16129 12.6144 1.53554 14.383 2.56829C16.1515 3.60104 17.4959 5.22548 18.1776 7.1532C18.8592 9.08092 18.8338 11.1872 18.1061 13.0981C17.9873 13.4102 17.7626 13.6709 17.4711 13.8349C17.1795 13.999 16.8396 14.056 16.5104 13.996C16.1811 13.9361 15.8833 13.763 15.6687 13.5068C15.454 13.2506 15.3362 12.9275 15.3356 12.5936V5.37867C15.3356 5.2024 15.2654 5.03336 15.1404 4.90872C15.0155 4.78408 14.846 4.71406 14.6693 4.71406C14.4925 4.71406 14.3231 4.78408 14.1981 4.90872C14.0731 5.03336 14.0029 5.2024 14.0029 5.37867V6.52578C13.2819 5.70734 12.3261 5.12961 11.265 4.8708C10.204 4.61198 9.08877 4.68456 8.0704 5.07873C7.05203 5.47289 6.17966 6.16961 5.57134 7.07458C4.96303 7.97954 4.64814 9.04908 4.66929 10.1384C4.69045 11.2278 5.04663 12.2843 5.68962 13.1651C6.33262 14.0459 7.23139 14.7084 8.2643 15.0629C9.2972 15.4175 10.4144 15.4469 11.4646 15.1473C12.5149 14.8477 13.4475 14.2335 14.1362 13.3878C14.3015 13.9385 14.6358 14.4237 15.092 14.775C15.5482 15.1263 16.1033 15.326 16.6793 15.3461C17.2553 15.3662 17.8231 15.2057 18.3028 14.887C18.7825 14.5684 19.15 14.1078 19.3535 13.5699C19.9483 11.99 20.1368 10.2866 19.9018 8.6153ZM10.0051 14.0185C9.21436 14.0185 8.4414 13.7847 7.78396 13.3465C7.12651 12.9083 6.61409 12.2856 6.3115 11.5569C6.00891 10.8283 5.92974 10.0265 6.08399 9.25296C6.23825 8.47943 6.61902 7.7689 7.17813 7.21122C7.73724 6.65354 8.4496 6.27376 9.22511 6.1199C10.0006 5.96603 10.8045 6.045 11.535 6.34681C12.2655 6.64863 12.8899 7.15973 13.3292 7.8155C13.7685 8.47126 14.0029 9.24223 14.0029 10.0309C14.0019 11.0882 13.5803 12.1018 12.8308 12.8494C12.0813 13.597 11.065 14.0175 10.0051 14.0185Z" />
                  </svg>
                </div>
                <div className="email-info">
                  <span>Email Now</span>
                  <h6>
                    <a href="mailto:example@gmail.com">example@gmail.com</a>
                  </h6>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="nav-right d-flex jsutify-content-end align-items-center">
          {/* Button trigger modal */}
          <div className="dropdown">
            <Cart />
          </div>
          <div className="save-btn">
            <Link legacyBehavior href="/shop/whistlist">
              <a>
                <svg
                  width={18}
                  height={18}
                  viewBox="0 0 18 18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_68_10)">
                    <path d="M16.528 2.20922C16.0674 1.71414 15.5099 1.31909 14.8902 1.04862C14.2704 0.778143 13.6017 0.638026 12.9255 0.636976C12.2487 0.637756 11.5794 0.777669 10.959 1.04803C10.3386 1.31839 9.78042 1.71341 9.31911 2.20857L9.00132 2.54439L8.68352 2.20857C6.83326 0.217182 3.71893 0.102819 1.72758 1.95309C1.63932 2.0351 1.5541 2.12032 1.47209 2.20857C-0.490696 4.32568 -0.490696 7.59756 1.47209 9.71466L8.5343 17.1622C8.77862 17.4201 9.18579 17.4312 9.44373 17.1869C9.45217 17.1789 9.46039 17.1707 9.46838 17.1622L16.528 9.71466C18.4907 7.59779 18.4907 4.32609 16.528 2.20922ZM15.5971 8.82882H15.5965L9.00132 15.7849L2.40553 8.82882C0.90608 7.21116 0.90608 4.71143 2.40553 3.09377C3.76722 1.61792 6.06755 1.52538 7.5434 2.88706C7.61505 2.95317 7.68401 3.02213 7.75012 3.09377L8.5343 3.92107C8.79272 4.17784 9.20995 4.17784 9.46838 3.92107L10.2526 3.09441C11.6142 1.61856 13.9146 1.52602 15.3904 2.8877C15.4621 2.95381 15.531 3.02277 15.5971 3.09441C17.1096 4.71464 17.1207 7.21893 15.5971 8.82882Z" />
                  </g>
                </svg>
              </a>
            </Link>
          </div>
          <div className="user-login">
            <button
              type="button"
              className="user-btn"
              data-bs-toggle="modal"
              data-bs-target="#user-login"
            >
              <svg
                width={18}
                height={18}
                viewBox="0 0 18 18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_122_313)">
                  <path d="M15.364 11.636C14.3837 10.6558 13.217 9.93013 11.9439 9.49085C13.3074 8.55179 14.2031 6.9802 14.2031 5.20312C14.2031 2.33413 11.869 0 9 0C6.131 0 3.79688 2.33413 3.79688 5.20312C3.79688 6.9802 4.69262 8.55179 6.05609 9.49085C4.78308 9.93013 3.61631 10.6558 2.63605 11.636C0.936176 13.3359 0 15.596 0 18H1.40625C1.40625 13.8128 4.81279 10.4062 9 10.4062C13.1872 10.4062 16.5938 13.8128 16.5938 18H18C18 15.596 17.0638 13.3359 15.364 11.636ZM9 9C6.90641 9 5.20312 7.29675 5.20312 5.20312C5.20312 3.1095 6.90641 1.40625 9 1.40625C11.0936 1.40625 12.7969 3.1095 12.7969 5.20312C12.7969 7.29675 11.0936 9 9 9Z" />
                </g>
              </svg>
            </button>
          </div>
          <div
            className={`sidebar-button mobile-menu-btn ${
              state.isSidebarOpen ? 'active' : ''
            }`}
            onClick={toggleSidebar}
          >
            <span />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
