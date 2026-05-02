const mongoose = require('mongoose');
const crypto = require('crypto');
const express = require('express');
const app= express();
global.crypto = crypto;
require('dotenv').config();

mongoose.connect(process.env.MONGOOSE_URL)
  .then(() => {
    console.log('Connected to MongoDB');

    app.listen(process.env.PORT || 5000, () => {
      console.log('Server running');
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

module.exports = mongoose.connection;
