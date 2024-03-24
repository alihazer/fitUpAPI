const express = require('express');
const router = express.Router();
const  isLoggedIn  = require('../Middlewares/isLoggedIn');
const { exerciseValidations, validationMiddleware } = require('../Middlewares/validations');
const { createExercise, getExercises, getExercise, updateExercise, deleteExercise } = require('../Controllers/exerciseController.js');


/**
 * @swagger
 * tags:
 *   name: Exercises
 *   description: CRUD operations for exercises
 */

/**
 * @swagger
 * /api/exercise/create:
 *   post:
 *     summary: Create a new exercise
 *     description: Create a new exercise record.
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Exercise'
 *     responses:
 *       '200':
 *         description: Exercise created successfully
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '401':
 *         description: Unauthorized. User not logged in.
 *       '500':
 *         description: Internal server error
 */
router.post('/create', isLoggedIn, exerciseValidations, validationMiddleware, createExercise);

/**
 * @swagger
 * /api/exercise:
 *   get:
 *     summary: Get all exercises
 *     description: Retrieve a list of all exercises.
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of exercises retrieved successfully
 *       '401':
 *         description: Unauthorized. User not logged in.
 *       '500':
 *         description: Internal server error
 */
router.get('/', isLoggedIn, getExercises);

/**
 * @swagger
 * /api/exercise/{id}:
 *   get:
 *     summary: Get exercise by ID
 *     description: Retrieve an exercise by its ID.
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the exercise to retrieve
 *     responses:
 *       '200':
 *         description: Exercise retrieved successfully
 *       '401':
 *         description: Unauthorized. User not logged in.
 *       '404':
 *         description: Exercise not found.
 *       '500':
 *         description: Internal server error
 */
router.get('/:id', isLoggedIn, getExercise);

/**
 * @swagger
 * /api/exercise/{id}:
 *   put:
 *     summary: Update exercise by ID
 *     description: Update an exercise by its ID.
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the exercise to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Exercise'
 *     responses:
 *       '200':
 *         description: Exercise updated successfully
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '401':
 *         description: Unauthorized. User not logged in.
 *       '404':
 *         description: Exercise not found.
 *       '500':
 *         description: Internal server error
 */
router.put('/:id', isLoggedIn, exerciseValidations, validationMiddleware, updateExercise);

/**
 * @swagger
 * /api/exercise/{id}:
 *   delete:
 *     summary: Delete exercise by ID
 *     description: Delete an exercise by its ID.
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the exercise to delete
 *     responses:
 *       '200':
 *         description: Exercise deleted successfully
 *       '401':
 *         description: Unauthorized. User not logged in.
 *       '404':
 *         description: Exercise not found.
 *       '500':
 *         description: Internal server error
 */
router.delete('/:id', isLoggedIn, deleteExercise);

module.exports = router;
