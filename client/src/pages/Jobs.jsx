import React, { useState, useEffect } from 'react';
import JobCard from '../components/jobs/JobCard.jsx';
import JobDetails from '../components/jobs/JobDetails.jsx';
import JobList from '../components/jobs/JobList.jsx';
// Dummy job data for demonstration
const dummyJobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'TechCorp',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$80,000 - $120,000',
    description: 'We are looking for a skilled Frontend Developer to join our team.',
    logo: '/api/placeholder/64/64',
    remote: true,
    posted: '2 days ago'
  },
  {
    id: 2,
    title: 'UX Designer',
    company: 'DesignStudio',
    location: 'San Francisco, CA',
    type: 'Contract',
    salary: '$70,000 - $90,000',
    description: 'Join our team as a UX Designer and create amazing user experiences.',
    logo: '/api/placeholder/64/64',
    remote: false,
    posted: '5 days ago'
  },
  {
    id: 3,
    title: 'Backend Engineer',
    company: 'DataSystems',
    location: 'Remote',
    type: 'Full-time',
    salary: '$100,000 - $140,000',
    description: 'Experienced Backend Engineer needed for our growing team.',
    logo: '/api/placeholder/64/64',
    remote: true,
    posted: '1 week ago'
  },
  {
    id: 4,
    title: 'Product Manager',
    company: 'InnovateCo',
    location: 'Boston, MA',
    type: 'Full-time',
    salary: '$90,000 - $130,000',
    description: 'Lead our product development efforts and drive our roadmap.',
    logo: '/api/placeholder/64/64',
    remote: false,
    posted: '3 days ago'
  },
  {
    id: 5,
    title: 'DevOps Engineer',
    company: 'CloudTech',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$95,000 - $135,000',
    description: 'Join our DevOps team and help us scale our infrastructure.',
    logo: '/api/placeholder/64/64',
    remote: true,
    posted: '1 day ago'
  },
  {
    id: 6,
    title: 'Marketing Specialist',
    company: 'GrowthLabs',
    location: 'Chicago, IL',
    type: 'Part-time',
    salary: '$50,000 - $70,000',
    description: 'Help us grow our brand and reach new customers.',
    logo: '/api/placeholder/64/64',
    remote: false,
    posted: '4 days ago'
  },
];

// Card skeleton for loading state
const JobCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-5 border border-gray-200 animate-pulse">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gray-200 rounded-lg mr-4"></div>
        <div className="flex-1">
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
      <div className="flex flex-wrap gap-2 mt-4">
        <div className="h-6 bg-gray-200 rounded w-24"></div>
        <div className="h-6 bg-gray-200 rounded w-20"></div>
        <div className="h-6 bg-gray-200 rounded w-16"></div>
      </div>
    </div>
  );
};

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    jobType: 'all',
    remote: false
  });
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  // Simulate data fetching
  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setJobs(dummyJobs);
      setIsLoading(false);
    };

    fetchJobs();
  }, []);

  // Filter jobs based on search criteria
  const filteredJobs = jobs.filter(job => {
    const matchesKeyword = job.title.toLowerCase().includes(filters.keyword.toLowerCase()) || 
                          job.company.toLowerCase().includes(filters.keyword.toLowerCase()) ||
                          job.description.toLowerCase().includes(filters.keyword.toLowerCase());
    
    const matchesLocation = !filters.location || 
                           job.location.toLowerCase().includes(filters.location.toLowerCase());
    
    const matchesJobType = filters.jobType === 'all' || 
                          job.type.toLowerCase() === filters.jobType.toLowerCase();
    
    const matchesRemote = !filters.remote || job.remote === true;
    
    return matchesKeyword && matchesLocation && matchesJobType && matchesRemote;
  });

  // Calculate pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === 'checkbox' ? checked : value
    });
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // The filtering is already handled by the filter function above
    // This is just to handle the form submission
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Explore Jobs</h1>
        <p className="text-gray-600 mt-2">Find your dream job from thousands of listings</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-1">
                Keywords
              </label>
              <input
                type="text"
                id="keyword"
                name="keyword"
                placeholder="Job title, company, or keywords"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={filters.keyword}
                onChange={handleFilterChange}
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="City, state, or remote"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={filters.location}
                onChange={handleFilterChange}
              />
            </div>
            <div>
              <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-1">
                Job Type
              </label>
              <select
                id="jobType"
                name="jobType"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={filters.jobType}
                onChange={handleFilterChange}
              >
                <option value="all">All Types</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="freelance">Freelance</option>
                <option value="internship">Internship</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remote"
                name="remote"
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                checked={filters.remote}
                onChange={handleFilterChange}
              />
              <label htmlFor="remote" className="ml-2 text-sm text-gray-700">
                Remote Only
              </label>
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Search Jobs
            </button>
          </div>
        </form>
      </div>

      {/* Job Results */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {isLoading ? 'Loading jobs...' : `${filteredJobs.length} Jobs Found`}
          </h2>
          <div className="flex items-center">
            <label htmlFor="sort" className="text-sm text-gray-600 mr-2">
              Sort by:
            </label>
            <select
              id="sort"
              className="px-2 py-1 border border-gray-300 rounded-lg text-sm"
            >
              <option value="relevance">Relevance</option>
              <option value="newest">Newest</option>
              <option value="salary">Salary</option>
            </select>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isLoading
            ? Array(6).fill().map((_, index) => (
                <JobCardSkeleton key={index} />
              ))
            : currentJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
        </div>

        {/* No Results */}
        {!isLoading && filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No jobs found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search filters.</p>
          </div>
        )}
      </div>

      {/* Pagination / Load More */}
      {!isLoading && filteredJobs.length > 0 && (
        <div className="mt-8 flex justify-center">
          {currentPage < totalPages ? (
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 bg-white border border-gray-300 text-blue-600 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Load More Jobs
            </button>
          ) : (
            <p className="text-gray-500">No more jobs to load</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Jobs;