import {
    create_question,
    get_questions,
    get_question_by_id,
    update_question,
    delete_question,
    bulk_insert_questions
} from "../controllers/question_controller.js";
import express from "express";
import { auth_middleware } from "../middlewares/auth_middleware.js";
import { roleAuthorization } from "../middlewares/role_authorization.js";
const router = express.Router();

router.post("/", auth_middleware, roleAuthorization('admin'), create_question);
router.post("/bulk", auth_middleware, roleAuthorization('admin'), bulk_insert_questions);
router.get("/:id", auth_middleware, roleAuthorization('admin'), get_question_by_id);
router.put("/:id", auth_middleware, roleAuthorization('admin'), update_question);
router.delete("/:id", auth_middleware, roleAuthorization('admin'), delete_question);
router.get("/", auth_middleware, roleAuthorization('admin'), get_questions);

export default router;  