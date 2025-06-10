import axios from 'axios';
import { API_URL } from '../utils/constants';
import { getAuthHeaders } from '../utils/tokenUtils';

const RESUME_API = `${API_URL}/resumes`;
const RESUME_PARSE_API = `${API_URL}/resume/parse`;

/**
 * Upload a resume for the current user
 * @param {FormData} formData - FormData object containing the resume file and metadata
 * @returns {Promise<Object>} - Response with uploaded resume data
 */
export const uploadResume = async (formData) => {
  try {
    const response = await axios.post(RESUME_API, formData, {
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading resume:', error);
    throw error;
  }
};

/**
 * Get parsed data from an uploaded resume
 * @param {string} resumeId - ID of the uploaded resume
 * @returns {Promise<Object>} - Parsed resume data
 */
export const getParsedData = async (resumeId) => {
  try {
    const response = await axios.get(`${RESUME_PARSE_API}/${resumeId}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error getting parsed resume data:', error);
    throw error;
  }
};

/**
 * Parse a resume without saving it first
 * @param {FormData} formData - FormData object containing the resume file
 * @returns {Promise<Object>} - Parsed resume data
 */
export const parseResumeDirectly = async (formData) => {
  try {
    const response = await axios.post(RESUME_PARSE_API, formData, {
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error parsing resume:', error);
    throw error;
  }
};

/**
 * Get all resumes for the current user
 * @returns {Promise<Array>} - Array of resume objects
 */
export const getUserResumes = async () => {
  try {
    const response = await axios.get(RESUME_API, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user resumes:', error);
    throw error;
  }
};

/**
 * Delete a resume
 * @param {string} resumeId - ID of the resume to delete
 * @returns {Promise<Object>} - Response indicating success
 */
export const deleteResume = async (resumeId) => {
  try {
    const response = await axios.delete(`${RESUME_API}/${resumeId}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting resume:', error);
    throw error;
  }
};

/**
 * Set a resume as the default for the user
 * @param {string} resumeId - ID of the resume to set as default
 * @returns {Promise<Object>} - Updated user data
 */
export const setDefaultResume = async (resumeId) => {
  try {
    const response = await axios.put(`${RESUME_API}/default/${resumeId}`, {}, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error setting default resume:', error);
    throw error;
  }
};

export default {
  uploadResume,
  getParsedData,
  parseResumeDirectly,
  getUserResumes,
  deleteResume,
  setDefaultResume,
};