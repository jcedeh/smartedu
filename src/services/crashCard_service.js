export const create_crash_cards = async (
  weakTopics,
  studentId
) => {

  for (const topic of weakTopics) {

    await CrashCard.create({
      studentId,
      subject: topic.subject,
      topic: topic.topic,
      message: `Quick revision recommended for ${topic.topic}`
    });

  }

};