/**
 * Utilities for handling authentication tokens
 */

/**
 * Get the authentication token from localStorage
 * @returns {string|null} The authentication token or null if not found
 */
export const getToken = () => {
  return localStorage.getItem('token');
};

/**
 * Set the authentication token in localStorage
 * @param {string} token - The token to store
 */
export const setToken = (token) => {
  localStorage.setItem('token', token);
};

/**
 * Remove the authentication token from localStorage
 */
export const removeToken = () => {
  localStorage.removeItem('token');
};

/**
 * Get authentication headers with the Bearer token
 * @returns {Object} Headers object with Authorization header
 */
export const getAuthHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Check if a token exists and is not expired
 * @returns {boolean} True if the token exists and is not expired
 */
export const isTokenValid = () => {
  const token = getToken();
  
  if (!token) {
    return false;
  }
  
  try {
    // JWT tokens have 3 parts separated by dots
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      return false;
    }
    
    // Decode the payload (second part)
    const payload = JSON.parse(atob(tokenParts[1]));
    
    // Check if token is expired
    const expirationTime = payload.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();
    
    return currentTime < expirationTime;
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
};

/**
 * Get time remaining until token expiration in seconds
 * @returns {number} Seconds until expiration or 0 if token is invalid
 */
export const getTokenExpirationTime = () => {
  const token = getToken();
  
  if (!token) {
    return 0;
  }
  
  try {
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      return 0;
    }
    
    const payload = JSON.parse(atob(tokenParts[1]));
    const expirationTime = payload.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();
    
    return Math.max(0, Math.floor((expirationTime - currentTime) / 1000));
  } catch (error) {
    console.error('Error getting token expiration time:', error);
    return 0;
  }
};

/**
 * Decode the JWT token and extract user information
 * @returns {Object|null} Decoded user data or null if token is invalid
 */
export const decodeToken = () => {
  const token = getToken();
  
  if (!token) {
    return null;
  }
  
  try {
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      return null;
    }
    
    return JSON.parse(atob(tokenParts[1]));
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export default {
  getToken,
  setToken,
  removeToken,
  getAuthHeaders,
  isTokenValid,
  getTokenExpirationTime,
  decodeToken,
};