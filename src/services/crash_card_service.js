import crash_card from "../models/crash_cards.js";

export const create_crash_cards = async (
  weak_topics,
  student_id
) => {

  for (const topic of weak_topics) {

    await crash_card.create({
      student_id,
      subject: topic.subject,
      topic: topic.topic,
      message: `Quick revision recommended for ${topic.topic}`
    });

  }

};