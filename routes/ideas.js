const express = require('express');

const router = express.Router();

// Load Controllers
const idea_controller = require('../controllers/ideaController');

// /ideas Routes
router.get('/add', idea_controller.renderAddIdeaForm);

module.exports = router;