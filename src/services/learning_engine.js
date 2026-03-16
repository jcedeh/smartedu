import { detect_weak_topics } from "./weakness_service.js";
import { generate_recommendations } from "./recommendations.js";
import { create_crash_cards } from "./crash_card_service.js";

export const run_learning_engine = async (student_id) => {

  const weaknesses = await detect_weak_topics(student_id);

  if (weaknesses.length === 0) return;

  await generate_recommendations(weaknesses, student_id);

  await create_crash_cards(weaknesses, student_id);

};