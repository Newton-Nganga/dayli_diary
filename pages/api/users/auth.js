import connectMongo from "../../../backend/Utils/connectMongo";
import User from "../../../backend/models/user";
import { isSamePass } from "../../../backend/Utils/bcrypt";
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function authUser(req, res) {
  //receive and destructure body entries
  const { email, password } = req.body;
  const pass = password
  if(!email || !pass)return res.status(406).json({msg:"your email and password is required"});
  if (req.method !== "POST") return;

  //connecting to db
  console.log("CONNECTING TO MONGO...");
  await connectMongo();
  console.log("CONNECTED TO MONGO");

  //check if there is a user with the email
  const exist = await User.find({ 'user.email': email },'_id')
  if (!exist || exist.length === 0 || exist === undefined) {
    console.log("COULDN'T FIND USER");
    return res.status(400).json({ msg: "username or password incorrect" });
  }

  //if user found then -->
  if (exist) {
    console.log("FIND USER DOCUMENT");
     await User.findById({ _id: exist[0]._id },'user')
      .then(async({_id,user:{email,userName,password}}) => {

        //check password similarity
        const isSame = await isSamePass(pass, password);
        if (!isSame) {
          return res
            .status(400)
            .json({ msg: "username or password incorrect" });
        }
        console.log("FOUND USER");

        //if passwords match then -->
        return res.status(200).json({
          user: {id:_id,email: email, uName: userName },
          msg: "please wait ,logging you in...",
        });
      })

      //if error caught then -->
      .catch((err) => {
        console.log("AN ERROR WAS CAUGHT WHEN LOGGING IN");
        return res.status(400).json({ msg: "something went wrong" });
      });
  }
}
