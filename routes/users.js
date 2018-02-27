const express = require('express');

const router = express.Router();

// Load User Controller
const user_controller = require('../controllers/userController');

router.get('/login', user_controller.renderLoginForm);

router.get('/register', user_controller.renderRegisterForm);

module.exports = router;
