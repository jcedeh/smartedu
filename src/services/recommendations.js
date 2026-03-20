import { detect_weak_topics } from "./weakness_service.js";

export const generate_recommendations = async (student_id) => {

  const weak_topics = await detect_weak_topics(student_id);

  return weak_topics
    .sort((a, b) => a.accuracy - b.accuracy)
    .map(topic => {

      let level = "";
      let action = "";

      if (topic.accuracy < 40) {
        level = "very_weak";
        action = "start_from_basics";
      } else if (topic.accuracy < 60) {
        level = "weak";
        action = "practice_more";
      } else {
        level = "improving";
        action = "advance_practice";
      }

      return {
        subject: topic.subject,
        topic: topic.topic,
        accuracy: topic.accuracy,
        level,
        action
      };
    });
};