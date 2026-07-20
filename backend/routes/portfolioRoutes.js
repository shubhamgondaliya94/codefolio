const express = require('express');
const router = express.Router();
const {
  getPublicPortfolio,
  getThemes,
  updateTheme,
  sendContactForm,
} = require('../controllers/portfolioController');
const { protect } = require('../middleware/authMiddleware');
const { mailLimiter } = require('../middleware/securityMiddleware');

// Theme endpoints (note: these will be prefix-mounted)
router.get('/api/themes', getThemes);
router.put('/api/theme', protect, updateTheme);

// Contact form (protected by mail rate-limiting against spam)
router.post('/api/contact/:username', mailLimiter, sendContactForm);

// Public profile retrieval (mounts at root level, placed at the end to prevent collision)
router.get('/:username', getPublicPortfolio);

module.exports = router;
