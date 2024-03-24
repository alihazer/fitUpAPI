const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title']
    },
    description: {
        type: String,
        required: [true, 'Please provide a description']
    },
    exercises: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Exercise',
            required: true
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String,
    },
    intensity:{
        type: String,
        enum: ['Low', 'Moderate', 'High'],
    },
    duration: {
        type: Number,
    },
});

module.exports = mongoose.model('Workout', workoutSchema);