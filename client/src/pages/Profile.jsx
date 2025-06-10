import { useState, useRef } from 'react';
import { UserCircle, MapPin, Download, Eye, PenSquare } from 'lucide-react';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    role: 'Job Seeker',
    bio: 'Experienced software developer with 5+ years in web development. Specialized in React.js, Node.js, and cloud technologies. Passionate about creating scalable and user-friendly applications.',
    skills: ['React', 'JavaScript', 'Node.js', 'Tailwind CSS', 'MongoDB', 'AWS'],
    location: 'San Francisco, CA',
    resumeFile: 'Jane_Doe_Resume_2025.pdf'
  });
  
  const [newSkill, setNewSkill] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };
  
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData({
        ...profileData,
        skills: [...profileData.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };
  
  const handleRemoveSkill = (skillToRemove) => {
    setProfileData({
      ...profileData,
      skills: profileData.skills.filter(skill => skill !== skillToRemove)
    });
  };
  
  const handleSaveChanges = () => {
    console.log('Profile data saved:', profileData);
    setIsEditing(false);
    // Here you would typically send the data to your backend
  };
  
  const handleProfilePictureClick = () => {
    fileInputRef.current.click();
  };
  
  const handleFileChange = (e) => {
    // Handle file upload logic here
    console.log('File selected:', e.target.files[0]);
    // You would typically upload the file to your server here
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Profile</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header section with profile picture and basic info */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-8 flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative group cursor-pointer">
            <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-white">
              {profileData.profileImage ? (
                <img 
                  src={profileData.profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <UserCircle className="w-full h-full text-gray-300" />
              )}
            </div>
            <div 
              className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200"
              onClick={handleProfilePictureClick}
            >
              <p className="text-white text-xs font-medium">Change Photo</p>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept="image/*" 
            />
          </div>
          
          <div className="text-center md:text-left text-white flex-1">
            <h2 className="text-2xl font-bold">{profileData.name}</h2>
            <p className="text-blue-100">{profileData.email}</p>
            <div className="mt-2 inline-block bg-blue-700 px-3 py-1 rounded-full text-sm">
              {profileData.role}
            </div>
            <div className="flex items-center justify-center md:justify-start mt-2 text-blue-100">
              <MapPin size={16} className="mr-1" />
              {isEditing ? (
                <input
                  type="text"
                  name="location"
                  value={profileData.location}
                  onChange={handleInputChange}
                  className="bg-blue-600 border border-blue-400 rounded px-2 py-1 text-white"
                />
              ) : (
                <span>{profileData.location}</span>
              )}
            </div>
          </div>
          
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md transition-colors duration-200 flex items-center"
            onClick={() => setIsEditing(!isEditing)}
          >
            <PenSquare size={18} className="mr-2" />
            {isEditing ? 'Cancel Editing' : 'Edit Profile'}
          </button>
        </div>
        
        {/* Main content */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Bio and skills */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio section */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">About Me</h3>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md h-32"
                  placeholder="Tell us about yourself..."
                ></textarea>
              ) : (
                <p className="text-gray-600 leading-relaxed">{profileData.bio}</p>
              )}
            </div>
            
            {/* Skills section */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((skill, index) => (
                  <div 
                    key={index} 
                    className={`px-3 py-1 rounded-full text-sm ${
                      isEditing 
                        ? 'bg-blue-100 text-blue-800 pr-1 flex items-center' 
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {skill}
                    {isEditing && (
                      <button 
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-1 w-5 h-5 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center hover:bg-blue-300"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                
                {isEditing && (
                  <form onSubmit={handleAddSkill} className="flex items-center">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      className="border border-gray-300 rounded-l-md px-3 py-1 text-sm w-32"
                      placeholder="Add skill"
                    />
                    <button 
                      type="submit"
                      className="bg-blue-500 text-white rounded-r-md px-2 py-1 text-sm hover:bg-blue-600"
                    >
                      Add
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
          
          {/* Right column - Resume */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Resume</h3>
              
              <div className="bg-white p-4 rounded border border-gray-200 flex items-center mb-4">
                <div className="p-2 bg-blue-100 rounded text-blue-700 mr-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800 truncate">{profileData.resumeFile}</p>
                  <p className="text-xs text-gray-500">Uploaded on May 10, 2025</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex-1">
                  <Download size={16} className="mr-2" />
                  Download
                </button>
                <button className="flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200 flex-1">
                  <Eye size={16} className="mr-2" />
                  View
                </button>
              </div>
              
              {isEditing && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Upload new resume:</p>
                  <input 
                    type="file" 
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
                    accept=".pdf,.doc,.docx"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Footer with save button */}
        {isEditing && (
          <div className="bg-gray-50 px-6 py-4 flex justify-end border-t">
            <button
              onClick={handleSaveChanges}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
