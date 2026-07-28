const express = require('express');
const router = express.Router();
const {
  getDashboard,
  updateDashboard,
  uploadProfileImage,
  uploadResume,
  uploadPpt,
  uploadProjectImage,
} = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Base routes for dashboard reading/writing
router.get('/', protect, getDashboard);
router.put('/', protect, updateDashboard);

// Upload routes
router.post('/upload/profile', protect, upload.single('profileImage'), uploadProfileImage);
router.post('/upload/resume', protect, upload.single('resumeURL'), uploadResume);
router.post('/upload/ppt', protect, upload.single('uploadedPPT'), uploadPpt);
router.post('/upload/project-image', protect, upload.single('projectImage'), uploadProjectImage);

module.exports = router;
