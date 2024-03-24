const express = require('express');
const router = express.Router();
const  isLoggedIn  = require('../Middlewares/isLoggedIn');
const { foodItemValidations, validationMiddleware } = require('../Middlewares/validations');
const {
  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem,
} = require('../Controllers/foodItemController');


/**
 * @swagger
 * tags:
 *   name: Food Items
 *   description: CRUD operations for food items
 */

/**
 * @swagger
 * /api/item/create:
 *   post:
 *     summary: Create a new food item
 *     description: Create a new food item record.
 *     tags: [Food Items]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FoodItem'
 *     responses:
 *       '200':
 *         description: Food item created successfully
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '401':
 *         description: Unauthorized. User not logged in.
 *       '500':
 *         description: Internal server error
 */
router.post('/create', foodItemValidations, validationMiddleware, isLoggedIn, createItem);

/**
 * @swagger
 * /api/item:
 *   get:
 *     summary: Get all food items
 *     description: Retrieve a list of all food items.
 *     tags: [Food Items]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of food items retrieved successfully
 *       '401':
 *         description: Unauthorized. User not logged in.
 *       '500':
 *         description: Internal server error
 */
router.get('/', isLoggedIn, getItems);

/**
 * @swagger
 * /api/item/{id}:
 *   get:
 *     summary: Get food item by ID
 *     description: Retrieve a food item by its ID.
 *     tags: [Food Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the food item to retrieve
 *     responses:
 *       '200':
 *         description: Food item retrieved successfully
 *       '401':
 *         description: Unauthorized. User not logged in.
 *       '404':
 *         description: Food item not found.
 *       '500':
 *         description: Internal server error
 */
router.get('/:id', isLoggedIn, getItem);

/**
 * @swagger
 * /api/item/{id}:
 *   put:
 *     summary: Update food item by ID
 *     description: Update a food item by its ID.
 *     tags: [Food Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the food item to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FoodItem'
 *     responses:
 *       '200':
 *         description: Food item updated successfully
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '401':
 *         description: Unauthorized. User not logged in.
 *       '404':
 *         description: Food item not found.
 *       '500':
 *         description: Internal server error
 */
router.put('/:id', isLoggedIn, foodItemValidations, validationMiddleware, updateItem);

/**
 * @swagger
 * /api/item/{id}:
 *   delete:
 *     summary: Delete food item by ID
 *     description: Delete a food item by its ID.
 *     tags: [Food Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the food item to delete
 *     responses:
 *       '200':
 *         description: Food item deleted successfully
 *       '401':
 *         description: Unauthorized. User not logged in.
 *       '404':
 *         description: Food item not found.
 *       '500':
 *         description: Internal server error
 */
router.delete('/:id', isLoggedIn, deleteItem);

module.exports = router;
