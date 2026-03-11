import { generateQuiz } from "../services/quiz.js";
import { catchAsync } from "../utils/catchAsync.js";

export const create_quiz = catchAsync(async(req, res)=> {
    const {subject, topic} = req.query;
    const quiz = await generateQuiz(subject, topic);
    return res.status(201).json({message: "success", quiz});
})
