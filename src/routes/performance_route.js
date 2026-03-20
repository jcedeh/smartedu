import { get_performance } from "../controllers/performance_controller.js";
import express from 'express';
import { auth_middleware } from "../middlewares/auth_middleware.js";
import { roleAuthorization } from "../middlewares/role_authorization.js";

const router = express.Router();

router.get('/', auth_middleware, roleAuthorization, get_performance);

/**
 * @swagger
 * /api/performance:
 *   get:
 *     summary: Get student performance by topic
 *     description: Retrieve detailed performance metrics for each subject and topic for the authenticated student.
 *     tags: [Performance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: subject
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter performance by subject
 *     responses:
 *       200:
 *         description: Performance data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 performance:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       student_id:
 *                         type: string
 *                         example: 65f1a2b3c4d5e6f7890abc12
 *                       subject:
 *                         type: string
 *                         example: Mathematics
 *                       topic:
 *                         type: string
 *                         example: Algebra
 *                       total_attempts:
 *                         type: number
 *                         example: 4
 *                       total_correct:
 *                         type: number
 *                         example: 16
 *                       total_questions:
 *                         type: number
 *                         example: 20
 *                       mastery_level:
 *                         type: number
 *                         description: Mastery percentage (0–100)
 *                         example: 80
 *                       last_updated:
 *                         type: string
 *                         format: date-time
 *                         example: 2026-03-20T12:00:00Z
 *                       accuracy:
 *                         type: number
 *                         description: Computed accuracy percentage
 *                         example: 80
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       500:
 *         description: Internal server error
 */

export default router;