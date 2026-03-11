import { weakness } from "../controllers/weakness_controller.js";
import express from 'express'
import { auth_middleware } from "../middlewares/auth_middleware.js";
import { roleAuthorization } from "../middlewares/role_authorization.js";

const router = express.Router();

router.get('/', auth_middleware, roleAuthorization, weakness);

export default router;