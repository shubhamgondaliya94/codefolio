const Portfolio = require('../models/Portfolio');
const { validatePortfolioInput } = require('../utils/validators');

// Helper to format file response paths
const getAssetUrl = (req, filename) => {
  return `${req.protocol}://${req.get('host')}/uploads/${filename}`;
};

// @desc    Get current user's dashboard details
// @route   GET /api/dashboard
// @access  Private
const getDashboard = async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne({ userId: req.user.id });

    // Fallback if somehow signup succeeded but portfolio was not created
    if (!portfolio) {
      portfolio = await Portfolio.create({
        userId: req.user.id,
        username: req.user.username,
        fullName: req.user.username,
        skills: [],
        projects: [],
      });
    }

    return res.status(200).json({
      success: true,
      data: portfolio,
    });
  } catch (error) {
    console.error('getDashboard error:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching dashboard' });
  }
};

// @desc    Update user's dashboard details
// @route   PUT /api/dashboard
// @access  Private
const updateDashboard = async (req, res) => {
  const { errors, isValid } = validatePortfolioInput(req.body);

  if (!isValid) {
    return res.status(400).json({ success: false, errors });
  }

  try {
    let portfolio = await Portfolio.findOne({ userId: req.user.id });

    if (!portfolio) {
      return res.status(404).json({ success: false, message: 'Portfolio not found for user' });
    }

    // Update allowable fields
    const {
      fullName,
      bio,
      role,
      github,
      linkedin,
      email,
      skills,
      projects,
      socialLinks,
      contactDetails,
      selectedTheme,
    } = req.body;

    portfolio.fullName = fullName !== undefined ? fullName : portfolio.fullName;
    portfolio.bio = bio !== undefined ? bio : portfolio.bio;
    portfolio.role = role !== undefined ? role : portfolio.role;
    portfolio.github = github !== undefined ? github : portfolio.github;
    portfolio.linkedin = linkedin !== undefined ? linkedin : portfolio.linkedin;
    portfolio.email = email !== undefined ? email : portfolio.email;
    portfolio.skills = skills !== undefined ? skills : portfolio.skills;
    portfolio.projects = projects !== undefined ? projects : portfolio.projects;
    portfolio.selectedTheme = selectedTheme !== undefined ? selectedTheme : portfolio.selectedTheme;

    if (socialLinks) {
      portfolio.socialLinks = { ...portfolio.socialLinks, ...socialLinks };
    }
    if (contactDetails) {
      portfolio.contactDetails = { ...portfolio.contactDetails, ...contactDetails };
    }

    await portfolio.save();

    return res.status(200).json({
      success: true,
      message: 'Portfolio details saved successfully',
      data: portfolio,
    });
  } catch (error) {
    console.error('updateDashboard error:', error);
    return res.status(500).json({ success: false, message: 'Server error updating dashboard details' });
  }
};

// @desc    Upload profile image
// @route   POST /api/upload/profile
// @access  Private
const uploadProfileImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No image file uploaded' });
  }

  try {
    const url = getAssetUrl(req, req.file.filename);
    
    // Auto save to database
    await Portfolio.findOneAndUpdate(
      { userId: req.user.id },
      { profileImage: url }
    );

    return res.status(200).json({
      success: true,
      message: 'Profile image uploaded successfully',
      url,
    });
  } catch (error) {
    console.error('uploadProfileImage error:', error);
    return res.status(500).json({ success: false, message: 'Server error saving uploaded profile image' });
  }
};

// @desc    Upload resume document (PDF/Doc)
// @route   POST /api/upload/resume
// @access  Private
const uploadResume = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No document file uploaded' });
  }

  try {
    const url = getAssetUrl(req, req.file.filename);

    // Auto save to database
    await Portfolio.findOneAndUpdate(
      { userId: req.user.id },
      { resumeURL: url }
    );

    return res.status(200).json({
      success: true,
      message: 'Resume uploaded successfully',
      url,
    });
  } catch (error) {
    console.error('uploadResume error:', error);
    return res.status(500).json({ success: false, message: 'Server error saving uploaded resume' });
  }
};

// @desc    Upload PowerPoint presentation (PPT/PPTX)
// @route   POST /api/upload/ppt
// @access  Private
const uploadPpt = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No presentation file uploaded' });
  }

  try {
    const url = getAssetUrl(req, req.file.filename);

    // Auto save to database
    await Portfolio.findOneAndUpdate(
      { userId: req.user.id },
      { uploadedPPT: url }
    );

    return res.status(200).json({
      success: true,
      message: 'PowerPoint presentation uploaded successfully',
      url,
    });
  } catch (error) {
    console.error('uploadPpt error:', error);
    return res.status(500).json({ success: false, message: 'Server error saving uploaded presentation' });
  }
};

// @desc    Upload project screenshot
// @route   POST /api/upload/project-image
// @access  Private
const uploadProjectImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No screenshot file uploaded' });
  }

  try {
    const url = getAssetUrl(req, req.file.filename);
    
    // We return URL for front-end to bind to new/existing project cards in the form before general Save
    return res.status(200).json({
      success: true,
      message: 'Project image uploaded successfully',
      url,
    });
  } catch (error) {
    console.error('uploadProjectImage error:', error);
    return res.status(500).json({ success: false, message: 'Server error during project screenshot upload' });
  }
};

module.exports = {
  getDashboard,
  updateDashboard,
  uploadProfileImage,
  uploadResume,
  uploadPpt,
  uploadProjectImage,
};
