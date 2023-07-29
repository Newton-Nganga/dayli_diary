
import connectMongo from "../../../backend/Utils/connectMongo";
import User from "../../../backend/models/user";
import Event from "../../../backend/models/event";
import formidable from 'formidable';
import cloudinary from 'cloudinary'
import fetch from 'node-fetch'
import genUid from '../../../backend/Utils/generateUID'
import retractImg from "./retractImg";
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

export const config = {
  api: {
    bodyParser: false,
  },
};
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export default async function handler(req, res) {
 const nid = (await genUid()).valueOf()
 const date = new Date().getTime()
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
 console.log("======= LETS DESTRUCTURE THE FORM DATA =======")
  // Parse the incoming form data using formidable
 const form = formidable({ multiples: true });
 await new Promise((resolve, reject) => {
  console.log('Before parsing form...');
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      } 
        resolve({ fields, files });
    });
    console.log('After parsing form...');
  })
  .then(async(formData)=>{
  if(!formData){
    console.log("No form data")
  }
  const { id, email, title, images } = formData.fields;
  const eId = id +"_" +nid+"_"+date
  console.log("====== we got the form now =======")
  // console.log(images)
  //save all the images into the cloudinary cloud storage
  if (!images || images.length === 0) {
    return res.status(400).json({ message: 'No images found in form data' });
  }
  //push all the images to cloudinary
  console.log("====== PUSHING IMAGES TO CLOUDINARY ======")
  const imageUrls = await Promise.all(
    images.map(async (image) => {
      const uploadedImage = await cloudinary.v2.uploader.upload(image, {
        folder: 'dayli-uploads',
      });
      return {url:uploadedImage.secure_url,publicId:uploadedImage.public_id};
    })
  );
  console.log("***all the urls***",imageUrls)

  //if there is cloudinary urls add event and the event_id to users events
  console.log("====== CONNECTING TO MONGO ======");
    await connectMongo();
    console.log("====== CONNECTED TO MONGO ======");

    //create event document
    console.log("====== CREATING EVENT DOC ======");
    await Event.create({
            _id: eId,
            title: title,
            evt_images: imageUrls, //array
    })
    .then(async(evt)=>{
      if(!evt){
        return res.status(500).json({msg:"There is no event created"})
      }
        console.log("*** Event created successfully ***");
        console.log(evt)
        console.log("original user Id  :",id)
        const addEvtIdToMyList = await User.updateOne(
          { _id: id, "user.email": email },
          { $push: { events: evt._id } },
          { returnOriginal:false }
        );
        
        if (
          (addEvtIdToMyList.acknowledged !== true &&
            addEvtIdToMyList.modifiedCount !== 1) ||
          (addEvtIdToMyList.acknowledged === true &&
            addEvtIdToMyList.modifiedCount !== 1)
        ){
           //delete the created event and image
         console.log("====== Deleting the uploaded images and evt created ======")
         await retractImg(evt.evt_images)
         //delete the evt created
         const deleteEvt = await Event.deleteOne({_id:eId})
         console.log('deleted Event response',deleteEvt)
        }
         

       //else if images uploaded,event created and user updated
          console.log("====== USER DOCS UPDATED SUCCESSFULLY ======")
          const ims = evt.evt_images.map(im=>im.url)
          return res.status(201).json({event:{title:evt.title,images:ims},msg:"The event was completed added"})
    })
    .catch(async(err)=>{
      console.log("====== Deleting the uploaded images ======")
      //delete em
      await retractImg(imageUrls)
      return res.status(500).json({err:err,msg:"Error creating event"})
    })//event creation
  }).catch((err)=>{
    console.log(err)
  })
}

