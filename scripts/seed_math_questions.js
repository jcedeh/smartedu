import Questions from "../src/models/question.js";
import { mathQuestions } from "../src/data/math_questions.js";
import { connectDB } from "../src/config/db.js";

const seedMathQuestions = async () => {
  await connectDB();

  // Clear existing questions to avoid duplicates
  await Questions.deleteMany({});

  // Drop any existing index on 'text' field if it exists
  try {
    await Questions.collection.dropIndex('text_1');
    console.log('Dropped existing text index');
  } catch (err) {
    console.log('No existing text index to drop');
  }

  await Questions.insertMany(mathQuestions);

  console.log("50 Mathematics questions seeded");

  process.exit();
};

seedMathQuestions();