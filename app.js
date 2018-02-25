const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

const app = express();

// Load DB Config
const db = require('./config/db');

// Connect to Mongoose
mongoose.connect(db.mongoURI)
        .then(() => {
          console.log('MongoDB connected.')
        })
        .catch(err => console.log(err));

// Load Models
require('./models/Idea');

// Handlebars Middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.set('views',path.join(__dirname+'/views/'));

// Load Routes
const index = require('./routes/index');
const ideas = require('./routes/ideas');

// Use Routes
app.use('/', index);
app.use('/ideas', ideas);

const port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
