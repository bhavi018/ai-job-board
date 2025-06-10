import { useState } from 'react';
import { Search, FileText, ChevronDown, Filter, Check, X } from 'lucide-react';

const ApplicantList = () => {
  // Sample data for applicants
  const [applicants, setApplicants] = useState([
    {
      id: 1,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      resumeUrl: '#',
      applied: '2025-05-10',
      experience: '5 years',
      status: 'Shortlisted'
    },
    {
      id: 2,
      name: 'Michael Johnson',
      email: 'michael.j@example.com',
      resumeUrl: '#',
      applied: '2025-05-09',
      experience: '3 years',
      status: 'Reviewed'
    },
    {
      id: 3,
      name: 'Sarah Williams',
      email: 'sarahw@example.com',
      resumeUrl: '#',
      applied: '2025-05-08',
      experience: '7 years',
      status: 'Shortlisted'
    },
    {
      id: 4,
      name: 'Robert Chen',
      email: 'robert.chen@example.com',
      resumeUrl: '#',
      applied: '2025-05-07',
      experience: '2 years',
      status: 'Pending'
    },
    {
      id: 5,
      name: 'Emily Davis',
      email: 'emilyd@example.com',
      resumeUrl: '#',
      applied: '2025-05-06',
      experience: '4 years',
      status: 'Reviewed'
    },
    {
      id: 6,
      name: 'Alex Thompson',
      email: 'athompson@example.com',
      resumeUrl: '#',
      applied: '2025-05-05',
      experience: '6 years',
      status: 'Pending'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusDropdown, setStatusDropdown] = useState(null);

  // Status badge styles
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Reviewed':
        return 'bg-blue-100 text-blue-800';
      case 'Shortlisted':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle status change
  const changeStatus = (applicantId, newStatus) => {
    setApplicants(applicants.map(applicant => 
      applicant.id === applicantId ? { ...applicant, status: newStatus } : applicant
    ));
    setStatusDropdown(null);
  };

  // Toggle status dropdown
  const toggleStatusDropdown = (id) => {
    setStatusDropdown(statusDropdown === id ? null : id);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Header and Search Bar */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Job Applicants</h2>
            <p className="text-gray-600 mt-1">Frontend Developer Position</p>
          </div>
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search applicants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">{applicants.length}</span> applicants
          </div>
          <button className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Filter size={16} className="mr-1" />
            Filter
          </button>
        </div>
      </div>

      {/* Desktop Table View (hidden on mobile) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applicant
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applied On
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Experience
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
            {applicants.map((applicant) => (
              <tr key={applicant.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{applicant.name}</div>
                      <div className="text-sm text-gray-500">{applicant.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(applicant.applied).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {applicant.experience}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(applicant.status)}`}>
                    {applicant.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end items-center space-x-2">
                    <a 
                      href={applicant.resumeUrl} 
                      className="text-blue-600 hover:text-blue-900 inline-flex items-center border border-blue-600 rounded px-3 py-1"
                    >
                      <FileText size={16} className="mr-1" />
                      Resume
                    </a>
                    <div className="relative">
                      <button
                        onClick={() => toggleStatusDropdown(applicant.id)}
                        className="text-gray-600 hover:text-gray-900 inline-flex items-center border border-gray-300 rounded px-3 py-1"
                      >
                        Status
                        <ChevronDown size={16} className="ml-1" />
                      </button>
                      {statusDropdown === applicant.id && (
                        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                          <div className="py-1" role="menu" aria-orientation="vertical">
                            {['Pending', 'Reviewed', 'Shortlisted'].map((status) => (
                              <button
                                key={status}
                                onClick={() => changeStatus(applicant.id, status)}
                                className={`block px-4 py-2 text-sm w-full text-left ${
                                  applicant.status === status ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                } hover:bg-gray-100`}
                                role="menuitem"
                              >
                                <div className="flex items-center">
                                  {applicant.status === status && <Check size={16} className="mr-2 text-green-500" />}
                                  <span className={applicant.status === status ? 'font-medium' : ''}>
                                    {status}
                                  </span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View (hidden on desktop) */}
      <div className="md:hidden">
        <ul className="divide-y divide-gray-200">
          {applicants.map((applicant) => (
            <li key={applicant.id} className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">{applicant.name}</h3>
                  <p className="text-sm text-gray-600">{applicant.email}</p>
                </div>
                <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getStatusBadgeClass(applicant.status)}`}>
                  {applicant.status}
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                <div className="flex justify-between">
                  <span>Applied on: {new Date(applicant.applied).toLocaleDateString()}</span>
                  <span>Experience: {applicant.experience}</span>
                </div>
              </div>
              <div className="mt-4 flex justify-between gap-2">
                <a 
                  href={applicant.resumeUrl} 
                  className="flex-1 text-center text-blue-600 hover:text-blue-900 inline-flex justify-center items-center border border-blue-600 rounded px-3 py-1.5"
                >
                  <FileText size={16} className="mr-1" />
                  View Resume
                </a>
                <div className="relative flex-1">
                  <button
                    onClick={() => toggleStatusDropdown(applicant.id)}
                    className="w-full text-center text-gray-600 hover:text-gray-900 inline-flex justify-center items-center border border-gray-300 rounded px-3 py-1.5"
                  >
                    Change Status
                    <ChevronDown size={16} className="ml-1" />
                  </button>
                  {statusDropdown === applicant.id && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                      <div className="py-1" role="menu" aria-orientation="vertical">
                        {['Pending', 'Reviewed', 'Shortlisted'].map((status) => (
                          <button
                            key={status}
                            onClick={() => changeStatus(applicant.id, status)}
                            className={`block px-4 py-2 text-sm w-full text-left ${
                              applicant.status === status ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                            } hover:bg-gray-100`}
                            role="menuitem"
                          >
                            <div className="flex items-center">
                              {applicant.status === status && <Check size={16} className="mr-2 text-green-500" />}
                              <span className={applicant.status === status ? 'font-medium' : ''}>
                                {status}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Pagination */}
      <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{applicants.length}</span> of{" "}
              <span className="font-medium">{applicants.length}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button aria-current="page" className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                1
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantList;