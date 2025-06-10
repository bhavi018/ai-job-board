import axios from 'axios';
import { API_URL } from '../utils/constants';
import { getAuthHeaders } from '../utils/tokenUtils';

const ADMIN_API = `${API_URL}/admin`;

/**
 * Get all users (admin only)
 * @param {Object} filters - Optional filters like role, status, etc.
 * @param {number} page - Page number for pagination
 * @param {number} limit - Number of results per page
 * @returns {Promise<Object>} - Paginated users data
 */
export const getAllUsers = async (filters = {}, page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${ADMIN_API}/users`, {
      headers: getAuthHeaders(),
      params: {
        ...filters,
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

/**
 * Get a specific user by ID (admin only)
 * @param {string} userId - User ID
 * @returns {Promise<Object>} - User data
 */
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${ADMIN_API}/users/${userId}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

/**
 * Update a user (admin only)
 * @param {string} userId - User ID
 * @param {Object} userData - Updated user data
 * @returns {Promise<Object>} - Updated user data
 */
export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${ADMIN_API}/users/${userId}`, userData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

/**
 * Change a user's role (admin only)
 * @param {string} userId - User ID
 * @param {string} role - New role (e.g., 'admin', 'company', 'seeker')
 * @returns {Promise<Object>} - Updated user data
 */
export const changeUserRole = async (userId, role) => {
  try {
    const response = await axios.put(
      `${ADMIN_API}/users/${userId}/role`,
      { role },
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error changing user role:', error);
    throw error;
  }
};

/**
 * Block or unblock a user (admin only)
 * @param {string} userId - User ID
 * @param {boolean} blocked - Whether to block (true) or unblock (false) the user
 * @returns {Promise<Object>} - Updated user data
 */
export const toggleUserBlock = async (userId, blocked) => {
  try {
    const response = await axios.put(
      `${ADMIN_API}/users/${userId}/block`,
      { blocked },
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error toggling user block status:', error);
    throw error;
  }
};

/**
 * Delete a user (admin only)
 * @param {string} userId - User ID
 * @returns {Promise<Object>} - Response indicating success
 */
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${ADMIN_API}/users/${userId}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

/**
 * Get all jobs for moderation (admin only)
 * @param {Object} filters - Optional filters like status, etc.
 * @param {number} page - Page number for pagination
 * @param {number} limit - Number of results per page
 * @returns {Promise<Object>} - Paginated jobs data
 */
export const getJobsForModeration = async (filters = {}, page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${ADMIN_API}/jobs`, {
      headers: getAuthHeaders(),
      params: {
        ...filters,
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs for moderation:', error);
    throw error;
  }
};

/**
 * Approve or reject a job (admin only)
 * @param {string} jobId - Job ID
 * @param {string} status - New status ('approved' or 'rejected')
 * @param {string} rejectionReason - Reason for rejection (required if status is 'rejected')
 * @returns {Promise<Object>} - Updated job data
 */
export const moderateJob = async (jobId, status, rejectionReason = '') => {
  try {
    const response = await axios.put(
      `${ADMIN_API}/jobs/${jobId}/moderate`,
      { status, rejectionReason },
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error moderating job:', error);
    throw error;
  }
};

/**
 * Get dashboard statistics (admin only)
 * @returns {Promise<Object>} - Dashboard statistics
 */
export const getDashboardStats = async () => {
  try {
    const response = await axios.get(`${ADMIN_API}/dashboard/stats`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
};

/**
 * Get system logs (admin only)
 * @param {Object} filters - Optional filters like type, severity, etc.
 * @param {number} page - Page number for pagination
 * @param {number} limit - Number of results per page
 * @returns {Promise<Object>} - Paginated logs data
 */
export const getSystemLogs = async (filters = {}, page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${ADMIN_API}/logs`, {
      headers: getAuthHeaders(),
      params: {
        ...filters,
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching system logs:', error);
    throw error;
  }
};

export default {
  getAllUsers,
  getUserById,
  updateUser,
  changeUserRole,
  toggleUserBlock,
  deleteUser,
  getJobsForModeration,
  moderateJob,
  getDashboardStats,
  getSystemLogs,
};