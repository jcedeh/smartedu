import Questions from "../src/models/question.js";
import { questions } from "../src/data/questions.js";
import { number_base } from "../src/data/number_base.js";
import { connectDB } from "../src/config/db.js";

const seedMathQuestions = async () => {
  try {
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

    await Questions.insertMany(number_base);

    console.log("questions seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error.message);
    if (error.errors) {
      console.error("Validation errors:", error.errors);
    }
    process.exit(1);
  }
};

seedMathQuestions();