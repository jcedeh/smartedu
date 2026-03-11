import Student from './student_profile.js';
import mongoose from 'mongoose';

const subjectPerformanceSchema = new mongoose.Schema({
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


subjectPerformanceSchema.index(
  { studentId: 1, subject: 1 },
  { unique: true }
);

const SubjectPerformance = mongoose.model('SubjectPerformance', SubjectPerformanceSchema);
export default SubjectPerformance;