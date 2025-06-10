import api from './api';

/**
 * Job-related API services
 */
const jobService = {
  /**
   * Get all jobs with optional filtering
   * @param {Object} params - Query parameters for filtering, pagination, etc.
   * @param {Number} params.page - Page number for pagination
   * @param {Number} params.limit - Number of jobs per page
   * @param {String} params.search - Search term for job title/description
   * @param {String} params.location - Location filter
   * @param {String} params.category - Job category filter
   * @param {String} params.type - Job type filter (full-time, part-time, etc.)
   * @param {String} params.experience - Experience level filter
   * @param {String} params.salary - Salary range filter
   * @param {String} params.sortBy - Field to sort by
   * @param {String} params.sortOrder - Sort order (asc, desc)
   * @returns {Promise<Object>} - Jobs data with pagination info
   */
  getAllJobs: async (params = {}) => {
    try {
      return await api.get('/jobs', { params });
    } catch (error) {
      console.error('Get all jobs error:', error);
      throw error;
    }
  },

  /**
   * Get recommended jobs based on user profile and preferences
   * @param {Object} params - Parameters for recommendations
   * @param {Number} params.limit - Number of recommendations to return
   * @returns {Promise<Array>} - Recommended jobs
   */
  getRecommendedJobs: async (params = {}) => {
    try {
      return await api.get('/jobs/recommended', { params });
    } catch (error) {
      console.error('Get recommended jobs error:', error);
      throw error;
    }
  },

  /**
   * Get job by ID
   * @param {String} jobId - Job ID
   * @returns {Promise<Object>} - Job data
   */
  getJobById: async (jobId) => {
    try {
      return await api.get(`/jobs/${jobId}`);
    } catch (error) {
      console.error(`Get job ${jobId} error:`, error);
      throw error;
    }
  },

  /**
   * Create a new job posting (company only)
   * @param {Object} jobData - Job posting data
   * @returns {Promise<Object>} - Created job data
   */
  postJob: async (jobData) => {
    try {
      return await api.post('/jobs', jobData);
    } catch (error) {
      console.error('Post job error:', error);
      throw error;
    }
  },

  /**
   * Update an existing job posting (company only)
   * @param {String} jobId - Job ID
   * @param {Object} jobData - Updated job data
   * @returns {Promise<Object>} - Updated job data
   */
  updateJob: async (jobId, jobData) => {
    try {
      return await api.put(`/jobs/${jobId}`, jobData);
    } catch (error) {
      console.error(`Update job ${jobId} error:`, error);
      throw error;
    }
  },

  /**
   * Delete a job posting (company only)
   * @param {String} jobId - Job ID
   * @returns {Promise<Object>} - Response message
   */
  deleteJob: async (jobId) => {
    try {
      return await api.delete(`/jobs/${jobId}`);
    } catch (error) {
      console.error(`Delete job ${jobId} error:`, error);
      throw error;
    }
  },

  /**
   * Apply to a job (job seeker only)
   * @param {String} jobId - Job ID
   * @param {Object} applicationData - Application data
   * @param {String} applicationData.resumeId - Resume ID to use (optional)
   * @param {String} applicationData.coverLetter - Cover letter (optional)
   * @param {Array} applicationData.answers - Answers to job questions (optional)
   * @returns {Promise<Object>} - Application data
   */
  applyToJob: async (jobId, applicationData) => {
    try {
      return await api.post(`/jobs/${jobId}/apply`, applicationData);
    } catch (error) {
      console.error(`Apply to job ${jobId} error:`, error);
      throw error;
    }
  },

  /**
   * Get all applications for a job (company only)
   * @param {String} jobId - Job ID
   * @param {Object} params - Query parameters
   * @returns {Promise<Array>} - Applications data
   */
  getJobApplications: async (jobId, params = {}) => {
    try {
      return await api.get(`/jobs/${jobId}/applications`, { params });
    } catch (error) {
      console.error(`Get applications for job ${jobId} error:`, error);
      throw error;
    }
  },

  /**
   * Update application status (company only)
   * @param {String} jobId - Job ID
   * @param {String} applicationId - Application ID
   * @param {Object} statusData - Status update data
   * @param {String} statusData.status - New status (pending, reviewing, shortlisted, rejected, offered)
   * @param {String} statusData.feedback - Optional feedback message
   * @returns {Promise<Object>} - Updated application data
   */
  updateApplicationStatus: async (jobId, applicationId, statusData) => {
    try {
      return await api.put(`/jobs/${jobId}/applications/${applicationId}/status`, statusData);
    } catch (error) {
      console.error(`Update application ${applicationId} status error:`, error);
      throw error;
    }
  },

  /**
   * Get all jobs posted by the authenticated company
   * @param {Object} params - Query parameters
   * @returns {Promise<Array>} - Company's job posts
   */
  getCompanyJobs: async (params = {}) => {
    try {
      return await api.get('/jobs/company', { params });
    } catch (error) {
      console.error('Get company jobs error:', error);
      throw error;
    }
  },

  /**
   * Get statistics about a job posting (views, applications, etc.)
   * @param {String} jobId - Job ID
   * @returns {Promise<Object>} - Job statistics
   */
  getJobStats: async (jobId) => {
    try {
      return await api.get(`/jobs/${jobId}/stats`);
    } catch (error) {
      console.error(`Get job ${jobId} stats error:`, error);
      throw error;
    }
  },

  /**
   * Track a job view
   * @param {String} jobId - Job ID
   * @returns {Promise<Object>} - Response message
   */
  trackJobView: async (jobId) => {
    try {
      return await api.post(`/jobs/${jobId}/view`);
    } catch (error) {
      // Silent fail - don't interrupt user experience for analytics
      console.warn(`Track job ${jobId} view error:`, error);
      return { success: false };
    }
  },

  /**
   * Get job categories
   * @returns {Promise<Array>} - Job categories
   */
  getJobCategories: async () => {
    try {
      return await api.get('/jobs/categories');
    } catch (error) {
      console.error('Get job categories error:', error);
      throw error;
    }
  },

  /**
   * Report a job posting (inappropriate content, scam, etc.)
   * @param {String} jobId - Job ID
   * @param {Object} reportData - Report data
   * @param {String} reportData.reason - Reason for report
   * @param {String} reportData.details - Additional details
   * @returns {Promise<Object>} - Response message
   */
  reportJob: async (jobId, reportData) => {
    try {
      return await api.post(`/jobs/${jobId}/report`, reportData);
    } catch (error) {
      console.error(`Report job ${jobId} error:`, error);
      throw error;
    }
  }
};

export default jobService;