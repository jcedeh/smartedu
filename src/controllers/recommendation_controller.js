import { catchAsync } from "../utils/catchAsync.js";
import { generate_recommendations } from "../services/recommendations.js";


export const get_recommendations = catchAsync(async (req, res) => {
    const student_id = req.user.id
    const recommendation = generate_recommendations(student_id);
    res.status(200).json({message: 'success', data: recommendation});
})


