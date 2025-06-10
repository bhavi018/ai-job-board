const express = require('express');
const protect = require('../middlewares/authMiddleware');

const { getAppliedJobs, getApplicantsForJob } = require('../controllers/applicationController');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

// Job Seeker: View applied jobs
router.get('/applied', protect, roleMiddleware('JobSeeker'), getAppliedJobs);

// Company: View applicants for a specific job
router.get('/applicants/:jobId', protect, roleMiddleware('Company'), getApplicantsForJob); // ✅ Only this

module.exports = router;
