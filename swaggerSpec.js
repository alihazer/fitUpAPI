const swaggerJsdoc = require('swagger-jsdoc');

// Define schemas for Exercise, FoodItem, and NutritionPlan
const exerciseSchema = {
    type: 'object',
    properties: {
      title: { type: 'string', description: 'The title of the exercise.' },
      description: { type: 'string', description: 'Description of the exercise.' },
      category: {
        type: 'string',
        enum: ['Cardio', 'Strength', 'Flexibility'],
        description: 'Category of the exercise.',
      },
      duration: { type: 'number', description: 'Duration of the exercise in minutes.' },
      intensity: {
        type: 'string',
        enum: ['Low', 'Moderate', 'High'],
        description: 'Intensity level of the exercise.',
      },
      sets: { type: 'number', description: 'Number of sets for the exercise.' },
      reps: { type: 'number', description: 'Number of repetitions for each set.' },
      rest: { type: 'number', description: 'Rest time in seconds between sets.' },
      image: { type: 'string', description: 'URL or path to the image of the exercise.' },
      youtubeVideo: { type: 'string', description: 'URL to a YouTube video demonstrating the exercise.' },
      targetedMuscles: {
        type: 'array',
        items: { type: 'string' },
        description: 'Muscles targeted by the exercise.',
      },
      user: { type: 'string', description: 'ID of the user who owns the exercise.' },
    },
  };

  const foodItemSchema = {
    type: 'object',
    properties: {
      name: { type: 'string', description: 'The name of the food item.' },
      calories: { type: 'number', description: 'Number of calories in the food item.' },
      protein: { type: 'number', description: 'Amount of protein in grams.' },
      carbs: { type: 'number', description: 'Amount of carbohydrates in grams.' },
      fats: { type: 'number', description: 'Amount of fat in grams.' },
      user: { type: 'string', description: 'ID of the user who owns the food item.' },
      image: { type: 'string', description: 'URL or path to the image of the food item.' },
    },
  };
  

  const nutritionPlanSchema = {
    type: 'object',
    properties: {
      title: { type: 'string', description: 'The title of the nutrition plan.' },
      description: { type: 'string', description: 'Description of the nutrition plan.' },
      foodItems: {
        type: 'array',
        items: { type: 'string' }, // Assuming foodItems are represented by their IDs
        description: 'IDs of the food items included in the nutrition plan.',
      },
      user: { type: 'string', description: 'ID of the user who owns the nutrition plan.' },
      image: { type: 'string', description: 'URL or path to the image of the nutrition plan.' },
      calories: { type: 'number', description: 'Total number of calories in the nutrition plan.' },
      protein: { type: 'number', description: 'Total amount of protein in grams in the nutrition plan.' },
      carbs: { type: 'number', description: 'Total amount of carbohydrates in grams in the nutrition plan.' },
      fats: { type: 'number', description: 'Total amount of fat in grams in the nutrition plan.' },
      maximumCalories: { type: 'number', description: 'Maximum allowed calories per day in the nutrition plan.' },
    },
  };

  const userSchema = {
    type: 'object',
    properties: {
      name: { type: 'string', description: 'The name of the user.' },
      email: { type: 'string', description: 'The email address of the user.' },
      password: { type: 'string', description: 'The password of the user.' },
      weight: { type: 'number', description: 'The weight of the user in kilograms.' },
      goal: {
        type: 'string',
        enum: ['Lose Weight', 'Gain Weight', 'Maintain Weight'],
        description: 'The goal of the user.',
      },
      age: { type: 'number', description: 'The age of the user in years.' },
    },
  };

  const workoutSchema = {
    type: 'object',
    properties: {
      title: { type: 'string', description: 'The title of the workout.' },
      description: { type: 'string', description: 'Description of the workout.' },
      exercises: {
        type: 'array',
        items: { type: 'string' }, // Assuming exercises are represented by their IDs
        description: 'IDs of the exercises included in the workout.',
      },
      user: { type: 'string', description: 'ID of the user who owns the workout.' },
      image: { type: 'string', description: 'URL or path to the image of the workout.' },
      intensity: {
        type: 'string',
        enum: ['Low', 'Moderate', 'High'],
        description: 'Intensity level of the workout.',
      },
      duration: { type: 'number', description: 'Duration of the workout in minutes.' },
    },
  };
  

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'FitUp API',
      version: '1.0.0',
      description: 'A fitness and nutrition API for managing workouts, exercises, food items, and nutrition plans.',
    },
    servers: [
      {
        url: 'https://fitup-9c237d91d79b.herokuapp.com/',
        description: 'Testing server',
      },
    ],
    components: {
      schemas: {
        User: userSchema,
        Workout: workoutSchema,
        Exercise: exerciseSchema,
        FoodItem: foodItemSchema,
        NutritionPlan: nutritionPlanSchema,
      },
    },
  },
  apis: ['./Routes/*.js'], 
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
