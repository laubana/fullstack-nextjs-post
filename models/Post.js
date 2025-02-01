import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, required: true },
    authorName: { type: String, required: true },
    isLiked: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models["Post"] || mongoose.model("Post", postSchema);
