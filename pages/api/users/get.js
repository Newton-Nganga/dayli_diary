import connectMongo from "../../../backend/Utils/connectMongo";
import User from "../../../backend/models/user";
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function getUsers(req, res) {
  const { uid } = req.body;
  console.log("received id" + uid);
  if (req.method !== "POST") return res.status(400).json("Wrong Method");
  //connecting to db

  console.log("##########CONNECTING TO MONGO...#########");
  await connectMongo();
  console.log("------CONNECTED TO MONGO-------");

  //check whether there is a user with the uid
  const found = await User.findOne({ _id: uid }, "-__v -user.password -created_at -updated_at");
  // console.log("found :" + found);
  return res.status(200).json({user:found,msg:"successfully fetched user"})
}
