const express = require('express');
const router = express.Router();
const { getJobRecommendations } = require('../controllers/recommendationController');
const protect = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware'); // ✅ FIXED

router.get('/recommendations', protect, roleMiddleware('JobSeeker'), getJobRecommendations); // ✅ FIXED

module.exports = router;
