import React, { useState } from 'react';
import SelectComponent from '@/src/components/common/SelectComponent';
import CartSummary from '@/src/layout/CartSummary';
import CostSummary from '@/src/layout/CostSummary';
import { useRouter } from 'next/router';
import { useOrderContext } from '@/src/store/ordercontext';

const Checkout = () => {
  const router = useRouter();
  const { saveOrderData } = useOrderContext();

  // State to manage form fields
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    country: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    phone: '',
    email: '',
    order_note: '',
  });

  // State to track if the form is valid
  const [isFormValid, setIsFormValid] = useState(true);

  const countryCodeMap = {
    Portugal: 'PT',
    'United States': 'US',
    Germany: 'DE',
    Canada: 'CA',
  };

  // Handler for changes in the form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handler for selecting a country
  const handleSelectCountry = (selectedCountry) => {
    setFormData({
      ...formData,
      country: selectedCountry,
      countryCode: countryCodeMap[selectedCountry],
    });
  };

  // Handler for selecting a city
  const handleSelectCity = (selectedCity) => {
    setFormData({ ...formData, city: selectedCity });
  };

  // Validation error callback for SelectComponent
  const handleValidationError = (isValid) => {
    setIsFormValid(isValid); // Set form validity based on child component's validation state
  };

  // Handle form submission
  const handlePlaceOrder = (e) => {
    e.preventDefault();

    // If form is not valid, prevent submission
    if (!isFormValid) {
      console.log('Please fill out all required fields.');
      return;
    }

    // Save form data to context
    saveOrderData(formData);

    // Proceed to the next page
    router.push('/shop/review-checkout');
  };

  return (
    <div className="checkout-section pt-110 mb-110">
      <div className="container">
        <div className="row gy-5">
          <div className="col-lg-7">
            <div className="form-wrap mb-30">
              <h4>Billing Details</h4>
              <form onSubmit={handlePlaceOrder}>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-inner">
                      <label>First Name</label>
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        placeholder="Your first name"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-inner">
                      <label>Last Name</label>
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        placeholder="Your last name"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-inner">
                      <label>Country / Region</label>
                      <SelectComponent
                        name="country"
                        value={formData.country}
                        onSelect={handleSelectCountry}
                        options={[
                          'Portugal',
                          'United States',
                          'Germany',
                          'Canada',
                        ]}
                        placeholder="Select your country"
                        selectedOption={formData.country}
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-inner">
                      <label>Street Address</label>
                      <input
                        type="text"
                        name="address_line_1"
                        value={formData.address_line_1}
                        onChange={handleChange}
                        placeholder="House and street name"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-inner">
                      <SelectComponent
                        name="city"
                        value={formData.city}
                        onSelect={handleSelectCity}
                        options={['Dhaka', 'Saidpur', 'New York', 'Lisbon']}
                        placeholder="Town / City"
                        selectedOption={formData.city}
                        required={true}
                        onValidationError={handleValidationError} // Pass validation state
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-inner">
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="State"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-inner">
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Your Phone Number"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-inner">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email Address"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-inner">
                      <textarea
                        name="order_note"
                        value={formData.order_note}
                        onChange={handleChange}
                        placeholder="Order Notes (Optional)"
                        rows={6}
                      />
                    </div>
                  </div>
                </div>
                <div className="place-order-btn">
                  <button type="submit" className="primary-btn1 hover-btn3">
                    Continue
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-5">
            <CartSummary />
            <CostSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
