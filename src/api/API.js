// api.js - Add this login function

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Login user with email and password
 * @param {Object} credentials - User login credentials
 * @param {string} credentials.email - User email
 * @param {string} credentials.password - User password
 * @returns {Promise<Object>} Login response data
 */
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Authorization': 'Bearer Token',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Login failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Login API error:', error);
    throw error;
  }
};