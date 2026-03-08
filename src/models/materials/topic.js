import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({

  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject"
  },

  sectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Section"
  },

  title: {
    type: String,
    required: true
  },

  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "medium"
  },

  order: Number
});

export default mongoose.model("Topic", topicSchema);