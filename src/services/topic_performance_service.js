import topicPerformance from "../models/topic_performance.js";

export const update_topic_performance = async (
  student_id,
  subject,
  topic,
  correct_count,
  total_questions
) => {
  correct_count = Number(correct_count) || 0;
  total_questions = Number(total_questions) || 0;

  const performance = await topicPerformance.findOne({
    student_id,
    subject,
    topic
  });

  if (!performance) {

    let accuracy = (correct_count / total_questions) * 100;
    if (!Number.isFinite(accuracy)) {
      accuracy = 0;
    }

    await topicPerformance.create({
      student_id,
      subject,
      topic,
      correct_answers: correct_count,
      total_questions: total_questions,
      accuracy,
      is_weak: accuracy < 50
    });

  } else {
    performance.student_id = student_id;
    performance.subject = subject;
    performance.topic = topic;

    performance.correct_answers =
      (Number.isFinite(performance.correct_answers)
        ? performance.correct_answers
        : 0) + correct_count;

    performance.total_questions =
      (Number.isFinite(performance.total_questions)
        ? performance.total_questions
        : 0) + total_questions;

    performance.accuracy =
      (performance.correct_answers / performance.total_questions) * 100;

    if (!Number.isFinite(performance.accuracy)) {
      performance.accuracy = 0;
    }

    performance.is_weak = performance.accuracy < 50;

    await performance.save();

  }

};