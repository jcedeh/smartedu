import { detect_weak_topics } from "./weakness_service.js";
import { generate_recommendations } from "./recommendations.js";
import { create_crash_cards } from "./crashCard_service.js";

export const run_learning_engine = async (studentId) => {

  const weaknesses = await detect_weak_topics(studentId);

  if (weaknesses.length === 0) return;

  await generate_recommendations(weaknesses, studentId);

  await create_crash_cards(weaknesses, studentId);

};