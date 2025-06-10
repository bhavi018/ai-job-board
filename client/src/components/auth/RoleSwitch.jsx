import { useState } from "react";
import { Briefcase, User } from "lucide-react";

const RoleSwitch = () => {
  const [selectedRole, setSelectedRole] = useState("jobSeeker");

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Select Your Role</h2>
          
          <div className="grid grid-cols-2 gap-3 p-1 bg-gray-100 rounded-lg">
            {/* Job Seeker Tab */}
            <button
              className={`flex items-center justify-center py-3 px-4 rounded-md transition-all duration-200 ${
                selectedRole === "jobSeeker"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-transparent text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setSelectedRole("jobSeeker")}
            >
              <User 
                size={20} 
                className={`mr-2 ${selectedRole === "jobSeeker" ? "text-white" : "text-gray-500"}`} 
              />
              <span className="font-medium">Job Seeker</span>
            </button>

            {/* Company Tab */}
            <button
              className={`flex items-center justify-center py-3 px-4 rounded-md transition-all duration-200 ${
                selectedRole === "company"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-transparent text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setSelectedRole("company")}
            >
              <Briefcase 
                size={20} 
                className={`mr-2 ${selectedRole === "company" ? "text-white" : "text-gray-500"}`} 
              />
              <span className="font-medium">Company</span>
            </button>
          </div>

          {/* Radio Button Alternative */}
          <div className="mt-6 space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-md hover:bg-gray-50">
              <input
                type="radio"
                name="role"
                checked={selectedRole === "jobSeeker"}
                onChange={() => setSelectedRole("jobSeeker")}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex items-center">
                <User 
                  size={18} 
                  className="mr-2 text-blue-600" 
                />
                <span className="text-gray-800 font-medium">Job Seeker</span>
              </div>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-md hover:bg-gray-50">
              <input
                type="radio"
                name="role"
                checked={selectedRole === "company"}
                onChange={() => setSelectedRole("company")}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex items-center">
                <Briefcase 
                  size={18} 
                  className="mr-2 text-blue-600" 
                />
                <span className="text-gray-800 font-medium">Company</span>
              </div>
            </label>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              Current selection: <span className="font-medium text-blue-600">
                {selectedRole === "jobSeeker" ? "Job Seeker" : "Company"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSwitch;