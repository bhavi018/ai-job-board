import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate } from 'react-router-dom';

/**
 * Role-based access control component
 * Renders children only if the current user has one of the allowed roles
 * 
 * @param {Object} props - Component props
 * @param {Array|String} props.allowedRoles - Array of roles or a single role string that can access the component
 * @param {React.ReactNode} props.children - Child components to render if access is granted
 * @param {String} props.redirectTo - Path to redirect to if access is denied (defaults to '/')
 * @param {React.ReactNode} props.fallback - Component to render if access is denied (alternative to redirect)
 * @param {Boolean} props.showNothing - If true, renders nothing when access denied (no redirect or fallback)
 */
const RoleBasedAccess = ({
  allowedRoles,
  children,
  redirectTo = '/',
  fallback = null,
  showNothing = false
}) => {
  const { isAuthenticated, role } = useContext(AuthContext);
  
  // Convert single role string to array for consistent processing
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  
  // Check if user is authenticated and has one of the allowed roles
  const hasAccess = isAuthenticated && roles.includes(role);
  
  if (hasAccess) {
    // User has access, render children
    return children;
  }
  
  // Handle unauthorized access
  if (showNothing) {
    // Don't render anything
    return null;
  } else if (fallback) {
    // Render fallback component
    return fallback;
  } else {
    // Redirect to specified path
    return <Navigate to={redirectTo} replace />;
  }
};

/**
 * Higher-order component that creates a role-protected component
 * 
 * @param {React.Component} Component - Component to protect
 * @param {Array|String} allowedRoles - Roles that can access the component
 * @param {Object} options - Additional options (redirectTo, fallback, showNothing)
 * @returns {React.Component} - Role-protected component
 */
export const withRoleAccess = (Component, allowedRoles, options = {}) => {
  return (props) => (
    <RoleBasedAccess
      allowedRoles={allowedRoles}
      redirectTo={options.redirectTo}
      fallback={options.fallback}
      showNothing={options.showNothing}
    >
      <Component {...props} />
    </RoleBasedAccess>
  );
};

/**
 * Custom hook for checking if the current user has a specific role
 * 
 * @param {Array|String} allowedRoles - Roles to check against
 * @returns {Boolean} - Whether the user has one of the allowed roles
 */
export const useHasRole = (allowedRoles) => {
  const { isAuthenticated, role } = useContext(AuthContext);
  
  // Convert single role string to array for consistent processing
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  
  // Check if user is authenticated and has one of the allowed roles
  return isAuthenticated && roles.includes(role);
};

/**
 * Role-based navigation item component
 * Renders only if the current user has one of the allowed roles
 * 
 * @param {Object} props - Component props
 * @param {Array|String} props.allowedRoles - Roles that can see this navigation item
 * @param {React.ReactNode} props.children - Child components to render if access is granted
 */
export const RoleNavItem = ({ allowedRoles, children }) => {
  const hasAccess = useHasRole(allowedRoles);
  
  return hasAccess ? children : null;
};

/**
 * Role constants to use throughout the application
 */
export const ROLES = {
  ADMIN: 'admin',
  COMPANY: 'company',
  SEEKER: 'seeker',
  ANY: ['admin', 'company', 'seeker']
};

export default RoleBasedAccess;