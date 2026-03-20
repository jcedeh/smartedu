import { detect_weak_topics } from "../services/weakness_service.js";
import { catchAsync } from "../utils/catchAsync.js";

export const weakness = catchAsync(async(req, res)=>{
    const student_id = req.user.id
    const weakness = await detect_weak_topics(student_id);
    res.status(200).json({message: success, data: weakness});
})