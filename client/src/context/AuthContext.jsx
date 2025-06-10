import { createContext, useReducer, useContext } from 'react';

// Define initial state for authentication
const initialAuthState = {
  user: null,
  token: localStorage.getItem('jwtToken') || null,
  role: localStorage.getItem('userRole') || null,
  isAuthenticated: !!localStorage.getItem('jwtToken'),
  loading: false,
  error: null
};

// Define action types for auth reducer
export const AUTH_ACTIONS = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  REGISTER_REQUEST: 'REGISTER_REQUEST',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  LOGOUT: 'LOGOUT',
  CLEAR_ERROR: 'CLEAR_ERROR',
  UPDATE_USER: 'UPDATE_USER',
  CHANGE_ROLE: 'CHANGE_ROLE'
};

// Auth reducer to handle state changes
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_REQUEST:
    case AUTH_ACTIONS.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case AUTH_ACTIONS.LOGIN_SUCCESS:
    case AUTH_ACTIONS.REGISTER_SUCCESS:
      // Store auth data in localStorage
      localStorage.setItem('jwtToken', action.payload.token);
      localStorage.setItem('userRole', action.payload.role);
      
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.role,
        loading: false,
        error: null
      };
    
    case AUTH_ACTIONS.LOGIN_FAILURE:
    case AUTH_ACTIONS.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    case AUTH_ACTIONS.LOGOUT:
      // Clear auth data from localStorage
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('userRole');
      
      return {
        ...initialAuthState,
        user: null,
        token: null,
        role: null,
        isAuthenticated: false
      };
    
    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    
    case AUTH_ACTIONS.UPDATE_USER:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      };
    
    case AUTH_ACTIONS.CHANGE_ROLE:
      localStorage.setItem('userRole', action.payload);
      
      return {
        ...state,
        role: action.payload
      };
    
    default:
      return state;
  }
};

// Create Auth Context
export const AuthContext = createContext();

// Custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Export named constants for easy imports in other files
export { initialAuthState, authReducer };