import React, { useContext, useState } from 'react';
import { AuthContext } from '../store/authcontext';
import { login, register } from '../data/auth'; // Adjust the import path

const AuthModal = () => {
  const { setIsLoggedIn } = useContext(AuthContext); // Get setIsLoggedIn from context

  // State variables for login and registration
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // New state variables for registration
  const [registerFirstName, setRegisterFirstName] = useState('');
  const [registerLastName, setRegisterLastName] = useState('');
  const [registerPhoneNumber, setRegisterPhoneNumber] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

  // New state for validation errors
  const [errors, setErrors] = useState({}); // Initialize as an empty object

  // Handle login submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const response = await login(loginEmail, loginPassword);
    console.log(response);

    if (response.ok) {
      setIsLoggedIn(true); // Update the auth state

      // Programmatically click the hidden close button to dismiss the modal
      document.getElementById('close-modal-button').click();
    } else {
      console.log(response);
      alert('Login failed: ' + (response.error || 'Invalid credentials'));
    }
  };

  // Handle registration submission
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    // Reset errors before validation
    setErrors({});

    // Check if the password and confirm password match
    if (registerPassword !== registerConfirmPassword) {
      alert('Passwords do not match! Please try again.');
      return; // Stop the registration process
    }

    const response = await register(
      registerFirstName,
      registerLastName,
      registerEmail,
      registerPassword,
      registerPhoneNumber
    );

    if (response.ok) {
      alert('Registration successful! Please verify your email.');
      // Clear registration fields after successful registration
      setRegisterFirstName('');
      setRegisterLastName('');
      setRegisterPhoneNumber('');
      setRegisterEmail('');
      setRegisterPassword('');
      setRegisterConfirmPassword('');
    } else {
      // Set the errors state with API response errors
      console.log(response);
      setErrors(response); // Assuming response contains error object
    }
  };

  console.log(errors);

  return (
    <div
      className="modal login-modal fade"
      id="user-login"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home"
                  type="button"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  Log In
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#profile"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  Registration
                </button>
              </li>
            </ul>
          </div>
          <div className="modal-body">
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div className="login-registration-form">
                  <div className="form-title">
                    <h3>Log In</h3>
                  </div>
                  <form onSubmit={handleLoginSubmit}>
                    <div className="form-inner mb-35">
                      <input
                        type="text"
                        placeholder="User name or Email *"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-inner">
                      <input
                        id="password"
                        type="password"
                        placeholder="Password *"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                      <i className="bi bi-eye-slash" id="togglePassword" />
                    </div>
                    <div className="form-remember-forget">
                      <div className="remember">
                        <input
                          type="checkbox"
                          className="custom-check-box"
                          id="check1"
                        />
                        <label htmlFor="check1">Remember me</label>
                      </div>
                      <a href="#" className="forget-pass hover-underline">
                        Forget Password
                      </a>
                    </div>
                    <button type="submit" className="primary-btn1 hover-btn3">
                      Log In
                    </button>
                    <a href="#" className="member">
                      Not a member yet?
                    </a>
                  </form>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <div className="login-registration-form">
                  <div className="form-title">
                    <h3>Registration</h3>
                  </div>
                  <form onSubmit={handleRegisterSubmit}>
                    <div className="form-inner mb-25">
                      <input
                        type="text"
                        placeholder="First Name *"
                        value={registerFirstName}
                        onChange={(e) => setRegisterFirstName(e.target.value)}
                      />
                      {errors?.first_name && ( // Safely access errors.first_name
                        <span className="error">
                          {errors.first_name.join(', ')}
                        </span>
                      )}
                    </div>
                    <div className="form-inner mb-25">
                      <input
                        type="text"
                        placeholder="Last Name *"
                        value={registerLastName}
                        onChange={(e) => setRegisterLastName(e.target.value)}
                      />
                      {errors?.last_name && ( // Safely access errors.last_name
                        <span className="error">
                          {errors.last_name.join(', ')}
                        </span>
                      )}
                    </div>
                    <div className="form-inner mb-25">
                      <input
                        type="text"
                        placeholder="Phone Number *"
                        value={registerPhoneNumber}
                        onChange={(e) => setRegisterPhoneNumber(e.target.value)}
                      />
                      {errors?.phone_number && ( // Safely access errors.phone_number
                        <span className="error">
                          {errors.phone_number.join(', ')}
                        </span>
                      )}
                    </div>
                    <div className="form-inner mb-25">
                      <input
                        type="email"
                        placeholder="Email Here *"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                      />
                      {errors?.email && ( // Safely access errors.email
                        <span className="error">{errors.email.join(', ')}</span>
                      )}
                    </div>
                    <div className="form-inner mb-25">
                      <input
                        id="password2"
                        type="password"
                        placeholder="Password *"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                      />
                      <i className="bi bi-eye-slash" id="togglePassword2" />
                    </div>
                    <div className="form-inner mb-35">
                      <input
                        id="password3"
                        type="password"
                        placeholder="Confirm Password *"
                        value={registerConfirmPassword}
                        onChange={(e) =>
                          setRegisterConfirmPassword(e.target.value)
                        }
                      />
                      <i className="bi bi-eye-slash" id="togglePassword3" />
                    </div>
                    <button type="submit" className="primary-btn1 hover-btn3">
                      Registration
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* Hidden button to close the modal */}
          <button
            id="close-modal-button"
            type="button"
            className="btn btn-secondary"
            style={{ display: 'none' }}
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
