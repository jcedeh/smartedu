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

  options: [{
    _id: String,
    text: String,
    is_correct: Boolean
  }],

  correct_answer: {
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
