import React from "react";
import { Navigate, useLocation } from "react-router-dom";

// Mock authentication functionality
// In a real app, this would be replaced with your actual auth system
const useAuth = () => {
  // For demo purposes - replace with your actual auth logic
  const isAuthenticated = true; // Mock authenticated status
  const userRole = "user"; // Mock user role ("admin", "user", "recruiter", etc.)
  
  return {
    isAuthenticated,
    userRole,
    // Additional auth methods could be included here
  };
};

/**
 * ProtectedRoute component for handling route access control
 * @param {React.ReactNode} children - Components to render if authorized
 * @param {string[]} allowedRoles - Array of roles that can access this route
 * @param {string} redirectPath - Custom redirect path (optional)
 * @returns {React.ReactNode}
 */
const ProtectedRoute = ({ 
  children, 
  allowedRoles = [], 
  redirectPath = "/login" 
}) => {
  const { isAuthenticated, userRole } = useAuth();
  const location = useLocation();

  // Handle cases where user is not authenticated
  if (!isAuthenticated) {
    // Store the attempted URL for redirecting back after login
    return <Navigate to={redirectPath} state={{ from: location.pathname }} replace />;
  }

  // If any roles are specified, check if user has permission
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    // User is authenticated but doesn't have the required role
    return <Navigate to="/unauthorized" replace />;
  }

  // User is authenticated and authorized (or no specific roles required)
  return children;
};

export default ProtectedRoute;

/* Example usage:

import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      
      {/* Public route */}
      <Route path="/" element={<HomePage />} />
      
      {/* Protected route - requires authentication but no specific role */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } 
      />
      
      {/* Protected route with role requirements */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminPage />
          </ProtectedRoute>
        } 
      />
      
      {/* Multiple allowed roles */}
      <Route 
        path="/manage-jobs" 
        element={
          <ProtectedRoute allowedRoles={["admin", "recruiter"]}>
            <ManageJobsPage />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};
