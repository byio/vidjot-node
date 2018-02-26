const express = require('express');

const router = express.Router();

// Load Controllers
const idea_controller = require('../controllers/ideaController');

// /ideas Routes
router.get('/add', idea_controller.renderAddIdeaForm);
router.get('/', idea_controller.getAllIdeas);
router.post('/', idea_controller.handleAddIdea);
router.get('/edit/:id', idea_controller.renderEditForm);
router.put('/:id', idea_controller.handleEditIdea);

module.exports = router;
