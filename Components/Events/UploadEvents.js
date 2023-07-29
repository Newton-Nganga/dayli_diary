import styles from "../../styles/Dashboard.module.css";
import FileUpload from "../FileUpload/FileUpload";
import { MdOutlineClose } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import Image from "next/image";
import {useState} from 'react'

export default function UploadEvents({show,setShow,pic,user:{id,email,uName}}) {
    const [images, setImages] = useState([]);
    const [imagePreview, setImagePreview] = useState([]);
    // const [events, setEvents] = useState([{ title: "", pic: pic }]);
    const [title,setTitle] = useState("")
    const handleCreate = async(e) => {
       e.preventDefault()
       let formData = new FormData()
       formData.append("title",title)
       formData.append("id",id)
       formData.append("email",email)
       for(let i = 0; i < images.length;i++){
        formData.append("images[]",images[i])
       }
    //    for (var key of formData.entries()) {
    //     console.log(key[0] + ', ' + key[1])
    // }
    const response = await fetch("/api/event/event", {
        method: "POST",
        body: formData,
      });
    };
  return (
 <div className={styles.content_events_addmodal}>
    <form 
    className={styles.content_events_addmodal_container} 
    encType="multipart/form-data"
    onSubmit={(e)=>handleCreate(e)}>
      <p className={styles.form_close}>
        {" "}
        <button onClick={() => setShow(!show)}>
          <AiFillCloseCircle/>
        </button>
      </p>
      <h3>Create a new event</h3>
      <p>
        <input type="text" placeholder="Add memorable event title" name="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
      </p>
      <p className={styles.events_uploadpics}>
        <span>Add event pics</span>
        <FileUpload
          images={images}
          setImages={setImages}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
        />
      </p>
      <div className={styles.events_selectedpics}>
        {imagePreview && imagePreview.length !== 0 ? (
          imagePreview?.map((pic, index) => {
            return (
              <Image
                key={index}
                src={pic}
                alt=""
                width={20}
                height={20}
                className={styles.events_pic_display}
              />
            );
          })
        ) : (
          <p>Your selected Pics</p>
        )}
      </div>
      <button type='submit' className={styles.events_save_event}>save</button>
    </form>
  </div>
  )
}
