// Load User Model
const User = require('../models/User');

exports.renderLoginForm = (req, res) => {
  res.render('users/login');
};

exports.renderRegisterForm = (req, res) => {
  res.render('users/register');
};
