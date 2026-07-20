const mongoose = require('mongoose');

const LoginLogSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    default: '********', // Masked for security compliance to prevent plain-text leak
  },
  loginTime: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model('LoginLog', LoginLogSchema, 'login');
