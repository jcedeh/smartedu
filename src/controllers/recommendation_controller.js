import { generate_recommendations } from "../services/recommendations.js";
import { catchAsync } from "../utils/catchAsync.js";
import { detect_weak_topics } from "../services/weakness_service.js";

export const recommendations = catchAsync(async(req, res)=> {
    const student_id = req.user;
    const weakTopics = await detect_weak_topics(student_id);
    const topic_recommendations = await generate_recommendations(student_id, weakTopics);
    res.status(200).json({message: "Recommendations generated successfully", data: topic_recommendations});
})