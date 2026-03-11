import Question from "../models/question.js";
import { AppError } from "../utils/AppError.js";

//CREATE
export const create_question = async (data) => {
  const exists = await Question.findOne({
    question: { $regex: `^${data.question}$`, $options: "i" }
  });

  if (exists) {
    throw new Error("Question already exists");
  }

  return await Question.create(data);
};

// READ (all)
export const get_questions = async () => {
  return await Question.find().select("-options.isCorrect");
};

// READ single
export const get_question_by_id = async (id) => {
  return await Question.findById(id);
};

//UPDATE
export const update_question = async (id, data) => {
  if (data.options) {
    const correctCount = data.options.filter(o => o.isCorrect).length;
    if (correctCount !== 1) {
      throw new Error("Question must have exactly one correct answer");
    }
  }

  const updated = await Question.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });

  if (!updated) {
    throw new Error("Question not found");
  }

  return updated;
};

//DELETE
export const delete_question = async (id) => {
  const deleted = await Question.findByIdAndDelete(id);
  if (!deleted) {
    throw new Error("Question not found");
  }
};

//INSERT BULK QUESTIONS
export const bulk_insert_questions = async (questionsArray) => {
  if (!Array.isArray(questionsArray) || questionsArray.length === 0) {
    throw new Error("No questions provided");
  }

  // Validate each question
  for (const q of questionsArray) {
    if (!q.text || !q.options || q.options.length < 2) {
      throw new Error(
        `Question "${q.text || "[No Text]"}" must have at least 2 options`
      );
    }
    const correctCount = q.options.filter(o => o.isCorrect).length;
    if (correctCount !== 1) {
      throw new Error(
        `Question "${q.text}" must have exactly 1 correct option`
      );
    }
  }

  // Optionally: prevent duplicates by text
  const texts = questionsArray.map(q => q.text);
  const existing = await Question.find({ text: { $in: texts } });
  if (existing.length > 0) {
    const existingTexts = existing.map(e => e.text).join(", ");
    throw new Error(`Duplicate questions found: ${existingTexts}`);
  }

  // Insert all questions
  const inserted = await Question.insertMany(questionsArray, { ordered: false });
  return inserted;
};