import mongoose from "mongoose";
import Student from "./student_profile.js";
import Question from "./question.js";

const performanceSchema = new mongoose.Schema(
    {
        student_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        },
        score: {
            type: Number,
            required: true
        },
        total_attempts: {
            type: Number,
            required: true
        },
        correct_attempts: {
            type: Number,
            required: true
        },
        failed_attempts: {
            type: Number,
            required: true
        },
        badges_earned: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);
const Performance = mongoose.model("Performance", performanceSchema);
export default Performance;