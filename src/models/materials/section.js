import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({

  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true
  },

  title: {
    type: String,
    required: true
  },

  order: Number
});

export default mongoose.model("Section", sectionSchema);