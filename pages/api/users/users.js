import connectMongo from "../../../backend/Utils/connectMongo";
import User from "../../../backend/models/user";
import { hashPass } from "../../../backend/Utils/bcrypt";
import genUid from "../../../backend/Utils/generateUID";
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

export default async function addUser(req, res) {
  const { email, uName, password } = req.body;
  //generate uid

  let uid = (await genUid()).valueOf()
  if (req.method !== "POST") return;
  //connecting to db

  console.log("##########CONNECTING TO MONGO...#########");
  await connectMongo();
  console.log("------CONNECTED TO MONGO-------");

  //check whether there is a user with the uid
  const found = await User.find({_id:uid},'_id')
  if(found){
    uid = (await genUid()).valueOf()
  }

  //check if the email is used or not
  const exist = await User.find({'user.email': email },'user');
  if (exist.length > 0) {
    console.log("USER EXISTS")
    return res
      .status(400)
      .json({ msg: "Email has been used" });
  }

  //if this is a new user then --->
  if (!exist || exist.length === 0) {
    const Hpass = await hashPass(password);
    console.log("CREATING USER DOCUMENT");

    //create user object
    await User.create({
      _id: uid,
      user: { email: email, userName: uName, password: Hpass },
    })

    //if user created successfully then -->
      .then((user) => {
        console.log("CREATED USER");
        return res.status(200).json({
          user: { userName: user.user.userName, email: user.user.email },
          msg: "user account created successfully",
        });
      })
      
    //if an error was encounterd then -->
      .catch((err) => {
        console.log("----AN ERROR WAS CAUGHT WHEN CREATING USER DOCUMENT");
        return res.status(400).json("something went wrong");
      });
  }
}
