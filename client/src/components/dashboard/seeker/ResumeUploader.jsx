import React, { useState, useRef } from 'react';
import { 
  Upload, 
  FileText, 
  X, 
  CheckCircle, 
  AlertCircle, 
  Loader, 
  FileSpreadsheet 
} from 'lucide-react';

const ResumeUploader = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null); // null, 'loading', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    handleFile(selectedFile);
  };

  // Format file size to be human readable
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Process and validate the file
  const handleFile = (selectedFile) => {
    // Reset error state
    setErrorMessage('');
    
    // Validate if a file was selected
    if (!selectedFile) {
      return;
    }
    
    // Check file type (.pdf or .docx)
    const fileType = selectedFile.type;
    const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
    
    if (
      !(fileType === 'application/pdf' || 
        fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        fileExtension === 'pdf' || 
        fileExtension === 'docx')
    ) {
      setErrorMessage('Please upload a PDF or DOCX file');
      return;
    }
    
    // Check file size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setErrorMessage('File size should be less than 5MB');
      return;
    }
    
    // Set the file
    setFile(selectedFile);
    setUploadStatus(null);
  };

  // Handle drag events
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      handleFile(droppedFile);
      e.dataTransfer.clearData();
    }
  };

  // Handle resume upload (mock function)
  const handleUpload = () => {
    if (!file) return;
    
    setUploadStatus('loading');
    
    // Simulate API call with timeout
    setTimeout(() => {
      // 90% chance of success for demo purposes
      const isSuccess = Math.random() < 0.9;
      
      setUploadStatus(isSuccess ? 'success' : 'error');
      if (!isSuccess) {
        setErrorMessage('Upload failed. Please try again.');
      }
    }, 2000);
  };

  // Handle resume parsing (mock function)
  const handleParseResume = () => {
    if (!file || uploadStatus !== 'success') return;
    
    // In a real app, this would trigger resume parsing logic
    alert('Resume parsing initiated! In a real app, this would extract information from your resume.');
  };

  // Handle file removal
  const handleRemoveFile = () => {
    setFile(null);
    setUploadStatus(null);
    setErrorMessage('');
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Determine the icon and style of the file preview based on extension
  const getFileIcon = () => {
    if (!file) return null;
    
    const extension = file.name.split('.').pop().toLowerCase();
    
    if (extension === 'pdf') {
      return <FileText size={24} className="text-red-500" />;
    } else if (extension === 'docx') {
      return <FileSpreadsheet size={24} className="text-blue-500" />;
    } else {
      return <FileText size={24} className="text-gray-500" />;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Upload Your Resume</h2>
        <p className="text-gray-600 mt-1">Upload your resume to help us match you with relevant jobs</p>
      </div>

      <div className="p-6">
        {/* Drag & Drop Area */}
        <div 
          className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
            isDragging 
              ? 'border-blue-500 bg-blue-50' 
              : file 
                ? 'border-green-200 bg-green-50' 
                : errorMessage 
                  ? 'border-red-200 bg-red-50'
                  : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
          }`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            id="resume-upload"
            className="hidden"
            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileChange}
          />

          {!file ? (
            <>
              <div className="mb-4 bg-gray-100 p-4 rounded-full">
                <Upload size={28} className="text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                {isDragging ? 'Drop your file here' : 'Drag & drop or click to upload'}
              </h3>
              <p className="text-gray-500 text-sm text-center mb-2">
                Supported formats: PDF, DOCX
              </p>
              <p className="text-gray-400 text-xs text-center">
                Max file size: 5MB
              </p>
            </>
          ) : (
            <div className="w-full">
              <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 mb-4">
                <div className="flex items-center">
                  {getFileIcon()}
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <button 
                  type="button" 
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile();
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Status indicator */}
              {uploadStatus && (
                <div className={`flex items-center p-2 rounded-lg mb-4 ${
                  uploadStatus === 'loading' ? 'bg-blue-50 text-blue-700' :
                  uploadStatus === 'success' ? 'bg-green-50 text-green-700' :
                  'bg-red-50 text-red-700'
                }`}>
                  {uploadStatus === 'loading' && <Loader size={16} className="animate-spin mr-2" />}
                  {uploadStatus === 'success' && <CheckCircle size={16} className="mr-2" />}
                  {uploadStatus === 'error' && <AlertCircle size={16} className="mr-2" />}
                  <span className="text-sm">
                    {uploadStatus === 'loading' && 'Uploading resume...'}
                    {uploadStatus === 'success' && 'Resume uploaded successfully!'}
                    {uploadStatus === 'error' && errorMessage}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Error message */}
          {errorMessage && !uploadStatus && (
            <div className="flex items-center text-red-600 mt-2">
              <AlertCircle size={16} className="mr-2" />
              <span className="text-sm">{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            type="button"
            disabled={!file || uploadStatus === 'loading'}
            className={`flex-1 py-2.5 px-4 rounded-lg font-medium flex items-center justify-center shadow-sm ${
              !file || uploadStatus === 'loading' 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : uploadStatus === 'success'
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
            } transition-colors duration-200`}
            onClick={handleUpload}
          >
            {uploadStatus === 'loading' ? (
              <>
                <Loader size={18} className="animate-spin mr-2" />
                Uploading...
              </>
            ) : uploadStatus === 'success' ? (
              <>
                <CheckCircle size={18} className="mr-2" />
                Uploaded
              </>
            ) : (
              <>
                <Upload size={18} className="mr-2" />
                Upload Resume
              </>
            )}
          </button>
          
          <button
            type="button"
            disabled={!file || uploadStatus !== 'success'}
            className={`flex-1 py-2.5 px-4 rounded-lg font-medium flex items-center justify-center border shadow-sm ${
              !file || uploadStatus !== 'success'
                ? 'border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed' 
                : 'border-purple-600 bg-white text-purple-600 hover:bg-purple-50'
            } transition-colors duration-200`}
            onClick={handleParseResume}
          >
            <FileText size={18} className="mr-2" />
            Parse Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeUploader;