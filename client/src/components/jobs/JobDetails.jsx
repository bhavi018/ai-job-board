import React from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Clock, 
  DollarSign, 
  Building, 
  Globe, 
  Mail, 
  CheckCircle 
} from 'lucide-react';

const JobDetails = ({ 
  jobId, 
  onBack, 
  // These props would come from your API or be passed from a parent component
  job = {
    title: "Senior Frontend Developer",
    company: "TechGlobal Inc.",
    postedDate: "2 days ago",
    location: "San Francisco, CA (Hybrid)",
    salary: "$120,000 - $150,000 per year",
    jobType: "Full-time",
    description: "TechGlobal is looking for a Senior Frontend Developer to join our growing team. You'll be responsible for building and maintaining user interfaces for our enterprise products.",
    responsibilities: [
      "Develop new user-facing features using React.js",
      "Build reusable components and front-end libraries for future use",
      "Translate designs and wireframes into high-quality code",
      "Optimize components for maximum performance across devices and browsers",
      "Participate in code reviews and help maintain code quality"
    ],
    requirements: [
      "3+ years of experience with React.js and frontend development",
      "Proficiency with JavaScript, HTML5, CSS3 and frontend build pipelines",
      "Experience with responsive and adaptive design",
      "Familiarity with RESTful APIs and modern frontend best practices",
      "Knowledge of modern frontend build pipelines and tools"
    ],
    skills: ["React", "JavaScript", "TypeScript", "HTML5", "CSS3", "TailwindCSS", "Redux", "REST APIs", "Git"],
    companyInfo: {
      name: "TechGlobal Inc.",
      logo: null, // This would be a URL to the company logo
      about: "TechGlobal is a leading technology company specializing in enterprise software solutions. Founded in 2010, we've grown to over 500 employees worldwide with offices in San Francisco, New York, and London. We're committed to creating innovative products that help businesses thrive in the digital age.",
      website: "https://techglobal.com",
      employees: "500-1000",
      industry: "Software Development"
    }
  }
}) => {
  // Destructure job data for easier access
  const {
    title,
    company,
    postedDate,
    location,
    salary,
    jobType,
    description,
    responsibilities,
    requirements,
    skills,
    companyInfo
  } = job;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      {/* Back button / Breadcrumb */}
      <div className="bg-gray-50 px-6 py-4 border-b">
        <button 
          onClick={onBack} 
          className="flex items-center text-gray-600 hover:text-blue-600 transition-colors font-medium"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Jobs
        </button>
      </div>

      <div className="p-6 md:p-8">
        {/* Job Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{title}</h1>
            <span className="inline-flex bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {jobType}
            </span>
          </div>
          
          <div className="flex flex-col space-y-3 mt-4">
            <div className="flex items-center text-gray-600">
              <Building size={18} className="mr-2 text-gray-400" />
              <span className="font-medium">{company}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <MapPin size={18} className="mr-2 text-gray-400" />
              <span>{location}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <DollarSign size={18} className="mr-2 text-gray-400" />
              <span>{salary}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <Calendar size={18} className="mr-2 text-gray-400" />
              <span>Posted {postedDate}</span>
            </div>
          </div>
        </div>

        {/* Apply Now button (top) */}
        <div className="mb-8">
          <button className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm flex items-center justify-center">
            <Mail size={18} className="mr-2" />
            Apply Now
          </button>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-200 my-8"></div>
        
        {/* Job Description */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Job Description</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">{description}</p>
          
          <h3 className="font-semibold text-gray-800 mb-3">Responsibilities:</h3>
          <ul className="list-none space-y-2 mb-6">
            {responsibilities.map((item, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle size={18} className="mr-2 text-green-500 flex-shrink-0 mt-1" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
          
          <h3 className="font-semibold text-gray-800 mb-3">Requirements:</h3>
          <ul className="list-none space-y-2 mb-6">
            {requirements.map((item, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle size={18} className="mr-2 text-green-500 flex-shrink-0 mt-1" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Skills */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span 
                key={index} 
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-200 my-8"></div>
        
        {/* Company Information */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">About the Company</h2>
          
          <div className="flex items-center mb-4">
            {companyInfo.logo ? (
              <img 
                src={companyInfo.logo} 
                alt={`${companyInfo.name} logo`} 
                className="w-16 h-16 rounded-full mr-4 object-contain bg-gray-100"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                <span className="text-xl font-bold text-gray-500">
                  {companyInfo.name.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <h3 className="font-bold text-gray-800">{companyInfo.name}</h3>
              <div className="flex items-center mt-1">
                <Globe size={16} className="text-gray-400 mr-2" />
                <a 
                  href={companyInfo.website} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:underline text-sm"
                >
                  {companyInfo.website.replace('https://', '')}
                </a>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="text-gray-700">
              <span className="font-medium text-gray-600">Industry:</span> {companyInfo.industry}
            </div>
            <div className="text-gray-700">
              <span className="font-medium text-gray-600">Company Size:</span> {companyInfo.employees} employees
            </div>
          </div>
          
          <p className="text-gray-700 leading-relaxed">{companyInfo.about}</p>
        </div>
        
        {/* Apply Now button (bottom) */}
        <div className="mt-8">
          <button className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm flex items-center justify-center">
            <Mail size={18} className="mr-2" />
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;