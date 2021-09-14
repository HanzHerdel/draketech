// You can create your Post model here.
//const mongoose = require("mongoose");
import mongoose from "mongoose";
const Product: mongoose.Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String },
    description: { type: String, required: true },
    img: { type: String },
    creation_time: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);

export default mongoose.model("Product", Product, "Products");
