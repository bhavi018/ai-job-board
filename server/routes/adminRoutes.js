const express = require('express');
const protect = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const {
  getAllUsers,
  deleteUser,
  updateUser,
  getAllJobs,
  deleteJob,
} = require('../controllers/adminController'); // ✅ Correct controller

const router = express.Router();

// Admin routes
router.get('/users', protect, roleMiddleware('Admin'), getAllUsers);
router.delete('/users/:userId', protect, roleMiddleware('Admin'), deleteUser);
router.put('/users/:userId', protect, roleMiddleware('Admin'), updateUser);

router.get('/jobs', protect, roleMiddleware('Admin'), getAllJobs);
router.delete('/jobs/:jobId', protect, roleMiddleware('Admin'), deleteJob);

module.exports = router;
