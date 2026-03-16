import express from "express";
import { auth_middleware } from "../middlewares/auth_middleware.js";
import { roleAuthorization } from "../middlewares/role_authorization.js";
import { get_results } from "../controllers/result_controller.js";  

const router = express.Router();

router.get('/', auth_middleware, roleAuthorization('student'), get_results);

/**
 * @swagger
 * /api/results:
 *   get:
 *     summary: Get student result summary
 *     description: Retrieve subject result summary including quizzes taken, tests passed, overall accuracy, and grade remark.
 *     tags: [Results]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: subject
 *         required: true
 *         schema:
 *           type: string
 *         description: Subject to retrieve results for
 *         example: Math
 *     responses:
 *       200:
 *         description: Result summary retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 subject:
 *                   type: string
 *                   example: Math
 *                 total_quizzes_taken:
 *                   type: integer
 *                   example: 12
 *                 total_tests_passed:
 *                   type: integer
 *                   example: 9
 *                 overall_accuracy:
 *                   type: number
 *                   example: 75.5
 *                 grade_remark:
 *                   type: string
 *                   example: Good
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: No results found
 *       500:
 *         description: Internal server error
 */

export default router;
