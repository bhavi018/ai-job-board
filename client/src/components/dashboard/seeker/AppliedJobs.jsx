import React from 'react';
import { 
  Calendar, 
  Briefcase, 
  Building, 
  Clock, 
  XCircle, 
  CheckCircle, 
  Eye 
} from 'lucide-react';

const AppliedJobs = ({ 
  appliedJobs = [
    {
      id: 201,
      jobTitle: "Senior Frontend Developer",
      companyName: "TechGlobal Inc.",
      appliedDate: "May 10, 2025",
      status: "Under Review",
      logo: null // This would be a URL to the company logo
    },
    {
      id: 202,
      jobTitle: "React Developer",
      companyName: "WebSolutions",
      appliedDate: "May 5, 2025",
      status: "Interview Scheduled",
      logo: null
    },
    {
      id: 203,
      jobTitle: "UI/UX Developer",
      companyName: "DesignCraft",
      appliedDate: "April 28, 2025",
      status: "Application Viewed",
      logo: null
    },
    {
      id: 204,
      jobTitle: "Full-Stack Engineer",
      companyName: "InnovateTech",
      appliedDate: "April 22, 2025",
      status: "Pending",
      logo: null
    },
    {
      id: 205,
      jobTitle: "JavaScript Developer",
      companyName: "CodeMasters",
      appliedDate: "April 15, 2025",
      status: "Rejected",
      logo: null
    }
  ] 
}) => {
  // Function to determine status badge color
  const getStatusBadge = (status) => {
    switch(status) {
      case 'Pending':
        return (
          <div className="flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <Clock size={12} className="mr-1" />
            {status}
          </div>
        );
      case 'Under Review':
        return (
          <div className="flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Eye size={12} className="mr-1" />
            {status}
          </div>
        );
      case 'Application Viewed':
        return (
          <div className="flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Eye size={12} className="mr-1" />
            {status}
          </div>
        );
      case 'Interview Scheduled':
        return (
          <div className="flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Calendar size={12} className="mr-1" />
            {status}
          </div>
        );
      case 'Rejected':
        return (
          <div className="flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle size={12} className="mr-1" />
            {status}
          </div>
        );
      default:
        return (
          <div className="flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            <CheckCircle size={12} className="mr-1" />
            {status}
          </div>
        );
    }
  };

  // Empty state if no applied jobs
  if (!appliedJobs || appliedJobs.length === 0) {
    return (
      <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="bg-gray-100 p-4 rounded-full mb-4">
            <Briefcase size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No Applications Yet</h3>
          <p className="text-gray-600 text-center max-w-md mb-6">
            You haven't applied to any jobs yet. Start exploring opportunities and apply to jobs that match your skills and interests.
          </p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Explore Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Your Applied Jobs</h2>
        <p className="text-gray-600 mt-1">Track the status of your job applications</p>
      </div>

      {/* Desktop view: table */}
      <div className="hidden lg:block">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Job
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applied Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {appliedJobs.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{job.jobTitle}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {job.logo ? (
                      <img className="h-8 w-8 rounded-full mr-2" src={job.logo} alt="" />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                        <span className="text-xs font-medium text-gray-500">{job.companyName.charAt(0)}</span>
                      </div>
                    )}
                    <div className="text-sm text-gray-700">{job.companyName}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-700">{job.appliedDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(job.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button 
                    className="text-red-600 hover:text-red-800 text-sm font-medium hover:underline focus:outline-none"
                  >
                    Withdraw
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view: cards */}
      <div className="lg:hidden divide-y divide-gray-200">
        {appliedJobs.map((job) => (
          <div key={job.id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex justify-between">
              <div className="flex items-start">
                {job.logo ? (
                  <img className="h-10 w-10 rounded-full mr-3" src={job.logo} alt="" />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                    <span className="text-sm font-medium text-gray-500">{job.companyName.charAt(0)}</span>
                  </div>
                )}
                <div>
                  <div className="text-sm font-medium text-gray-900">{job.jobTitle}</div>
                  <div className="flex items-center text-xs text-gray-600 mt-1">
                    <Building size={14} className="mr-1" />
                    {job.companyName}
                  </div>
                </div>
              </div>
              {getStatusBadge(job.status)}
            </div>
            
            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center text-xs text-gray-600">
                <Calendar size={14} className="mr-1" />
                Applied on {job.appliedDate}
              </div>
              <button 
                className="text-red-600 hover:text-red-800 text-xs font-medium hover:underline focus:outline-none"
              >
                Withdraw
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{appliedJobs.length}</span> of <span className="font-medium">{appliedJobs.length}</span> applications
          </div>
          <div className="flex-1 flex justify-end">
            <button 
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              disabled
            >
              Previous
            </button>
            <button
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              disabled
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppliedJobs;