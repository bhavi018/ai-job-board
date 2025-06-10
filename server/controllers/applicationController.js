const Application = require('../models/Application');
const Job = require('../models/Job');

// Job Seeker: Get all jobs the user has applied to
exports.getAppliedJobs = async (req, res) => {
  try {
    const userId = req.user.id;
    const applications = await Application.find({ user: userId }).populate('job');
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Company: Get all applicants for a specific job
exports.getApplicantsForJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const applicants = await Application.find({ job: jobId }).populate('user', 'name email');
    res.json(applicants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applicants' });
  }
};
