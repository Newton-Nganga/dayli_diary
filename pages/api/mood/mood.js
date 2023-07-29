import connectMongo from "../../../backend/Utils/connectMongo";
import Mood from "../../../backend/models/mood";
import User from "../../../backend/models/user";

export default async function addMood(req, res) {
    if (req.method !== "POST")
      return res.status(400).json("wrong request method");
    if (
      !req.body ||
      req.body.length === 0 ||
      req.body === null ||
      req.body === undefined
    )
      return res.status(400).json({ msg: "You need to add your mood" });
    const {id,emoji:{emoji,name},description } = req.body;
    console.log(emoji)
    console.log("##########CONNECTING TO DATABASE...#########");
    await connectMongo();
    console.log("------CONNECTED TO DATABASE-------");
    if (!id) return;
    if (!emoji || !description)
      return res.status(400).json({ msg: "Your mood fields are empty"});
    console.log("CREATING MOOD DOCUMENT");
    const month = id.split('_')[2]
    await Mood.create({
      _id: id,
      emoji:{
        emoji:emoji,
        emojiName:name
      },
      month:month,
      mood: description,
    })
      .then(async (mood) => {
        const myEmailStr = mood._id.split('_')
        const email = myEmailStr.shift();
        console.log(email)
        //   update the users task
        const addMoodIdToMyList = await User.updateOne(
          { "user.email": email },
          { $push: { moods: mood._id } },
          { returnOriginal:false }
        );
        console.log(addMoodIdToMyList);
      //   check if task is added
          if (
            (addMoodIdToMyList.acknowledged !== true &&
            addMoodIdToMyList.modifiedCount !== 1
            )||(
            addMoodIdToMyList.acknowledged === true &&
            addMoodIdToMyList.modifiedCount !== 1
            )
          ){
            return res.status(400).json({
              user: addMoodIdToMyList,
              msg: "Could not add the mood in your list",
            });
          }
          //log the task has been added and respond
        // console.log(`ADDED TASK ${(mood.mood.splice(0,10)+"...").toUpperCase()}`);
        return res.status(200).json({
          mood: mood,
          msg: "today's mood added successfully",
        });
      })
      .catch((err) => {
        console.log("----AN ERROR WAS CAUGHT WHILE ADDING MOOD");
        return res.status(400).json({ error: err, msg: "something went wrong" });
      });
    
  }
  