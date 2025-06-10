const Job = require('../models/Job');
const Application = require('../models/Application');

// Create job (Company only)
exports.createJob = async (req, res) => {
  try {
    const companyId = req.user.id;  // from authMiddleware
    const { title, location, description, skillsRequired, salaryRange, employmentType, deadline } = req.body;

    const job = new Job({
      title,
      company: companyId,
      location,
      description,
      skillsRequired,
      salaryRange,
      employmentType,
      deadline,
    });

    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error creating job' });
  }
};

// Update job (Company only, own job)
exports.updateJob = async (req, res) => {
  try {
    const companyId = req.user.id;
    const jobId = req.params.id;

    let job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.company.toString() !== companyId)
      return res.status(403).json({ message: 'Not authorized' });

    const updates = req.body;
    job = await Job.findByIdAndUpdate(jobId, updates, { new: true });

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating job' });
  }
};

// Delete job (Company only, own job)
exports.deleteJob = async (req, res) => {
  try {
    const companyId = req.user.id;
    const jobId = req.params.id;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.company.toString() !== companyId)
      return res.status(403).json({ message: 'Not authorized' });

    await job.remove();
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting job' });
  }
};

// Get all jobs (with optional filters)
exports.getJobs = async (req, res) => {
  try {
    const { skill, location, employmentType, search } = req.query;

    let query = {};

    if (skill) query.skillsRequired = { $in: [skill] };
    if (location) query.location = location;
    if (employmentType) query.employmentType = employmentType;
    if (search) query.title = { $regex: search, $options: 'i' };

    const jobs = await Job.find(query).populate('company', 'name email');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching jobs' });
  }
};

// Get applied jobs (Job Seeker)
exports.getAppliedJobs = async (req, res) => {
  try {
    const userId = req.user.id;

    const applications = await Application.find({ applicant: userId }).populate({
      path: 'job',
      populate: {
        path: 'company',
        select: 'name email'
      }
    });

    const appliedJobs = applications.map(app => app.job);
    res.json(appliedJobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching applied jobs' });
  }
};


// Apply to a job (Job Seeker)
exports.applyToJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user.id;

    // Check if application already exists
    const existing = await Application.findOne({ job: jobId, applicant: userId });
    if (existing) return res.status(400).json({ message: 'Already applied to this job' });

    // Assume resume file path/url is sent or retrieved somehow; if uploading here, handle with multer
    const resume = req.body.resume || null;

    const application = new Application({
      job: jobId,
      applicant: userId,
      resume,
    });

    await application.save();
    res.status(201).json({ message: 'Applied successfully', application });
  } catch (error) {
    res.status(500).json({ message: 'Server error applying to job' });
  }
};
