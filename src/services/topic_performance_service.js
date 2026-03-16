import topicPerformance from "../models/topic_performance.js";

export const update_topic_performance = async (
  student_id,
  subject,
  topic,
  correct_count,
  total_questions
) => {

  const performance = await topicPerformance.findOne({
    student_id,
    subject,
    topic
  });

  if (!performance) {

    const accuracy = (correct_count / total_questions) * 100;

    await topicPerformance.create({
      student_id,
      subject,
      topic,
      correct_answers: correct_count,
      total_questions,
      accuracy,
      is_weak: accuracy < 50
    });

  } else {

    performance.correct_answers += correct_count;
    performance.total_questions += total_questions;

    performance.accuracy =
      (performance.correct_answers / performance.total_questions) * 100;

    performance.is_weak = performance.accuracy < 50;

    await performance.save();

  }

};