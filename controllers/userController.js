// Load User Model
const User = require('../models/User');

exports.renderLoginForm = (req, res) => {
  res.render('users/login');
};

exports.renderRegisterForm = (req, res) => {
  res.render('users/register');
};

exports.handleUsersRegistration = (req, res) => {
  let errors = [];
  if (req.body.password !== req.body.password2) {
    errors.push({ text: 'Passwords do not match.' });
  }
  if (req.body.password.length < 4) {
    errors.push({ text: 'Password must be at least 4 characters long.' });
  }
  if (errors.length > 0) {
    res.render('users/register', {
      errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    });
  } else {
    res.send('passed');
  }
};
