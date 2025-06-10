// services/recommendationService.js
const Job = require('../models/Job');
const Application = require('../models/Application');
const Resume = require('../models/Resume');

const getRecommendations = async (userId) => {
  // Fetch resume
  const resume = await Resume.findOne({ user: userId });
  if (!resume || !resume.skills || resume.skills.length === 0) {
    return []; // No recommendations possible
  }

  const resumeSkills = resume.skills.map(skill => skill.toLowerCase());

  // Get jobs already applied to
  const applications = await Application.find({ user: userId }).select('job');
  const appliedJobIds = applications.map(app => app.job.toString());

  // Get all jobs excluding already applied
  const jobs = await Job.find({ _id: { $nin: appliedJobIds } });

  // Score jobs based on skill match
  const scoredJobs = jobs.map(job => {
    const jobSkills = job.skillsRequired.map(skill => skill.toLowerCase());
    const matchedSkills = jobSkills.filter(skill => resumeSkills.includes(skill));
    const score = matchedSkills.length / jobSkills.length;
    return { job, score };
  });

  // Sort and return top matches
  scoredJobs.sort((a, b) => b.score - a.score);
  return scoredJobs.slice(0, 5).map(item => item.job); // top 5
};

module.exports = { getRecommendations };
