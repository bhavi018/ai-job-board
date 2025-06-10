import axios from 'axios';
import { API_URL } from '../utils/constants';
import { getAuthHeaders } from '../utils/tokenUtils';

const AI_API = `${API_URL}/ai`;

/**
 * Get resume review feedback using OpenAI's ChatGPT
 * @param {Object} resumeData - Resume data to review
 * @param {Object} options - Options for the review (detail level, focus areas, etc.)
 * @returns {Promise<Object>} - Review feedback
 */
export const getResumeReview = async (resumeData, options = {}) => {
  try {
    const response = await axios.post(
      `${AI_API}/resume-review`,
      { resumeData, options },
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error getting resume review:', error);
    throw error;
  }
};

/**
 * Generate interview questions based on job description and resume
 * @param {Object} jobData - Job description and requirements
 * @param {Object} resumeData - Resume data
 * @param {Object} options - Options for question generation (difficulty, number, etc.)
 * @returns {Promise<Object>} - Generated interview questions
 */
export const generateInterviewQuestions = async (jobData, resumeData, options = {}) => {
  try {
    const response = await axios.post(
      `${AI_API}/interview-questions`,
      { jobData, resumeData, options },
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error generating interview questions:', error);
    throw error;
  }
};

/**
 * Get answer feedback for interview questions
 * @param {string} question - Interview question
 * @param {string} answer - User's answer to the question
 * @param {Object} jobData - Related job data
 * @param {Object} options - Options for feedback (detail level, focus areas, etc.)
 * @returns {Promise<Object>} - Answer feedback
 */
export const getAnswerFeedback = async (question, answer, jobData, options = {}) => {
  try {
    const response = await axios.post(
      `${AI_API}/answer-feedback`,
      { question, answer, jobData, options },
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error getting answer feedback:', error);
    throw error;
  }
};

/**
 * Generate cover letter based on job description and resume
 * @param {Object} jobData - Job description and requirements
 * @param {Object} resumeData - Resume data
 * @param {Object} options - Options for cover letter generation (tone, length, etc.)
 * @returns {Promise<Object>} - Generated cover letter
 */
export const generateCoverLetter = async (jobData, resumeData, options = {}) => {
  try {
    const response = await axios.post(
      `${AI_API}/cover-letter`,
      { jobData, resumeData, options },
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error generating cover letter:', error);
    throw error;
  }
};

/**
 * Get job matching score between a resume and job
 * @param {Object} jobData - Job description and requirements
 * @param {Object} resumeData - Resume data
 * @returns {Promise<Object>} - Matching score and analysis
 */
export const getJobMatchScore = async (jobData, resumeData) => {
  try {
    const response = await axios.post(
      `${AI_API}/job-match`,
      { jobData, resumeData },
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error getting job match score:', error);
    throw error;
  }
};

/**
 * Get skill suggestions based on job market trends
 * @param {Object} resumeData - Resume data
 * @param {string} industry - Target industry
 * @returns {Promise<Object>} - Skill suggestions and reasoning
 */
export const getSkillSuggestions = async (resumeData, industry) => {
  try {
    const response = await axios.post(
      `${AI_API}/skill-suggestions`,
      { resumeData, industry },
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error getting skill suggestions:', error);
    throw error;
  }
};

/**
 * Get estimated salary range for a job
 * @param {Object} jobData - Job details and requirements
 * @param {string} location - Job location
 * @returns {Promise<Object>} - Salary range and analysis
 */
export const getSalaryEstimate = async (jobData, location) => {
  try {
    const response = await axios.post(
      `${AI_API}/salary-estimate`,
      { jobData, location },
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error getting salary estimate:', error);
    throw error;
  }
};

export default {
  getResumeReview,
  generateInterviewQuestions,
  getAnswerFeedback,
  generateCoverLetter,
  getJobMatchScore,
  getSkillSuggestions,
  getSalaryEstimate,
};