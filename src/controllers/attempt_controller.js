import { submit_attempt } from "../services/attempt_service.js";
import { catchAsync } from "../utils/catchAsync.js";

//submit attempt controller
export const submit = catchAsync(async(req, res)=> {
    const {quiz_id, subject, topic, answers, time_taken} = req.body;
    const student_id = req.user.id;
    const attempt = await submit_attempt({student_id, quiz_id, subject, topic, answers, time_taken});
    return res.status(201).json({message: "success", data: attempt});
})
