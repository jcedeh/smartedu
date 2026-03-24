export const generate_recommendations = async (student_id) => {

  const topics = await TopicPerformance.find({ student_id });

  const recommendations = [];

  for (const topic of topics) {

    if (topic.mastery_level < 40) {
      recommendations.push({
        subject: topic.subject,
        topic: topic.topic,
        level: "high_priority",
        action: "Revise fundamentals and retake quiz"
      });
    }

    else if (topic.mastery_level < 70) {
      recommendations.push({
        subject: topic.subject,
        topic: topic.topic,
        level: "medium_priority",
        action: "Practice more questions"
      });
    }
  }

  return recommendations;
};