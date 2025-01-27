import React, {
  useState,
  useEffect,
  useReducer,
  useRef,
  useContext,
} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Cart from '../components/common/Cart';
import SelectComponent from '../components/common/SelectComponent';
import MenuDropdown from './MenuDropdown';
import { fetchCategories } from '../data/categories';
import { AuthContext } from '../store/authcontext';

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

const Header2 = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const headerRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const { isLoggedIn, handleLogout } = useContext(AuthContext); // Get setIsLoggedIn from context
  const profileMenuRef = useRef(null);
  const sidebarRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const searchInputRef = useRef(null); // Ref for search input

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
  const closeMenu = () => {
    dispatch({ type: 'TOGGLE_MENU', menu: '' });
  };

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategories();
      setCategories(data); // Assuming fetchCategories returns an array of categories
    };

    getCategories();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    if (searchTerm.trim()) {
      // Redirect to /shop with the search keyword as a query parameter
      router.push(`/shop?keyword=${encodeURIComponent(searchTerm)}`);
      setSearchTerm(''); // Clear the input field after submission
      toggleSidebar();
    }
  };

  // Handle "click outside"
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        dispatch({ type: 'TOGGLE_MENU', menu: '' });
      }
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        toggleButtonRef.current &&
        state.isSidebarOpen &&
        !toggleButtonRef.current.contains(event.target)
      ) {
        dispatch({ type: 'TOGGLE_SIDEBAR' });
      }
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target) &&
        state.activeMenu === 'searchOption'
      ) {
        dispatch({ type: 'TOGGLE_MENU', menu: '' });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [state.isSidebarOpen, state.activeMenu]);

  return (
    <>
      <header
        ref={headerRef}
        className={`header-area style-2 ${state.scrollY > 10 ? 'sticky' : ''}`}
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

          <div
            ref={sidebarRef}
            className={`main-menu ${state.isSidebarOpen ? 'show-menu' : ''}`}
          >
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
                onClick={toggleSidebar}
                className={` ${currentRoute === '/' ? 'active' : ''}`}
              >
                <Link
                  className={` ${
                    state.activeMenu === 'home-one' ? 'active' : ''
                  }`}
                  legacyBehavior
                  href="/"
                >
                  <a>Home</a>
                </Link>
                <i onClick={() => toggleMenu('home-one')} />
              </li>
              {/* Dynamically Render Categories */}
              {categories.map((category) => (
                <MenuDropdown
                  toggleSideBar={toggleSidebar}
                  key={category.id}
                  menuData={category}
                  activeMenu={state.activeMenu}
                  toggleMenu={toggleMenu}
                />
              ))}
            </ul>
          </div>
          <div className="nav-right  position-inherit d-flex justify-content-end align-items-center">
            <div className="search-area">
              <div
                onClick={() => toggleMenu('searchOption')}
                className="search-btn"
              >
                <i className="bx bx-search" />
              </div>
              <div
                ref={searchInputRef}
                className={`search-input ${
                  state.activeMenu === 'searchOption' ? 'active' : ''
                }`}
              >
                <div
                  onClick={() => toggleMenu('searchOption')}
                  className="serch-close"
                />
                <form onSubmit={handleSearchSubmit}>
                  <div className="search-group">
                    <div className="form-inner2">
                      <input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        type="text"
                        placeholder="Search your products"
                      />
                      <button type="submit">
                        <i className="bx bx-search" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="dropdown ">
              <Cart />
            </div>

            <div className="user-login">
              {isLoggedIn === true ? (
                <div ref={profileMenuRef} className="category-dropdown">
                  <div
                    className="category-button"
                    onClick={() => toggleMenu('profileOptions')}
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
                  </div>
                  <div
                    className={`category-menu ${
                      state.activeMenu === 'profileOptions' ? 'active' : ''
                    }`}
                  >
                    <ul>
                      <li>
                        <Link legacyBehavior href="/our-brand">
                          <a>
                            {' '}
                            <svg
                              width={20}
                              height={20}
                              viewBox="0 0 22 22"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M18.7782 14.2218C17.5801 13.0237 16.1541 12.1368 14.5982 11.5999C16.2646 10.4522 17.3594 8.53136 17.3594 6.35938C17.3594 2.85282 14.5066 0 11 0C7.49345 0 4.64062 2.85282 4.64062 6.35938C4.64062 8.53136 5.73543 10.4522 7.40188 11.5999C5.84598 12.1368 4.41994 13.0237 3.22184 14.2218C1.14421 16.2995 0 19.0618 0 22H1.71875C1.71875 16.8823 5.88229 12.7188 11 12.7188C16.1177 12.7188 20.2812 16.8823 20.2812 22H22C22 19.0618 20.8558 16.2995 18.7782 14.2218ZM11 11C8.44117 11 6.35938 8.91825 6.35938 6.35938C6.35938 3.8005 8.44117 1.71875 11 1.71875C13.5588 1.71875 15.6406 3.8005 15.6406 6.35938C15.6406 8.91825 13.5588 11 11 11Z" />
                            </svg>
                            My Profile
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link legacyBehavior href="/orders">
                          <a onClick={closeMenu}>
                            {' '}
                            <svg
                              width={20}
                              height={20}
                              viewBox="0 0 22 22"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M7.41246 0.0859337C6.34254 0.356638 5.40152 1.12578 4.92027 2.11836C4.61519 2.75429 4.58941 2.90039 4.56793 4.00468L4.54644 4.98437H3.02535H1.50425L1.48707 5.0789C1.43121 5.36679 0.80816 16.6977 0.829644 17.0586C0.898394 18.266 1.66754 19.3402 2.80621 19.8215C3.39488 20.0664 3.38199 20.0664 7.73473 20.0664H11.7222L12.1218 20.466C12.9211 21.2523 13.875 21.7508 14.9535 21.9398C15.5636 22.043 16.6336 22.0043 17.1879 21.8582C19.13 21.334 20.5308 19.9203 21.0422 17.9695C21.1882 17.4066 21.2226 16.457 21.1238 15.834C20.707 13.3117 18.4769 11.3867 15.9589 11.3867H15.5593L15.5379 11.159C15.525 11.0387 15.4433 9.72812 15.3617 8.25C15.28 6.77187 15.1984 5.43554 15.1855 5.27226L15.1597 4.98437H13.6386H12.1175V4.19375C12.1175 3.32148 12.0574 2.87461 11.8726 2.40625C11.4429 1.31914 10.5793 0.511326 9.45348 0.150387C9.13121 0.0429649 9.0066 0.0300751 8.42223 0.0171852C7.86363 0.00429344 7.70035 0.0171852 7.41246 0.0859337ZM8.93785 1.39648C9.80582 1.62851 10.5148 2.35468 10.7211 3.22695C10.764 3.41601 10.7855 3.73398 10.7855 4.24101V4.98437H8.33629H5.88707V4.20664C5.88707 3.34726 5.93004 3.08515 6.14488 2.66836C6.45426 2.0625 7.05582 1.57265 7.70465 1.39648C8.00113 1.31914 8.64137 1.31914 8.93785 1.39648ZM4.55504 7.13281V7.94922H5.22105H5.88707V7.13281V6.3164H8.33629H10.7855V7.13281V7.94922H11.4515H12.1175V7.13281V6.3164H13.0199C13.8964 6.3164 13.9222 6.3207 13.9222 6.40234C13.9222 6.44961 13.991 7.64414 14.0726 9.05351C14.1586 10.4586 14.2187 11.6187 14.2144 11.623C14.2058 11.6273 14.0425 11.7004 13.8449 11.7863C12.3539 12.4223 11.2796 13.5867 10.8113 15.0734C10.4804 16.1219 10.489 17.368 10.8285 18.382L10.9488 18.7387L7.28785 18.7258L3.63121 18.7129L3.39488 18.6184C2.91363 18.4207 2.45386 17.9609 2.27769 17.5012C2.22183 17.3594 2.17027 17.1144 2.16168 16.9297C2.14449 16.6633 2.64293 7.66562 2.73316 6.62578L2.75894 6.3164H3.65699H4.55504V7.13281ZM16.9429 12.8648C18.0515 13.1914 18.9324 13.9262 19.4308 14.9316C19.7273 15.5246 19.8519 16.0531 19.8519 16.7105C19.8476 18.3519 18.8379 19.8172 17.2996 20.4145C16.8312 20.5949 16.4144 20.6723 15.8773 20.6723C14.9234 20.6723 14.1414 20.3973 13.3765 19.7914C12.7707 19.3102 12.2507 18.5195 12.0273 17.7461C11.8984 17.2863 11.8683 16.4227 11.9629 15.9371C12.255 14.5105 13.3379 13.3117 14.7257 12.8906C15.2027 12.7445 15.4089 12.723 16.0062 12.7402C16.4488 12.7488 16.6422 12.7789 16.9429 12.8648Z" />
                              <path d="M16.4186 15.8812C15.7698 16.5516 15.2284 17.0973 15.2069 17.093C15.1897 17.0844 14.919 16.7922 14.6097 16.4441L14.0425 15.8039L13.905 15.9285C13.8319 15.9973 13.6128 16.1949 13.4151 16.3711C13.2218 16.543 13.0671 16.702 13.0714 16.7191C13.0972 16.775 15.1425 19.0781 15.1725 19.0781C15.1897 19.0781 15.9675 18.2875 16.8999 17.325L18.5971 15.5676L18.1417 15.1121C17.8882 14.8586 17.6604 14.6523 17.6389 14.6523C17.6132 14.6566 17.0675 15.2066 16.4186 15.8812Z" />
                            </svg>
                            My Orders
                          </a>
                        </Link>
                      </li>

                      <li>
                        <button onClick={handleLogout}>
                          <svg
                            width={20}
                            height={20}
                            viewBox="0 0 22 22"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_382_377)">
                              <path d="M21.7273 10.4732L19.3734 8.81368C18.9473 8.51333 18.3574 8.81866 18.3574 9.34047V12.6595C18.3574 13.1834 18.9485 13.4856 19.3733 13.1863L21.7272 11.5268C22.0916 11.2699 22.0906 10.7294 21.7273 10.4732Z" />
                              <path d="M18.4963 15.1385C18.1882 14.9603 17.7939 15.0655 17.6156 15.3737C16.1016 17.9911 13.2715 19.7482 10.0374 19.7482C5.21356 19.7482 1.28906 15.8237 1.28906 11C1.28906 6.17625 5.21356 2.25171 10.0374 2.25171C13.2736 2.25171 16.1025 4.0105 17.6156 6.62617C17.7938 6.93434 18.1882 7.03949 18.4962 6.86138C18.8043 6.68315 18.9096 6.28887 18.7314 5.98074C16.9902 2.97053 13.738 0.962646 10.0374 0.962646C4.48967 0.962646 0 5.45184 0 11C0 16.5477 4.48919 21.0373 10.0374 21.0373C13.7396 21.0373 16.9909 19.028 18.7315 16.0191C18.9097 15.711 18.8044 15.3168 18.4963 15.1385Z" />
                              <path d="M7.05469 10.3555C6.69873 10.3555 6.41016 10.644 6.41016 11C6.41016 11.356 6.69873 11.6445 7.05469 11.6445H17.0677V10.3555H7.05469Z" />
                            </g>
                            <defs>
                              <clipPath id="clip0_382_377">
                                <rect width={22} height={22} />
                              </clipPath>
                            </defs>
                          </svg>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#user-login"
                  className="user-btn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={30}
                    height={30}
                    fill="currentColor"
                    className="bi bi-person-x"
                    viewBox="0 0 18 18"
                  >
                    <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708" />
                  </svg>
                </button>
              )}
            </div>
            <div
              ref={toggleButtonRef}
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
    </>
  );
};

export default Header2;
