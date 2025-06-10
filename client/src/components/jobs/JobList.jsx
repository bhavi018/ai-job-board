import React, { useState } from 'react';
import JobCard from './JobCard';
import { Search, Briefcase, SlidersHorizontal } from 'lucide-react';

const JobList = ({ jobs = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for demonstration (will be replaced by actual props)
  const mockJobs = [
    {
      id: 1,
      jobTitle: 'Senior Frontend Developer',
      companyName: 'TechGlobal',
      location: 'San Francisco, CA',
      salaryRange: '$120,000 - $150,000',
      jobType: 'Full-time',
      postedDate: '2 days ago'
    },
    {
      id: 2,
      jobTitle: 'UX/UI Designer',
      companyName: 'DesignHub',
      location: 'Remote',
      salaryRange: '$90,000 - $110,000',
      jobType: 'Contract',
      postedDate: '1 week ago'
    },
    {
      id: 3,
      jobTitle: 'Backend Engineer',
      companyName: 'DataSystems',
      location: 'New York, NY',
      salaryRange: '$130,000 - $160,000',
      jobType: 'Full-time',
      postedDate: '3 days ago'
    },
    {
      id: 4,
      jobTitle: 'Product Manager',
      companyName: 'InnovateCorp',
      location: 'Austin, TX',
      salaryRange: '$115,000 - $140,000',
      jobType: 'Full-time',
      postedDate: 'Just now'
    }
  ];

  // Use the provided jobs or fallback to mock data
  const jobsToDisplay = jobs.length > 0 ? jobs : mockJobs;

  // Empty state when no jobs are found
  if (jobsToDisplay.length === 0) {
    return (
      <div className="w-full py-16 flex flex-col items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
        <Briefcase size={48} className="text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No jobs found</h3>
        <p className="text-gray-500 text-center max-w-md">
          We couldn't find any jobs matching your criteria. Try adjusting your search filters.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Search and Filter Bar */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search jobs by title, company, or location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Button */}
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <SlidersHorizontal size={18} className="mr-2" />
            Filters
          </button>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto max-h-screen pb-4">
        {jobsToDisplay.map((job) => (
          <JobCard
            key={job.id}
            jobTitle={job.jobTitle}
            companyName={job.companyName}
            location={job.location}
            salaryRange={job.salaryRange}
            jobType={job.jobType}
            postedDate={job.postedDate}
          />
        ))}
      </div>
    </div>
  );
};

export default JobList;