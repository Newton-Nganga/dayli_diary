import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Dashboard.module.css";

export default function Display({
  img_url,
  img_description,
  title,
  setCarousel,
  event
}) {
  return (
    <button
      className={styles.content_display_wrapper}
      role="button"
      onClick={(e) => {e.preventDefault();setCarousel({event:event,state:true})}}
    >
      <div className={styles.content_display_image_wrapper}>
         <Image
          src={img_url}
          alt={img_description}
          width={200}
          height={200}
          className={styles.content_display_image}
        /> 
      </div>
      <div className={styles.content_display_title_wrapper}>
        <p className={styles.content_display_title}>{title}</p>
      </div>
    </button>
  );
}
