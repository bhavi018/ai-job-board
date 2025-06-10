/**
 * Date formatting utility functions
 */

/**
 * Format a date into a readable string
 * @param {string|Date} date - Date to format
 * @param {Object} options - Formatting options
 * @returns {string} Formatted date string
 */
export const formatDate = (date, options = {}) => {
  if (!date) return '';
  
  try {
    const dateObj = new Date(date);
    
    // Default options
    const defaultOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      ...options
    };
    
    return new Intl.DateTimeFormat('en-US', defaultOptions).format(dateObj);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

/**
 * Calculate time elapsed since a date
 * @param {string|Date} date - Start date
 * @returns {string} Human-readable time elapsed (e.g., "2 days ago")
 */
export const timeSince = (date) => {
  if (!date) return '';
  
  try {
    const dateObj = new Date(date);
    const now = new Date();
    
    const seconds = Math.floor((now - dateObj) / 1000);
    
    // Handle future dates
    if (seconds < 0) {
      return 'in the future';
    }
    
    let interval = seconds / 31536000; // seconds in a year
    
    if (interval > 1) {
      const years = Math.floor(interval);
      return years === 1 ? '1 year ago' : `${years} years ago`;
    }
    
    interval = seconds / 2592000; // seconds in a month
    if (interval > 1) {
      const months = Math.floor(interval);
      return months === 1 ? '1 month ago' : `${months} months ago`;
    }
    
    interval = seconds / 86400; // seconds in a day
    if (interval > 1) {
      const days = Math.floor(interval);
      return days === 1 ? '1 day ago' : `${days} days ago`;
    }
    
    interval = seconds / 3600; // seconds in an hour
    if (interval > 1) {
      const hours = Math.floor(interval);
      return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
    }
    
    interval = seconds / 60; // seconds in a minute
    if (interval > 1) {
      const minutes = Math.floor(interval);
      return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
    }
    
    const secs = Math.floor(seconds);
    return secs <= 10 ? 'just now' : `${secs} seconds ago`;
  } catch (error) {
    console.error('Error calculating time since:', error);
    return '';
  }
};

/**
 * Format a date range (e.g., for job durations)
 * @param {string|Date} startDate - Start date
 * @param {string|Date|null} endDate - End date (null if present/current)
 * @returns {string} Formatted date range
 */
export const formatDateRange = (startDate, endDate = null) => {
  if (!startDate) return '';
  
  try {
    const start = formatDate(startDate, { year: 'numeric', month: 'short' });
    
    if (!endDate) {
      return `${start} - Present`;
    }
    
    const end = formatDate(endDate, { year: 'numeric', month: 'short' });
    return `${start} - ${end}`;
  } catch (error) {
    console.error('Error formatting date range:', error);
    return '';
  }
};

/**
 * Calculate duration between two dates in years and months
 * @param {string|Date} startDate - Start date
 * @param {string|Date|null} endDate - End date (null for current date)
 * @returns {string} Formatted duration
 */
export const calculateDuration = (startDate, endDate = null) => {
  if (!startDate) return '';
  
  try {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    
    const years = end.getFullYear() - start.getFullYear();
    const months = end.getMonth() - start.getMonth();
    
    let totalMonths = years * 12 + months;
    if (end.getDate() < start.getDate()) {
      totalMonths--;
    }
    
    const durationYears = Math.floor(totalMonths / 12);
    const durationMonths = totalMonths % 12;
    
    if (durationYears === 0 && durationMonths === 0) {
      return 'Less than a month';
    }
    
    let result = '';
    if (durationYears > 0) {
      result += durationYears === 1 ? '1 year' : `${durationYears} years`;
    }
    
    if (durationMonths > 0) {
      if (result) result += ' ';
      result += durationMonths === 1 ? '1 month' : `${durationMonths} months`;
    }
    
    return result;
  } catch (error) {
    console.error('Error calculating duration:', error);
    return '';
  }
};

/**
 * Format deadline or expiration date with status indicator
 * @param {string|Date} date - Deadline or expiration date
 * @returns {Object} Formatted date with status
 */
export const formatDeadline = (date) => {
  if (!date) return { text: 'No deadline', status: 'none' };
  
  try {
    const deadlineDate = new Date(date);
    const now = new Date();
    
    // Set both dates to midnight for day comparison
    deadlineDate.setHours(0, 0, 0, 0);
    const compareDate = new Date(now);
    compareDate.setHours(0, 0, 0, 0);
    
    // Calculate days difference
    const daysDifference = Math.ceil((deadlineDate - compareDate) / (1000 * 60 * 60 * 24));
    
    // Determine status
    let status = 'normal';
    if (daysDifference < 0) {
      status = 'expired';
    } else if (daysDifference === 0) {
      status = 'today';
    } else if (daysDifference <= 3) {
      status = 'urgent';
    }
    
    // Format text based on status
    let text = formatDate(date);
    if (status === 'today') {
      text = 'Today';
    } else if (status === 'expired') {
      text = `Expired (${formatDate(date)})`;
    } else if (daysDifference === 1) {
      text = 'Tomorrow';
    }
    
    return { text, status };
  } catch (error) {
    console.error('Error formatting deadline:', error);
    return { text: 'Invalid date', status: 'error' };
  }
};

export default {
  formatDate,
  timeSince,
  formatDateRange,
  calculateDuration,
  formatDeadline
};