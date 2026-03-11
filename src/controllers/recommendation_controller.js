import { generate_recommendations } from "../services/recommendations.js";
import { catchAsync } from "../utils/catchAsync.js";

export const recommendations = catchAsync(async(req, res)=> {
    const student_id = req.user;
    const weakTopics = req.body;
    const topic_recommendations = await generate_recommendations(student_id, weakTopics);
    res.status(200).json({message: success, data: topic_recommendations});
})