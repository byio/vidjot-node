const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
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

// Handlebars Middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.set('views',path.join(__dirname+'/views/'));

// Body Parser Middleware (allows us to access req.body)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Method Override Middleware
app.use(methodOverride('_method'));

// Express Session Middleware
app.use(session({
  secret: 'this secret can be any string',
  resave: true,
  saveUninitialized: true
}));

// Connect Flash Middleware
app.use(flash());

// Global Variables Custom Middleware
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

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
