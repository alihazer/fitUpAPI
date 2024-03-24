const express = require('express');
const router = express.Router();
const  isLoggedIn  = require('../Middlewares/isLoggedIn');
const { workoutValidations, validationMiddleware } = require('../Middlewares/validations');
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  updateWorkout,
  deleteWorkout,
} = require('../Controllers/workoutController');

/**
 * @swagger
 * tags:
 *   name: Workouts
 *   description: CRUD operations for workouts
 */

/**
 * @swagger
 * /api/workout/create:
 *   post:
 *     summary: Create a new workout
 *     description: Create a new workout record.
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Workout'
 *     responses:
 *       '200':
 *         description: Workout created successfully
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '401':
 *         description: Unauthorized. User not logged in.
 *       '500':
 *         description: Internal server error
 */
router.post('/create', isLoggedIn, workoutValidations, validationMiddleware, createWorkout);

/**
 * @swagger
 * /api/workout:
 *   get:
 *     summary: Get all workouts
 *     description: Retrieve a list of all workouts.
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of workouts retrieved successfully
 *       '401':
 *         description: Unauthorized. User not logged in.
 *       '500':
 *         description: Internal server error
 */
router.get('/', isLoggedIn, getWorkouts);

/**
 * @swagger
 * /api/workout/{id}:
 *   get:
 *     summary: Get workout by ID
 *     description: Retrieve a workout by its ID.
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the workout to retrieve
 *     responses:
 *       '200':
 *         description: Workout retrieved successfully
 *       '401':
 *         description: Unauthorized. User not logged in.
 *       '404':
 *         description: Workout not found.
 *       '500':
 *         description: Internal server error
 */
router.get('/:id', isLoggedIn, getWorkout);

/**
 * @swagger
 * /api/workout/{id}:
 *   put:
 *     summary: Update workout by ID
 *     description: Update a workout by its ID.
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the workout to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Workout'
 *     responses:
 *       '200':
 *         description: Workout updated successfully
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '401':
 *         description: Unauthorized. User not logged in.
 *       '404':
 *         description: Workout not found.
 *       '500':
 *         description: Internal server error
 */
router.put('/:id', isLoggedIn, workoutValidations, validationMiddleware, updateWorkout);

/**
 * @swagger
 * /api/workout/{id}:
 *   delete:
 *     summary: Delete workout by ID
 *     description: Delete a workout by its ID.
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the workout to delete
 *     responses:
 *       '200':
 *         description: Workout deleted successfully
 *       '401':
 *         description: Unauthorized. User not logged in.
 *       '404':
 *         description: Workout not found.
 *       '500':
 *         description: Internal server error
 */
router.delete('/:id', isLoggedIn, deleteWorkout);

module.exports = router;
