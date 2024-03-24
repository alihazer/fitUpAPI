const express = require('express');
const router = express.Router();
const { signUp, login } = require('../Controllers/authController');
const { registerValidation, loginValidation, validationMiddleware } = require('../Middlewares/validations');


/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication endpoints
 */

/**
 * @swagger
 * api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided credentials.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User registered successfully
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '500':
 *         description: Internal server error
 */
router.post('/signup', registerValidation, validationMiddleware, signUp);

/**
 * @swagger
 * api/auth/login:
 *   post:
 *     summary: Authenticate user
 *     description: Authenticate user with the provided credentials.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User authenticated successfully
 *       '401':
 *         description: Unauthorized. Invalid credentials.
 *       '500':
 *         description: Internal server error
 */
router.post('/login', loginValidation, validationMiddleware, login);

module.exports = router;
