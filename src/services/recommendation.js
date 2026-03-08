import { detect_weak_topics } from "../services/weakness_detection.js";

export const recommend_materials = async (studentId) => {

    //detect weakness
    const weakTopics = await detect_weak_topics(studentId);

    if (weakTopics.length === 0) return [];

    const topics = weakTopics.map(t => t._id);

    // suggest topics
    const materials = await LearningMaterial.find({
        topic: { $in: topics }
    }).limit(5);

    return materials;
};