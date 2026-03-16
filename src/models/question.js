import mongoose from "mongoose"

const questionSchema = new mongoose.Schema({

  subject: {
    type: String,
    required: true,
    enum: ["Mathematics", "English", "ICT"]
  },

  topic: {
    type: String,
    required: true
  },

  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "easy"
  },

  question: {
    type: String,
    required: true
  },

  options: {
    type: [String],
    required: true,
    validate: {
      validator: (arr) => arr.length === 4,
      message: "Question must have exactly 4 options"
    }
  },

  correctAnswer: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

})

const Question = mongoose.model("Question", questionSchema);


export default Question;
