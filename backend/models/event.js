import { Schema, model, models } from "mongoose";

const eventSchema = new Schema(
  {
    _id: { type: String, unique: true },
    title: String,
    evt_images: { type: [{String}], default: null },
  },
  {
    minimize: false,
    strict: false,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Event = models.Event || model("Event", eventSchema);

export default Event;
