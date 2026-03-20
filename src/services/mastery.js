import TopicPerformance from "../models/topic_performance.js";

export const update_mastery = async (student_id, subject, topic, correct, total) => {

  let record = await TopicPerformance.findOne({ student_id, subject, topic });

  if (!record) {
    record = new TopicPerformance({
      student_id,
      subject,
      topic
    });
  }

  // Update stats
  record.total_attempts += 1;
  record.total_correct += correct;
  record.total_questions += total;

  // Calculate mastery
  record.mastery_level = (record.total_correct / record.total_questions) * 100;

  record.last_updated = new Date();

  await record.save();

  return record;
};