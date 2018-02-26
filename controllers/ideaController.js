// Load Idea Model
const Idea = require('../models/Idea');

exports.renderAddIdeaForm = (req, res) => {
  res.render('ideas/add');
};

exports.handleAddIdea = (req, res) => {
  let errors = [];
  if (!req.body.title) errors.push({ text: 'Please add a title.' });
  if (!req.body.details) errors.push({ text: 'Please add a description.' });
  if (errors.length > 0) {
    res.render('ideas/add', {
      errors,
      title: req.body.title,
      details: req.body.details
    });
  } else {
    const newIdea = {
      title: req.body.title,
      details: req.body.details
    };
    new Idea(newIdea).save()
                     .then(idea => {
                       res.redirect('/ideas');
                     });
  }
};

exports.getAllIdeas = (req, res) => {
  Idea.find()
      .sort({ date: 'desc' })
      .then(ideas => {
        res.render('ideas/index', {
          ideas
        });
      });
};

exports.renderEditForm = (req, res) => {
  res.render('ideas/edit', {
    id: req.params.id
  });
};
