import connectMongo from "../../../backend/Utils/connectMongo";
import Journal from "../../../backend/models/journal";

export default async function get(req, res) {
  //   console.log(req);
  const { uid, journals } = req.body;
  // console.log(tasks);
  if (req.method !== "POST")
    return res.status(400).json("wrong request method");
  const currentMonth = new Date().getMonth() + 1;
  //fetch data from backend server
  console.log("====== CONNECTING TO MONGO ======");
  await connectMongo();
  console.log("====== CONNECTED TO MONGO ======");

  console.log("====== FETCHING JOURNAL DOCUMENTS ======");
  //returns array of journal created this month
  const data = await Journal.find({
    _id: { $in: journals },
    created_at: {
        $gte: new Date(new Date().getFullYear(), currentMonth - 1, 1), // Start of current month
        $lt: new Date(new Date().getFullYear(), currentMonth, 1) // Start of next month
      }
  },"-__v");
   console.log("journals found :" + data);
  console.log("====== FETCHED DOCUMENTS (200)======");
  return res
    .status(200)
    .json({ thisMonth: data, msg: "events fetched successfully" });
}