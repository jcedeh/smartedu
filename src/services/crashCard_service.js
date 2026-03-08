import crashCard from "../models/crash_cards.js";

export const create_crash_cards = async (weakTopics, studentId) => {

  const cards = weakTopics.map(w => ({
    studentId,
    subject: w.subject,
    topic: w.topic
  }));

  await crashCard.insertMany(cards);

  return cards;
};