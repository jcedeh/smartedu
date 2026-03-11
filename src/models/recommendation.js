import mongoose from "mongoose";
import Student from "./student_profile.js";

const recommendationSchema = new mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    subject: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    material_id: {
        type: String,
        required: true

    }
});

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

export default Recommendation;