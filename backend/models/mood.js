import { Schema, model, models,mongoose } from "mongoose";

const moodSchema = new Schema({
  _id: { type: String, unique: true },
  emoji:{
    emoji:String,
    emojiName:String
  },
  mood:String,
  month:{type:Number}
},
{ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

// const Mood = models.Mood || model("Mood", moodSchema);
const Mood = models.Mood || model("Mood",moodSchema)
export default Mood;