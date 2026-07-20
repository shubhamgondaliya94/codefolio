const express = require('express');
const router = express.Router();
const { signup, login, logout } = require('../controllers/authController');
const { authLimiter } = require('../middleware/securityMiddleware');

router.post('/signup', authLimiter, signup);
router.post('/login', authLimiter, login);
router.post('/logout', logout);

module.exports = router;
