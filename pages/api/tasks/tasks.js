import connectMongo from "../../../backend/Utils/connectMongo";
import Task from "../../../backend/models/task";
import User from "../../../backend/models/user";
import genUid from "../../../backend/Utils/generateUID";
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addUser(req, res) {
   const nid = (await genUid()).valueOf()
   const thisMonth = new Date().getMonth()+1
  if (req.method !== "POST")
    return res.status(400).json("wrong request method");
  if (
    !req.body ||
    req.body.length === 0 ||
    req.body === null ||
    req.body === undefined
  )
    return res.status(400).json({ msg: "You need to add some tasks" });
  const { email, id, subtask, title } = req.body;
 
  //connecting to db
  console.log("##########CONNECTING TO MONGO...#########");
  await connectMongo();
  console.log("------CONNECTED TO MONGO-------");
 const taskId = id+"_"+nid+"_"+thisMonth

 //check for a missing field
  if (!subtask || !title)
    return res.status(400).json({ msg: "Add some tasks and subtasks" });
   
  console.log("CREATING TASK DOCUMENT");
  //create task
  
  await Task.create({
    _id: taskId,
    subtask: subtask,
    title: title,
  })
    .then(async (task) => {
      //   update the users task
      const addTaskIdToMyList = await User.updateOne(
        { _id: id,'user.email':email },
        { $push: { tasks: task._id } },
        { returnOriginal:false }
      );
      console.log(addTaskIdToMyList);
    //   check if task is added
        if (
          (addTaskIdToMyList.acknowledged !== true &&
          addTaskIdToMyList.modifiedCount !== 1
          )||(
          addTaskIdToMyList.acknowledged === true &&
          addTaskIdToMyList.modifiedCount !== 1
          )
        )
          return res.status(400).json({
            user: addTaskIdToMyList,
            msg: "Could not add the task in your list",
          });
        //log the task has been added and respond
      console.log(`ADDED TASK ${task.title.toUpperCase()}`);
      return res.status(200).json({
        task: { title: task.title, subtasks: task.subtask },
        msg: "subtask added successfully",
      });
    })
    .catch((err) => {
      console.log("----AN ERROR WAS CAUGHT WHILE ADDING TASK");
      return res.status(400).json({ error: err, msg: "something went wrong" });
    });
}
