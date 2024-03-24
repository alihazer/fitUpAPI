const{ body, validationResult } = require('express-validator');

const registerValidation = [
    body("name", "Name is required").notEmpty(),
    body("email", "Please Provide an email").isEmail(),
    body("password", "Password must be more than 6 char").isLength({
        min: 6
    }),
    body("weight").notEmpty().withMessage("Weight is required")
                  .isFloat().withMessage("Weight must be a number"),
    body("goal", "Please Provide a goal").notEmpty(),
    body("age", "Age is required").notEmpty()
]

const loginValidation = [
    body("email", "Please Provide an email").isEmail(),
    body("password", "Please Provide a password").notEmpty()
]

const exerciseValidations = [
    body("title", "Title is required").notEmpty(),
    body("description", "Description is required").notEmpty(),
    body("category", "Category is required").notEmpty(),
    body("duration", "Duration is required").notEmpty(),
    body("intensity", "Intensity is required").notEmpty(),
    body("sets", "Sets is required").notEmpty(),
    body("reps", "Reps is required").notEmpty(),
    body("rest", "Rest is required").notEmpty(),
    body("targetedMuscles", "Targeted Muscles is required").notEmpty().isArray(),
    body("image", "Image is required").notEmpty(),
    body("youtubeVideo", "Youtube Video is required").notEmpty()
]

const workoutValidations = [
    body("title", "Title is required").notEmpty(),
    body("description", "Description is required").notEmpty(),
    body("exercises", "Exercises is required").notEmpty().isArray(),
    body("image", "Image is required").notEmpty(),
    body("duration", "Duration is required").notEmpty()
]

const foodItemValidations = [
    body("name", "Name is required").notEmpty(),
    body("protein", "Protein is required").notEmpty(),
    body("carbs", "Carbs is required").notEmpty(),
    body("fats", "Fats is required").notEmpty(),
    body("image", "Image is required").notEmpty()
]

const nutritionPlanValidations = [
    body("title", "Title is required").notEmpty(),
    body("description", "Description is required").notEmpty(),
    body("image", "Image is required").notEmpty(),
    body("foodItems", "Food Items is required").notEmpty().isArray(),
    body("maximumCalories", "Maximum Calories is required").notEmpty()
]

const validationMiddleware = (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        return next();
    }
    const messages = result.array().map((err)=> {
        return {
            path: err.path,
            message: err.msg
        }
    });
    return res.status(400).json({
        status: false,
        errors: messages
    });
}



module.exports = { validationMiddleware, registerValidation, loginValidation, exerciseValidations, workoutValidations, foodItemValidations, nutritionPlanValidations }