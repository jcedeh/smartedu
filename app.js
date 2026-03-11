import express from 'express';
import auth_route from './src/routes/auth_route.js';
import question_route from './src/routes/question_route.js';
import { errorHandler } from './src/middlewares/error_handler.js';
import { cors_middleware } from './src/middlewares/cors_middleware.js';
import {api_rate_limit} from './src/middlewares/rate_limit_middleware.js';
import swaggerUi, { swaggerUiSetup } from './swagger/swagger.js';
import attempt_route from './src/routes/attempt_route.js';
import material_route  from './src/routes/material_route.js';
import card_route from  './src/routes/card_route.js';
import weakness_route from './src/routes/weakness_route.js'
import recommendation_route from './src/routes/reccomendation_route.js'
import quiz_route from './src/routes/quiz_route.js';
import cors from 'cors';

const app  = express();

//include middleware 
app.use(express.json());

// Swagger UI route
app.use('/api-docs', swaggerUi.serve, swaggerUiSetup);


//enable CORS
app.use(cors_middleware);

//apply api rate limit
app.use(api_rate_limit);

//test routes
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'API is healthy' });
});

//include routes
app.use('/api/auth', auth_route);
app.use('/api/questions', question_route);
app.use('/api/quiz', attempt_route);
app.use('/api/materials', material_route); 
app.use('/api/cards', card_route);
app.use('/api/weakness', weakness_route);
app.use('/api/recommendations', recommendation_route);
app.use('/api/quiz', quiz_route);


// Global error handling middleware
app.use(errorHandler);

export default app;
