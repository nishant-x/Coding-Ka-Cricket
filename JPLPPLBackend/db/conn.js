// conn.js
const mongoose = require('mongoose');

// Make a connection with MongoDB
let connect = mongoose.connect('mongodb://localhost:27017/StudentRegistrationData')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });

module.exports = connect;
