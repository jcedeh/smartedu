import mongoose from "mongoose";
import User from "./users.js";
import Student from "./student_profile.js";

const parentSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
            
        },
        name: {
            type: String,
            required: true 
        },
        child_ids: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        }
        ]

    },
    {
        timestamps: true,
        versionKey: false
    }
)

const Parent = mongoose.model("Parent", parentSchema);
export default Parent;
