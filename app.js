import express from 'express';
import auth_route from './src/routes/auth_route.js';
import { errorHandler } from './src/middlewares/error_handler.js';
import { cors_middleware } from './src/middlewares/cors_middleware.js';
import {api_rate_limit} from './src/middlewares/rate_limit_middleware.js';



const app  = express();

//include middleware 
app.use(express.json());

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

// Global error handling middleware
app.use(errorHandler);

export default app;
