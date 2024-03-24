const express = require('express');
const router = express.Router();
const  isLoggedIn  = require('../Middlewares/isLoggedIn');
const { nutritionPlanValidations, validationMiddleware } = require('../Middlewares/validations');
const {
  createPlan,
  getPlans,
  getPlanById,
  updatePlan,
  deletePlan,
} = require('../Controllers/nutritionPlanController');

/**
 * @swagger
 * tags:
 *   name: Nutrition Plans
 *   description: CRUD operations for nutrition plans
 */

/**
 * @swagger
 * /api/plan/create:
 *   post:
 *     summary: Create a new nutrition plan
 *     description: Create a new nutrition plan record.
 *     tags: [Nutrition Plans]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NutritionPlan'
 *     responses:
 *       '200':
 *         description: Nutrition plan created successfully
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '401':
 *         description: Unauthorized. User not logged in.
 *       '500':
 *         description: Internal server error
 */
router.post('/create', isLoggedIn, nutritionPlanValidations, validationMiddleware, createPlan);

/**
 * @swagger
 * /api/plan:
 *   get:
 *     summary: Get all nutrition plans
 *     description: Retrieve a list of all nutrition plans.
 *     tags: [Nutrition Plans]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of nutrition plans retrieved successfully
 *       '401':
 *         description: Unauthorized. User not logged in.
 *       '500':
 *         description: Internal server error
 */
router.get('/', isLoggedIn, getPlans);

/**
 * @swagger
 * /api/plan/{id}:
 *   get:
 *     summary: Get nutrition plan by ID
 *     description: Retrieve a nutrition plan by its ID.
 *     tags: [Nutrition Plans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the nutrition plan to retrieve
 *     responses:
 *       '200':
 *         description: Nutrition plan retrieved successfully
 *       '401':
 *         description: Unauthorized. User not logged in.
 *       '404':
 *         description: Nutrition plan not found.
 *       '500':
 *         description: Internal server error
 */
router.get('/:id', isLoggedIn, getPlanById);

/**
 * @swagger
 * /api/plan/{id}:
 *   put:
 *     summary: Update nutrition plan by ID
 *     description: Update a nutrition plan by its ID.
 *     tags: [Nutrition Plans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the nutrition plan to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NutritionPlan'
 *     responses:
 *       '200':
 *         description: Nutrition plan updated successfully
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '401':
 *         description: Unauthorized. User not logged in.
 *       '404':
 *         description: Nutrition plan not found.
 *       '500':
 *         description: Internal server error
 */
router.put('/:id', isLoggedIn, nutritionPlanValidations, validationMiddleware, updatePlan);

/**
 * @swagger
 * /api/plan/{id}:
 *   delete:
 *     summary: Delete nutrition plan by ID
 *     description: Delete a nutrition plan by its ID.
 *     tags: [Nutrition Plans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the nutrition plan to delete
 *     responses:
 *       '200':
 *         description: Nutrition plan deleted successfully
 *       '401':
 *         description: Unauthorized. User not logged in.
 *       '404':
 *         description: Nutrition plan not found.
 *       '500':
 *         description: Internal server error
 */
router.delete('/:id', isLoggedIn, deletePlan);

module.exports = router;
