import mongoose from "mongoose";
import Student from "./student_profile.js";

const topicPerformanceSchema = new mongoose.Schema({
  student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
  },
  subject: String,
  topic: String,

  total_attempts: { type: Number, default: 0 },
  total_correct: { type: Number, default: 0 },
  total_questions: { type: Number, default: 0 },

  mastery_level: { type: Number, default: 0 }, // NEW
  last_updated: { type: Date, default: Date.now }
});

const TopicPerformance = mongoose.model('topicPerformance', topicPerformanceSchema)
export default TopicPerformance;