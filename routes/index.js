const express = require('express');

const router = express.Router();

// Load Controllers
const index_controller = require('../controllers/indexController');

router.get('/', index_controller.renderWelcome); // / route
router.get('/about', index_controller.renderAbout); // /about route

module.exports = router;
