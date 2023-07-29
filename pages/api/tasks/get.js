import connectMongo from "../../../backend/Utils/connectMongo";
import Task from "../../../backend/models/task";

export default async function get(req, res) {
  //   console.log(req);
  const { uid, tasks } = req.body;
  // console.log(tasks);
  if (req.method !== "POST")
    return res.status(400).json("wrong request method");
  const thisDay = new Date();
  thisDay.setHours(0, 0, 0, 0); // Set time to midnight
  const formattedDate = thisDay.toISOString();
  //fetch data from backend server
  console.log("CONNECTING TO MONGO");
  await connectMongo();
  console.log("CONNECTED TO MONGO");

  console.log("FETCHING MOOD DOCUMENTS");
  //returns array of task created today
  const data = await Task.find({
    _id: { $in: tasks },
    created_at: { $gte: formattedDate },
  },"-__v");
  //  console.log("found :" + data);
  console.log("FETCHED DOCUMENTS");
  return res
    .status(200)
    .json({ today: data, msg: "tasks fetched successfully" });
}
