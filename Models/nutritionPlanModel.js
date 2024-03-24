const mongoose = require('mongoose');

const nutritionPlanSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title']
    },
    description: {
        type: String,
        required: [true, 'Please provide a description']
    },
    foodItems: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'FoodItem',
            required: true
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    image: {
        type: String,
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
    maximumCalories: {
        type: Number,
    },
});

module.exports = mongoose.model('NutritionPlan', nutritionPlanSchema);