const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password']
    },
    weight: {
        type: Number,
        required: [true, 'Please provide a weight']
    },
    goal: {
        type: String,
        enum: ['Lose Weight', 'Gain Weight', 'Maintain Weight'],
        required: [true, 'Please provide a goal']
    },
    age: {
        type: Number,
        required: [true, 'Please provide an age']
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;