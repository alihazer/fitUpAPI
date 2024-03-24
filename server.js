const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/db.js');
const { globalErrorHandler, notFoundErrorHandler } = require('./Middlewares/globalErrorHandler.js');
const authRoutes = require('./Routes/authRoutes.js');
const exerciseRoutes = require('./Routes/exerciseRoutes.js');
const workoutRoutes = require('./Routes/workoutRoutes.js');
const itemRoutes = require('./Routes/foodItemRoutes.js');
const planRoutes = require('./Routes/nutritionPlanRoutes.js');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerSpec.js');
const cors = require('cors');
const app = express();
dotenv.config();
connectDb()
app.use(express.json());

// Allow CORS
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

// swagger ui0
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/exercise', exerciseRoutes);
app.use('/api/workout', workoutRoutes);
app.use('/api/item', itemRoutes);
app.use('/api/plan', planRoutes);
// Error Handling
app.use(notFoundErrorHandler);
app.use(globalErrorHandler);
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});