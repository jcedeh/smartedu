import e from 'express';
import mongoose from 'mongoose';

const badgeSchema = new mongoose.Schema(
    {
        name: { 
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,   
            required: true
        },
        icon : {
            type: String,
            required: true  
        },
        category: {
            type: String,
            enum: ['achievement', 'participation', 'milestone']
        },
        is_active: {
            type: Boolean,
            default: true   
        }
    },
    {   timestamps: true,
        versionKey: false
    }
);  
const Badge = mongoose.model("Badge", badgeSchema);
export default Badge;