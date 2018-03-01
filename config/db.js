const dotenv = require('dotenv');

dotenv.config();

if (process.env.NODE_ENV === 'production') {
  module.exports = { mongoURI: "mongodb://benyang:password@ds133017.mlab.com:33017/vidjot-node-dev" }
} else {
  module.exports = { mongoURI: process.env.DB_LOCAL }
}
