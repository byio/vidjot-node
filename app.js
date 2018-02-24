const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

// Handlebars Middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Load Routes
const index = require('./routes/index');

// Use Routes
app.use('/', index);

const port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
