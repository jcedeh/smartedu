import learning_material from "../models/materials/learning_material.js";

export const getLearningMaterials = async (subject, topic) => {

  const filter = {};

  if (subject) filter.subject = subject;
  if (topic) filter.topic = topic;

  const materials = await learning_material.find(filter);

  return materials;
};