import dashboard from '../controllers/dashboard_controller.js'
import express from 'express';
import { auth_middleware } from '../middlewares/auth_middleware.js';
import { roleAuthorization } from '../middlewares/role_authorization.js';


const router = express.Router();

router.get('/', auth_middleware,  dashboard)


/**
 * swagger
 * /api/dashboard:
 *   get:
 *     summary: Get student dashboard overview
 *     description: Retrieve a summary of the student's learning performance including overall score, streak, quizzes attempted, and weak topics
 *     tags: [Dashboard]
 *     security:
 *       - BearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalQuizzesAttempted:
 *                       type: integer
 *                       example: 12
 *                     averageScore:
 *                       type: number
 *                       example: 68
 *                     streak:
 *                       type: integer
 *                       example: 5
 *                     weakTopics:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Algebra", "Geometry"]
 *                     recommendations:
 *                       type: integer
 *                       example: 3
 *
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *
 *       500:
 *         description: Internal server error
 */

router.get('/', (req, res) => {
    res.send("dashboard route is working");
})

export default router;