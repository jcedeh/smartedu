import Student from './student_profile.js';
import mongoose from 'mongoose';

const studentPerformanceSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    correct_answers: {
        type: Number,
        default: 0
    },
    total_questions: {
        type: Number,
        default: 0
    },
    accuracy: {
        type: Number,
        default: 0   //correct_answers / total_questions
    }
})


topicPerformanceSchema.index(
  { studentId: 1, topic: 1 },
  { unique: true }
);

const studentPerformance = mongoose.model('StudentPerformance', studentPerformanceSchema);
export default studentPerformance;