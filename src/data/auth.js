// Base URL for the API
const API_URL = `${process.env.NEXT_API_URL}/accounts`; // Use environment variable for the base URL

// Register function
export const register = async (
  firstName,
  lastName,
  email,
  password,
  phoneNumber
) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: firstName, // Changed to match serializer field
        last_name: lastName, // Changed to match serializer field
        email, // Email stays the same
        password, // Password stays the same
        phone_number: phoneNumber, // Changed to match serializer field
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      return data;
    }

    return response; // Handle success response
  } catch (error) {
    console.error('Registration error:', error.message);
    throw error; // Handle error response
  }
};

// Login function
export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    // Tokens are set in HTTP-only cookies by the server
    const data = await response.json();
    return response; // Handle successful login
  } catch (error) {
    console.error('Login error:', error.message);
    throw error; // Handle error response
  }
};

// Logout function
export const logout = async () => {
  try {
    const response = await fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: 'include', // Send cookies with the request
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }

    const data = await response.json();
    return data; // Handle success response
  } catch (error) {
    console.error('Logout error:', error.message);
    throw error; // Handle error response
  }
};

// Validate token function
export const validateToken = async () => {
  try {
    console.log(getCookie('access_token'));
    const response = await fetch(`${API_URL}/validate_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getCookie('access_token')}`, // Use access token from cookies
      },
      credentials: 'include', // Send cookies with the request
      body: JSON.stringify({ token: getCookie('access_token') }), // Send access token in the body
    });

    if (!response.ok) {
      throw new Error('Token validation failed');
    }

    const data = await response.json();
    return response; // Return token validation data
  } catch (error) {
    console.error('Token validation error:', error.message);
    throw error; // Handle error response
  }
};

// Utility function to get cookie by name
export const getCookie = (name) => {
  if (typeof document !== 'undefined') {
    // Check if running in a browser environment
    const value = `; ${document.cookie}`;
    console.log('Document Cookies:', value); // Log all cookies for inspection
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
      const cookieValue = parts.pop().split(';')[0]; // Get the cookie value
      console.log(`Cookie Value for "${name}":`, cookieValue); // Log the specific cookie value
      return cookieValue;
    }

    console.log(`Cookie "${name}" not found`); // Log if the cookie is not found
  } else {
    console.log('Not in a browser environment; document is not defined.');
  }
  return null;
};
