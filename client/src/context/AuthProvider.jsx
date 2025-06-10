import { useReducer, useEffect } from 'react';
import { 
  AuthContext, 
  initialAuthState, 
  authReducer, 
  AUTH_ACTIONS 
} from './AuthContext';
import { validateToken, getUserInfo } from '../services/authService';

/**
 * AuthProvider component that wraps the application and provides authentication context
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  // Effect to validate and restore authentication from localStorage on app load
  useEffect(() => {
    const restoreAuthState = async () => {
      const token = localStorage.getItem('jwtToken');
      
      if (!token) return;
      
      try {
        // Validate the token with the backend
        const isValid = await validateToken(token);
        
        if (!isValid) {
          // Token is invalid or expired
          dispatch({ type: AUTH_ACTIONS.LOGOUT });
          return;
        }
        
        // Get user information using the token
        const userData = await getUserInfo(token);
        
        dispatch({
          type: AUTH_ACTIONS.LOGIN_SUCCESS,
          payload: {
            user: userData,
            token,
            role: userData.role || localStorage.getItem('userRole')
          }
        });
      } catch (error) {
        console.error('Failed to restore authentication state:', error);
        dispatch({ type: AUTH_ACTIONS.LOGOUT });
      }
    };
    
    restoreAuthState();
  }, []);

  // Auth actions that will be available throughout the app
  const login = async (credentials) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_REQUEST });
    // Actual login logic will be implemented in authActions.js and used here
  };

  const register = async (userData) => {
    dispatch({ type: AUTH_ACTIONS.REGISTER_REQUEST });
    // Actual register logic will be implemented in authActions.js and used here
  };

  const logout = () => {
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  const updateUser = (userData) => {
    dispatch({ 
      type: AUTH_ACTIONS.UPDATE_USER,
      payload: userData
    });
  };

  const changeRole = (role) => {
    dispatch({
      type: AUTH_ACTIONS.CHANGE_ROLE,
      payload: role
    });
  };

  // Create the context value with state and actions
  const contextValue = {
    ...state,
    login,
    register,
    logout,
    clearError,
    updateUser,
    changeRole,
    dispatch
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;