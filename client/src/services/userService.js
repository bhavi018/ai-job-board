import axios from 'axios';
import { API_URL } from '../utils/constants';
import { getAuthHeaders } from '../utils/tokenUtils';

const USER_API = `${API_URL}/users`;

/**
 * Get current user profile
 * @returns {Promise<Object>} - User profile data
 */
export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${USER_API}/me`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};

/**
 * Update user profile
 * @param {Object} userData - Updated user data
 * @returns {Promise<Object>} - Updated user profile
 */
export const updateProfile = async (userData) => {
  try {
    const response = await axios.put(`${USER_API}/me`, userData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

/**
 * Update user profile picture
 * @param {FormData} formData - FormData containing the profile picture
 * @returns {Promise<Object>} - Updated user profile
 */
export const updateProfilePicture = async (formData) => {
  try {
    const response = await axios.put(`${USER_API}/me/picture`, formData, {
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating profile picture:', error);
    throw error;
  }
};

/**
 * Change user password
 * @param {Object} passwordData - Object containing old and new passwords
 * @returns {Promise<Object>} - Response indicating success
 */
export const changePassword = async (passwordData) => {
  try {
    const response = await axios.put(`${USER_API}/me/password`, passwordData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
};

/**
 * Get user job applications
 * @returns {Promise<Array>} - Array of job applications
 */
export const getUserApplications = async () => {
  try {
    const response = await axios.get(`${USER_API}/me/applications`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user applications:', error);
    throw error;
  }
};

/**
 * Get user saved jobs
 * @returns {Promise<Array>} - Array of saved jobs
 */
export const getSavedJobs = async () => {
  try {
    const response = await axios.get(`${USER_API}/me/saved-jobs`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching saved jobs:', error);
    throw error;
  }
};

/**
 * Save a job for later
 * @param {string} jobId - ID of the job to save
 * @returns {Promise<Object>} - Response indicating success
 */
export const saveJob = async (jobId) => {
  try {
    const response = await axios.post(`${USER_API}/me/saved-jobs/${jobId}`, {}, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error saving job:', error);
    throw error;
  }
};

/**
 * Remove a saved job
 * @param {string} jobId - ID of the job to unsave
 * @returns {Promise<Object>} - Response indicating success
 */
export const unsaveJob = async (jobId) => {
  try {
    const response = await axios.delete(`${USER_API}/me/saved-jobs/${jobId}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error removing saved job:', error);
    throw error;
  }
};

/**
 * Get user notifications
 * @returns {Promise<Array>} - Array of notifications
 */
export const getNotifications = async () => {
  try {
    const response = await axios.get(`${USER_API}/me/notifications`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

/**
 * Mark a notification as read
 * @param {string} notificationId - ID of the notification
 * @returns {Promise<Object>} - Updated notification
 */
export const markNotificationAsRead = async (notificationId) => {
  try {
    const response = await axios.put(`${USER_API}/me/notifications/${notificationId}`, {
      read: true
    }, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};

export default {
  getCurrentUser,
  updateProfile,
  updateProfilePicture,
  changePassword,
  getUserApplications,
  getSavedJobs,
  saveJob,
  unsaveJob,
  getNotifications,
  markNotificationAsRead,
};