import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Import useRouter for redirection
import { logout, validateToken } from '../data/auth'; // Import logout function from auth data

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState('null');
  const router = useRouter();

  const checkToken = async () => {
    try {
      const response = await validateToken();
      if (response.ok) {
        setIsLoggedIn(true);
      } else {
        await handleLogout(); // Call handleLogout if token is invalid
        router.push('/'); // Redirect to homepage
      }
    } catch (error) {
      console.error('Error validating token', error);
      await handleLogout(); // Log out if there's an error
    }
  };

  const handleLogout = async () => {
    await logout(); // Perform logout
    setIsLoggedIn(false); // Update state
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
