const express = require('express');

const app = express();

// Load Routes
const index = require('./routes/index');

// Use Routes
app.use('/', index);

const port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
