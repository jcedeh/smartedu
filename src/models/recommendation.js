import mongoose from "mongoose";

const recommendationSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
    
  },
  recommendations: [
    {
      subject: { type: String, required: true },
      topic: { type: String, required: true },
      action: { type: String, required: true },
      accuracy: { type: Number, required: true },
      createdAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

// Optional: only one recommendation document per student
recommendationSchema.index({ student_id: 1 }, { unique: true });

export default mongoose.model("Recommendation", recommendationSchema);