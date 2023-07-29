import { Schema, model, models,mongoose } from "mongoose";

const userSchema = new Schema(
  {
    _id: { type: String, unique: true },
    user: {
      email: String,
      userName:String,
      password: {
        type: String,
        required: true,
      },
    },
    tasks: { type: [String], default: null },
    journals: { type: [String], default: null },
    moods: { type: [String], default: null },
    events: { type: [String], default: null },
  },
  {
    minimize: false,
    strict: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const User = models.User || model("User", userSchema);

export default User;
