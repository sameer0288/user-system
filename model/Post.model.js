// Post.model.js

import mongoose from "mongoose";

export const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // Add more fields as needed (createdAt, updatedAt, etc.)
  },
  { timestamps: true }
);

export default mongoose.model.Post || mongoose.model("Post", postSchema);
