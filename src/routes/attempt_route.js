import {submit} from "../controllers/attempt_controller.js";
import { auth_middleware } from "../middlewares/auth_middleware.js";
import { roleAuthorization } from "../middlewares/role_authorization.js";
import express from 'express'   

const router = express.Router();

router.post('/attempts', auth_middleware, roleAuthorization('student'), submit);



/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /api/attempt:
 *   post:
 *     summary: Submit a quiz attempt
 *     description: Authenticated students submit answers for a quiz attempt. The system scores the quiz and performs analytics.
 *     tags:
 *       - Quiz
 *     security:
 *       - bearerAuth: []
 *
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
 *                 description: Unique identifier of the student
 *                 example: stu_1023
 *
 *               quiz_id:
 *                 type: string
 *                 description: Unique identifier of the quiz
 *                 example: quiz_3001
 *
 *               time_spent:
 *                 type: integer
 *                 description: Time spent completing the quiz in seconds
 *                 example: 320
 *
 *               answers:
 *                 type: array
 *                 description: List of answers submitted by the student
 *                 items:
 *                   type: object
 *                   required:
 *                     - question_id
 *                     - selected_answer
 *                   properties:
 *                     question_id:
 *                       type: string
 *                       description: Unique identifier of the question
 *                       example: q101
 *
 *                     selected_answer:
 *                       type: string
 *                       description: Answer chosen by the student
 *                       example: "3/4"
 *
 *     responses:
 *       200:
 *         description: Quiz submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Quiz attempt submitted successfully
 *
 *                 score:
 *                   type: integer
 *                   example: 8
 *
 *                 total_questions:
 *                   type: integer
 *                   example: 10
 *
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *
 *       400:
 *         description: Invalid request payload
 *
 *       500:
 *         description: Internal server error
 */



export default router;