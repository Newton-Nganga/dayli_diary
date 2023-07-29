import connectMongo from "../../../backend/Utils/connectMongo";
import Mood from "../../../backend/models/mood";
import User from "../../../backend/models/user";

export default async function get(req,res) {
//   console.log(req);
  if (req.method !== "GET") return res.status(400).json("wrong request method");
  const thisMonth = new Date().getMonth() + 1;
  //fetch data from backend server
  console.log("CONNECTING TO MONGO");
  await connectMongo();
  console.log("CONNECTED TO MONGO");

  console.log("FETCHING MOOD DOCUMENTS");
  //returns array of mood ids  will use params
  await User.find({ _id: "newton7nganga@gmail.com" }).select('moods')
    // .select("moods -_id")
    .then(async (fetched) => {
    //   console.log(fetched);
      if (
        !fetched ||
        fetched.length === 0 ||
        fetched === null ||
        fetched === undefined
      ) {
        console.log("COULDNT FETCH MOOD DOCUMENTS");
        return res.status(404).json({ msg: "No moods created yet" });
      }
      if (fetched) {
        const data = await Mood.find({
          _id: { $in: fetched[0].mood},
          month: thisMonth,
        });
        // console.log(data)
        console.log("FETCHED DOCUMENTS");
        return res.json({mood:data,msg:"moods fetched successfully"});
      }
    })
    .catch((err) => {
      console.log("Error caught while fetching user");
      return err;
    });
}
