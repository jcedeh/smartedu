import { detect_weak_topics } from "./weakness_detection.js";
import { recommend_materials } from "./recommendation.js";
import { create_crash_cards } from "./crashCard_service.js";

export const run_learning_engine = async (studentId) => {

    //detect weakness
    const weakTopics = await detect_weak_topics(studentId);
    if (weakTopics.length === 0) return;

    // recommend materials
    const materials = await recommend_materials(studentId);
    if (materials.length === 0) return;

    // create crash cards
    await create_crash_cards(weakTopics, studentId);

    // further actions like notifications can be added here
};  