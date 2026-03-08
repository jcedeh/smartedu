export const detect_weak_topics = async (studentId) => {

  const performance = await Attempt.aggregate([
    { $match: { studentId } },

    { $unwind: "$answers" },

    {
      $lookup: {
        from: "questions",
        localField: "answers.questionId",
        foreignField: "_id",
        as: "question"
      }
    },

    { $unwind: "$question" },

    {
      $group: {
        _id: "$question.topic",
        total: { $sum: 1 },
        correct: {
          $sum: {
            $cond: ["$answers.correct", 1, 0]
          }
        }
      }
    }
  ]);

  const weaknesses = performance.filter(t => {
    const accuracy = t.correct / t.total;
    return t.total >= 5 && accuracy < 0.5;
  });

  return weaknesses;
};