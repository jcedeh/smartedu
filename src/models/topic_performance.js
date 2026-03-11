import mongoose from "mongoose";
import Student from "./student_profile.js";

const topicPerformanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"
  },
  subject: String,
  topic: String,
  correctAnswers: Number,
  totalQuestions: Number,
  accuracy: Number,
  isWeak: Boolean
});

const TopicPerformance = mongoose.model('TopicPerformance', topicPerformanceSchema);
export default TopicPerformance;