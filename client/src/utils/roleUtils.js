import { decodeToken } from './tokenUtils';

// Available user roles
export const ROLES = {
  ADMIN: 'admin',
  COMPANY: 'company',
  SEEKER: 'seeker',
};

/**
 * Get the current user's role from the token
 * @returns {string|null} The user's role or null if not authenticated
 */
export const getUserRole = () => {
  const decodedToken = decodeToken();
  return decodedToken ? decodedToken.role : null;
};

/**
 * Check if the current user has admin role
 * @returns {boolean} True if the user is an admin
 */
export const isAdmin = () => {
  return getUserRole() === ROLES.ADMIN;
};

/**
 * Check if the current user has company role
 * @returns {boolean} True if the user is a company
 */
export const isCompany = () => {
  return getUserRole() === ROLES.COMPANY;
};

/**
 * Check if the current user has job seeker role
 * @returns {boolean} True if the user is a job seeker
 */
export const isSeeker = () => {
  return getUserRole() === ROLES.SEEKER;
};

/**
 * Check if the current user has the required role
 * @param {string|Array} allowedRoles - Single role or array of roles that are allowed
 * @returns {boolean} True if the user has one of the allowed roles
 */
export const hasRole = (allowedRoles) => {
  const userRole = getUserRole();
  
  if (!userRole) {
    return false;
  }
  
  if (Array.isArray(allowedRoles)) {
    return allowedRoles.includes(userRole);
  }
  
  return userRole === allowedRoles;
};

/**
 * Get readable role name for display
 * @param {string} role - Role identifier
 * @returns {string} Human-readable role name
 */
export const getRoleDisplayName = (role) => {
  switch (role) {
    case ROLES.ADMIN:
      return 'Administrator';
    case ROLES.COMPANY:
      return 'Employer';
    case ROLES.SEEKER:
      return 'Job Seeker';
    default:
      return 'User';
  }
};

/**
 * Get permissions available for a specific role
 * @param {string} role - Role identifier
 * @returns {Object} Object with permission flags
 */
export const getRolePermissions = (role) => {
  switch (role) {
    case ROLES.ADMIN:
      return {
        canManageUsers: true,
        canManageJobs: true,
        canPostJobs: true,
        canViewApplicants: true,
        canApplyToJobs: false,
        canManageSystem: true,
        canAccessAdminDashboard: true,
      };
    case ROLES.COMPANY:
      return {
        canManageUsers: false,
        canManageJobs: true, // But only their own jobs
        canPostJobs: true,
        canViewApplicants: true,
        canApplyToJobs: false,
        canManageSystem: false,
        canAccessAdminDashboard: false,
      };
    case ROLES.SEEKER:
      return {
        canManageUsers: false,
        canManageJobs: false,
        canPostJobs: false,
        canViewApplicants: false,
        canApplyToJobs: true,
        canManageSystem: false,
        canAccessAdminDashboard: false,
      };
    default:
      return {
        canManageUsers: false,
        canManageJobs: false,
        canPostJobs: false,
        canViewApplicants: false,
        canApplyToJobs: false,
        canManageSystem: false,
        canAccessAdminDashboard: false,
      };
  }
};

/**
 * Check if the current user has a specific permission
 * @param {string} permission - Permission to check
 * @returns {boolean} True if the user has the permission
 */
export const hasPermission = (permission) => {
  const role = getUserRole();
  if (!role) {
    return false;
  }
  
  const permissions = getRolePermissions(role);
  return !!permissions[permission];
};

export default {
  ROLES,
  getUserRole,
  isAdmin,
  isCompany,
  isSeeker,
  hasRole,
  getRoleDisplayName,
  getRolePermissions,
  hasPermission,
};