import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SelectComponent from '../components/common/SelectComponent';
import { fetchCategories } from '../data/categories';

const Filters = ({ isdropdown, query }) => {
  const router = useRouter();

  // State for main categories and subcategories
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [selectedFilters, setSelectedFilters] = useState({
    main_category: null,
    category: null,
    brand: null,
    highlight: null,
    sort: null,
  });

  // Fetch main categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      const categories = await fetchCategories();
      setMainCategories(
        categories.map((cat) => ({
          label: cat.name,
          value: cat.slug,
          subCategories: cat.categories, // Store subcategories directly
        }))
      );
    };
    loadCategories();
  }, []);

  // Populate filters based on URL parameters on mount
  useEffect(() => {
    if (Object.keys(router.query).length > 0) {
      const { main_category, category, brand, highlight, sort } = router.query;

      // Find the selected main category and set subcategories
      const selectedMainCategory = mainCategories.find(
        (cat) => cat.value === main_category
      );
      console.log(mainCategories);
      console.log(main_category);
      console.log(selectedMainCategory);
      if (selectedMainCategory) {
        setSubCategories(
          selectedMainCategory.subCategories.map((sub) => sub.slug)
        );
      }

      setSelectedFilters({
        main_category: main_category || null,
        category: category || null,
        brand: brand || null,
        highlight: highlight || null,
        sort: sort || null,
      });
    }
  }, [router.query]);

  // Update subcategories when main category is selected
  const handleMainCategoryChange = (mainCategorySlug) => {
    const selectedMainCategory = mainCategories.find(
      (cat) => cat.value === mainCategorySlug
    );

    // Set subcategories based on the selected main category
    setSubCategories(
      selectedMainCategory
        ? selectedMainCategory.subCategories.map((sub) => sub.slug)
        : []
    );
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      category: null, // Reset subcategory when main category changes
    }));
    // Update selected filters with main category slug and reset subcategory

    handleSelectChange('main_category', mainCategorySlug);
  };

  // Update URL parameters with selected filters
  const updateURLParams = (filters) => {
    const params = new URLSearchParams();

    Object.keys(filters).forEach((key) => {
      if (filters[key]) params.set(key, filters[key]);
    });

    router.push(
      {
        pathname: '/shop',
        query: params.toString(),
      },
      undefined,
      { shallow: true }
    );
  };

  // Handle selection change for each filter type
  const handleSelectChange = (filterType, value) => {
    const updatedFilters =
      filterType === 'main_category'
        ? { ...selectedFilters, [filterType]: value, category: null }
        : { ...selectedFilters, [filterType]: value };
    setSelectedFilters(updatedFilters);
    updateURLParams(updatedFilters);
  };

  console.log(selectedFilters);

  // Clear all filters and reset subcategories
  const clearFilters = () => {
    setSelectedFilters({
      main_category: null,
      category: null,
      brand: null,
      highlight: null,
      sort: null,
    });
    setSubCategories([]);
    router.push('/shop', undefined, { shallow: true });
  };

  return (
    <div className={`filter-top ${isdropdown ? 'slide' : ''}`}>
      <div className="row g-4 justify-content-center align-items-center">
        <div className="col-lg-10">
          <div className="row g-4">
            <div className="col-lg-3 col-sm-6">
              <div className="selector">
                <SelectComponent
                  options={mainCategories.map((cat) => cat.label)}
                  placeholder="Category"
                  onSelect={(value) =>
                    handleMainCategoryChange(
                      mainCategories.find((cat) => cat.label === value).value
                    )
                  }
                  selectedOption={selectedFilters.main_category} // Set initial selected value based on URL parameter
                />
              </div>
            </div>
            {selectedFilters.main_category && (
              <div className="col-lg-3 col-sm-6">
                <div className="selector">
                  <SelectComponent
                    options={subCategories}
                    placeholder="Sub-Category"
                    onSelect={(value) => handleSelectChange('category', value)}
                    selectedOption={selectedFilters.category} // Set initial selected value for category
                    disabled={!subCategories.length} // Disable if no subcategories
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-lg-2 d-flex justify-content-center">
          {Object.keys(router.query).length > 0 && (
            <button
              className="primary-btn3 black-bg hover-btn5 hover-white"
              onClick={clearFilters}
            >
              Show All
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;
