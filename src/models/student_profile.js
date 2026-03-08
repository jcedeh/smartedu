import mongoose from 'mongoose';
import User from './users.js';
import Parent from './parent_profile.js';


//student profile
const studentSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        name:{
            type: String,
            required: true
        },
        grade_level: {
            type: Number
        },
        parent_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Parent"
        },
        completed_quizzes: [
            {
                type: mongoose.Schema.Types.ObjectId,   
            }
        ],
        mastered_topics: [
            {
                type: String
            }
        ]   
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Student = mongoose.model('Student', studentSchema);
export default Student;