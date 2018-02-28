const express = require('express');

const router = express.Router();

// Load User Controller
const user_controller = require('../controllers/userController');

router.get('/login', user_controller.renderLoginForm);
router.get('/register', user_controller.renderRegisterForm);
router.post('/login', user_controller.handleUsersLogin);
router.post('/register', user_controller.handleUsersRegistration);

module.exports = router;
