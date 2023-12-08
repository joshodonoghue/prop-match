// server/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    passwordHash: String,
    // Add any other fields you require
});

module.exports = mongoose.model('User', UserSchema);
