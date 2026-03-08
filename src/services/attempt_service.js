import mongoose from "mongoose";
import Question from "../models/question.js";
import Attempt from "../models/attempts.js";
import { update_performance } from "./performance_service.js";
import { update_streak } from "./streak_service.js";
import { process_learning_outcome } from "./orchestration_service.js";

const pass_mark = 3;
export const submit_attempt = async ({
  student_id,
  quiz_id,
  answers,
  timeSpent
}) => {
    const existingAttempt = await Attempt.findOne({
        student_id,
        quiz_id 
    });

if (existingAttempt) {
  throw new Error("Quiz already submitted");
}
    const session = await mongoose.startSession();
    session.startTransaction();
  // 1. Fetch all answered questions
  const questionIds = answers.map(a => a.questionId);

  const questions = await Question.find({
    _id: { $in: questionIds }
  });

  let correctCount = 0;
  let evaluatedAnswers = [];

  // 2. Evaluate answers
  for (const answer of answers) {
    const question = questions.find(
      q => q._id.toString() === answer.questionId
    );

    if (!question) continue;

    const selectedOption = question.options.id(
      answer.selectedOptionId
    );

    const isCorrect = selectedOption?.isCorrect === true;

    if (isCorrect) correctCount++;

    evaluatedAnswers.push({
      questionId: question._id,
      selectedOptionId: answer.selectedOptionId,
      isCorrect
    });
  }

  const total = questions.length;
  const passed = correctCount >= pass_mark;

  // 3. Save attempt
  const attempt = await Attempt.create([{
    student_id,
    quiz_id,
    score: correctCount,
    time_taken: timeSpent,
    answers: evaluatedAnswers,
    passed,
    submittedAt: new Date()
  }],
  { session }
  );

  
     //const studentId = attempt.studentId;

    await process_learning_outcome(student_id);

    //update performance record for the student
    await update_performance(student_id, attempt);
    

    //update streak record for the student
    await update_streak(student_id);

    await session.commitTransaction();
    session.endSession();

  return {
    score: correctCount,
    total,
    passed,
    attemptId: attempt._id
  };
};
