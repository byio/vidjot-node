const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User Model
const User = require('../models/User');

module.exports = (passport) => {

  // handle local login stratey
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    // find user by email
    User.findOne({ email })
        .then(user => {
          if (!user) {
            return done(null, false, { message: 'No such user.' });
          } else {
            // match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;
              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, { message: 'Invalid Password.' });
              }
            });
          }
        });
  }));

  // serialize user and deserialize user (support login sessions)
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

};
