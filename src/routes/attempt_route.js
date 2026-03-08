import {submit} from "../controllers/attempt_controller.js";
import { auth_middleware } from "../middlewares/auth_middleware.js";
import { roleAuthorization } from "../middlewares/role_authorization.js";
import express from 'express'   

const router = express.Router();

router.post('/attempts', auth_middleware, roleAuthorization('student'), submit);

export default router;



/**
 * @swagger
 * /api/quiz/attempt:
 *   post:
 *     summary: Submit quiz answers
 *     tags: [Quiz]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - student_id
 *               - quiz_id
 *               - answers
 *               - time_spent
 *             properties:
 *               student_id:
 *                 type: string
 *                 description: ID of the student attempting the quiz
 *                 example: "65f1a6b9a23b4c001f1c1234"
 *               quiz_id:
 *                 type: string
 *                 description: ID of the quiz
 *                 example: "65f1a6b9a23b4c001f1c5678"
 *               answers:
 *                 type: array
 *                 description: List of answers submitted by the student
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionId:
 *                       type: string
 *                       example: "65f1a6b9a23b4c001f1c9999"
 *                     selectedOptionId:
 *                       type: string
 *                       example: "65f1a6b9a23b4c001f1c8888"
 *               time_spent:
 *                 type: number
 *                 description: Time spent on the quiz in seconds
 *                 example: 120
 *     responses:
 *       200:
 *         description: Quiz submitted successfully
 */
router.post("/attempts", submit);