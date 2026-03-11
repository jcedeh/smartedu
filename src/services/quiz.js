import Questions from "../models/question.js";

export const generateQuiz = async (subject, topic) => {
  const questions = await Questions.aggregate([
    { $match: { subject, topic } },
    { $sample: { size: 10 } }
  ]);

  return questions;
  
};