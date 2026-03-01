import { 
        register, 
        login,
        forgot_password,
        reset_password
} from "../controllers/auth_controller.js";
import { auth_middleware } from "../middlewares/auth_middleware.js";
import { is_student } from "../middlewares/role_authorization.js";
import { route_rate_limit } from "../middlewares/rate_limit_middleware.js";
import { 
        RegisterUserSchema, 
        LoginUserSchema, 
        RegisterResponseSchema, 
        LoginResponseSchema 
    } from "../swagger/schemas.js";
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
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '../swagger/schemas.js#/RegisterUserSchema'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../swagger/schemas.js#/RegisterResponseSchema'
 */
router.post("/register", (req, res) => {
  // Your register logic here
  res.status(201).json({ message: "User registered successfully", userId: "64f123abc..." });
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '../swagger/schemas.js#/LoginUserSchema'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../swagger/schemas.js#/LoginResponseSchema'
 */
router.post("/login", (req, res) => {
  // Your login logic here
  res.json({ token: "jwt-token-here", user: { email: "student@example.com", role: "student", isActive: true } });
});



export default router;

