const Plan = require('../Models/nutritionPlanModel.js');
const FoodItem = require('../Models/FoodItemModel.js');
const asyncHandler = require('express-async-handler');
const { calculateTotalCarbs, calculateTotalProtien, calculateFoodItemCalories, calculateTotalFats } = require('../utils/nutritionCalculations.js');
const mongoose = require('mongoose');

// @desc    Create a new nutrition plan
// @route   POST /api/nutritionPlan
// @access  Private

const createPlan = asyncHandler(async (req, res) => {
    try {
        const alreadyHasPlan = await Plan.findOne({ user: req.userId });
        if (alreadyHasPlan) {
            res.status(400).json({
                status: false,
                message: "You already have a nutrition plan"
            });
        }
        const { title, description, image, foodItems, maximumCalories } = req.body;
        const validFoodItems = await FoodItem.find({ _id: { $in: foodItems }, user: req.userId }).lean();
        if(validFoodItems.length < foodItems.length){
            return res.status(400).json({
                status: false,
                message: "Invalid food items provided"
            });
        }
        const carbs = calculateTotalCarbs(validFoodItems);
        const protein = calculateTotalProtien(validFoodItems);
        const fats = calculateTotalFats(validFoodItems);
        const calories = calculateFoodItemCalories(protein, carbs, fats);
    
        const plan = await Plan.create({
            title,
            description,
            calories,
            carbs,
            protein,
            fats,
            image,
            foodItems,
            user: req.userId,
            maximumCalories
        });
        res.status(201).json({
            status: true,
            message: "Nutrition plan created successfully",
            data: plan
        });
    } catch (error) {
        throw Error(error);
    };
});

// @desc    Get all nutrition plans
// @route   GET /api/nutritionPlan
// @access  Public

const getPlans = asyncHandler(async (req, res) => {
    try {
        const plans = await Plan.find({ user: req.userId}).populate('foodItems');
        if (!plans) {
            return res.status(404).json({
                status: false,
                message: "No nutrition plans found"
            });
        }
        res.status(200).json({
            status: true,
            message: "Nutrition plans retrieved successfully",
            data: plans
        });
    } catch (error) {
        throw Error(error);
    }
});

// @desc    Get a nutrition plan by id
// @route   GET /api/nutritionPlan/:id
// @access  Public

const getPlanById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            status: false,
            message: "Invalid plan id"
        })
    }
    const plan = await Plan.findOne({_id: id, user: req.userId }).populate('foodItems');
    if (!plan) {
        return res.status(404).json({
            status: false,
            message: "Plan not found"
        });
    };
    return res.status(200).json({
        status: true,
        message: "Nutrition plan retrieved successfully",
        data: plan
    });
});

// @desc    Update a nutrition plan
// @route   PUT /api/nutritionPlan/:id
// @access  Private

const updatePlan = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                status: false,
                message: "Invalid plan id"
            });
        }
        const plan = await Plan.find({ _id: id, user: req.userId });
        if (!plan) {
            return res.status(404).json({
                status: false,
                message: "Plan not found"
            });
        }
        const { title, description, image, foodItems, maximumCalories } = req.body;
        // Check if foodItems are valid
        const validFoodItems = await FoodItem.find({ _id: { $in: foodItems } }).lean();
        const validFoodItemIds = validFoodItems.map((item) => item._id).toString();
        const invalidFoodItems = foodItems.filter((item) => !validFoodItemIds.includes(item));
        if (invalidFoodItems.length > 0) {
            return res.status(400).json({
                status: false,
                message: `Invalid food items: ${invalidFoodItems.join(", ")}`
            });
        }
        const carbs = calculateTotalCarbs(validFoodItems);
        const protien = calculateTotalProtien(validFoodItems);
        const fats = calculateTotalFats(validFoodItems);
        const calories = calculateFoodItemCalories(protien, carbs, fats);
        if(calories > maximumCalories){
            return res.status(400).json({
                status: false,
                message: "Calories exceed maximum calories"
            });
        }
        const updatedPlan = await Plan.findByIdAndUpdate(id, {
            title,
            description,
            calories,
            carbs,
            protien,
            fats,
            image,
            foodItems,
            maximumCalories
        }, 
        { new: true });
        res.status(200).json({
            status: true,
            message: "Nutrition plan updated successfully",
            data: updatedPlan
        });
    } catch (error) {
        throw Error(error);
    }
});

// @desc    Delete a nutrition plan
// @route   DELETE /api/nutritionPlan/:id
// @access  Private

const deletePlan = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)){
            res.status(400);
            throw new Error("Invalid plan id");
        }
        const plan = await Plan.find({ _id: id, user: req.userId });
        if (!plan) {
            res.status(404);
            throw new Error("Plan not found");
        }
        await Plan.findByIdAndDelete(id);
        res.status(200).json({
            status: true,
            message: "Nutrition plan deleted successfully"
        });
    } catch (error) {
        throw Error(error);
    }
});


module.exports = { createPlan, getPlans, getPlanById, updatePlan, deletePlan };
