import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function retractImg(imageUrlStr) {
  //await all the images to delete
  await Promise.all(
    imageUrlStr.map(async (url) => {
      try {
        //try deleting each image
        const result = await cloudinary.uploader.destroy(url.publicId);
        console.log(`image : ${url.publicId} deletion result is : ${result.result}`)
        return result;
      } catch (err) {
        //catch any error in deleting the image
        console.log(err);
        return { err: err };
      }
    })
  )
    .then((del) => {
      console.log("====== DELETED SUCCESSFULLY ======");
      return del;
    })
    .catch((err) => {
      console.log("====== COULD NOT DELETE IMAGES ======");
      return err;
    });
}
