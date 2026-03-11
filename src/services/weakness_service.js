export const detect_weak_topics = async (studentId) => {

  const weakTopics = await TopicPerformance.find({
    studentId,
    isWeak: true
  });

  return weakTopics;

};