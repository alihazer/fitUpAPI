const mongoose  = require('mongoose');
const FoodItem = require('../Models/FoodItemModel');
const asyncHandler = require('express-async-handler');
const { calculateFoodItemCalories } = require('../utils/nutritionCalculations.js');


const createItem = asyncHandler(async(req, res)=>{
    const { name, protein, carbs, fats, image } = req.body;
    try {
        const calories = calculateFoodItemCalories(protein, carbs, fats);
        const item = await FoodItem.create({ name, calories, protein, carbs, fats, user: req.userId, image });
        return res.status(201).json({
            status: true,
            message: 'Item created succesfully',
            data: item
        });
    } catch (error) {
        throw Error(error);
    }
});

const getItems = asyncHandler(async(req, res)=>{
    try {
        const items = await FoodItem.find({ user: req.userId });
        if(items.length < 1 || !items){
            return res.status(404).json({
                status: false,
                message: 'No items found'
            });
        }
        return res.status(200).json({
            status: true,
            message: 'Items fetched succesfully',
            data: items
        })
    } catch (error) {
        throw Error(error);
    }
});

const getItem = asyncHandler(async(req, res)=>{
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            status: false,
            message: 'Invailed item id'
        });
    }
    try {
        const item = await FoodItem.findOne({ _id: id, user: req.userId });
        if(!item){
            return res.status(404).json({
                status: false,
                message: 'Item not found'
            });
        }
        return res.status(200).json({
            status: true,
            message: 'Item fetched succesfully',
            data: item
        })
    } catch (error) {
        throw Error(error);
    }
});

const updateItem = asyncHandler(async(req, res)=>{
    try {
        const id = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                status: false,
                message: 'Invalid id'
            });
        }
        const { name, protein, carbs, fats, image } = req.body;
        const calories = calculateFoodItemCalories(protein, carbs, fats);
        const item = await FoodItem.findOne({ _id: id, user: req.userId });
        if(!item){
            return res.status(404).json({
                status: false,
                message: 'Item not found'
            });
        }
        const newItem = await FoodItem.findByIdAndUpdate(id, { name, calories ,protein, carbs, fats, user: req.userId, image }, {new: true});
        return res.status(201).json({
            status: true,
            message: 'Item updated succesfully',
            data: newItem
        });
    } catch (error) {
        throw Error(error);
    }
});

const deleteItem = asyncHandler(async(req, res)=>{
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(401).json({
            status: false,
            message: 'Invalid id'
        });
    }
    
    const item = await FoodItem.findOne({ _id: id, user: req.userId });
    if(!item){
        return res.status(404).json({
            status: false,
            message: 'Item not found'
        });
    }
    await FoodItem.findByIdAndDelete(id);
    return res.status(200).json({
        status: true,
        message: 'Item deleted succesfully'
    });
})

module.exports = { createItem, getItem, getItems, updateItem, deleteItem };

