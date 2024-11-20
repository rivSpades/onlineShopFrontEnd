import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Import useRouter for redirection
import { logout, validateToken } from '../data/auth'; // Import logout function from auth data
import { getCookie } from '../data/auth';
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState('null');
  const router = useRouter();
  const access_token = getCookie('access_token');
  const refresh_token = getCookie('refresh_token');
  const checkToken = async () => {
    try {
      if (!access_token && !refresh_token) {
        setIsLoggedIn(false);
        return;
      }
      const response = await validateToken();
      if (response.ok) {
        setIsLoggedIn(true);
      } else {
        // Update state // Call handleLogout if token is invalid

        if (isLoggedIn === true) {
          await logout();
          window.location.reload('/');
        } else if (isLoggedIn === 'null') {
          if (access_token || refresh_token) {
            await logout();
            window.location.reload('/');
          }
          setIsLoggedIn(false);
        }
      }
    } catch (error) {
      console.error('Error validating token', error);

      if (isLoggedIn === true) {
        await logout();
        window.location.reload('/');
      } else if (isLoggedIn === 'null') {
        if (access_token || refresh_token) {
          await logout();
          window.location.reload('/');
        }
        setIsLoggedIn(false);
      }
    }
  };

  const handleLogout = async () => {
    await logout(); // Perform logout
    setIsLoggedIn(false); // Update state
    window.location.reload('/');
  };

  useEffect(() => {
    checkToken();
  }, [router.query]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
