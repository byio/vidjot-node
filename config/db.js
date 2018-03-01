const dotenv = require('dotenv');

dotenv.config();

if (process.env.NODE_ENV === 'production') {
  module.exports = { mongoURI: process.env.MONGOLAB_URI }
} else {
  module.exports = { mongoURI: process.env.DB_LOCAL }
}
