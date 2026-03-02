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

/**
 * @swagger
 * /auth/password-forget:
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


/**
 * @swagger
 * /auth/password-reset:
 *   put:
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


export default router;

