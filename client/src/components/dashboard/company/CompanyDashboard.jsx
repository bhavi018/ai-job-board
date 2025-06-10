import { useState, useEffect } from 'react';
import { BriefcaseBusiness, Users, FileCheck, PlusCircle, Eye, Bell } from 'lucide-react';

const CompanyDashboard = () => {
  // Dummy company data (replace with actual data fetching logic)
  const [company, setCompany] = useState({
    name: 'TechCorp Solutions',
    stats: {
      jobsPosted: 24,
      totalApplicants: 187,
      activeListings: 12
    },
    recentJobs: [
      { id: 1, title: 'Senior Frontend Developer', date: '2025-05-10', applicants: 16 },
      { id: 2, title: 'DevOps Engineer', date: '2025-05-07', applicants: 9 },
      { id: 3, title: 'UX Designer', date: '2025-05-01', applicants: 21 },
      { id: 4, title: 'Project Manager', date: '2025-04-28', applicants: 12 }
    ],
    notifications: 3
  });

  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading data
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-6 px-4 sm:px-6 lg:px-8 mb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-white text-2xl font-bold">Welcome, {company.name}</h1>
              <p className="text-blue-100 mt-1">Manage your job postings and applicants</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-2">
              <button className="relative flex items-center bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg hover:bg-opacity-30 transition">
                <Bell size={18} className="mr-2" />
                Notifications
                {company.notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {company.notifications}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <BriefcaseBusiness size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Jobs Posted</p>
              <p className="text-2xl font-bold text-gray-800">{company.stats.jobsPosted}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 flex items-center">
            <div className="bg-green-100 p-3 rounded-lg mr-4">
              <Users size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Applicants</p>
              <p className="text-2xl font-bold text-gray-800">{company.stats.totalApplicants}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg mr-4">
              <FileCheck size={24} className="text-purple-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Active Listings</p>
              <p className="text-2xl font-bold text-gray-800">{company.stats.activeListings}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center transition">
            <PlusCircle size={20} className="mr-2" />
            Post New Job
          </button>
          <button className="flex-1 bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 py-3 px-6 rounded-lg font-medium flex items-center justify-center transition">
            <Eye size={20} className="mr-2" />
            View All Applicants
          </button>
        </div>

        {/* Recent Job Posts */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-800">Recent Job Posts</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {company.recentJobs.map(job => (
              <div key={job.id} className="px-6 py-4 hover:bg-gray-50 transition flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <h3 className="font-medium text-blue-600">{job.title}</h3>
                  <p className="text-sm text-gray-500">Posted on {new Date(job.date).toLocaleDateString()}</p>
                </div>
                <div className="mt-2 sm:mt-0 flex items-center">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded flex items-center">
                    <Users size={14} className="mr-1" />
                    {job.applicants} applicants
                  </span>
                  <button className="ml-4 text-gray-500 hover:text-blue-600 transition">
                    <Eye size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-3">
            <button className="w-full py-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition">
              View All Job Posts
            </button>
          </div>
        </div>

        {/* Additional metric/activity section */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-800">Performance Overview</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Average time to hire</h3>
                <p className="mt-1 text-2xl font-semibold text-gray-800">14 days</p>
                <div className="mt-1 text-xs text-green-600">↓ 3 days from last month</div>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Application completion rate</h3>
                <p className="mt-1 text-2xl font-semibold text-gray-800">68%</p>
                <div className="mt-1 text-xs text-green-600">↑ 5% from last month</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;