import React from 'react';
import { 
  User, 
  FileText, 
  BookOpen, 
  Briefcase, 
  Clock, 
  Star, 
  ArrowRight, 
  ChevronRight 
} from 'lucide-react';
import JobCard from './JobCard';

const SeekerDashboard = ({ 
  userName = "Alex Johnson",
  appliedJobsCount = 12,
  // Dummy recommendation data
  recommendedJobs = [
    {
      id: 101,
      jobTitle: "Senior React Developer",
      companyName: "InnovateTech",
      location: "Remote",
      salaryRange: "$120,000 - $150,000",
      jobType: "Full-time",
      postedDate: "2 days ago"
    },
    {
      id: 102,
      jobTitle: "Frontend Engineer",
      companyName: "WebSolutions Co.",
      location: "New York, NY",
      salaryRange: "$110,000 - $135,000",
      jobType: "Full-time",
      postedDate: "Just now"
    },
    {
      id: 103,
      jobTitle: "UX/UI Developer",
      companyName: "DesignMasters",
      location: "San Francisco, CA",
      salaryRange: "$95,000 - $120,000",
      jobType: "Remote",
      postedDate: "1 week ago"
    }
  ]
}) => {
  // Get time of day for greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Header with greeting */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {getGreeting()}, {userName}!
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your job search today.
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <button className="flex items-center justify-center flex-col bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:scale-105 hover:border-blue-100 group">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-100 transition-colors">
            <User className="text-blue-600" size={20} />
          </div>
          <span className="text-gray-700 font-medium">My Profile</span>
        </button>

        <button className="flex items-center justify-center flex-col bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:scale-105 hover:border-blue-100 group">
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-3 group-hover:bg-green-100 transition-colors">
            <FileText className="text-green-600" size={20} />
          </div>
          <span className="text-gray-700 font-medium">Resume Review</span>
        </button>

        <button className="flex items-center justify-center flex-col bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:scale-105 hover:border-blue-100 group">
          <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mb-3 group-hover:bg-purple-100 transition-colors">
            <Star className="text-purple-600" size={20} />
          </div>
          <span className="text-gray-700 font-medium">Saved Jobs</span>
        </button>

        <button className="flex items-center justify-center flex-col bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:scale-105 hover:border-blue-100 group">
          <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-3 group-hover:bg-amber-100 transition-colors">
            <BookOpen className="text-amber-600" size={20} />
          </div>
          <span className="text-gray-700 font-medium">Career Tips</span>
        </button>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Status Cards */}
        <div className="lg:col-span-1 space-y-6">
          {/* Applied Jobs Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Your Applied Jobs</h2>
              <div className="bg-blue-100 p-2 rounded-lg">
                <Briefcase className="text-blue-600" size={20} />
              </div>
            </div>

            <div className="flex items-center text-3xl font-bold text-gray-800 mb-2">
              {appliedJobsCount}
              <span className="text-sm font-normal text-gray-500 ml-2">jobs</span>
            </div>

            <div className="flex flex-col space-y-3 mt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Clock size={16} className="mr-2 text-gray-400" />
                  <span>2 applications in review</span>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Star size={16} className="mr-2 text-gray-400" />
                  <span>3 interviews scheduled</span>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            </div>

            <button className="w-full mt-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-300 flex items-center justify-center">
              View All Applications
              <ArrowRight size={16} className="ml-2" />
            </button>
          </div>

          {/* Job Search Stats Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Job Search Stats</h2>
              <div className="bg-green-100 p-2 rounded-lg">
                <FileText className="text-green-600" size={20} />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Profile Completion</span>
                  <span className="text-sm font-medium text-gray-700">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Resume Strength</span>
                  <span className="text-sm font-medium text-gray-700">70%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "70%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Application Response Rate</span>
                  <span className="text-sm font-medium text-gray-700">42%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: "42%" }}></div>
                </div>
              </div>
            </div>

            <button className="w-full mt-6 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors duration-300 flex items-center justify-center">
              Improve Your Profile
              <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        </div>

        {/* Right Column - Recommended Jobs */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Recommended for You</h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                View All
                <ChevronRight size={16} className="ml-1" />
              </button>
            </div>

            <div className="space-y-4">
              {recommendedJobs.map(job => (
                <div 
                  key={job.id} 
                  className="transform transition-transform duration-300 hover:scale-[1.01]"
                >
                  <JobCard
                    jobTitle={job.jobTitle}
                    companyName={job.companyName}
                    location={job.location}
                    salaryRange={job.salaryRange}
                    jobType={job.jobType}
                    postedDate={job.postedDate}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeekerDashboard;