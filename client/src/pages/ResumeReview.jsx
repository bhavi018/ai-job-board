import { useState, useRef } from 'react';
import { Upload, FileText, Send, RotateCw, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

const ResumeReview = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewComplete, setReviewComplete] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! Upload your resume, and I\'ll provide a professional review with actionable feedback.',
    }
  ]);
  const fileInputRef = useRef(null);
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setIsUploading(true);
      // Simulate upload process
      setTimeout(() => {
        setFile(selectedFile);
        setIsUploading(false);
        setMessages([
          ...messages,
          {
            role: 'assistant',
            content: `I see you've uploaded "${selectedFile.name}". Click "Request Review" when you're ready for me to analyze it.`
          }
        ]);
      }, 1500);
    }
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === 'application/pdf' || 
        droppedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setIsUploading(true);
      // Simulate upload process
      setTimeout(() => {
        setFile(droppedFile);
        setIsUploading(false);
        setMessages([
          ...messages,
          {
            role: 'assistant',
            content: `I see you've uploaded "${droppedFile.name}". Click "Request Review" when you're ready for me to analyze it.`
          }
        ]);
      }, 1500);
    } else {
      setMessages([
        ...messages,
        {
          role: 'assistant',
          content: 'Please upload a PDF or DOCX file only.'
        }
      ]);
    }
  };
  
  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };
  
  const handleRequestReview = () => {
    if (!file) {
      setMessages([
        ...messages,
        {
          role: 'assistant',
          content: 'Please upload a resume first before requesting a review.'
        }
      ]);
      return;
    }
    
    setIsReviewing(true);
    setMessages([
      ...messages,
      {
        role: 'user',
        content: 'Please review my resume.'
      }
    ]);
    
    // Simulate AI processing time
    setTimeout(() => {
      setIsReviewing(false);
      setReviewComplete(true);
      setMessages(prevMessages => [
        ...prevMessages,
        {
          role: 'assistant',
          content: `
## Resume Review for ${file.name}

### Strengths:
- Strong educational background with relevant coursework
- Good technical skills section with in-demand technologies
- Clear chronological organization of work experience
- Quantifiable achievements in previous roles

### Areas for Improvement:
- **Professional Summary**: Add a compelling 2-3 sentence summary at the top
- **Action Verbs**: Replace passive language with strong action verbs
- **Tailoring**: Customize skills section for the specific job you're applying for
- **Accomplishments**: Focus more on results rather than responsibilities
- **ATS Optimization**: Include more industry-specific keywords to pass Applicant Tracking Systems

### Formatting Suggestions:
- Increase white space between sections for better readability
- Ensure consistent font usage throughout the document
- Consider a more modern template if applying to tech or creative industries
- Move contact information and LinkedIn profile to header section

### Next Steps:
1. Revise your professional summary to highlight your unique value proposition
2. Add metrics to quantify at least 2 more achievements
3. Proofread for grammatical errors and typos
4. Have a peer in your industry review the revised version
          `
        }
      ]);
    }, 3000);
  };
  
  const resetReview = () => {
    setFile(null);
    setReviewComplete(false);
    setMessages([
      {
        role: 'assistant',
        content: 'I\'ve reset your session. Upload a new resume when you\'re ready for another review.'
      }
    ]);
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Resume Review</h1>
      <p className="text-gray-600 mb-6">Get AI-powered feedback on your resume to improve your job prospects</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left side - Resume Uploader */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <FileText className="mr-2" size={20} />
              Resume Upload
            </h2>
          </div>
          
          <div className="p-6">
            <div 
              className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center ${
                file ? 'border-green-300 bg-green-50' : 'border-gray-300 bg-gray-50'
              }`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {isUploading ? (
                <div className="flex flex-col items-center">
                  <RotateCw className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
                  <p className="text-gray-600 font-medium">Uploading your file...</p>
                </div>
              ) : file ? (
                <div className="flex flex-col items-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
                  <p className="text-gray-800 font-medium mb-1">{file.name}</p>
                  <p className="text-gray-500 text-sm mb-4">
                    {(file.size / 1024).toFixed(2)} KB • {file.type.split('/')[1].toUpperCase()}
                  </p>
                  <button 
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    onClick={() => {
                      setFile(null);
                      fileInputRef.current.value = "";
                    }}
                  >
                    Remove & Upload Different File
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="w-12 h-12 text-gray-400 mb-4" />
                  <h3 className="text-gray-800 font-medium mb-1">Drag & Drop Your Resume Here</h3>
                  <p className="text-gray-500 text-sm mb-4">or</p>
                  <button 
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
                    onClick={handleBrowseClick}
                  >
                    Browse Files
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    className="hidden" 
                    accept=".pdf,.doc,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
                  />
                  <p className="text-gray-500 text-xs mt-3">Accepted formats: PDF, DOCX</p>
                </>
              )}
            </div>
            
            <div className="mt-6">
              <button
                className={`w-full py-3 rounded-md flex items-center justify-center transition-colors duration-200 ${
                  file && !isReviewing 
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
                onClick={handleRequestReview}
                disabled={!file || isReviewing}
              >
                {isReviewing ? (
                  <>
                    <RotateCw className="animate-spin mr-2" size={18} />
                    Analyzing Your Resume...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2" size={18} />
                    Request AI Review
                  </>
                )}
              </button>
            </div>
            
            {reviewComplete && (
              <div className="mt-4">
                <button
                  className="w-full py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  onClick={resetReview}
                >
                  Start New Review
                </button>
              </div>
            )}
            
            <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-100">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Tips for best results</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Ensure your resume is properly formatted</li>
                      <li>Text should be selectable (not an image)</li>
                      <li>Remove any sensitive personal information</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side - AI Review Chat */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-500 px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <Sparkles className="mr-2" size={20} />
              AI Resume Feedback
            </h2>
            <div className="bg-purple-700 text-white text-xs px-2 py-1 rounded-full flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
              AI Assistant
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50" style={{ minHeight: '400px', maxHeight: '600px' }}>
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`rounded-lg px-4 py-3 max-w-[85%] ${
                    message.role === 'user' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}
                >
                  {message.role === 'assistant' && message.content.includes('#') ? (
                    <div className="prose prose-sm max-w-none">
                      {message.content.split('\n\n').map((paragraph, pIndex) => {
                        if (paragraph.startsWith('###')) {
                          return <h3 key={pIndex} className="text-md font-semibold mt-4 mb-2">{paragraph.replace('###', '')}</h3>;
                        } else if (paragraph.startsWith('##')) {
                          return <h2 key={pIndex} className="text-lg font-bold mt-4 mb-2">{paragraph.replace('##', '')}</h2>;
                        } else if (paragraph.startsWith('- **')) {
                          return (
                            <div key={pIndex} className="my-1 flex">
                              <span className="mr-2">•</span>
                              <div>
                                <strong>{paragraph.match(/\*\*(.*?)\*\*/)[1]}:</strong>
                                {paragraph.replace(/\*\*(.*?)\*\*: ?/, '')}
                              </div>
                            </div>
                          );
                        } else if (paragraph.startsWith('- ')) {
                          return (
                            <div key={pIndex} className="my-1 flex">
                              <span className="mr-2">•</span>
                              <div>{paragraph.substring(2)}</div>
                            </div>
                          );
                        } else if (paragraph.match(/^\d+\./)) {
                          return (
                            <div key={pIndex} className="my-1 flex">
                              <span className="mr-2">{paragraph.match(/^\d+\./)[0]}</span>
                              <div>{paragraph.replace(/^\d+\.\s/, '')}</div>
                            </div>
                          );
                        } else {
                          return <p key={pIndex} className="my-2">{paragraph}</p>;
                        }
                      })}
                    </div>
                  ) : (
                    <p>{message.content}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex items-center">
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Ask a follow-up question..."
                disabled={!reviewComplete}
              />
              <button
                className={`px-4 py-2 rounded-r-md ${
                  reviewComplete 
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!reviewComplete}
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {reviewComplete ? 'Ask questions about improving specific sections of your resume' : 'Complete a resume review to ask follow-up questions'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeReview;