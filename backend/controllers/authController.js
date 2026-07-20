const User = require('../models/User');
const LoginLog = require('../models/LoginLog');
const Portfolio = require('../models/Portfolio');
const jwt = require('jsonwebtoken');
const { validateSignupInput, validateLoginInput } = require('../utils/validators');

// Helper to generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET || 'super_secret_portfolio_key_123_456',
    { expiresIn: process.env.JWT_LIFETIME || '24h' }
  );
};

// @desc    Register a new user (signup)
// @route   POST /api/signup
// @access  Public
const signup = async (req, res) => {
  const { errors, isValid } = validateSignupInput(req.body);

  if (!isValid) {
    return res.status(400).json({ success: false, errors });
  }

  const { username, email, password } = req.body;

  try {
    // Check if username already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({
        success: false,
        errors: { username: 'Username is already taken' },
      });
    }

    // Check if email already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        success: false,
        errors: { email: 'Email is already registered' },
      });
    }

    // Create new user
    const user = await User.create({
      username,
      email,
      password,
    });

    // Create default dashboard details for user
    await Portfolio.create({
      userId: user._id,
      username: user.username,
      fullName: username,
      email: email,
      bio: 'Welcome to my professional portfolio!',
      role: 'Full Stack Engineer',
      skills: ['JavaScript', 'React', 'Node.js'],
      projects: [],
      selectedTheme: 'Modern Developer',
    });

    // Generate token
    const token = generateToken(user);

    // Optional secure cookie setup
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ success: false, message: 'Server error during registration' });
  }
};

// @desc    Authenticate user & get token (login)
// @route   POST /api/login
// @access  Public
const login = async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json({ success: false, errors });
  }

  const { username, password } = req.body;

  try {
    // Find user in signup (User) collection
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        success: false,
        errors: { username: 'Invalid credentials' },
      });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        errors: { password: 'Invalid credentials' },
      });
    }

    // Record login activity in login (LoginLog) collection
    await LoginLog.create({
      username: user.username,
      password: '********', // Masked for security compliance
      loginTime: new Date(),
    });

    // Generate Token
    const token = generateToken(user);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

// @desc    Logout user & clear cookie
// @route   POST /api/logout
// @access  Public
const logout = async (req, res) => {
  res.cookie('token', 'none', {
    httpOnly: true,
    expires: new Date(0),
  });

  return res.status(200).json({
    success: true,
    message: 'User logged out successfully',
  });
};

module.exports = {
  signup,
  login,
  logout,
};
