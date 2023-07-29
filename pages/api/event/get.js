import connectMongo from "../../../backend/Utils/connectMongo";
import Event from "../../../backend/models/event";

export default async function get(req, res) {
  //   console.log(req);
  const { uid, events } = req.body;
  // console.log(tasks);
  if (req.method !== "POST")
    return res.status(400).json("wrong request method");
  const currentMonth = new Date().getMonth() + 1;
  //fetch data from backend server
  console.log("====== CONNECTING TO MONGO ======");
  await connectMongo();
  console.log("====== CONNECTED TO MONGO ======");

  console.log("====== FETCHING MOOD DOCUMENTS ======");
  //returns array of task created today
  const data = await Event.find({
    _id: { $in: events },
    created_at: {
        $gte: new Date(new Date().getFullYear(), currentMonth - 1, 1), // Start of current month
        $lt: new Date(new Date().getFullYear(), currentMonth, 1) // Start of next month
      }
  },"-__v");
  //  console.log("found :" + data);
  console.log("====== FETCHED DOCUMENTS (200)======");
  return res
    .status(200)
    .json({ thisMonth: data, msg: "events fetched successfully" });
}