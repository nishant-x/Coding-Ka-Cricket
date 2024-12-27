// conn.js
const mongoose = require('mongoose');

// Make a connection with MongoDB
let connect = mongoose.connect('mongodb://127.0.0.1:27017/StudentRegistrationData')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });

