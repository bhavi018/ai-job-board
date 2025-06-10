import React from "react";

const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm"></div>
      <div className="relative px-10 py-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm font-medium">{message}</p>
      </div>
    </div>
  );
};

// Variant with customizable size and optional text
export const LoaderInline = ({ size = "md", message }) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-2",
    lg: "w-12 h-12 border-3",
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div 
        className={`${sizeClasses[size]} border-gray-200 border-t-blue-600 rounded-full animate-spin`}
      ></div>
      {message && (
        <p className="mt-2 text-gray-600 dark:text-gray-300 text-xs font-medium">{message}</p>
      )}
    </div>
  );
};

// Usage examples:
// 1. Full-screen overlay loader:
// <Loader message="Processing your request..." />
//
// 2. Inline loader (e.g., inside a button or form):
// <LoaderInline size="sm" message="Submitting..." />
// <LoaderInline size="md" /> (without message)

export default Loader;