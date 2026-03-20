import mongoose from "mongoose";
import Student from "./student_profile.js";

const topicPerformanceSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"
  },
  subject: String,
  topic: String,
  correct_answers: Number,
  total_questions: Number,
  accuracy: Number,
  is_weak: Boolean
});

const TopicPerformance = mongoose.model('TopicPerformance', topicPerformanceSchema);
export default TopicPerformance;