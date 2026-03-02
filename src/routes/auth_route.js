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
 * /api/auth/register:
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
router.post("/register", (req, res) => {
  res.status(201).json({ message: "User registered" });
});

/**
 * @swagger
 * /api/auth/login:
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
router.post("/login", (req, res) => {
  res.json({ token: "jwt.token.here" });
});


/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Request password reset
 *     description: Sends a password reset OTP or link to the user's email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Password reset email sent
 *       404:
 *         description: User not found
 */
router.post("/password-forget", (req, res) => {
  res.json({ message: "Password reset email sent" });
}); 




/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset user password
 *     description: Resets password using OTP or reset token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *               - newPassword
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               otp:
 *                 type: number
 *                 example: 123456
 *               newPassword:
 *                 type: string
 *                 example: NewStrongPassword123
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid or expired OTP
 */
router.put("/password-reset", (req, res) => {
  res.json({ message: "Password reset successful" });
});
export default router;

