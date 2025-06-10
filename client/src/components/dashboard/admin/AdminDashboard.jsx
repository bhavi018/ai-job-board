import { useState, useEffect } from 'react';
import { 
  Users, 
  Briefcase, 
  Building2, 
  BarChart2, 
  PieChart,
  LineChart, 
  AlertCircle, 
  CheckCircle2, 
  Settings, 
  Shield, 
  LogOut,
  Flag
} from 'lucide-react';

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeJobs: 0,
    companies: 0,
    pendingReports: 0
  });

  // Simulated data loading
  useEffect(() => {
    const fetchData = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setStats({
        totalUsers: 14582,
        activeJobs: 578,
        companies: 246,
        pendingReports: 12
      });
      
      setIsLoading(false);
    };
    
    fetchData();
  }, []);

  // Chart placeholder data
  const userGrowthData = [
    { month: 'Jan', users: 9800 },
    { month: 'Feb', users: 10400 },
    { month: 'Mar', users: 11000 },
    { month: 'Apr', users: 12200 },
    { month: 'May', users: 13500 },
    { month: 'Jun', users: 14582 }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="mt-1 text-sm text-gray-600">
                Welcome back, Admin! Last login: Today at 9:45 AM
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <Settings size={16} className="mr-2" />
                Settings
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <LogOut size={16} className="mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats Section */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Users Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                    <dd>
                      <div className="text-lg font-semibold text-gray-900">
                        {stats.totalUsers.toLocaleString()}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-700 hover:text-blue-900">
                  View all users
                </a>
              </div>
            </div>
          </div>

          {/* Active Jobs Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Active Jobs</dt>
                    <dd>
                      <div className="text-lg font-semibold text-gray-900">
                        {stats.activeJobs.toLocaleString()}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a href="#" className="font-medium text-green-700 hover:text-green-900">
                  Manage job listings
                </a>
              </div>
            </div>
          </div>

          {/* Companies Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Companies</dt>
                    <dd>
                      <div className="text-lg font-semibold text-gray-900">
                        {stats.companies.toLocaleString()}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a href="#" className="font-medium text-purple-700 hover:text-purple-900">
                  View all companies
                </a>
              </div>
            </div>
          </div>

          {/* Pending Reports Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                  <Flag className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Pending Reports</dt>
                    <dd>
                      <div className="text-lg font-semibold text-gray-900">
                        {stats.pendingReports.toLocaleString()}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a href="#" className="font-medium text-red-700 hover:text-red-900">
                  Review reports
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-white bg-opacity-30 rounded-md p-3">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <h3 className="text-lg font-medium text-white">Manage Users</h3>
                  <p className="mt-1 text-sm text-blue-100">
                    Review, edit, and manage user accounts and permissions
                  </p>
                </div>
              </div>
              <div className="mt-5">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Go to User Management
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-purple-700 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-white bg-opacity-30 rounded-md p-3">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <h3 className="text-lg font-medium text-white">Moderate Jobs</h3>
                  <p className="mt-1 text-sm text-purple-100">
                    Review and approve job listings, handle reports
                  </p>
                </div>
              </div>
              <div className="mt-5">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-purple-700 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                  Go to Job Moderation
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="mt-8">
          <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">Analytics Overview</h2>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* User Growth Chart */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-5 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-medium text-gray-700">User Growth</h3>
                  <div className="flex space-x-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle2 size={12} className="mr-1" />
                      +8.2%
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-5">
                {/* Chart Placeholder */}
                <div className="relative h-72 rounded-md bg-gray-50 border border-dashed border-gray-300 flex items-center justify-center">
                  <LineChart className="h-16 w-16 text-gray-400" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-sm text-gray-500 font-medium">User Growth Chart</p>
                    <p className="text-xs text-gray-400 mt-1">Analytics visualization coming soon</p>
                    <div className="mt-4 flex items-center space-x-1">
                      {userGrowthData.map((item, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div 
                            className="w-6 bg-blue-500 mx-1 rounded-t-sm" 
                            style={{ 
                              height: `${Math.round((item.users / 15000) * 100)}px`,
                              opacity: 0.5 + (index * 0.1)
                            }}
                          ></div>
                          <span className="text-xs text-gray-500 mt-1">{item.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Categories Chart */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-5 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-medium text-gray-700">Job Categories Distribution</h3>
                  <div className="flex space-x-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <AlertCircle size={12} className="mr-1" />
                      Last 30 days
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-5">
                {/* Chart Placeholder */}
                <div className="relative h-72 rounded-md bg-gray-50 border border-dashed border-gray-300 flex items-center justify-center">
                  <PieChart className="h-16 w-16 text-gray-400" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-sm text-gray-500 font-medium">Category Distribution</p>
                    <p className="text-xs text-gray-400 mt-1">Analytics visualization coming soon</p>
                    
                    <div className="mt-8 grid grid-cols-2 gap-4 text-xs text-gray-600">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        <span>Technology (42%)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span>Marketing (18%)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                        <span>Finance (15%)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                        <span>Healthcare (13%)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <span>Education (8%)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
                        <span>Other (4%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Activity</h2>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              <li>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-blue-600 truncate">New company registered</p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Just now
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="text-sm text-gray-500">
                        TechVision Inc. completed registration
                      </p>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-blue-600 truncate">Job post reported</p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        30 minutes ago
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="text-sm text-gray-500">
                        "Senior Developer" job post reported for inappropriate content
                      </p>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-blue-600 truncate">User account verified</p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        1 hour ago
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="text-sm text-gray-500">
                        Company account "Global Solutions Ltd." completed verification
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;