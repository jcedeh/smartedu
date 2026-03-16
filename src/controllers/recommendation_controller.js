import { catchAsync } from "../utils/catchAsync.js";
import Recommendation from "../models/recommendation.js";

export const get_recommendations = catchAsync(async (req, res) => {
    const student_id = req.user
    const recommendations = await Recommendation.find({ student_id }).populate('material_id');
    return res.status(200).json({ message: "success", recommendations });
})


