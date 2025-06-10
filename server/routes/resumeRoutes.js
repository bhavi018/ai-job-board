const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const { uploadResume } = require('../controllers/resumeController');

router.post('/upload', authMiddleware, upload.single('resume'), uploadResume);

module.exports = router;
