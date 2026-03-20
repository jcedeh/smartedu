import TopicPerformance from "../models/topic_performance.js";
import { catchAsync } from "../utils/catchAsync.js";

export const get_performance = catchAsync(async(req, res)=> {
    const student_id = req.user.id;
    const performance = await TopicPerformance.find(student_id);

    if(!performance) {
        res.status(400).json({message: "record not found"})
    }
    res.status(200).json({message: "success", data: performance});
})