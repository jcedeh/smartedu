import Attempt from "../models/attempts.js";
import Mastery from "../models/mastery.js";

export const update_mastery = async (studentId) => {

    // aggregate attempts to calculate performance by subject and topic
  const performance = await Attempt.aggregate([
    { $match: { studentId } },

    { $unwind: "$answers" },


    // join with questions to get subject and topic
    {
      $lookup: {
        from: "questions",
        localField: "answers.questionId",
        foreignField: "_id",
        as: "question"
      }
    },
//
    { $unwind: "$question" },
// group by subject and topic to calculate attempts and correct answers
    {
      $group: {
        _id: {
          subject: "$question.subject",
          topic: "$question.topic"
        },

        attempts: { $sum: 1 },

        correct: {
          $sum: {
            $cond: ["$answers.correct", 1, 0]
          }
        }
      }
    }
  ]);


// calculate mastery level based on accuracy and attempts, then upsert into Mastery collection
  const masteryDocs = performance.map(p => {

    const accuracy = p.correct / p.attempts;

    let level = "learning";

    if (accuracy < 0.5 && p.attempts >= 5)
      level = "weak";

    else if (accuracy >= 0.5 && accuracy < 0.7)
      level = "learning";

    else if (accuracy >= 0.7 && accuracy < 0.85)
      level = "proficient";

    else if (accuracy >= 0.85 && p.attempts >= 10)
      level = "mastered";

// create mastery document
    return {
      studentId,
      subject: p._id.subject,
      topic: p._id.topic,
      attempts: p.attempts,
      correct_answers: p.correct,
      accuracy,
      mastery_level: level
    };
  });

  // upsert mastery documents
  for (const doc of masteryDocs) {

    await Mastery.findOneAndUpdate(
      {
        studentId: doc.studentId,
        topic: doc.topic
      },
      doc,
      { upsert: true }
    );

  }

};