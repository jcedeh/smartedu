import mongoose from "mongoose";

const masterySchema = new mongoose.Schema({

  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"
  },

  subject: String,

  topic: String,

  attempts: {
    type: Number,
    default: 0
  },

  correct_answers: {
    type: Number,
    default: 0
  },

  accuracy: {
    type: Number,
    default: 0
  },

  mastery_level: {
    type: String,
    enum: ["weak", "learning", "proficient", "mastered"],
    default: "learning"
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }

});

const mastery = mongoose.model("Mastery", masterySchema);
export default mastery;