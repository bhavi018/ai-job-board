import { createContext, useReducer, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import userService from '../services/userService';

// Define initial state for user data
const initialUserState = {
  profile: null,
  resume: null,
  appliedJobs: [],
  savedJobs: [],
  notifications: [],
  jobPreferences: null,
  loading: false,
  error: null,
  lastUpdated: null
};

// Define action types for user reducer
export const USER_ACTIONS = {
  FETCH_USER_DATA_REQUEST: 'FETCH_USER_DATA_REQUEST',
  FETCH_USER_DATA_SUCCESS: 'FETCH_USER_DATA_SUCCESS',
  FETCH_USER_DATA_FAILURE: 'FETCH_USER_DATA_FAILURE',
  
  UPDATE_PROFILE_REQUEST: 'UPDATE_PROFILE_REQUEST',
  UPDATE_PROFILE_SUCCESS: 'UPDATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_FAILURE: 'UPDATE_PROFILE_FAILURE',
  
  UPLOAD_RESUME_REQUEST: 'UPLOAD_RESUME_REQUEST',
  UPLOAD_RESUME_SUCCESS: 'UPLOAD_RESUME_SUCCESS',
  UPLOAD_RESUME_FAILURE: 'UPLOAD_RESUME_FAILURE',
  
  APPLY_JOB_REQUEST: 'APPLY_JOB_REQUEST',
  APPLY_JOB_SUCCESS: 'APPLY_JOB_SUCCESS',
  APPLY_JOB_FAILURE: 'APPLY_JOB_FAILURE',
  
  SAVE_JOB_REQUEST: 'SAVE_JOB_REQUEST',
  SAVE_JOB_SUCCESS: 'SAVE_JOB_SUCCESS',
  SAVE_JOB_FAILURE: 'SAVE_JOB_FAILURE',
  
  REMOVE_SAVED_JOB: 'REMOVE_SAVED_JOB',
  
  UPDATE_JOB_PREFERENCES: 'UPDATE_JOB_PREFERENCES',
  
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  MARK_NOTIFICATION_READ: 'MARK_NOTIFICATION_READ',
  
  CLEAR_USER_ERROR: 'CLEAR_USER_ERROR',
  RESET_USER_STATE: 'RESET_USER_STATE'
};

// User reducer to handle state changes
const userReducer = (state, action) => {
  switch (action.type) {
    case USER_ACTIONS.FETCH_USER_DATA_REQUEST:
    case USER_ACTIONS.UPDATE_PROFILE_REQUEST:
    case USER_ACTIONS.UPLOAD_RESUME_REQUEST:
    case USER_ACTIONS.APPLY_JOB_REQUEST:
    case USER_ACTIONS.SAVE_JOB_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case USER_ACTIONS.FETCH_USER_DATA_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: null,
        lastUpdated: new Date()
      };
    
    case USER_ACTIONS.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          ...action.payload
        },
        loading: false,
        error: null,
        lastUpdated: new Date()
      };
    
    case USER_ACTIONS.UPLOAD_RESUME_SUCCESS:
      return {
        ...state,
        resume: action.payload,
        loading: false,
        error: null,
        lastUpdated: new Date()
      };
    
    case USER_ACTIONS.APPLY_JOB_SUCCESS:
      return {
        ...state,
        appliedJobs: [...state.appliedJobs, action.payload],
        loading: false,
        error: null,
        lastUpdated: new Date()
      };
    
    case USER_ACTIONS.SAVE_JOB_SUCCESS:
      return {
        ...state,
        savedJobs: [...state.savedJobs, action.payload],
        loading: false,
        error: null,
        lastUpdated: new Date()
      };
    
    case USER_ACTIONS.REMOVE_SAVED_JOB:
      return {
        ...state,
        savedJobs: state.savedJobs.filter(job => job.id !== action.payload),
        lastUpdated: new Date()
      };
    
    case USER_ACTIONS.UPDATE_JOB_PREFERENCES:
      return {
        ...state,
        jobPreferences: {
          ...state.jobPreferences,
          ...action.payload
        },
        lastUpdated: new Date()
      };
    
    case USER_ACTIONS.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
        lastUpdated: new Date()
      };
    
    case USER_ACTIONS.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.id !== action.payload
        ),
        lastUpdated: new Date()
      };
    
    case USER_ACTIONS.MARK_NOTIFICATION_READ:
      return {
        ...state,
        notifications: state.notifications.map(notification => 
          notification.id === action.payload
            ? { ...notification, read: true }
            : notification
        ),
        lastUpdated: new Date()
      };
    
    case USER_ACTIONS.FETCH_USER_DATA_FAILURE:
    case USER_ACTIONS.UPDATE_PROFILE_FAILURE:
    case USER_ACTIONS.UPLOAD_RESUME_FAILURE:
    case USER_ACTIONS.APPLY_JOB_FAILURE:
    case USER_ACTIONS.SAVE_JOB_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    case USER_ACTIONS.CLEAR_USER_ERROR:
      return {
        ...state,
        error: null
      };
    
    case USER_ACTIONS.RESET_USER_STATE:
      return initialUserState;
    
    default:
      return state;
  }
};

// Create User Context
export const UserContext = createContext();

// User Provider Component
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialUserState);
  const { isAuthenticated, user, token } = useAuth();
  
  // Fetch user data when authenticated
  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated && user?.id) {
        dispatch({ type: USER_ACTIONS.FETCH_USER_DATA_REQUEST });
        
        try {
          const userData = await userService.getUserData(user.id, token);
          
          dispatch({
            type: USER_ACTIONS.FETCH_USER_DATA_SUCCESS,
            payload: userData
          });
        } catch (error) {
          dispatch({
            type: USER_ACTIONS.FETCH_USER_DATA_FAILURE,
            payload: error.response?.data?.message || 'Failed to fetch user data'
          });
        }
      }
    };
    
    if (isAuthenticated) {
      fetchUserData();
    } else {
      // Reset user state when logged out
      dispatch({ type: USER_ACTIONS.RESET_USER_STATE });
    }
  }, [isAuthenticated, user?.id, token]);
  
  // Helper function to update profile
  const updateProfile = async (profileData) => {
    dispatch({ type: USER_ACTIONS.UPDATE_PROFILE_REQUEST });
    
    try {
      const updatedProfile = await userService.updateProfile(profileData, token);
      
      dispatch({
        type: USER_ACTIONS.UPDATE_PROFILE_SUCCESS,
        payload: updatedProfile
      });
      
      return { success: true, profile: updatedProfile };
    } catch (error) {
      dispatch({
        type: USER_ACTIONS.UPDATE_PROFILE_FAILURE,
        payload: error.response?.data?.message || 'Failed to update profile'
      });
      
      return { success: false, error: error.response?.data?.message || 'Failed to update profile' };
    }
  };
  
  // Helper function to upload resume
  const uploadResume = async (resumeFile) => {
    dispatch({ type: USER_ACTIONS.UPLOAD_RESUME_REQUEST });
    
    try {
      const resumeData = await userService.uploadResume(resumeFile, token);
      
      dispatch({
        type: USER_ACTIONS.UPLOAD_RESUME_SUCCESS,
        payload: resumeData
      });
      
      return { success: true, resume: resumeData };
    } catch (error) {
      dispatch({
        type: USER_ACTIONS.UPLOAD_RESUME_FAILURE,
        payload: error.response?.data?.message || 'Failed to upload resume'
      });
      
      return { success: false, error: error.response?.data?.message || 'Failed to upload resume' };
    }
  };
  
  // Helper function to apply for a job
  const applyForJob = async (jobId, applicationData) => {
    dispatch({ type: USER_ACTIONS.APPLY_JOB_REQUEST });
    
    try {
      const application = await userService.applyForJob(jobId, applicationData, token);
      
      dispatch({
        type: USER_ACTIONS.APPLY_JOB_SUCCESS,
        payload: application
      });
      
      return { success: true, application };
    } catch (error) {
      dispatch({
        type: USER_ACTIONS.APPLY_JOB_FAILURE,
        payload: error.response?.data?.message || 'Failed to apply for job'
      });
      
      return { success: false, error: error.response?.data?.message || 'Failed to apply for job' };
    }
  };
  
  // Helper function to save a job
  const saveJob = async (jobId) => {
    dispatch({ type: USER_ACTIONS.SAVE_JOB_REQUEST });
    
    try {
      const savedJob = await userService.saveJob(jobId, token);
      
      dispatch({
        type: USER_ACTIONS.SAVE_JOB_SUCCESS,
        payload: savedJob
      });
      
      return { success: true, job: savedJob };
    } catch (error) {
      dispatch({
        type: USER_ACTIONS.SAVE_JOB_FAILURE,
        payload: error.response?.data?.message || 'Failed to save job'
      });
      
      return { success: false, error: error.response?.data?.message || 'Failed to save job' };
    }
  };
  
  // Helper function to remove a saved job
  const removeSavedJob = async (jobId) => {
    try {
      await userService.removeSavedJob(jobId, token);
      
      dispatch({
        type: USER_ACTIONS.REMOVE_SAVED_JOB,
        payload: jobId
      });
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to remove saved job' 
      };
    }
  };
  
  // Helper function to update job preferences
  const updateJobPreferences = async (preferences) => {
    try {
      const updatedPreferences = await userService.updateJobPreferences(preferences, token);
      
      dispatch({
        type: USER_ACTIONS.UPDATE_JOB_PREFERENCES,
        payload: updatedPreferences
      });
      
      return { success: true, preferences: updatedPreferences };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to update job preferences' 
      };
    }
  };
  
  // Helper function to clear user error
  const clearError = () => {
    dispatch({ type: USER_ACTIONS.CLEAR_USER_ERROR });
  };
  
  // Context value
  const contextValue = {
    ...state,
    updateProfile,
    uploadResume,
    applyForJob,
    saveJob,
    removeSavedJob,
    updateJobPreferences,
    clearError,
    dispatch
  };
  
  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { initialUserState, userReducer };