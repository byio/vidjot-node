exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'You need to login to access this page.');
  res.redirect('/users/login');
};

exports.ensureLoggedOut = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'You are already logged in.');
  res.redirect('/ideas');
};
