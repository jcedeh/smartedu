import { weakness } from "../controllers/weakness_controller.js";
import express from 'express'
import { auth_middleware } from "../middlewares/auth_middleware.js";
import { roleAuthorization } from "../middlewares/role_authorization.js";

const router = express.Router();

router.get('/', auth_middleware, roleAuthorization, weakness);

/**
 * swagger
 * /api/weakness:
 *   get:
 *     summary: Get student weak areas
 *     description: Retrieve topics or subjects where the student is performing poorly based on quiz performance
 *     tags: [Performance]
 *     security:
 *       - BearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Weakness areas retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
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
 *                       accuracy:
 *                         type: number
 *                         example: 40
 *                       recommendation:
 *                         type: string
 *                         example: Review Algebra learning materials
 *
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *
 *       404:
 *         description: No weaknesses detected
 *
 *       500:
 *         description: Internal server error
 */


export default router;