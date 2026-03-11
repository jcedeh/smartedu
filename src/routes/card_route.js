import { crash_card } from "../controllers/crashCard_controller.js";
import express from 'express';
import { roleAuthorization } from "../middlewares/role_authorization.js";
import { auth_middleware } from "../middlewares/auth_middleware.js";

const router = express.Router();

router.get('/', auth_middleware, roleAuthorization('student'), crash_card);


/**
 * @swagger
 * /api/crash-cards:
 *   get:
 *     summary: Get crash revision cards
 *     description: Retrieve quick revision crash cards for a specific subject or topic
 *     tags: [Crash Cards]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: subject
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter crash cards by subject
 *         example: Mathematics
 *
 *       - in: query
 *         name: topic
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter crash cards by topic
 *         example: Algebra
 *
 *     responses:
 *       200:
 *         description: Crash cards retrieved successfully
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
 *                   example: 4
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 65f7b7c18a34e6c9b91d3412
 *                       subject:
 *                         type: string
 *                         example: Mathematics
 *                       topic:
 *                         type: string
 *                         example: Algebra
 *                       title:
 *                         type: string
 *                         example: Algebra Basics
 *                       content:
 *                         type: string
 *                         example: Algebra uses symbols like x and y to represent numbers.
 *
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *
 *       404:
 *         description: No crash cards found
 *
 *       500:
 *         description: Internal server error
 */

export default router;