import learning_material from "../models/materials/learning_material.js";

export const get_learning_materials = async (subject, topic) => {

  const filter = {};

  if (subject) filter.subject = subject;
  if (topic) filter.topic = topic;

  const materials = await learning_material.find(filter);

  return materials;
};