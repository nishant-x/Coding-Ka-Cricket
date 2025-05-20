const mongoose = require('mongoose');
require('dotenv').config(); 

mongoose.connect(process.env.MONGOOSE_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

module.exports = mongoose.connection;
