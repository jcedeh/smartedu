import { submit_attempt } from "../services/attempt_service.js";
import { catchAsync } from "../utils/catchAsync.js";

//submit attempt controller
export const submit = catchAsync(async(req, res)=> {
    const {student_id, quiz_id, answers, time_spent} = req.body;
    const attempt = await submit_attempt({student_id, quiz_id, answers, time_spent});
    return res.status(200).json({message: "success", data: attempt});
})
