const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
    },
    description: {
        type: String,
        required: [true, 'Please provide a description']
    },
    category: {
        type: String,
        enum: ['Cardio', 'Strength', 'Flexibility'],
        required: [true, 'Please provide a category']
    },
    duration: {
        type: Number,
        required: [true, 'Please provide a duration']
    },
    intensity: {
        type: String,
        enum: ['Low', 'Moderate', 'High'],
        required: [true, 'Please provide an intensity']
    },
    sets: {
        type: Number,
        required: [true, 'Please provide the number of sets']
    },
    reps: {
        type: Number,
        required: [true, 'Please provide the number of reps']
    },
    rest: {
        type: Number,
        required: [true, 'Please provide the rest time']
    },
    image: {
        type: String
    },
    youtubeVideo:
    {
        type: String,
    },
    targetedMuscles: {
        type: [String],
        required: [true, 'Please provide targeted muscles']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Exercise = mongoose.model('Exercise', exerciseSchema);
module.exports = Exercise;