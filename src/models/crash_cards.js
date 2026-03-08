import mongoose from "mongoose";
const crashCardSchema = new mongoose.Schema({

  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"
  },

  subject: String,

  topic: String,

  triggeredBy: {
    type: String,
    default: "weakness_detection"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});
const crashCard = mongoose.model("CrashCard", crashCardSchema);
export default crashCard;