const express = require('express');
const router = express.Router();

const jobController = require('../controllers/jobController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// ✅ All handlers below must be defined functions
router.get('/', jobController.getJobs);
router.get('/applied', authMiddleware, roleMiddleware('JobSeeker'), jobController.getAppliedJobs);
router.post('/', authMiddleware, roleMiddleware('Company'), jobController.createJob);
router.put('/:id', authMiddleware, roleMiddleware('Company'), jobController.updateJob);
router.delete('/:id', authMiddleware, roleMiddleware('Company'), jobController.deleteJob);
router.post('/:id/apply', authMiddleware, roleMiddleware('JobSeeker'), jobController.applyToJob);

module.exports = router;
