import React, { useState } from 'react';
import { useFeedback } from '../store/feedbackcontext';
import { useRouter } from 'next/router';
import { forgotPassword } from '../data/auth';

const ForgotPassword = () => {
  const { setFeedback } = useFeedback();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await forgotPassword(email);

      if (response.ok) {
        setFeedback({
          type: 'success',
          title: 'Email Sent',
          message: 'A password reset link has been sent to your email.',
        });
      } else {
        setFeedback({
          type: 'error',
          title: 'Request Failed',
          message: response.error,
        });
      }
    } catch (error) {
      console.log(error);
      setFeedback({
        type: 'error',
        title: 'Request Failed',
        message: 'No account found with this email ',
      });
    } finally {
      setLoading(false);
      router.push('/feedback');
    }
  };

  return (
    <div className="order-tracking">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <div className="order-traking-area two mt-110">
              <div className="section-title text-center">
                <h2>Password Recovery</h2>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row justify-content-center">
                  <div className="col-md-12">
                    <div className="form-inner">
                      <label>Email</label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-8 d-flex justify-content-center">
                    <div className="button-group">
                      <button
                        type="submit"
                        className="primary-btn3 black-bg hover-btn5 hover-white"
                        disabled={loading}
                      >
                        {loading ? 'Sending...' : 'Send'}
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

export default ForgotPassword;
