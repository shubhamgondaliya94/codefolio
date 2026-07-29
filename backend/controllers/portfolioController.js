const User = require('../models/User');
const Portfolio = require('../models/Portfolio');
const { sendContactEmail } = require('../services/emailService');
const validator = require('validator');

// @desc    Get public portfolio data by username
// @route   GET /:username
// @access  Public
const getPublicPortfolio = async (req, res) => {
  const identifier = req.params.username.toLowerCase();

  try {
    // 1. First search User collection by username
    let user = await User.findOne({ username: identifier });
    let portfolio;

    if (user) {
      portfolio = await Portfolio.findOne({ userId: user._id });
    } else {
      // Fallback: search Portfolio collection by customDomain
      portfolio = await Portfolio.findOne({ customDomain: identifier });
      if (portfolio) {
        user = await User.findById(portfolio.userId);
      }
    }

    if (!user || !portfolio) {
      return res.status(404).json({ success: false, message: 'Portfolio page not found' });
    }

    return res.status(200).json({
      success: true,
      data: portfolio,
    });
  } catch (error) {
    console.error('getPublicPortfolio error:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching portfolio' });
  }
};

// @desc    Get available portfolio themes config
// @route   GET /api/themes
// @access  Public
const getThemes = async (req, res) => {
  const themes = [
    {
      id: 'Modern Developer',
      name: 'Modern Developer',
      description: 'Dynamic gradient-filled blocks, bold typography, and micro-interactions.',
      presets: { primary: '#4F46E5', secondary: '#10B981', dark: true },
    },
    {
      id: 'Minimal',
      name: 'Minimal',
      description: 'Elegant serif fonts, expansive whitespace, and a clean grayscale vibe.',
      presets: { primary: '#111827', secondary: '#4B5563', dark: false },
    },
    {
      id: 'Dark Professional',
      name: 'Dark Professional',
      description: 'Deep obsidian layouts featuring neon borders and futuristic UI highlights.',
      presets: { primary: '#3B82F6', secondary: '#8B5CF6', dark: true },
    },
    {
      id: 'Creative Designer',
      name: 'Creative Designer',
      description: 'Playful color palettes, asymmetric grids, and organic shape components.',
      presets: { primary: '#EC4899', secondary: '#F59E0B', dark: false },
    },
    {
      id: 'Glassmorphism',
      name: 'Glassmorphism',
      description: 'Semi-transparent components, frosted blur filters, and neon background blobs.',
      presets: { primary: '#8B5CF6', secondary: '#EC4899', dark: true },
    },
    {
      id: 'Corporate',
      name: 'Corporate',
      description: 'Traditional column layouts, formal deep navy tints, and sleek card patterns.',
      presets: { primary: '#1E3A8A', secondary: '#3B82F6', dark: false },
    },
  ];

  return res.status(200).json({
    success: true,
    data: themes,
  });
};

// @desc    Update user theme preferences
// @route   PUT /api/theme
// @access  Private
const updateTheme = async (req, res) => {
  const { selectedTheme } = req.body;

  if (!selectedTheme) {
    return res.status(400).json({ success: false, message: 'selectedTheme is required' });
  }

  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      { userId: req.user.id },
      { selectedTheme },
      { new: true }
    );

    if (!portfolio) {
      return res.status(404).json({ success: false, message: 'Portfolio not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Theme updated successfully',
      data: portfolio,
    });
  } catch (error) {
    console.error('updateTheme error:', error);
    return res.status(500).json({ success: false, message: 'Server error updating theme selection' });
  }
};

// @desc    Process public contact form submission
// @route   POST /api/contact/:username
// @access  Public
const sendContactForm = async (req, res) => {
  const username = req.params.username.toLowerCase();
  const { senderName, senderEmail, message } = req.body;

  // 1. Validation check
  if (!senderName || !senderEmail || !message) {
    return res.status(400).json({ success: false, message: 'Please provide all contact form fields (name, email, message)' });
  }

  if (!validator.isEmail(senderEmail)) {
    return res.status(400).json({ success: false, message: 'Please enter a valid email address' });
  }

  try {
    // 2. Fetch portfolio details of owner (includes user contact email)
    let portfolio = await Portfolio.findOne({ username });
    if (!portfolio) {
      portfolio = await Portfolio.findOne({ customDomain: username });
    }
    if (!portfolio) {
      return res.status(404).json({ success: false, message: 'Recipient portfolio page not found' });
    }

    // Resolve owner's contact email. Fallback to signup email if blank.
    let ownerEmail = portfolio.email;
    if (!ownerEmail) {
      const ownerUser = await User.findById(portfolio.userId);
      if (ownerUser) {
        ownerEmail = ownerUser.email;
      }
    }

    if (!ownerEmail) {
      return res.status(404).json({ success: false, message: 'Recipient contact email is not configured' });
    }

    // 3. Dispatch Nodemailer email. Note that ownerEmail is hidden from response.
    await sendContactEmail({
      toEmail: ownerEmail,
      senderName,
      senderEmail,
      message,
      username: portfolio.fullName || username,
    });

    return res.status(200).json({
      success: true,
      message: 'Your message has been delivered successfully!',
    });
  } catch (error) {
    console.error('sendContactForm error:', error);
    return res.status(500).json({ success: false, message: `Failed to route contact email: ${error.message}` });
  }
};

module.exports = {
  getPublicPortfolio,
  getThemes,
  updateTheme,
  sendContactForm,
};
