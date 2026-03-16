import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
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
    total_quiz_taken: {
        type: Number,
        default: 0
    },
    total_quiz_passed: {
        type: Number,
        default: 0
    },
    accuracy: {
        type: Number,
        default: 0
    },
    gradeRemarks: {
        type: String,
        enum: [ 'Poor', 'Fair', 'Good', 'Excellent' ]
    }
});

const Result = mongoose.model('Result', resultSchema);

export default Result;