import express from "express";
import { auth_middleware } from "../middlewares/auth_middleware.js";
import { roleAuthorization } from "../middlewares/role_authorization.js";
import { get_results } from "../controllers/result_controller.js";  

const router = express.Router();

router.get('/', get_results);

/**
 * @swagger
 * /api/results:
 *   get:
 *     summary: Get student result summary using parent access code
 *     description: Retrieve subject result summary including quizzes taken, tests passed, overall accuracy, and grade remark by providing a valid parent access code.
 *     tags: [Results]
 *     parameters:
 *       - in: query
 *         name: parent_access_code
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique access code provided to parents to view their child's results
 *         example: ABC123XYZ
 *     responses:
 *       200:
 *         description: Result summary retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 student_id:
 *                   type: string
 *                   example: 69b899b0dcd78c8512ed0f3f
 *                 subjects:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       subject:
 *                         type: string
 *                         example: Math
 *                       total_quizzes_taken:
 *                         type: integer
 *                         example: 12
 *                       total_tests_passed:
 *                         type: integer
 *                         example: 9
 *                       accuracy:
 *                         type: number
 *                         example: 75.5
 *                       grade_remark:
 *                         type: string
 *                         example: Good
 *       400:
 *         description: Invalid access code
 *       404:
 *         description: No results found for this access code
 *       500:
 *         description: Internal server error
 */

export default router;
