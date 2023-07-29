import Image from "next/image";
import styles from "../../styles/Dashboard.module.css";
import journal from "../../public/journal-thumbnail.jpg";
import Display from "../Display/Display";
import { MdOutlineClose } from "react-icons/md";
import { useState } from "react";
import FileUpload from "../FileUpload/FileUpload";

export default function Journals({user:{id,email,uName},journals}) {
  // console.log("Journals received :",journals)
  const [carousel, setCarousel] = useState({ event: "", state: false });
  const [show, setShow] = useState(false);
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [form,setform] = useState({title:'',journal:''})
  const handleChange =(evt)=>{
    const {name,value} = evt.target;
    setform({...form,[name]:value})
  }
  const handleCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id',id)
    formData.append('email',email)
    formData.append('title',form.title)
    formData.append('journal',form.journal)
    formData.append('journal_thumbnail',images[images.length-1])
    const response = await fetch("/api/journals/journals", {
      method: "POST",
      body: formData,
    });
    if(response.status === 201){
      setform({})
      setImages([])
      setImagePreview([])
      setShow(!show)
    }
  };
  return (
    <div>
      {carousel.state &&(
        <section className={styles.journal_create_modal}>
           <p className={styles.carousel_close}>
            <MdOutlineClose onClick={()=>setCarousel({event:'',state:false})}/>
          </p>
          <div className={styles.journal_form}>
             <h3>{carousel.event.title}</h3>
             <p className={styles.journal_evt_journal}>{carousel.event.journal}</p>
          </div>
        </section>
      )}
      {show && (
        <section className={styles.journal_create_modal}>
          <p className={styles.carousel_close}>
            <MdOutlineClose onClick={()=>setShow(false)}/>
          </p>
          <form
            name="journal"
            onSubmit={handleCreate}
            className={styles.journal_form}
          >
            <h3>Create a new journal</h3>
            <div className={styles.journal_titleimage}>
              <input type="text" placeholder="Enter your journal title" name='title' value={form.title} onChange={handleChange}/>
              <div className={styles.journal_image_upload}>
                <FileUpload
                  imagePreview={imagePreview}
                  images={images}
                  setImagePreview={setImagePreview}
                  setImages={setImages}
                />
                <Image
                  src={imagePreview.length === 0 ? journal : imagePreview[imagePreview.length - 1]}
                  alt="my journal"
                  width={300}
                  height={200}
                />
              </div>
            </div>
            <textarea placeholder="Lets create a journal ..." name='journal' value={form.journal} onChange={handleChange}/>
            <button type="submit" className={styles.journal_submit} onClick={(e)=>handleCreate(e)}>
              create
            </button>
          </form>
        </section>
      )}
      <section className={styles.content_journals_section} id="cont_section">
        {journals?.map((journal,index)=>{
          return(
             <Display
             key={journal._id}
          img_url={journal.image_url[0].url}
          img_description={"journal thumbnail"}
          title={journal.title}
          event={journal}
          setCarousel={setCarousel}
        /> 
          )
         
        })}
        
      </section>
      <button
        onClick={() => setShow(!show)}
        className={styles.content_btn}
        id={styles.content_journal_btn}
      >
        create
      </button>
    </div>
  );
}
