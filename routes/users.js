const express = require('express');
const { ensureAuthenticated, ensureLoggedOut } = require('../helpers/auth');

const router = express.Router();

// Load User Controller
const user_controller = require('../controllers/userController');

router.get('/login', ensureLoggedOut, user_controller.renderLoginForm);
router.get('/register', ensureLoggedOut, user_controller.renderRegisterForm);
router.get('/logout', ensureAuthenticated, user_controller.handleUsersLogout);
router.post('/login', user_controller.handleUsersLogin);
router.post('/register', user_controller.handleUsersRegistration);

module.exports = router;
