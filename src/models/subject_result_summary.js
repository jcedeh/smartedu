import mongoose from "mongoose";

const subjectResultSummarySchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
    index: true
  },

  subject: {
    type: String,
    required: true,
    index: true
  },

  // 📊 Core Performance Metrics
  total_quizzes_taken: {
    type: Number,
    default: 0
  },

  total_tests_passed: {
    type: Number,
    default: 0
  },

  total_correct: {
    type: Number,
    default: 0
  },

  total_questions: {
    type: Number,
    default: 0
  },

  accuracy: {
    type: Number,
    default: 0
  },
  grade_remark: {
        type: String,
        enum: [ 'Poor', 'Fair', 'Good', 'Excellent' ]
    }
},
    {
      versionKey: false,
      timestamps:true
    }
  
)

const subject_result_summary  = mongoose.model('subject_result_summary ', subjectResultSummarySchema)
export default subject_result_summary ;



            