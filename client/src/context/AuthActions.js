import { AUTH_ACTIONS } from './AuthContext';
import authService from '../services/authService';

/**
 * Login action - authenticates user and returns token, user data, and role
 * @param {Object} credentials - User login credentials (email, password)
 * @param {Function} dispatch - Auth context dispatch function
 * @returns {Promise<Object>} - The authentication result
 */
export const loginUser = async (credentials, dispatch) => {
  dispatch({ type: AUTH_ACTIONS.LOGIN_REQUEST });
  
  try {
    const response = await authService.login(credentials);
    
    // Dispatch success action with user data
    dispatch({
      type: AUTH_ACTIONS.LOGIN_SUCCESS,
      payload: {
        user: response.user,
        token: response.token,
        role: response.user.role
      }
    });
    
    return {
      success: true,
      user: response.user
    };
  } catch (error) {
    // Handle login error
    dispatch({
      type: AUTH_ACTIONS.LOGIN_FAILURE,
      payload: error.response?.data?.message || 'Login failed. Please check your credentials.'
    });
    
    return {
      success: false,
      error: error.response?.data?.message || 'Login failed. Please check your credentials.'
    };
  }
};

/**
 * Register action - creates new user account
 * @param {Object} userData - User registration data
 * @param {Function} dispatch - Auth context dispatch function
 * @returns {Promise<Object>} - The registration result
 */
export const registerUser = async (userData, dispatch) => {
  dispatch({ type: AUTH_ACTIONS.REGISTER_REQUEST });
  
  try {
    const response = await authService.register(userData);
    
    // Dispatch success action with user data
    dispatch({
      type: AUTH_ACTIONS.REGISTER_SUCCESS,
      payload: {
        user: response.user,
        token: response.token,
        role: response.user.role
      }
    });
    
    return {
      success: true,
      user: response.user
    };
  } catch (error) {
    // Handle registration error
    dispatch({
      type: AUTH_ACTIONS.REGISTER_FAILURE,
      payload: error.response?.data?.message || 'Registration failed. Please try again.'
    });
    
    return {
      success: false,
      error: error.response?.data?.message || 'Registration failed. Please try again.'
    };
  }
};

/**
 * Logout action - removes auth tokens and user data
 * @param {Function} dispatch - Auth context dispatch function
 */
export const logoutUser = (dispatch) => {
  authService.logout(); // Clear any server-side sessions if needed
  dispatch({ type: AUTH_ACTIONS.LOGOUT });
};

/**
 * Update user profile action
 * @param {Object} userData - Updated user data
 * @param {Function} dispatch - Auth context dispatch function
 * @returns {Promise<Object>} - The update result
 */
export const updateUserProfile = async (userData, dispatch) => {
  try {
    const updatedUser = await authService.updateProfile(userData);
    
    dispatch({
      type: AUTH_ACTIONS.UPDATE_USER,
      payload: updatedUser
    });
    
    return {
      success: true,
      user: updatedUser
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to update profile.'
    };
  }
};

/**
 * Switch between user roles (for users with multiple roles)
 * @param {string} role - Role to switch to
 * @param {Function} dispatch - Auth context dispatch function
 */
export const switchUserRole = (role, dispatch) => {
  dispatch({
    type: AUTH_ACTIONS.CHANGE_ROLE,
    payload: role
  });
};

/**
 * Verify email action (for email verification flow)
 * @param {string} token - Email verification token
 * @param {Function} dispatch - Auth context dispatch function
 * @returns {Promise<Object>} - The verification result
 */
export const verifyEmail = async (token, dispatch) => {
  try {
    const response = await authService.verifyEmail(token);
    
    // Update user data with verified status
    dispatch({
      type: AUTH_ACTIONS.UPDATE_USER,
      payload: {
        emailVerified: true
      }
    });
    
    return {
      success: true,
      message: response.message
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Email verification failed.'
    };
  }
};

/**
 * Reset password action
 * @param {Object} passwordData - Password reset data (token, new password)
 * @returns {Promise<Object>} - The password reset result
 */
export const resetPassword = async (passwordData) => {
  try {
    const response = await authService.resetPassword(passwordData);
    
    return {
      success: true,
      message: response.message
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Password reset failed.'
    };
  }
};

/**
 * Clear auth errors
 * @param {Function} dispatch - Auth context dispatch function
 */
export const clearAuthError = (dispatch) => {
  dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
};