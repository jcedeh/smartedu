import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
            enum: ['video', 'text', 'image'],
            default: "text"
        },
        content: {
            type: String,
            required: true
        },
        url: {
            type: String
        },
        caption: {
            type: String
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const materialSchema = new mongoose.Schema(
    {
        subject: {
            type: String,
            required: true,
            trim: true
        },
        topic: {
            type: String,
            required: true,
            trim: true
        },
        sections: [sectionSchema]
    },
    {
        timestamps: true,
        versionKey: false
    }
);      

const learning_material = mongoose.model("Material", materialSchema);
export default learning_material;