
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { 
  ChevronRight, 
  FileText, 
  Search, 
  Briefcase, 
  BarChart, 
  Users, 
  Zap,
  ArrowRight
} from 'lucide-react';



const Home = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Left side - Text content */}
            <div className="w-full lg:w-1/2 lg:pr-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Find Your Dream Job <span className="text-blue-600">Powered by AI</span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-3xl">
                Our AI-powered job board connects you with perfect opportunities, 
                matches your skills with employers, and helps you stand out from the crowd.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
  <button
    onClick={() => navigate('/jobs')}
    className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
  >
    <Search className="mr-2 h-5 w-5" />
    Explore Jobs
  </button>
  <button
    onClick={() => navigate('/resume-review')}
    className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg shadow-lg border border-blue-200 hover:bg-blue-50 transition duration-300 flex items-center justify-center"
  >
    <FileText className="mr-2 h-5 w-5" />
    Upload Resume
  </button>
</div>

              <p className="mt-4 text-sm text-gray-500">
                Join 10,000+ professionals who have already found their perfect match
              </p>
            </div>
            
            {/* Right side - Illustration */}
            <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-200 rounded-full opacity-20 blur-3xl transform -translate-x-10"></div>
                <div className="relative">
                  <svg className="w-full h-auto" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="80" y="20" width="340" height="360" rx="20" fill="#F3F4F6" />
                    <rect x="100" y="60" width="300" height="40" rx="8" fill="white" />
                    <rect x="120" y="75" width="180" height="10" rx="3" fill="#D1D5DB" />
                    <rect x="320" y="75" width="60" height="10" rx="3" fill="#3B82F6" />
                    
                    <rect x="100" y="120" width="140" height="100" rx="8" fill="white" />
                    <rect x="115" y="140" width="90" height="10" rx="3" fill="#111827" />
                    <rect x="115" y="160" width="110" height="8" rx="3" fill="#6B7280" />
                    <rect x="115" y="175" width="70" height="8" rx="3" fill="#6B7280" />
                    <rect x="115" y="195" width="40" height="8" rx="3" fill="#3B82F6" />
                    
                    <rect x="260" y="120" width="140" height="100" rx="8" fill="white" />
                    <rect x="275" y="140" width="90" height="10" rx="3" fill="#111827" />
                    <rect x="275" y="160" width="110" height="8" rx="3" fill="#6B7280" />
                    <rect x="275" y="175" width="70" height="8" rx="3" fill="#6B7280" />
                    <rect x="275" y="195" width="40" height="8" rx="3" fill="#3B82F6" />
                    
                    <rect x="100" y="240" width="140" height="100" rx="8" fill="white" />
                    <rect x="115" y="260" width="90" height="10" rx="3" fill="#111827" />
                    <rect x="115" y="280" width="110" height="8" rx="3" fill="#6B7280" />
                    <rect x="115" y="295" width="70" height="8" rx="3" fill="#6B7280" />
                    <rect x="115" y="315" width="40" height="8" rx="3" fill="#3B82F6" />
                    
                    <rect x="260" y="240" width="140" height="100" rx="8" fill="white" />
                    <rect x="275" y="260" width="90" height="10" rx="3" fill="#111827" />
                    <rect x="275" y="280" width="110" height="8" rx="3" fill="#6B7280" />
                    <rect x="275" y="295" width="70" height="8" rx="3" fill="#6B7280" />
                    <rect x="275" y="315" width="40" height="8" rx="3" fill="#3B82F6" />
                    
                    <circle cx="385" cy="40" r="8" fill="#3B82F6" />
                    <path d="M382 40L384 42L388 38" stroke="white" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trusted Companies Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-gray-500 text-lg mb-8">
            Trusted by leading companies around the world
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {/* Company 1 */}
            <div className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <div className="h-8 flex items-center">
                <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full">
                  <rect width="120" height="40" rx="4" fill="#4B5563" />
                  <path d="M20 20H100" stroke="white" strokeWidth="2" />
                  <path d="M30 12L30 28" stroke="white" strokeWidth="2" />
                  <path d="M40 15L40 25" stroke="white" strokeWidth="2" />
                  <circle cx="60" cy="20" r="8" stroke="white" strokeWidth="2" />
                  <rect x="75" y="12" width="16" height="16" stroke="white" strokeWidth="2" />
                </svg>
              </div>
            </div>
            
            {/* Company 2 */}
            <div className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <div className="h-8 flex items-center">
                <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full">
                  <rect width="120" height="40" rx="4" fill="#4B5563" />
                  <circle cx="30" cy="20" r="10" stroke="white" strokeWidth="2" />
                  <circle cx="60" cy="20" r="10" stroke="white" strokeWidth="2" />
                  <circle cx="90" cy="20" r="10" stroke="white" strokeWidth="2" />
                </svg>
              </div>
            </div>
            
            {/* Company 3 */}
            <div className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <div className="h-8 flex items-center">
                <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full">
                  <rect width="120" height="40" rx="4" fill="#4B5563" />
                  <path d="M40 10L60 30L80 10" stroke="white" strokeWidth="2" />
                  <path d="M30 20H90" stroke="white" strokeWidth="2" />
                </svg>
              </div>
            </div>
            
            {/* Company 4 */}
            <div className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <div className="h-8 flex items-center">
                <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full">
                  <rect width="120" height="40" rx="4" fill="#4B5563" />
                  <rect x="30" y="15" width="20" height="20" rx="2" stroke="white" strokeWidth="2" />
                  <rect x="60" y="5" width="20" height="30" rx="2" stroke="white" strokeWidth="2" />
                  <path d="M90 25C90 20.5817 93.5817 17 98 17V17C102.418 17 106 20.5817 106 25V25C106 29.4183 102.418 33 98 33V33C93.5817 33 90 29.4183 90 25V25Z" stroke="white" strokeWidth="2" />
                </svg>
              </div>
            </div>
            
            {/* Company 5 */}
            <div className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <div className="h-8 flex items-center">
                <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full">
                  <rect width="120" height="40" rx="4" fill="#4B5563" />
                  <path d="M35 20L85 20" stroke="white" strokeWidth="2" />
                  <path d="M60 10L60 30" stroke="white" strokeWidth="2" />
                  <path d="M45 15L75 25" stroke="white" strokeWidth="2" />
                  <path d="M45 25L75 15" stroke="white" strokeWidth="2" />
                </svg>
              </div>
            </div>
            
            {/* Company 6 */}
            <div className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <div className="h-8 flex items-center">
                <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full">
                  <rect width="120" height="40" rx="4" fill="#4B5563" />
                  <path d="M60 10V30" stroke="white" strokeWidth="2" />
                  <path d="M50 15L70 15" stroke="white" strokeWidth="2" />
                  <path d="M45 20L75 20" stroke="white" strokeWidth="2" />
                  <path d="M50 25L70 25" stroke="white" strokeWidth="2" />
                  <circle cx="35" cy="20" r="5" stroke="white" strokeWidth="2" />
                  <circle cx="85" cy="20" r="5" stroke="white" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Supercharge Your Job Search
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered features help you find better matches, improve your resume, 
              and connect with top companies.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 transform transition duration-500 hover:-translate-y-1 hover:shadow-2xl">
              <div className="h-14 w-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <FileText className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Resume Review</h3>
              <p className="text-gray-600">
                Our AI analyzes your resume, suggests improvements, and highlights your strengths 
                to help you stand out from other applicants.
              </p>
              <a href="#" className="inline-flex items-center mt-6 text-blue-600 font-medium hover:text-blue-800">
                Optimize Your Resume
                <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 transform transition duration-500 hover:-translate-y-1 hover:shadow-2xl">
              <div className="h-14 w-14 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Zap className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Personalized Recommendations</h3>
              <p className="text-gray-600">
                Get job recommendations tailored to your skills, experience, and preferences. 
                Our AI understands what you're looking for.
              </p>
              <a href="#" className="inline-flex items-center mt-6 text-purple-600 font-medium hover:text-purple-800">
                Discover Matches
                <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 transform transition duration-500 hover:-translate-y-1 hover:shadow-2xl">
              <div className="h-14 w-14 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                <BarChart className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Company Dashboard</h3>
              <p className="text-gray-600">
                Employers can track applications, analyze candidate matches, and use our AI 
                tools to find the perfect fit for their team.
              </p>
              <a href="#" className="inline-flex items-center mt-6 text-green-600 font-medium hover:text-green-800">
                Recruit Smarter
                <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-7xl mx-auto text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="p-4">
              <p className="text-4xl font-bold text-white">10k+</p>
              <p className="text-blue-100 mt-2">Active Users</p>
            </div>
            <div className="p-4">
              <p className="text-4xl font-bold text-white">5k+</p>
              <p className="text-blue-100 mt-2">Companies</p>
            </div>
            <div className="p-4">
              <p className="text-4xl font-bold text-white">25k+</p>
              <p className="text-blue-100 mt-2">Job Listings</p>
            </div>
            <div className="p-4">
              <p className="text-4xl font-bold text-white">90%</p>
              <p className="text-blue-100 mt-2">Success Rate</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl overflow-hidden shadow-xl">
          <div className="p-8 md:p-12 lg:p-16">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Supercharge Your Career?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Join thousands of professionals who have already found their dream jobs with our 
                AI-powered platform. Get started today!
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <button className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg shadow-lg hover:bg-blue-50 transition duration-300 flex items-center justify-center">
                  <Search className="mr-2 h-5 w-5" />
                  Find Your Dream Job
                </button>
                <button className="px-8 py-3 bg-blue-900 bg-opacity-30 text-white font-medium rounded-lg shadow-lg border border-blue-400 hover:bg-blue-900 hover:bg-opacity-40 transition duration-300 flex items-center justify-center">
                  <Briefcase className="mr-2 h-5 w-5" />
                  For Employers
                </button>
              </div>
              
              <div className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="px-4 py-3 rounded-l-lg sm:rounded-r-none border-0 focus:ring-2 focus:ring-blue-300 flex-grow"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button className="mt-2 sm:mt-0 bg-blue-900 text-white px-6 py-3 rounded-lg sm:rounded-l-none font-medium hover:bg-blue-800 transition duration-300 flex items-center justify-center">
                    Get Updates
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
                <p className="text-blue-100 text-sm mt-2">
                  We'll send you job alerts and tips. No spam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Success Stories
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              See how our platform has helped professionals like you find their perfect career match.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg relative">
              <div className="absolute -top-4 left-8 h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.5 0H14.5C13.12 0 12 1.12 12 2.5V9.5C12 10.88 13.12 12 14.5 12H17.5V17.5C17.5 18.88 18.62 20 20 20C21.38 20 22.5 18.88 22.5 17.5V2.5C22.5 1.12 21.38 0 20 0H21.5ZM9.5 0H2.5C1.12 0 0 1.12 0 2.5V9.5C0 10.88 1.12 12 2.5 12H5.5V17.5C5.5 18.88 6.62 20 8 20C9.38 20 10.5 18.88 10.5 17.5V2.5C10.5 1.12 9.38 0 8 0H9.5Z" fill="white"/>
                </svg>
              </div>
              <div className="pt-6">
                <p className="text-gray-600 mb-6">
                  "The AI resume review gave me insights I never would have thought of. Within two weeks of optimizing my profile, I landed three interviews and my dream job!"
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">Software Engineer</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg relative">
              <div className="absolute -top-4 left-8 h-10 w-10 bg-purple-600 rounded-full flex items-center justify-center text-white">
                <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.5 0H14.5C13.12 0 12 1.12 12 2.5V9.5C12 10.88 13.12 12 14.5 12H17.5V17.5C17.5 18.88 18.62 20 20 20C21.38 20 22.5 18.88 22.5 17.5V2.5C22.5 1.12 21.38 0 20 0H21.5ZM9.5 0H2.5C1.12 0 0 1.12 0 2.5V9.5C0 10.88 1.12 12 2.5 12H5.5V17.5C5.5 18.88 6.62 20 8 20C9.38 20 10.5 18.88 10.5 17.5V2.5C10.5 1.12 9.38 0 8 0H9.5Z" fill="white"/>
                </svg>
              </div>
              <div className="pt-6">
                <p className="text-gray-600 mb-6">
                  "As an employer, the candidate matching saved us countless hours. The quality of applicants was exactly what we needed, and we filled our position in record time."
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Michael Chen</p>
                    <p className="text-sm text-gray-500">HR Director</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg relative">
              <div className="absolute -top-4 left-8 h-10 w-10 bg-green-600 rounded-full flex items-center justify-center text-white">
                <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.5 0H14.5C13.12 0 12 1.12 12 2.5V9.5C12 10.88 13.12 12 14.5 12H17.5V17.5C17.5 18.88 18.62 20 20 20C21.38 20 22.5 18.88 22.5 17.5V2.5C22.5 1.12 21.38 0 20 0H21.5ZM9.5 0H2.5C1.12 0 0 1.12 0 2.5V9.5C0 10.88 1.12 12 2.5 12H5.5V17.5C5.5 18.88 6.62 20 8 20C9.38 20 10.5 18.88 10.5 17.5V2.5C10.5 1.12 9.38 0 8 0H9.5Z" fill="white"/>
                </svg>
              </div>
              <div className="pt-6">
                <p className="text-gray-600 mb-6">
                  "The personalized job recommendations were spot on! Instead of searching through hundreds of listings, I was presented with opportunities that truly matched my skills."
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Emily Rodriguez</p>
                    <p className="text-sm text-gray-500">Marketing Specialist</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;