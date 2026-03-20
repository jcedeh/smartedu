import mongoose from 'mongoose';
import Student from './student_profile.js';
import Question from './question.js';

const attemptSchema = new mongoose.Schema(
    {
        student_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        },
        subject: {
            type: String,
            required: true,
            enum: ["Mathematics", "English", "ICT"]
        },
        topic: {
            type: String,
            required: true
        },
        quiz_id: {
            type: String,
            required: true
        },
        answers: [
            {
            questionId: mongoose.Schema.Types.ObjectId,
            selected_answer: String,
            is_correct: Boolean
            }
        ],
        score: {
            type: Number,
            required: true
        },
        time_taken: {
            type: Number,
            required: true
        },
        passed: {
            type: Boolean,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);  
const Attempt = mongoose.model("Attempt", attemptSchema);

attemptSchema.index(
  { student_id: 1, quiz_id: 1 },
  { unique: true }
);
export default Attempt;
