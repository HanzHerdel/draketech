// You can create your Post model here.
//const mongoose = require("mongoose");
import mongoose from "mongoose";
const BlogEntry = mongoose.Schema(
  {
    category: { type: Number },
    title: { type: String },
    content: { type: String },
    creation_time: { type: Date, required: true, default: Date.now() },
  },
  { versionKey: false }
);

export default mongoose.model("BlogEntries", BlogEntry, "BlogEntries");
