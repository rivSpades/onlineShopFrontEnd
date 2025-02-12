import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { resetPassword } from '../data/auth';
import { useFeedback } from '../store/feedbackcontext';

const ResetPassword = () => {
  const { setFeedback } = useFeedback();
  const router = useRouter();
  const { uid, token } = router.query;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Error message for password mismatch

  // Redirect to homepage if uid or token is missing
  useEffect(() => {
    if (router.isReady && (!uid || !token)) {
      router.push('/');
    }
  }, [router.isReady, uid, token]); // Depend on router.isReady, uid, and token
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous errors

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please try again.');
      return;
    }

    try {
      const response = await resetPassword(password, uid, token);

      if (response.ok) {
        setFeedback({
          type: 'success',
          title: 'Password Reset Successful',
          message:
            'Your password has been successfully reset. You can now log in.',
        });
      } else {
        setFeedback({
          type: 'error',
          title: 'Reset Failed',
          message:
            response.error || 'Failed to reset password. Please try again.',
        });
      }
    } catch (error) {
      setFeedback({
        type: 'error',
        title: 'Error',
        message: 'Something went wrong. Please try again.',
      });
    } finally {
      router.push('/feedback');
    }
  };
  if (!uid || !token) return null;
  return (
    <div className="order-tracking">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <div className="order-traking-area two mt-110">
              <div className="section-title text-center">
                <h2>Reset Password</h2>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row justify-content-center">
                  <div className="col-md-12 mb-25">
                    <div className="form-inner">
                      <label>New Password</label>
                      <input
                        type="password"
                        placeholder="Enter your New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-inner">
                      <label>Confirm Password</label>
                      <input
                        type="password"
                        placeholder="Confirm your Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  {errorMessage && (
                    <span className="error text-danger ">{errorMessage}</span>
                  )}
                  <div className="col-md-8 d-flex justify-content-center mb-50">
                    <div className="button-group">
                      <button
                        type="submit"
                        className="primary-btn3 black-bg hover-btn5 hover-white"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
