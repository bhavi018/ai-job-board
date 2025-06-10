import { useState } from 'react';
import { Search, Filter, Calendar, ChevronDown, Eye, CheckCircle, XCircle } from 'lucide-react';

const JobModeration = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  // Mock data - replace with actual API calls in production
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'TechCorp Inc.',
      dateSubmitted: '2025-05-10',
      status: 'Pending',
      description: 'We are looking for a senior React developer with 5+ years of experience...',
      location: 'San Francisco, CA',
      salary: '$120,000 - $150,000'
    },
    {
      id: 2,
      title: 'UX/UI Designer',
      company: 'Design Masters',
      dateSubmitted: '2025-05-12',
      status: 'Pending',
      description: 'Creative designer needed for our growing team...',
      location: 'Remote',
      salary: '$90,000 - $110,000'
    },
    {
      id: 3,
      title: 'DevOps Engineer',
      company: 'CloudSys Solutions',
      dateSubmitted: '2025-05-09',
      status: 'Approved',
      description: 'Experienced DevOps engineer needed to manage our cloud infrastructure...',
      location: 'New York, NY',
      salary: '$130,000 - $160,000'
    },
    {
      id: 4,
      title: 'Content Marketing Specialist',
      company: 'MediaHub',
      dateSubmitted: '2025-05-11',
      status: 'Rejected',
      description: 'Looking for a content specialist with SEO experience...',
      location: 'Chicago, IL',
      salary: '$70,000 - $85,000'
    },
    {
      id: 5,
      title: 'Full Stack JavaScript Developer',
      company: 'WebFusion',
      dateSubmitted: '2025-05-14',
      status: 'Pending',
      description: 'Full stack developer with Node.js and React experience...',
      location: 'Austin, TX',
      salary: '$100,000 - $130,000'
    }
  ]);

  // Filter jobs
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle job approval
  const handleApprove = (jobId) => {
    setJobs(jobs.map(job => job.id === jobId ? {...job, status: 'Approved'} : job));
    setAlertType('success');
    setAlertMessage('Job has been approved successfully.');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  // Handle job rejection
  const handleReject = (jobId) => {
    setJobs(jobs.map(job => job.id === jobId ? {...job, status: 'Rejected'} : job));
    setAlertType('error');
    setAlertMessage('Job has been rejected.');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    let colorClasses = '';
    
    switch(status) {
      case 'Pending':
        colorClasses = 'bg-yellow-100 text-yellow-800';
        break;
      case 'Approved':
        colorClasses = 'bg-green-100 text-green-800';
        break;
      case 'Rejected':
        colorClasses = 'bg-red-100 text-red-800';
        break;
      default:
        colorClasses = 'bg-gray-100 text-gray-800';
    }
    
    return (
      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClasses}`}>
        {status}
      </span>
    );
  };

  // Count pending jobs
  const pendingJobsCount = jobs.filter(job => job.status === 'Pending').length;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Job Moderation</h2>
        <div className="mt-2 sm:mt-0">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800">
            {pendingJobsCount} {pendingJobsCount === 1 ? 'job' : 'jobs'} pending review
          </span>
        </div>
      </div>
      
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="relative flex-grow max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search job title or company..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="relative w-full md:w-auto">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Filter className="h-5 w-5 text-gray-400" />
          </div>
          <select
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDown className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
      
      {/* Alert */}
      {showAlert && (
        <div className={`mb-6 p-4 rounded-md ${alertType === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          <div className="flex">
            <div className="flex-shrink-0">
              {alertType === 'success' ? (
                <CheckCircle className="h-5 w-5 text-green-400" />
              ) : (
                <XCircle className="h-5 w-5 text-red-400" />
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{alertMessage}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Jobs List - Table for Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Submitted</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{job.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{job.company}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(job.dateSubmitted)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={job.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => alert(`View details for: ${job.title}`)}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium hover:bg-blue-200 flex items-center"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </button>
                      {job.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(job.id)}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded-md text-xs font-medium hover:bg-green-200 flex items-center"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(job.id)}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-xs font-medium hover:bg-red-200 flex items-center"
                          >
                            <XCircle className="h-3 w-3 mr-1" />
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No jobs found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Jobs List - Cards for Mobile */}
      <div className="md:hidden space-y-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div key={job.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{job.company}</p>
                </div>
                <StatusBadge status={job.status} />
              </div>
              
              <div className="mt-2 text-sm text-gray-500 flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(job.dateSubmitted)}
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => alert(`View details for: ${job.title}`)}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium hover:bg-blue-200 flex items-center"
                >
                  <Eye className="h-3 w-3 mr-1" />
                  View Details
                </button>
                {job.status === 'Pending' && (
                  <>
                    <button
                      onClick={() => handleApprove(job.id)}
                      className="px-3 py-1 bg-green-100 text-green-700 rounded-md text-xs font-medium hover:bg-green-200 flex items-center"
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(job.id)}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-xs font-medium hover:bg-red-200 flex items-center"
                    >
                      <XCircle className="h-3 w-3 mr-1" />
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  No jobs found matching your criteria
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Empty State - No Pending Jobs */}
      {pendingJobsCount === 0 && statusFilter === 'Pending' && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mt-6 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircle className="h-5 w-5 text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">
                Great job! All submitted jobs have been reviewed.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobModeration;