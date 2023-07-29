import { useState } from "react";
import styles from "../../styles/Dashboard.module.css";
import Display from "../Display/Display";
import event from "../../public/journal-thumbnail.jpg";
import {
  BsArrowRightCircleFill,
  BsArrowLeft,
  BsArrowRight,
} from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import pic from "../../public/journal-thumbnail.jpg";
import UploadEvents from "./UploadEvents";
import Carousel from "../CarouselSlider/Carousel";
// Display props are: img_url,img_description,title,link
export default function Events({ user, events }) {
  const [show, setShow] = useState(false);
  const [carousel, setCarousel] = useState({ event: "", state: false });
  // console.log(events);
  return (
    <section id="cont_section">
      {show && (
        <UploadEvents pic={pic} show={show} setShow={setShow} user={user} />
      )}
      {carousel.state && (
        <>
          <Carousel setCarousel={setCarousel} carousel={carousel} />
        </>
      )}
      <div className={styles.content_events_container}>
        {events.map((evt) => {
          return (
            <Display
              key={evt._id}
              img_url={evt ? evt.evt_images[0].url : pic}
              img_description={"event thumbnail"}
              title={evt.title}
              setCarousel={setCarousel}
              event={{ id: evt._id, images: evt.evt_images, title: evt.title }}
            />
          );
        })}
      </div>
      <button
        onClick={() => setShow(!show)}
        className={styles.content_btn}
        id={styles.content_events_btn}
      >
        <span> add event</span> <BsArrowRightCircleFill />
      </button>
    </section>
  );
}
