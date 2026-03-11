import {submit} from "../controllers/attempt_controller.js";
import { auth_middleware } from "../middlewares/auth_middleware.js";
import { roleAuthorization } from "../middlewares/role_authorization.js";
import express from 'express'   

const router = express.Router();

router.post('/attempts', auth_middleware, roleAuthorization('student'), submit);




/**
 * @swagger
 * /api/quiz/attempt:
 *   post:
 *     summary: Submit quiz answers
 *     description: Allows a student to submit answers for a quiz attempt.
 *     tags: [Quiz]
 *     security:
 *       - bearerAuth: []
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
 *                 example: "65fa91c4a72b9c23e4a1a111"
 *               quiz_id:
 *                 type: string
 *                 description: ID of the quiz being attempted
 *                 example: "65fa91c4a72b9c23e4a1a222"
 *               answers:
 *                 type: array
 *                 description: List of answers submitted by the student
 *                 items:
 *                   type: object
 *                   required:
 *                     - questionId
 *                     - selectedOptionId
 *                   properties:
 *                     questionId:
 *                       type: string
 *                       description: ID of the question
 *                       example: "65fa91c4a72b9c23e4a1a333"
 *                     selectedOptionId:
 *                       type: string
 *                       description: ID of the selected option
 *                       example: "65fa91c4a72b9c23e4a1a444"
 *               time_spent:
 *                 type: number
 *                 description: Total time spent on the quiz in seconds
 *                 example: 120
 *     responses:
 *       200:
 *         description: Quiz submitted successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized - Token required
 *       500:
 *         description: Internal server error
 */
router.post('/attempts', (req, res) => {
    res.status(200).json({ message: "Quiz submitted successfully" });
});


export default router;