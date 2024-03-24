const Workout = require('../Models/WorkoutModel');
const Exercise = require('../Models/ExerciseModel');
const calculateIntensity = require('../utils/calculateIntensity');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

// @desc Create a workout
// @route POST /api/workouts
// @access Private

const createWorkout = asyncHandler(async (req, res) => {
    try {
        const { title, description, exercises, image, duration } = req.body;
        const user = req.userId;
        // Check if the exercises are valid
        const validExercises = await Exercise.find({ 
            _id: { $in: exercises },
            user: req.userId
        }).lean();
        if(validExercises.length < exercises.length){
            return res.status(400).json({
                status: false,
                message: 'Invalid exercises provided'
            });
        }
        // Create the workout
        try {
            //  Calculate the intensity of the workout
            const intensity = calculateIntensity(validExercises);
            const workout = await Workout.create({ title, description, exercises, user, image, intensity, duration });
            return res.status(201).json({
                status: true,
                message: "Workout created successfully",
                workout
            });
        } catch (error) {
            throw new Error(error);
        }
    } catch (error) {
        throw new Error(error);
    }
});

// @desc Get all workouts
// @route GET /api/workouts
// @access Public

const getWorkouts = asyncHandler(async (req, res) => {
    try {
        const {intensity} = req.query;
        const validdIntensities = ['Low', 'Moderate', 'High'];
        if(intensity && !validdIntensities.includes(intensity)){
            return res.status(400).json({
                status: false,
                message: 'Invalid intensity'
            })
        }
        const filter = {};
        if(intensity){
            filter.intensity = intensity;
        }
        const workouts = await Workout.find({ user: req.userId, ...filter });
        if(workouts.length < 1 || !workouts){
            return res.status(404).json({
                status: false,
                message: 'No workouts found'
            });
        }
        return res.status(200).json({
            status: true,
            workouts
        });
        
    }
    catch (error) {
        throw new Error(error);
    }
});

// @desc Get a single workout
// @route GET /api/workouts/:id
// @access Public

const getWorkout =asyncHandler( async (req, res) => {
    // Check if the id is valid
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            status: false,
            message: 'Invalid workout id'
        });
    }

    try {
        // Get the workout
        const workout = await Workout.findById(req.params.id).populate('exercises');
        if (!workout) {
            return res.status(404).json({
                status: false,
                message: 'Workout not found'
            });
        }
        return res.status(200).json({
            status: true,
            workout
        });
    } catch (error) {
        throw new Error(error);
    }
});

// @desc Update a workout
// @route PUT /api/workouts/:id
// @access Private

const updateWorkout = asyncHandler(async (req, res) => {
    const { title, description, exercises, image, duration } = req.body;
    // Check if the id is valid
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
                status: false,
                message: 'Invalid workout id'
        });
    }

    const validExercises = await Exercise.find({ 
        _id: { $in: exercises },
        user: req.userId
    }).lean();
    if(validExercises.length < exercises.length){
        return res.status(400).json({
            status: false,
            message: 'Invalid exercises provided'
        });
    }
    // Update the workout
    try {
        // Calculate the intensity of the workout
        const intensity = calculateIntensity(validExercises);
        // If the user is not the owner of the workout, return an error
        let workout = await Workout.findById(id);
        if(!workout){
            return res.status(400).json({
                status: false,
                message: 'Workout not found'
            });
        }
        if (workout.user != user) {
            return res.status(401).json({
                status: false,
                message: 'You are not authorized to update this workout'
            });
        }

        // Update the workout
        const newWorkout = await Workout.findByIdAndUpdate( id, { title, description, exercises, image, intensity, duration }, {new: true});
        return res.status(201).json({
            status: true,
            message: "Workout updated successfully",
            workout
        });
    } catch (error) {
        throw new Error(error);
    }
});

// @desc Delete a workout
// @route DELETE /api/workouts/:id
// @access Private

const deleteWorkout = asyncHandler(async (req, res) => {
    // Check if the user is logged in
    const user = req.userId;
    if (!user) {
        return new Error('You must be logged in to delete a workout');
    };
    // Check if the id is valid
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            status: false,
            message: 'Invalid workout id'
        });
    }
    try {
        // If the user is not the owner of the workout, return an error
        let workout = await Workout.findById(req.params.id);
        if(!workout){
            return res.status(400).json({
                status: false,
                message: 'Workout not found'
            });
        }
        if (workout.user != user) {
            return res.status(401).json({
                status: false,
                message: 'You are not authorized to delete this workout'
            });
        }
        // Delete the workout
        await Workout.deleteOne({ _id: id});
        return res.status(200).json({
            status: true,
            message: "Workout deleted successfully"
        });
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = { createWorkout, getWorkouts, getWorkout, updateWorkout, deleteWorkout };