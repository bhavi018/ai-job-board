import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";



// This is a placeholder for authentication state
// In a real application, you would use your auth system (Context, Redux, etc.)
const useAuth = () => {
  // For demo purposes only - replace with real auth logic
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return {
    isLoggedIn,
    login: () => setIsLoggedIn(true),
    logout: () => setIsLoggedIn(false),
    user: isLoggedIn ? { name: "John Doe" } : null
  };
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  // Check for system dark mode preference on mount
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
    
    // Listen for changes in color scheme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Toggle the dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close the mobile menu when a link is clicked
  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  // Handle login button click
  const handleLoginClick = () => {
    navigate('/login');
    handleLinkClick();
  };

  // Handle register button click
  const handleRegisterClick = () => {
    navigate('/register');
    handleLinkClick();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand Name */}
          <div className="flex-shrink-0 flex items-center">



            <img
  className="h-8 w-auto"
  src={logo}
  alt="AI Job Board Logo"
/>

            <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">
              AI Job Board
            </span>
          </div>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <NavLink href="/" onClick={handleLinkClick}>Home</NavLink>
              <NavLink href="/jobs" onClick={handleLinkClick}>Jobs</NavLink>
              <NavLink href="/resume-review" onClick={handleLinkClick}>Resume Review</NavLink>
              <NavLink href="/interview-qa" onClick={handleLinkClick}>Interview Q&A</NavLink>
              
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {darkMode ? "🌞" : "🌙"}
              </button>
            </div>
          </div>
          
          {/* Authentication Section */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center">
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center"
                  >
                    <img
                      className="h-8 w-8 rounded-full"
                      src="/assets/default-avatar.jpg"
                      alt="User avatar"
                    />
                    <ChevronDown 
                      className={`ml-1 h-4 w-4 text-gray-600 dark:text-gray-300 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  
                  {/* User Dropdown */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={handleLinkClick}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          handleLinkClick();
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={handleLoginClick}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-white bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md"
                  >
                    Login
                  </button>
                  <button 
                    onClick={handleRegisterClick}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink href="/" onClick={handleLinkClick}>Home</MobileNavLink>
            <MobileNavLink href="/jobs" onClick={handleLinkClick}>Jobs</MobileNavLink>
            <MobileNavLink href="/resume-review" onClick={handleLinkClick}>Resume Review</MobileNavLink>
            <MobileNavLink href="/interview-qa" onClick={handleLinkClick}>Interview Q&A</MobileNavLink>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-full flex justify-start px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {darkMode ? "Switch to Light Mode 🌞" : "Switch to Dark Mode 🌙"}
            </button>
          </div>
          
          {/* Mobile Authentication Section */}
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            {isLoggedIn ? (
              <div className="px-4">
                <div className="flex items-center mb-3">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="/assets/default-avatar.jpg"
                      alt="User avatar"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800 dark:text-white">
                      John Doe
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                    onClick={handleLinkClick}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      handleLinkClick();
                    }}
                    className="block w-full text-left px-4 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-4 space-y-2">
                <button 
                  onClick={handleLoginClick}
                  className="w-full px-4 py-2 text-base font-medium text-gray-700 dark:text-white bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md"
                >
                  Login
                </button>
                <button 
                  onClick={handleRegisterClick}
                  className="w-full px-4 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

// Desktop Navigation Link Component
const NavLink = ({ href, onClick, children }) => {
  return (
    <Link
      to={href}
      onClick={onClick}
      className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      {children}
    </Link>
  );
};

// Mobile Navigation Link Component
const MobileNavLink = ({ href, onClick, children }) => {
  return (
    <Link
      to={href}
      onClick={onClick}
      className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      {children}
    </Link>
  );
};

export default Navbar;