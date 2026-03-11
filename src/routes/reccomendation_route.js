import { recommendations } from "../controllers/recommendation_controller.js";
import express from 'express'
import { auth_middleware } from "../middlewares/auth_middleware.js";
import { roleAuthorization } from "../middlewares/role_authorization.js";

const router = express.Router();

router.get('/', auth_middleware, roleAuthorization('student'), recommendations);

/**
 * @swagger
 * /api/recommendations:
 *   get:
 *     summary: Get personalized learning recommendations
 *     description: Retrieve recommended topics and learning materials based on the student's performance and weaknesses
 *     tags: [Recommendations]
 *     security:
 *       - BearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Recommendations retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 results:
 *                   type: integer
 *                   example: 3
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       subject:
 *                         type: string
 *                         example: Mathematics
 *                       topic:
 *                         type: string
 *                         example: Algebra
 *                       recommendationType:
 *                         type: string
 *                         example: learning_material
 *                       message:
 *                         type: string
 *                         example: Review Algebra learning materials to improve your understanding.
 *
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *
 *       404:
 *         description: No recommendations available
 *
 *       500:
 *         description: Internal server error
 */

export default router;