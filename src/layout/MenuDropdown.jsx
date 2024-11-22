import React from 'react';
import { useRouter } from 'next/router';

const MenuDropdown = ({ menuData, activeMenu, toggleMenu, toggleSideBar }) => {
  const router = useRouter();
  const isActive = activeMenu === menuData.slug;

  // Handles clicks on the dropdown toggle icon
  const handleToggleMenuClick = (e) => {
    toggleMenu(menuData.slug); // Toggles the active menu
  };

  // Handles clicks on main categories
  const handleMainCategoryClick = () => {
    router.push(`/shop/?main_category=${menuData.slug}`);
    toggleSideBar(); // Closes the sidebar
  };

  // Handles clicks on subcategories
  const handleSubcategoryClick = (categorySlug) => {
    router.push(
      `/shop/?main_category=${menuData.slug}&category=${categorySlug}`
    );
    toggleSideBar(); // Closes the sidebar
  };

  return (
    <li className="menu-item-has-children position-inherit for-dropdown">
      {/* Main Category Button */}
      <a href="" onClick={handleMainCategoryClick} className="drop-down">
        {menuData.name}
      </a>

      {/* Dropdown Toggle Icon */}
      <i
        onClick={() => {
          toggleMenu(menuData.slug);
        }} // Handles toggling menu visibility
        className={`bi bi-${isActive ? 'dash' : 'plus'} dropdown-icon`}
      />

      {/* Subcategory Dropdown */}
      <div className={`mega-menu2 ${isActive ? 'd-block' : ''}`}>
        <div className="megamenu-wrap">
          <ul className="menu-row">
            {menuData.categories.map((category) => (
              <li className="menu-single-item" key={category.id}>
                {/* Subcategory Button */}
                <a
                  href=""
                  onClick={() => handleSubcategoryClick(category.slug)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={8}
                    viewBox="0 0 16 8"
                  >
                    <path d="M11.346 4.44443L0.217529 4.42657C0.159577 4.42657 0.104 4.38069 0.0630221 4.29902C0.0220445 4.21734 -0.000976562 4.10656 -0.000976562 3.99106C-0.000976562 3.87555 0.0220445 3.76478 0.0630221 3.6831C0.104 3.60143 0.159577 3.55554 0.217529 3.55554L11.3462 3.5734C11.4042 3.5734 11.4597 3.61928 11.5007 3.70096C11.5417 3.78263 11.5647 3.89341 11.5647 4.00891C11.5647 4.12442 11.5417 4.2352 11.5007 4.31687C11.4597 4.39855 11.4039 4.44443 11.346 4.44443Z" />
                    <path d="M15.9991 4.00526C13.6711 4.8883 10.7821 6.39874 8.9917 8L10.4038 4.00021L8.99703 0C10.7858 1.60336 13.6723 3.11716 15.9991 4.00526Z" />
                  </svg>
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
};

export default MenuDropdown;
