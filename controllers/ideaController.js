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
      details: req.body.details,
      user: req.user._id
    };
    new Idea(newIdea).save()
                     .then(idea => {
                       req.flash('success_msg', 'Video idea added successfully!');
                       res.redirect('/ideas');
                     });
  }
};

exports.getAllIdeas = (req, res) => {
  Idea.find({ user: req.user._id })
      .sort({ date: 'desc' })
      .then(ideas => {
        res.render('ideas/index', {
          ideas
        });
      });
};

exports.renderEditForm = (req, res) => {
  Idea.findOne({ _id: req.params.id })
      .then(idea => {
        if (idea.user != req.user._id) {
          req.flash('error_msg', 'Unauthorized.');
          res.redirect('/ideas');
        } else {
          res.render('ideas/edit', {
            idea
          });
        }
      });
};

exports.handleEditIdea = (req, res) => {
  Idea.findOne({ _id: req.params.id, user: req.user.id })
      .then(idea => {
        // setting new values
        idea.title = req.body.title;
        idea.details = req.body.details;
        // saving update
        idea.save()
            .then(idea => {
              req.flash('success_msg', 'Video idea updated successfully!');
              res.redirect('/ideas');
            });
      })
      .catch(err => {
        req.flash('error_msg', 'Unauthorized.');
        res.redirect('/ideas');
      });
};

exports.handleDeleteIdea = (req, res) => {
  Idea.findOneAndRemove({ _id: req.params.id, user: req.user.id })
      .then(() => {
        req.flash('success_msg', 'Video idea removed successfully!');
        res.redirect('/ideas');
      })
      .catch(err => {
        req.flash('error_msg', 'Unauthorized.');
        res.redirect('/ideas');
      });
};
