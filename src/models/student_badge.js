import mongoose from 'mongoose';
import Student from './student_profile.js';
import Badge from './badges.js';

const studentBadgeSchema = new mongoose.Schema(
    {
        student_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Student,
            required: true
        },
        badge_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Badge,
            required: true
        },
        awarded_date: {
            type: Date,
            default: Date.now
        },
        is_revoked: {
            type: Boolean,
            default: false
        }
    },
    {   timestamps: true,
        versionKey: false
    }
);  
const StudentBadge = mongoose.model("StudentBadge", studentBadgeSchema);
export default StudentBadge;