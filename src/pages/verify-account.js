import React, { useEffect } from 'react';
import { activateAccount } from '../data/auth';
import { useFeedback } from '../store/feedbackcontext';
import { useRouter } from 'next/router';

const VerifyAccount = ({ success, message }) => {
  const { setFeedback } = useFeedback();
  const router = useRouter();

  useEffect(() => {
    if (success) {
      // Set success feedback and redirect
      setFeedback({
        type: 'success',
        title: 'Activation Successful',
        message: 'Your account is now activated! You can now login.',
      });
      router.push('/feedback');
    } else {
      setFeedback({
        type: 'error',
        title: 'Activation Failed',
        message: message || 'Activation link invalid or expired',
      });
      router.push('/feedback');
    }
  }, [success, message, setFeedback, router]);

  return <div>Verifying account...</div>;
};

export async function getServerSideProps(context) {
  const { uid, token } = context.query;

  if (!uid || !token) {
    return {
      props: {
        success: false,
        message: 'Invalid verification link.',
      },
    };
  }

  try {
    const response = await activateAccount(uid, token); // Assuming this function makes the API call
    return {
      props: {
        success: true,
        message: response.message || 'Account activated successfully.',
      },
    };
  } catch (error) {
    return {
      props: {
        success: false,
        message: error.message || 'Failed to activate account.',
      },
    };
  }
}

export default VerifyAccount;
