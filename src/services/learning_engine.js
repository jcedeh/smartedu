import { detect_weak_topics } from "./weakness_service.js";
import { generate_recommendations } from "./recommendations.js";
import { create_crash_cards } from "./crash_card_service.js";


export const run_learning_engine = async (student_id) => {

  const weak_topics= await detect_weak_topics(student_id);

  if (weak_topics.length === 0) return;

  

  await generate_recommendations(student_id);
  console.log(recommendations)

  await create_crash_cards(weak_topics, student_id);

};