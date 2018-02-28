const bcrypt = require('bcryptjs');

// Load User Model
const User = require('../models/User');

exports.renderLoginForm = (req, res) => {
  res.render('users/login');
};

exports.renderRegisterForm = (req, res) => {
  res.render('users/register');
};

exports.handleUsersRegistration = (req, res) => {
  const { name, email, password, password2 } = req.body;
  // server side validation for password
  let errors = [];
  if (password !== password2) {
    errors.push({ text: 'Passwords do not match.' });
  }
  if (password.length < 4) {
    errors.push({ text: 'Password must be at least 4 characters long.' });
  }
  if (errors.length > 0) {
    res.render('users/register', {errors, name, email, password, password2});
  } else {
    // server side validation for unique email
    User.findOne({ email })
        .then(user => {
          if (user) {
            req.flash('error_msg', 'Email already in use.');
            res.redirect('/users/register');
          } else {
            const newUser = new User({ name, email, password });
            // encrypt password with bcrypt
            bcrypt.genSalt(10, (err, salt) => {
              if (err) throw err;
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save()
                       .then(user => {
                         req.flash('success_msg', 'Registered! You can now login.');
                         res.redirect('/users/login');
                       })
                       .catch(err => {
                         if (err) throw err;
                       });
              });
            });
          }
        });
  }
};
