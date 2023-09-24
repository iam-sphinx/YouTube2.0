import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fromGoogle: {
      type: Boolean,
      default: false,
    },
    img: {
      type: String,
    },
    subscribers: {
      type: Number,
      default: 0,
    },
    subscribedUsers: {
      type: [String],
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
