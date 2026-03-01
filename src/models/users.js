import mongoose, { version } from "mongoose";

//crate users model
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true 
        },
        password: {
            type: String,
            required: true
        }, 
        role: {
            type: String,
            required: true,
            enum: ['student', 'parent'],
            default: "student"
        },
        isActive: {
            type: Boolean,
            default: true
        },
        lastLoginDate: {
            type:Date
        },
        otp: Number
        
    },
    {   timestamps:true,
        versionKey: false
    }
)

const User = mongoose.model('User', userSchema);
export default User;