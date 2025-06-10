import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Jobs from './pages/Jobs';
import Profile from './pages/Profile';
import ResumeReview from './pages/ResumeReview';
import InterviewQA from './pages/InterviewQA';

function AppContent() {
  const location = useLocation();

  // Hide Navbar/Footer on auth pages
  const hideLayout = ['/login', '/register'].includes(location.pathname);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/resume-review" element={<ResumeReview />} />
          <Route path="/interview-qa" element={<InterviewQA />} />
          <Route path="*" element={<div className="text-center py-10 text-gray-500">404 - Page Not Found</div>} />
        </Routes>
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
