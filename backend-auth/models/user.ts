import mongoose from "mongoose";
const UserSchema:mongoose.Schema =new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

export default mongoose.model("User", UserSchema, "Users");
