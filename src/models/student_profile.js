import mongoose from 'mongoose';
import User from './users.js';



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
       email: {
            type: String,
            required: true,
            unique: true
        },
        date_of_birth: {
            type: Date,
            required: true
        },
        parent_access_code: {
            type: String,
            unique: true,
            sparse: true
        },
        
        facebook_id: {
            type: String
        },
        instagram_id: {
            type: String
        },
        twitter_id: {
            type: String
        },
        location: {
            type: String
        },  
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Student = mongoose.model('Student', studentSchema);
export default Student;