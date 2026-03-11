import { material_controller } from "../controllers/material_controller.js";
import express from "express";
import { auth_middleware } from "../middlewares/auth_middleware.js";
import { roleAuthorization } from "../middlewares/role_authorization.js";

const router = express.Router();
router.get('/', auth_middleware, roleAuthorization('student'), material_controller);


  

/**
 * @swagger
 * /api/materials:
 *   get:
 *     summary: Get learning materials
 *     tags: [Learning Materials]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: subject
 *         schema:
 *           type: string
 *         description: Filter by subject
 *       - in: query
 *         name: topic
 *         schema:
 *           type: string
 *         description: Filter by topic
 *     responses:
 *       200:
 *         description: Learning materials retrieved successfully
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 */
router.get('/', (req, res) => {
    res.status(200).json({ message: "Learning materials retrieved successfully" });
});






export default router;