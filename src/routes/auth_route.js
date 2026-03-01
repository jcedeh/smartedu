import { 
        register, 
        login,
        forgot_password,
        reset_password
} from "../controllers/auth_controller.js";
import { auth_middleware } from "../middlewares/auth_middleware.js";
import { is_student } from "../middlewares/role_authorization.js";
import { route_rate_limit } from "../middlewares/rate_limit_middleware.js";
import express from 'express'

const router = express.Router();

router.post('/register', route_rate_limit, register);
router.post('/login', route_rate_limit, login);
router.post('/password-forget', route_rate_limit, forgot_password);
router.put('/password-reset', route_rate_limit, reset_password);
router.get('/test', auth_middleware, is_student('student'), (req, res)=> {
    res.send("auth route is working");
}
)

export default router;