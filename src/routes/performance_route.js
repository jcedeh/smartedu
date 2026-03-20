import { get_performance } from "../controllers/performance_controller.js";
import express from 'express';
import { auth_middleware } from "../middlewares/auth_middleware.js";
import { roleAuthorization } from "../middlewares/role_authorization.js";

const router = express.Router();

router.get('/', auth_middleware, roleAuthorization, get_performance);



export default router;