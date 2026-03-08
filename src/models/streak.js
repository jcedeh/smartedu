import mongoose from 'mongoose';
import Student from './student_profile.js';

const questionSchema = new mongoose.Schema(
    {
        student_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        },  
        current_streak: {
            type: Number,
            default: 0  
        },
        longest_streak: {
            type: Number,
            default: 0
        },
        last_activity_date: {
            type: Date,
            default: null   
        }
    },
    {   
        timestamps: true,
        versionKey: false
    }
);  
const Streak = mongoose.model("Streak", questionSchema);
export default Streak;