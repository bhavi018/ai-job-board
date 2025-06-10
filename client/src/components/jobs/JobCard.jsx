import React from 'react';
import { Bookmark, MapPin, Calendar, Clock, DollarSign } from 'lucide-react';

const JobCard = ({ 
  jobTitle, 
  companyName, 
  location, 
  salaryRange, 
  jobType, 
  postedDate,
  companyLogo
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 mb-4 transition-all duration-300 hover:shadow-lg hover:border-blue-200">
      <div className="flex flex-col md:flex-row md:items-center">
        {/* Company Logo */}
        <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4">
          <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center overflow-hidden">
            {companyLogo ? (
              <img src={companyLogo} alt={`${companyName} logo`} className="w-full h-full object-cover" />
            ) : (
              <span className="text-xl font-bold text-gray-500">
                {companyName?.charAt(0).toUpperCase() || "C"}
              </span>
            )}
          </div>
        </div>

        {/* Job Details */}
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{jobTitle || "Job Title"}</h3>
            <button className="text-gray-400 hover:text-blue-500 transition-colors" aria-label="Bookmark job">
              <Bookmark size={20} />
            </button>
          </div>
          
          <p className="text-gray-700 font-medium mb-2">{companyName || "Company Name"}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 text-sm mt-3">
            <div className="flex items-center text-gray-600">
              <MapPin size={16} className="mr-2 text-gray-400" />
              <span>{location || "Location"}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <DollarSign size={16} className="mr-2 text-gray-400" />
              <span>{salaryRange || "Salary Range"}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <Clock size={16} className="mr-2 text-gray-400" />
              <span>{jobType || "Job Type"}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <Calendar size={16} className="mr-2 text-gray-400" />
              <span>Posted {postedDate || "Recently"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Button Section */}
      <div className="mt-4 md:mt-6 flex justify-end">
        <button 
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 text-sm font-medium shadow-sm"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default JobCard;