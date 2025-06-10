import React from "react";

const Footer = () => {
  return (
    <footer className="mt-auto py-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
            &copy; 2025 AI Job Board. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/terms">Terms &amp; Conditions</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Footer Link Component with hover effect
const FooterLink = ({ href, children }) => {
  return (
    <a
      href={href}
      className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-150"
    >
      {children}
    </a>
  );
};

export default Footer;