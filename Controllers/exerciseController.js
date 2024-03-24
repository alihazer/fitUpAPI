const Exercise = require('../Models/ExerciseModel.js');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

// @desc Create an exercise
// @route POST /api/exercise/create
// @access Private

const createExercise = asyncHandler(async(req, res)=>{
    try {
        const { title, description, category, duration, intensity, sets, reps, rest, image, youtubeVideo, targetedMuscles } = req.body;
        const exercise = await Exercise.findOne({title, user: req.userId});
        if (exercise) {
            return res.status(400).json({
                status: false,
                message: 'Exercise already exists'
            });
        }
        // Create exercise
        const newExercise = await Exercise.create({
            title, description, category, duration, intensity, sets, reps, rest, image, youtubeVideo, targetedMuscles, user: req.userId
        })
        res.status(201).json({
            status: true,
            message: 'Exercise created successfully'
        });
    } catch (error) {
        throw new Error(error)
    }

});

// @desc Get all exercises for a specific user
// @route GET /api/exercise
// @access Private

const getExercises = asyncHandler(async(req, res)=>{
    try {
        const { category, intensity } = req.query;
        const validCategories = ['Cardio', 'Strength', 'Flexibility'];
        const validIntensities = ['Low', 'Moderate', 'High'];
        if(category && !validCategories.includes(category)){
            return res.status(400).json({
                status: false,
                message: 'Invalid category'
            });
        }
        if(intensity && !validIntensities.includes(intensity)){
            return res.status(400).json({
                status: false,
                message: 'Invalid intensity'
            })
        }
        const filter = {};
        if(category){
            filter.category = category;
        }
        if(intensity){
            filter.intensity = intensity;
        }

        const exercises = await Exercise.find({user: req.userId, ...filter});
        if(exercises.length == 0){
            return res.status(404).json({
                status: false,
                message: 'No exercises found'
            });
        }
        return res.status(200).json({
            status: true,
            results: exercises.length,
            data: exercises
        });
    } catch (error) {
        throw Error(error);   
    }
});

// @desc Get a single exercise
// @route GET /api/exercise/:id
// @access Private

const getExercise = asyncHandler(async(req, res)=>{
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            status: false, 
            message: 'Invalid exercise id'
        });
    }
    try {
        const exercise = await Exercise.findOne({_id: id, user: req.userId}).populate('user');
        if (!exercise) {
            return res.status(404).json({
                status: false,
                message: 'Exercise not found'
            });
        }
        res.status(200).json({
            status: true,
            data: exercise
        });
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: 'Invalid exercise id'
        });
    }
});

// @desc Update an exercise
// @route PUT /api/exercise/:id
// @access Private

const updateExercise = asyncHandler(async(req, res)=>{
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            status: false, 
            message: 'Invalid exercise id'
        });
    }
    try {
        const exercise = await Exercise.findOne({_id: id, user: req.userId});
        if (!exercise) {
            return res.status(404).json({
                status: false,
                message: 'Exercise not found'
            });
        }
        const { title, description, category, duration, intensity, sets, reps, rest, image, youtubeVideo, targetedMuscles } = req.body;
        const alreadyExists = await Exercise.findOne({title, user: req.userId});
        if(alreadyExists){
            return res.status(400).json({
                status: false,
                message: 'Exercise already exists'
            });
        }
        const updatedExercise = await Exercise.findByIdAndUpdate(id, {
            title, description, category, duration, intensity, sets, reps, rest, image, youtubeVideo, targetedMuscles
        }, {new: true});
        res.status(200).json({
            status: true,
            message: 'Exercise updated successfully',
            data: updatedExercise
        });
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: 'Invalid exercise id'
        });
    }
});

// @desc Delete an exercise
// @route DELETE /api/exercise/:id
// @access Private

const deleteExercise = asyncHandler(async(req, res)=>{
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            status: false,
            message: 'Invalid workout id'
        });
    }
    try {
        const exercise = await Exercise.findOne({_id: id, user: req.userId});
        if (!exercise) {
            return res.status(404).json({
                status: false,
                message: 'Exercise not found'
            });
        }
        await Exercise.findByIdAndDelete(id);
        res.status(200).json({
            status: true,
            message: 'Exercise deleted successfully'
        });
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: 'Invalid exercise id'
        });
    }
});


module.exports = { createExercise, getExercises, getExercise, updateExercise, deleteExercise};