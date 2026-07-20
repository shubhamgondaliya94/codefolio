const rateLimit = require('express-rate-limit');

// API general rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes',
  },
});

// Authentication rate limiter (more strict)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 auth requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login or registration attempts. Please try again later.',
  },
});

// Mail rate limiter
const mailLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 emails per hour to prevent spamming contact forms
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many contact messages sent from this device. Please try again in an hour.',
  },
});

// Mongo Injection Prevention Middleware
// Recursively sanitizes request object keys/values that contain $ or .
const mongoSanitize = (req, res, next) => {
  const sanitize = (obj) => {
    if (obj instanceof Object) {
      for (const key in obj) {
        if (/^\$/.test(key) || key.indexOf('.') !== -1) {
          delete obj[key];
        } else {
          sanitize(obj[key]);
        }
      }
    }
  };

  if (req.body) sanitize(req.body);
  if (req.query) sanitize(req.query);
  if (req.params) sanitize(req.params);

  next();
};

// XSS Prevention Middleware
// Sanitizes incoming string values by encoding basic HTML elements
const xssSanitize = (req, res, next) => {
  const clean = (val) => {
    if (typeof val === 'string') {
      return val
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
    }
    if (Array.isArray(val)) {
      return val.map(clean);
    }
    if (val && typeof val === 'object') {
      for (const k in val) {
        val[k] = clean(val[k]);
      }
    }
    return val;
  };

  if (req.body) {
    req.body = clean(req.body);
  }
  next();
};

module.exports = {
  apiLimiter,
  authLimiter,
  mailLimiter,
  mongoSanitize,
  xssSanitize,
};
