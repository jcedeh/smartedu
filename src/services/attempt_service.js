import mongoose from "mongoose";
import Question from "../models/question.js";
import Attempt from "../models/attempts.js";
import { update_topic_performance } from "./topic_performance_service.js";
import { update_streak } from "./streak_service.js";
import { process_learning_outcome } from "./orchestration_service.js";
import { create_crash_cards } from "./crash_card_service.js";
import { generate_subject_result_summary } from "./results_services.js";
import { update_mastery } from "./mastery.js";

const pass_mark = 15;
export const submit_attempt = async ({
  student_id,
  quiz_id,
  subject,
  topic,
  answers,
  time_taken
}) => {
    const existing_attempt = await Attempt.findOne({
        student_id,
        quiz_id 
    });

if (existing_attempt) {
  throw new Error("Quiz already submitted");
}
    const session = await mongoose.startSession();
    session.startTransaction();
  // 1. Fetch all answered questions
  const question_ids = answers.map(a => a.question_id);

  const questions = await Question.find({
    _id: { $in: question_ids }
  });

  let correct_count = 0;
  let evaluated_answers = [];

  // 2. Evaluate answers
  for (const answer of answers) {
    const question = questions.find(
      q => q._id.toString() === answer.question_id
    );

    if (!question) continue;

    const selected_answer = question.options.id(
      answer.selected_answer
    );

    const is_correct = selected_answer?.is_correct === true;

    if (is_correct) correct_count++;
    console.log(correct_count);

    evaluated_answers.push({
      question_id: question._id,
      selected_answer: answer.selected_answer,
      is_correct
    });
  }

  const total_questions = answers.length;
  const passed = correct_count >= pass_mark;

  // 3. Save attempt
  const attempt = await Attempt.create([{
    student_id,
    quiz_id,
    subject,
    topic,
    score: correct_count,
    time_taken: time_taken,
    answers: evaluated_answers,
    passed,
    submittedAt: new Date()
  }],
  { session }
  );


    //generate result summary for the quiz attempt
    await generate_subject_result_summary(student_id, subject, attempt[0]); 
    
    // weakness, recommendation, mastery level, learning outcome processing
    await process_learning_outcome(student_id);
    

    //update performance record for the student
    await update_topic_performance(
        student_id,
        subject,
        topic,
        correct_count,
        total_questions
    );

    //update mastery
    await update_mastery(student_id, subject, topic, correct_count, total_questions)
    

    //update streak record for the student
    await update_streak(student_id) ;

    //create crash
    await create_crash_cards(student_id);


    await session.commitTransaction();
    session.endSession();

  return {
    score: correct_count,
    subject,
    topic,
    total_questions,
    passed,
    attempt_id: attempt[0]._id
  };
};
