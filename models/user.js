const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name']
    },
    email: {
        type: String,
        required: [true, 'please tell us your emaiL'],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Please tell us your password'],
        minlength: 6
    }
});

module.exports = mongoose.model('User', userSchema);