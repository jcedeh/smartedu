import Quiz from "./models/Quiz.js";
import Question from "./models/Question.js";

export const startQuiz = async ({
  quizId,
  studentId,
  limit
}) => {
  const quiz = await Quiz.findById(quizId);

  if (!quiz) {
    throw new Error("Quiz not found");
  }

  // Decide how many questions to pull
  const numberOfQuestions = Math.min(
    Number(limit) || quiz.numberOfQuestions,
    quiz.numberOfQuestions // hard cap (security)
  );

  const questions = await Question.aggregate([
    { $sample: { size: numberOfQuestions } }
  ]);

  // Never send isCorrect to frontend
  return questions.map(q => ({
    _id: q._id,
    text: q.text,
    topic: q.topic,
    options: q.options.map(o => ({
      _id: o._id,
      text: o.text
    }))
  }));
};