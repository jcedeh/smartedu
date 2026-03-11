import topicPerformance from "../models/topic_performance.js";

export const update_topic_performance = async (
  studentId,
  subject,
  topic,
  correctCount,
  totalQuestions
) => {

  const performance = await topicPerformance.findOne({
    studentId,
    subject,
    topic
  });

  if (!performance) {

    const accuracy = (correctCount / totalQuestions) * 100;

    await topicPerformance.create({
      studentId,
      subject,
      topic,
      correctAnswers: correctCount,
      totalQuestions,
      accuracy,
      isWeak: accuracy < 60
    });

  } else {

    performance.correctAnswers += correctCount;
    performance.totalQuestions += totalQuestions;

    performance.accuracy =
      (performance.correctAnswers / performance.totalQuestions) * 100;

    performance.isWeak = performance.accuracy < 60;

    await performance.save();

  }

};