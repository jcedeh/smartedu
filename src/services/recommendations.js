import learning_material from "../models/materials/learning_material.js";
import Recommendation from "../models/recommendation.js";

export const generate_recommendations = async (
  weakTopics,
  studentId
) => {

  for (const topic of weakTopics) {

    const materials = await learning_material.find({
      subject: topic.subject,
      topic: topic.topic
    });

    for (const material of materials) {

      await Recommendation.create({
        studentId,
        subject: topic.subject,
        topic: topic.topic,
        materialId: material._id
      });

    }

  }

};