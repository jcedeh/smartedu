import mongoose, { version } from "mongoose";

//crate users model
const userSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true,
            trim: true
        },
        last_name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true  
        },
        password: {
            type: String,
            required: true,
            trim: true
        }, 
        confirm_password: {
            type: String,
            required: true,
            trim: true
        },  
        role: {
            type: String,
            required: true,
            trim: true,
            enum: ['student', 'tutor', 'admin'],
            default: "student"
        },
        isActive: {
            type: Boolean,
            default: false
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