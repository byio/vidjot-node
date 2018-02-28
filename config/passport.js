const LocalStrategy = require('passport-local').Strategy;
const bycrypt = require('bcryptjs');

// Load User Model
const User = require('../models/User');

module.exports = (passport) => {
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    console.log(email);
  }));
};
