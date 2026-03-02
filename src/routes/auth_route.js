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





/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user {student(grade level compulsory) or parent(child ids compulsory)}
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUser'
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/api/auth/register", (req, res) => {
  res.status(201).json({ message: "User registered" });
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUser'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 */
router.post("/api/auth/login", (req, res) => {
  res.json({ token: "jwt.token.here" });
});


export default router;

