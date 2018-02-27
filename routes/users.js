const express = require('express');

const router = express.Router();

router.get('/login', (req, res) => {
  res.send('/users/login route');
});

router.get('/register', (req, res) => {
  res.send('/users/register route baby!');
});

module.exports = router;
