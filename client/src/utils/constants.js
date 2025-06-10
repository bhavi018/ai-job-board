/**
 * Application constants
 */

// API Base URL - change for production/development
export const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.yourjobboardapp.com/api/v1'
  : 'http://localhost:5000/api/v1';

// Resume Parser Microservice URL
export const RESUME_PARSER_URL = process.env.NODE_ENV === 'production'
  ? 'https://resume-parser.yourjobboardapp.com'
  : 'http://localhost:5001';

// User roles
export const USER_ROLES = {
  JOB_SEEKER: 'seeker',
  COMPANY: 'company',
  ADMIN: 'admin'
};

// Job status values
export const JOB_STATUS = {
  ACTIVE: 'active',
  PENDING: 'pending',
  CLOSED: 'closed',
  DRAFT: 'draft',
  REJECTED: 'rejected'
};

// Application status values
export const APPLICATION_STATUS = {
  APPLIED: 'applied',
  SHORTLISTED: 'shortlisted',
  INTERVIEW: 'interview',
  REJECTED: 'rejected',
  OFFERED: 'offered',
  HIRED: 'hired'
};

// Job types
export const JOB_TYPES = [
  'Full-time',
  'Part-time',
  'Contract',
  'Temporary',
  'Internship',
  'Freelance',
  'Remote'
];

// Experience levels
export const EXPERIENCE_LEVELS = [
  'Entry Level',
  'Junior',
  'Mid-Level',
  'Senior',
  'Lead',
  'Manager',
  'Executive'
];

// Resume file types
export const RESUME_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain'
];

// Profile picture file types
export const IMAGE_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif'
];

// Maximum file sizes in bytes
export const MAX_FILE_SIZES = {
  RESUME: 10 * 1024 * 1024, // 10MB
  IMAGE: 5 * 1024 * 1024    // 5MB
};

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 50
};

// ChatGPT system prompts
export const CHATGPT_PROMPTS = {
  RESUME_REVIEW: `You are an expert resume reviewer with years of experience in HR and recruitment. 
  Analyze the resume thoroughly and provide constructive feedback on the following aspects:
  1. Overall structure and formatting
  2. Content clarity and impact
  3. Quantifiable achievements
  4. Skills presentation
  5. Action verbs and language usage
  6. Areas of improvement
  Be specific, professional, and helpful. Focus on actionable improvements.`,
  
  INTERVIEW_QUESTIONS: `You are an experienced interviewer for tech companies. 
  Based on the job description and candidate's resume, generate relevant interview questions that:
  1. Assess technical skills mentioned in both the job description and resume
  2. Evaluate soft skills and cultural fit
  3. Test problem-solving abilities relevant to the role
  4. Probe deeper into the candidate's past experiences
  Create a mix of behavioral, situational, technical, and role-specific questions.`,
  
  ANSWER_FEEDBACK: `You are an interview coach with expertise in helping candidates deliver strong interview responses.
  Analyze the candidate's answer to the given interview question and provide feedback on:
  1. Content relevance and completeness
  2. Structure and clarity
  3. Use of specific examples
  4. Missed opportunities
  5. Overall impression
  Be constructive, specific, and actionable in your feedback.`,
  
  COVER_LETTER: `You are a professional career advisor specializing in writing compelling cover letters.
  Create a personalized cover letter that:
  1. Addresses the specific company and role
  2. Highlights relevant experiences from the resume that match the job requirements
  3. Demonstrates understanding of the company's mission and values
  4. Shows enthusiasm for the role
  5. Maintains a professional yet conversational tone
  The cover letter should be concise, engaging, and tailored specifically to this job opportunity.`
};

export default {
  API_URL,
  RESUME_PARSER_URL,
  USER_ROLES,
  JOB_STATUS,
  APPLICATION_STATUS,
  JOB_TYPES,
  EXPERIENCE_LEVELS,
  RESUME_FILE_TYPES,
  IMAGE_FILE_TYPES,
  MAX_FILE_SIZES,
  PAGINATION,
  CHATGPT_PROMPTS
};