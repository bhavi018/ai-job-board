import { useState } from 'react';
import { Search, RefreshCw, Sparkles, Loader, ThumbsUp, Copy, ArrowRight } from 'lucide-react';

const InterviewQA = () => {
  const [jobRole, setJobRole] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);
  
  const handleGenerateQuestions = () => {
    if (!jobRole.trim()) return;
    
    setIsGenerating(true);
    setQuestions(null);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const dummyQuestions = [
        {
          category: "Technical Skills",
          questions: [
            "What experience do you have with React.js and state management libraries?",
            "Describe your approach to making web applications responsive and accessible.",
            "How do you handle API integrations and data fetching in your projects?"
          ]
        },
        {
          category: "Problem Solving",
          questions: [
            "Tell me about a challenging technical problem you've solved recently.",
            "How do you debug and troubleshoot issues in your code?",
            "Describe your process for optimizing application performance."
          ]
        },
        {
          category: "Team Collaboration",
          questions: [
            "How do you handle code reviews and feedback from team members?",
            "Describe your experience with Agile development methodologies.",
            "How do you approach knowledge sharing within a development team?"
          ]
        },
        {
          category: "Career Growth",
          questions: [
            "What front-end technologies are you currently learning or interested in?",
            "Where do you see yourself professionally in 3-5 years?",
            "How do you stay updated with the latest trends in web development?"
          ]
        }
      ];
      
      setQuestions(dummyQuestions);
      setIsGenerating(false);
    }, 2500);
  };
  
  const handleRetry = () => {
    setJobRole('');
    setQuestions(null);
  };
  
  const handleCopyQuestion = (categoryIndex, questionIndex) => {
    const question = questions[categoryIndex].questions[questionIndex];
    navigator.clipboard.writeText(question);
    setCopiedIndex(`${categoryIndex}-${questionIndex}`);
    
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  // Loading skeleton component
  const QuestionsSkeleton = () => (
    <div className="animate-pulse mt-8">
      <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
      
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="mb-8">
          <div className="h-5 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            <div className="h-16 bg-gray-100 rounded p-4 flex">
              <div className="w-full">
                <div className="h-3 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
            <div className="h-16 bg-gray-100 rounded p-4 flex">
              <div className="w-full">
                <div className="h-3 bg-gray-200 rounded w-5/6 mb-3"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
            <div className="h-16 bg-gray-100 rounded p-4 flex">
              <div className="w-full">
                <div className="h-3 bg-gray-200 rounded w-4/5 mb-3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Interview Question Generator</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get AI-powered interview questions tailored to any job role. Prepare effectively and boost your confidence.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 transform hover:shadow-lg">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  placeholder="Enter job role or position (e.g., Frontend Developer)"
                  className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  disabled={isGenerating}
                />
              </div>
              <button
                onClick={handleGenerateQuestions}
                disabled={!jobRole.trim() || isGenerating}
                className={`px-6 py-3 rounded-lg flex items-center justify-center transition-all duration-300 ${
                  !jobRole.trim() || isGenerating
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isGenerating ? (
                  <>
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Questions
                  </>
                )}
              </button>
            </div>
            
            {isGenerating ? (
              <QuestionsSkeleton />
            ) : questions ? (
              <div className="mt-8 transition-opacity duration-300 animate-fadeIn">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Interview Questions for <span className="text-blue-600">{jobRole}</span>
                  </h2>
                  <button
                    onClick={handleRetry}
                    className="flex items-center text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4 mr-1" />
                    <span className="text-sm">New Search</span>
                  </button>
                </div>
                
                <div className="space-y-8">
                  {questions.map((category, categoryIndex) => (
                    <div key={categoryIndex}>
                      <h3 className="text-md font-medium text-gray-700 mb-4 flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                        {category.category}
                      </h3>
                      <div className="space-y-3">
                        {category.questions.map((question, questionIndex) => (
                          <div
                            key={questionIndex}
                            className="bg-gray-50 border border-gray-100 rounded-lg p-4 flex justify-between items-center group hover:border-blue-200 hover:bg-blue-50 transition-colors"
                          >
                            <div className="flex items-start">
                              <span className="text-blue-500 font-medium mr-2">Q{questionIndex + 1}.</span>
                              <p className="text-gray-700">{question}</p>
                            </div>
                            <button
                              onClick={() => handleCopyQuestion(categoryIndex, questionIndex)}
                              className={`ml-3 p-1.5 rounded-md transition-all opacity-0 group-hover:opacity-100 ${
                                copiedIndex === `${categoryIndex}-${questionIndex}`
                                  ? 'bg-green-100 text-green-600'
                                  : 'bg-gray-100 text-gray-500 hover:bg-blue-100 hover:text-blue-600'
                              }`}
                            >
                              {copiedIndex === `${categoryIndex}-${questionIndex}` ? (
                                <ThumbsUp className="w-4 h-4" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <Sparkles className="h-5 w-5 text-blue-500" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">Pro Tip</h3>
                        <div className="mt-2 text-sm text-blue-600">
                          Practice answering these questions using the STAR method:
                          <ul className="mt-1 pl-5 list-disc space-y-1">
                            <li>Situation: Set the context</li>
                            <li>Task: Describe your responsibility</li>
                            <li>Action: Explain what you did</li>
                            <li>Result: Share the outcome</li>
                          </ul>
                        </div>
                        <div className="mt-3">
                          <button className="inline-flex items-center text-sm font-medium text-blue-700 hover:text-blue-900">
                            Learn more about interview techniques
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-12 text-center py-12 px-4">
                <div className="inline-block p-3 bg-blue-50 rounded-full mb-4">
                  <Search className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Enter a job role to get started</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  We'll generate tailored interview questions to help you prepare for your next opportunity.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Add this to your CSS or globals
const fadeInAnimation = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fadeIn {
  animation: fadeIn 0.5s ease-in-out;
}
`;

export default InterviewQA;