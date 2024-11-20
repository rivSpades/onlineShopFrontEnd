import SelectComponent from '../components/common/SelectComponent';
function PaymentMethod() {
  return (
    <>
      <form className="payment-form">
        <div className="payment-methods mb-30">
          <ul className="payment-list">
            <li className="check-payment">
              <div className="form-check payment-check">
                <h6>Check payments</h6>
                <p className="para">
                  Please send a check to Store Name, Store Street, Store State /
                  Country, Store Postcode.
                </p>
              </div>
              <div className="checked"></div>
            </li>
            <li className="cash-delivary">
              <div className="form-check payment-check">
                <h6>Cash on delivery</h6>
                <p className="para">Pay with cash upon delivery.</p>
              </div>
              <div className="checked"></div>
            </li>
            <li className="paypal">
              <div className="form-check payment-check paypal">
                <h6>Paypal</h6>
                <img src="/assets/img/inner-page/payment.png" alt="" />
                <a href="#" className="about-paypal">
                  What is PayPal?
                </a>
              </div>
              <div className="checked"></div>
            </li>
            <li className="stripe">
              <h6>Card</h6>
              <div className="checked"></div>
            </li>
          </ul>
          <div
            className="choose-payment-method pt-25 pb-25"
            id="strip-payment"
            style={{ display: 'none' }}
          >
            <h5>Select Your Payment Method</h5>
            <div className="row gy-4 g-4">
              <div className="col-md-12">
                <div className="input-area">
                  <label>Card Number</label>
                  <div className="input-field">
                    <input type="text" placeholder="1234 1234 1234 1234" />
                    <img src="/assets/img/inner-page/payment.png" alt="" />
                  </div>
                </div>
              </div>
              <div className="col-xl-7">
                <div className="input-area">
                  <label>Expiration Date</label>
                  <div className="row gy-4">
                    <div className="col-sm-6">
                      <SelectComponent
                        options={[
                          'January',
                          'February',
                          'March',
                          'April',
                          'May',
                          'June',
                          'July',
                          'August',
                          'September',
                          'October',
                          'November',
                          'December',
                        ]}
                        placeholder="Month"
                      />
                    </div>
                    <div className="col-sm-6">
                      <SelectComponent
                        options={['01', '02', '03', '04', '05', '06', '07']}
                        placeholder="Day"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-5">
                <div className="input-area">
                  <label>CVC</label>
                  <input type="text" placeholder={123} />
                </div>
              </div>
            </div>
          </div>
          <div className="payment-form-bottom d-flex align-items-start">
            <input type="checkbox" className="custom-check-box" id="terms" />
            <label htmlFor="terms">
              I have read and agree to the website{' '}
              <a href="#">Terms and conditions</a>
            </label>
          </div>
        </div>
      </form>
    </>
  );
}

export default PaymentMethod;
