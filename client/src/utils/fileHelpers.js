/**
 * File handling utility functions
 */
import { RESUME_FILE_TYPES, IMAGE_FILE_TYPES, MAX_FILE_SIZES } from './constants';

/**
 * Get file extension from filename
 * @param {string} fileName - Name of the file
 * @returns {string} File extension without dot (e.g., "pdf", "docx")
 */
export const getFileExtension = (fileName) => {
  if (!fileName) return '';
  
  const parts = fileName.split('.');
  if (parts.length === 1) return ''; // No extension
  
  return parts[parts.length - 1].toLowerCase();
};

/**
 * Check if a file is of allowed type
 * @param {File} file - File object to check
 * @param {Array} allowedTypes - Array of allowed MIME types
 * @returns {boolean} True if file type is allowed
 */
export const isAllowedFileType = (file, allowedTypes = []) => {
  if (!file) return false;
  
  return allowedTypes.includes(file.type);
};

/**
 * Check if a file is a valid resume file
 * @param {File} file - File object to check
 * @returns {boolean} True if file is a valid resume file
 */
export const isResumeFile = (file) => {
  return isAllowedFileType(file, RESUME_FILE_TYPES);
};

/**
 * Check if a file is a valid image file
 * @param {File} file - File object to check
 * @returns {boolean} True if file is a valid image file
 */
export const isImageFile = (file) => {
  return isAllowedFileType(file, IMAGE_FILE_TYPES);
};

/**
 * Get file size in MB
 * @param {File} file - File object
 * @returns {number} File size in MB (rounded to 2 decimal places)
 */
export const getFileSizeMB = (file) => {
  if (!file) return 0;
  
  const bytes = file.size;
  const mb = bytes / (1024 * 1024);
  
  return Number(mb.toFixed(2));
};

/**
 * Check if file size is within the limit
 * @param {File} file - File object
 * @param {number} maxSizeMB - Maximum file size in MB
 * @returns {boolean} True if file size is within limit
 */
export const isValidFileSize = (file, maxSizeMB) => {
  if (!file) return false;
  
  const fileSizeMB = getFileSizeMB(file);
  return fileSizeMB <= maxSizeMB;
};

/**
 * Check if resume file size is valid
 * @param {File} file - Resume file
 * @returns {boolean} True if file size is valid
 */
export const isValidResumeSize = (file) => {
  return isValidFileSize(file, MAX_FILE_SIZES.RESUME / (1024 * 1024));
};

/**
 * Check if image file size is valid
 * @param {File} file - Image file
 * @returns {boolean} True if file size is valid
 */
export const isValidImageSize = (file) => {
  return isValidFileSize(file, MAX_FILE_SIZES.IMAGE / (1024 * 1024));
};

/**
 * Create a file name with timestamp to avoid duplicates
 * @param {string} fileName - Original file name
 * @returns {string} File name with timestamp added
 */
export const createUniqueFileName = (fileName) => {
  if (!fileName) return '';
  
  const timestamp = new Date().getTime();
  const extension = getFileExtension(fileName);
  const baseName = fileName.substring(0, fileName.lastIndexOf('.'));
  
  return `${baseName}_${timestamp}.${extension}`;
};

/**
 * Convert file to data URL for preview
 * @param {File} file - File to convert
 * @returns {Promise<string>} Data URL
 */
export const fileToDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'));
      return;
    }
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = () => {
      resolve(reader.result);
    };
    
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

/**
 * Extract text from a PDF file (placeholder - would require a library)
 * @param {File} file - PDF file
 * @returns {Promise<string>} Extracted text
 */
export const extractTextFromPdf = async (file) => {
  // This is a placeholder - in a real app you would use a library like pdf.js
  // or handle this server-side
  console.warn('PDF text extraction requires additional libraries');
  return 'PDF text extraction not implemented in the client';
};

export default {
  getFileExtension,
  isAllowedFileType,
  isResumeFile,
  isImageFile,
  getFileSizeMB,
  isValidFileSize,
  isValidResumeSize,
  isValidImageSize,
  createUniqueFileName,
  fileToDataUrl,
  extractTextFromPdf
};