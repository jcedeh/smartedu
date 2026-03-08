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
    text: {
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
    },
    topic: {
      type: String,
      required: false,
      trim: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Question", questionSchema);