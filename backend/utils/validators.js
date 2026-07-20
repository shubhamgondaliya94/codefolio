const validator = require('validator');

const validateSignupInput = (data) => {
  const errors = {};

  const username = data.username ? data.username.trim() : '';
  const email = data.email ? data.email.trim() : '';
  const password = data.password ? data.password : '';

  if (validator.isEmpty(username)) {
    errors.username = 'Username is required';
  } else if (!validator.isLength(username, { min: 3, max: 30 })) {
    errors.username = 'Username must be between 3 and 30 characters';
  } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    errors.username = 'Username can only contain alphanumeric characters and underscores';
  }

  if (validator.isEmpty(email)) {
    errors.email = 'Email is required';
  } else if (!validator.isEmail(email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (validator.isEmpty(password)) {
    errors.password = 'Password is required';
  } else if (!validator.isLength(password, { min: 6 })) {
    errors.password = 'Password must be at least 6 characters long';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

const validateLoginInput = (data) => {
  const errors = {};

  const username = data.username ? data.username.trim() : '';
  const password = data.password ? data.password : '';

  if (validator.isEmpty(username)) {
    errors.username = 'Username is required';
  }

  if (validator.isEmpty(password)) {
    errors.password = 'Password is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

const validatePortfolioInput = (data) => {
  const errors = {};

  const fullName = data.fullName ? data.fullName.trim() : '';
  const email = data.email ? data.email.trim() : '';

  if (validator.isEmpty(fullName)) {
    errors.fullName = 'Full Name is required';
  }

  if (email && !validator.isEmail(email)) {
    errors.email = 'Please provide a valid contact email';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

module.exports = {
  validateSignupInput,
  validateLoginInput,
  validatePortfolioInput,
};
