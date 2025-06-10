import api from './api';

/**
 * Authentication and user-related API services
 */
const authService = {
  /**
   * Authenticate user and get token
   * @param {Object} credentials - User credentials (email, password)
   * @returns {Promise<Object>} - User data and token
   */
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      
      // Store auth data in localStorage
      if (response.token) {
        localStorage.setItem('jwtToken', response.token);
        localStorage.setItem('userRole', response.user.role);
      }
      
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  /**
   * Register new user
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} - User data and token
   */
  register: async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);

    const data = response.data; // ✅ extract the actual payload

    // Store auth data in localStorage
    if (data.token) {
      localStorage.setItem('jwtToken', data.token);
      localStorage.setItem('userRole', data.user.role);
    }

    return data; // ✅ return the actual response data
  } catch (error) {
    console.error('Registration error:', error?.response?.data || error.message);
    throw error;
  }
},


  /**
   * Log out user - clear token and local storage
   */
  logout: () => {
    try {
      // Optionally notify the backend about logout
      api.post('/auth/logout').catch(error => {
        console.warn('Logout notification failed:', error);
      });
    } finally {
      // Always clear local storage even if backend request fails
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('userRole');
    }
  },

  /**
   * Get current user profile
   * @returns {Promise<Object>} - User profile data
   */
  getUserProfile: async () => {
    try {
      return await api.get('/auth/profile');
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  },

  /**
   * Update user profile
   * @param {Object} profileData - Updated profile data
   * @returns {Promise<Object>} - Updated user profile
   */
  updateProfile: async (profileData) => {
    try {
      return await api.put('/auth/profile', profileData);
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  },

  /**
   * Validate token - check if token is still valid
   * @param {String} token - JWT token to validate
   * @returns {Promise<Boolean>} - Whether token is valid
   */
  validateToken: async (token) => {
    try {
      if (!token) return false;
      
      // Custom config to override the authorization header with the provided token
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      
      const response = await api.get('/auth/validate-token', config);
      return response.valid === true;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  },

  /**
   * Get user information using token
   * @param {String} token - JWT token
   * @returns {Promise<Object>} - User data
   */
  getUserInfo: async (token) => {
    try {
      if (!token) throw new Error('No token provided');
      
      // Custom config to override the authorization header with the provided token
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      
      return await api.get('/auth/user-info', config);
    } catch (error) {
      console.error('Get user info error:', error);
      throw error;
    }
  },

  /**
   * Request password reset
   * @param {String} email - User email
   * @returns {Promise<Object>} - Response message
   */
  requestPasswordReset: async (email) => {
    try {
      return await api.post('/auth/forgot-password', { email });
    } catch (error) {
      console.error('Password reset request error:', error);
      throw error;
    }
  },

  /**
   * Reset password with token
   * @param {Object} passwordData - Password reset data (token, newPassword)
   * @returns {Promise<Object>} - Response message
   */
  resetPassword: async (passwordData) => {
    try {
      return await api.post('/auth/reset-password', passwordData);
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  },

  /**
   * Verify email address with token
   * @param {String} token - Email verification token
   * @returns {Promise<Object>} - Response message
   */
  verifyEmail: async (token) => {
    try {
      return await api.get(`/auth/verify-email/${token}`);
    } catch (error) {
      console.error('Email verification error:', error);
      throw error;
    }
  },
  
  /**
   * Change user password (when already logged in)
   * @param {Object} passwordData - Password data (currentPassword, newPassword)
   * @returns {Promise<Object>} - Response message
   */
  changePassword: async (passwordData) => {
    try {
      return await api.put('/auth/change-password', passwordData);
    } catch (error) {
      console.error('Password change error:', error);
      throw error;
    }
  }
};

export default authService;