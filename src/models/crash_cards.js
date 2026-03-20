import mongoose from "mongoose";
const crashCardSchema = new mongoose.Schema({

  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"
  },

  subject: String,

  topic: String,
  message: String,

  
  createdAt: {
    type: Date,
    default: Date.now
  }

});
const CrashCard = mongoose.model("CrashCard", crashCardSchema);
export default CrashCard;