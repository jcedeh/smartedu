import TopicPerformance from "../models/topic_performance.js";

export const detect_weak_topics = async (student_id) => {

  const weak_topics = await TopicPerformance.find({
    student_id,
    is_weak: true
  });

  return weak_topics;

};