import Recommendation from "../models/recommendation.js";
import {detect_weak_topics } from "./weakness_service.js";

export const generate_recommendations = async (student_id) => {

  const weakTopics = await detect_weak_topics(student_id);
  console.log(`weak for recomm ${weakTopics}`);

  const recommendations = [];

  for (const subjectData of weakTopics) {
    const subject = subjectData.subject;

    for (const topicData of subjectData.topic) {
      const accuracy = topicData.accuracy;

      // Only weak topics
      if (accuracy >= 50) continue;

      let action = accuracy < 30 ? "Revise fundamentals" : "Practice more questions";

      recommendations.push({
        subject,
        topic: topicData.topic,
        action,
        accuracy
      });
    }
  }

  // Sort weakest first
  recommendations.sort((a, b) => a.accuracy - b.accuracy);

  // Limit results
  const topRecommendations = recommendations.slice(0, 10);

  // Save to DB (upsert)
  await Recommendation.findOneAndUpdate(
    { student_id },
    { recommendations: topRecommendations },
    { upsert: true, returnDocument: 'after'}
  );

  return topRecommendations;
};