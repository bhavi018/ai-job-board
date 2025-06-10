import { useState } from 'react';
import { X, Check, AlertCircle } from 'lucide-react';

const PostJobForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    salaryMin: '',
    salaryMax: '',
    jobType: '',
    description: '',
    skills: []
  });

  // New skill input state
  const [newSkill, setNewSkill] = useState('');
  
  // Form errors (for validation display)
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Add new skill
  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  // Remove skill
  const removeSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  // Handle skill input keypress (add on Enter)
  const handleSkillKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for validation logic
    console.log('Form submitted:', formData);
    // Here you would typically send the data to an API
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      title: '',
      location: '',
      salaryMin: '',
      salaryMax: '',
      jobType: '',
      description: '',
      skills: []
    });
    setErrors({});
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Post a New Job</h2>
        <p className="text-gray-600 mt-1">Complete the form below to create a new job listing</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Job Basic Information Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">Basic Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            {/* Job Title */}
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                placeholder="e.g. Senior Frontend Developer"
                required
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.title}
                </p>
              )}
            </div>

            {/* Job Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                placeholder="e.g. New York, NY or Remote"
                required
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.location}
                </p>
              )}
            </div>

            {/* Job Type */}
            <div>
              <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-1">
                Job Type <span className="text-red-500">*</span>
              </label>
              <select
                id="jobType"
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${errors.jobType ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white`}
                required
              >
                <option value="" disabled>Select job type</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
                <option value="temporary">Temporary</option>
                <option value="remote">Remote</option>
              </select>
              {errors.jobType && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.jobType}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Compensation Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">Compensation</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            {/* Salary Range - Min */}
            <div>
              <label htmlFor="salaryMin" className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Salary
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="number"
                  id="salaryMin"
                  name="salaryMin"
                  value={formData.salaryMin}
                  onChange={handleChange}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="e.g. 50000"
                />
              </div>
            </div>

            {/* Salary Range - Max */}
            <div>
              <label htmlFor="salaryMax" className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Salary
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="number"
                  id="salaryMax"
                  name="salaryMax"
                  value={formData.salaryMax}
                  onChange={handleChange}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="e.g. 80000"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Job Details Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">Job Details</h3>

          {/* Job Description */}
          <div className="mb-5">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Job Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="6"
              className={`w-full px-4 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
              placeholder="Provide a detailed description of the job role, responsibilities, and requirements..."
              required
            ></textarea>
            {errors.description && (
              <p className="mt-1 text-sm text-red-500 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {errors.description}
              </p>
            )}
            <p className="mt-1 text-xs text-gray-500">Markdown formatting is supported</p>
          </div>

          {/* Required Skills */}
          <div>
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
              Required Skills
            </label>
            <div className="flex mb-2">
              <input
                type="text"
                id="skills"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={handleSkillKeyPress}
                className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="e.g. React.js"
              />
              <button
                type="button"
                onClick={addSkill}
                className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition flex items-center"
              >
                <Check size={18} />
                <span className="hidden sm:inline ml-1">Add</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.skills.map((skill, index) => (
                <div key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-blue-800 hover:text-blue-900"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              {formData.skills.length === 0 && (
                <p className="text-sm text-gray-500 italic">No skills added yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row-reverse gap-3 pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition flex-1 sm:flex-none"
          >
            Post Job
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-white text-gray-700 border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 transition flex-1 sm:flex-none"
          >
            Reset Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJobForm;