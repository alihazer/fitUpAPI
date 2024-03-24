const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name']
    },
    calories: {
        type: Number,
        required: [true, 'Please provide calories']
    },
    protein: {
        type: Number,
        required: [true, 'Please provide protein']
    },
    carbs: {
        type: Number,
        required: [true, 'Please provide carbs']
    },
    fats: {
        type: Number,
        required: [true, 'Please provide fats']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String,
    }
});

module.exports = mongoose.model('FoodItem', foodItemSchema);