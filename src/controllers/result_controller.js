import Result from "../models/results.js";
import {catchAsync} from "../utils/catchAsync.js";

export const get_results = catchAsync(async (req, res) => {
    const student_id = req.user;
    const results = await Result.find({ student_id }).populate('quiz_id');
    return res.status(200).json({ message: "success", results });
})  
