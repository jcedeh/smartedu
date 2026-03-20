import TopicPerformance from "../models/topic_performance.js";

export const detect_weak_topics = async (student_id) => {

  const topics = await TopicPerformance.find({ student_id });

  return topics.filter(topic => topic.mastery_level < 40);
};