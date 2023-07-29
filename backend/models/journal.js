import { Schema, model, models } from "mongoose";

const journalSchema = new Schema({
  _id: { type: String, unique: true },
  title: String,
  journal: String,
  image_url:{ type: [{String}], default: null },
},
{
  minimize: false,
  strict: false,
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
}
);

const Journal = models.Journal || model("Journal", journalSchema);

export default Journal;
