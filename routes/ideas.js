const express = require('express');
const { ensureAuthenticated } = require('../helpers/auth');

const router = express.Router();

// Load Controllers
const idea_controller = require('../controllers/ideaController');

// /ideas Routes
router.get('/add', ensureAuthenticated, idea_controller.renderAddIdeaForm);
router.get('/', ensureAuthenticated, idea_controller.getAllIdeas);
router.post('/', idea_controller.handleAddIdea);
router.get('/edit/:id', ensureAuthenticated, idea_controller.renderEditForm);
router.put('/:id', idea_controller.handleEditIdea);
router.delete('/:id', idea_controller.handleDeleteIdea);

module.exports = router;
