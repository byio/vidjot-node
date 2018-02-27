// Load User Model
const User = require('../models/User');

exports.renderLoginForm = (req, res) => {
  res.send('this is the login form page!');
};

exports.renderRegisterForm = (req, res) => {
  res.send('this is the registration form page!');
};
