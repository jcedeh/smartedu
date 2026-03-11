import { create_quiz } from "../controllers/quiz_controller.js";
import express from 'express';
import { auth_middleware } from "../middlewares/auth_middleware.js";
import { roleAuthorization } from "../middlewares/role_authorization.js";

const router = express.Router();

router.get('/', auth_middleware, roleAuthorization('student'), create_quiz);


/**
 * @swagger
 * /api/quiz:
 *   get:
 *     summary: Generate a quiz
 *     description: Retrieve a set of quiz questions based on subject and topic
 *     tags: [Quiz]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: subject
 *         schema:
 *           type: string
 *         required: true
 *         description: Subject of the quiz
 *         example: Mathematics
 *
 *       - in: query
 *         name: topic
 *         schema:
 *           type: string
 *         required: true
 *         description: Topic of the quiz
 *         example: Algebra
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Number of questions to return
 *         example: 10
 *
 *     responses:
 *       200:
 *         description: Quiz questions retrieved successfully
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
 *                   example: 10
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 65f4b02c1e8f23a9b23456aa
 *                       question:
 *                         type: string
 *                         example: What is 5 + 3?
 *                       options:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["6", "7", "8", "9"]
 *                       subject:
 *                         type: string
 *                         example: Mathematics
 *                       topic:
 *                         type: string
 *                         example: Arithmetic
 *
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *
 *       404:
 *         description: No quiz questions found for the selected subject or topic
 *
 *       500:
 *         description: Internal server error
 */


export default router;


