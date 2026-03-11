import mongoose from "mongoose";

const optionSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, trim: true },
    isCorrect: { type: Boolean, default: false }
  },
  { _id: true }
);

const questionSchema = new mongoose.Schema(
  {
    subject: {
    type: String,
    required: true
  },

    topic: {
    type: String,
    required: true
  },
    question: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    options: {
      type: [optionSchema],
      validate: {
        validator: (options) => {
          if (!options || options.length < 2) return false;
          const correctCount = options.filter(o => o.isCorrect).length;
          return correctCount === 1;
        },
        message: "Question must have at least 2 options and exactly 1 correct answer"
      }
    }
  },
  { timestamps: true }
);

const Questions = mongoose.model('Question', questionSchema);
export default Questions;