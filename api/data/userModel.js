const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    firstName: String,
    lastNAme: String,
    email: String,
    maritalStatus: String,
    dateOfbirth: Date,
    country: String,
    state: String,
    city: String,
    salary: Number
}, { collection: 'usercollection' }
);
mongoose.model('User', userSchema);
module.exports = { Mongoose: mongoose, UserSchema: userSchema }