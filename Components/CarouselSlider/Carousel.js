import styles from "../../styles/Dashboard.module.css";
import CarouselSlider from "./CarouselSlider";
import { AiFillCloseCircle } from "react-icons/ai";
import { HiOutlineArrowPath, HiOutlineTrash } from "react-icons/hi";

export default function Carousel({ setCarousel, carousel: { event, state } }) {
  //   console.log("event is:",event)
  //on delete or update methods
  return (
    <section className={styles.carousel_wrapper}>
      <p className={styles.carousel_close}>
        <AiFillCloseCircle
          onClick={() => setCarousel({ event: "", state: false })}
        />
      </p>
      <h3>{event.title}</h3>
      <CarouselSlider images={event.images} />
      <div className={styles.carousel_btns}>
        <button className={styles.carousel_btn} id={styles.carousel_update}>
          update
          {/* <span>
            <HiOutlineArrowPath />
          </span> */}
        </button>
        <button
          className={styles.carousel_btn}
          id={styles.carousel_delete}
          onClick={() => confirm("Are you sure you want to delete this?")}
        >
          delete
          <span>
            <HiOutlineTrash />
          </span>
        </button>
      </div>
    </section>
  );
}
