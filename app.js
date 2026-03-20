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
import result_route from './src/routes/result_route.js';
import mastery_route from './src/routes/mastery_route.js';
import performance_route from './src/routes/performance_route.js';
import helmet from "helmet";



// Swagger configuration
import swaggerJsdoc from 'swagger-jsdoc';     
import cors from 'cors';

const app  = express();

//include middleware 
app.use(express.json());

//security middleware
// using a safe in-place sanitizer for Express 5 getter-only req.query
const sanitizeObject = (obj) => {
  if (!obj || typeof obj !== 'object') return;
  Object.keys(obj).forEach((key) => {
    // filter unsafe operator keys, preserve email dots and @ in values
    if (key.startsWith('$') || key.includes('.')) {
      delete obj[key];
      return;
    }

    const value = obj[key];

    if (typeof value === 'string') {
      // keep email structure intact, only remove Mongo operators from strings
      obj[key] = value.replace(/\$/g, '');
    } else if (value && typeof value === 'object') {
      sanitizeObject(value);
    }
  });
};

app.use((req, res, next) => {
  sanitizeObject(req.body);
  sanitizeObject(req.params);
  sanitizeObject(req.query);
  next();
});

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
); 

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
app.use('/api/results', result_route);
app.use('/api/mastery', mastery_route);
app.use('/api/performance', performance_route);


// Global error handling middleware
app.use(errorHandler);

export default app;
