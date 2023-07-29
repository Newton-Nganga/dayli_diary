import { Schema, model, models } from "mongoose";

const taskSchema = new Schema(
  {
    _id: { type: String, unique: true },
    subtask: [
      {
        _id: String,
        title: String,
        time: {
          from: String,
          to: String,
        },
      },
    ],
    title: { type: String },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Task = models.Task || model("Task", taskSchema);

export default Task;

