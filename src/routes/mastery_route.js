import { get_mastery_controller } from "../controllers/mastery_controller.js";
import express from 'express';
import { auth_middleware } from "../middlewares/auth_middleware.js";
import { roleAuthorization } from "../middlewares/role_authorization.js";

const router = express.Router();

router.get('/', auth_middleware, roleAuthorization('student'), get_mastery_controller);

/**
 * @swagger
 * /api/mastery:
 *   get:
 *     summary: Get student mastery levels
 *     description: Retrieve mastery levels for all subjects and topics for the authenticated student.
 *     tags: [Mastery]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved mastery data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 mastery:
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
 *                       mastery_level:
 *                         type: number
 *                         example: 65
 *                       status:
 *                         type: string
 *                         enum: [weak, average, strong]
 *                         example: average
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       500:
 *         description: Internal server error
 */

export default router;