import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFeedback } from '../store/feedbackcontext';

const FeedbackPage = () => {
  const { feedback, setFeedback } = useFeedback();
  const router = useRouter();

  useEffect(() => {
    if (!feedback) {
      router.replace('/'); // Redirect to home if no feedback
    }
  }, [feedback, router, setFeedback]);

  if (!feedback) return null;

  const { type, title, message } = feedback;

  return (
    <div className="error-section">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-8 ">
            <div className="error-wrapper">
              <div
                className={`error-img icon mb-3 ${
                  type === 'success' ? 'text-success' : 'text-danger'
                }`}
              >
                {type === 'success' ? (
                  <i
                    className="bi bi-check-circle"
                    style={{ fontSize: '3rem' }}
                  ></i>
                ) : (
                  <i
                    className="bi bi-x-circle"
                    style={{ fontSize: '3rem' }}
                  ></i>
                )}
              </div>
              <div className="error-content">
                <h1 className="mb-3">{title}</h1>
                <p className="mb-4">{message}</p>

                <button
                  className="primary-btn1 hover-btn3"
                  onClick={() => router.push('/')}
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
