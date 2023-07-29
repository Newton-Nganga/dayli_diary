import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Image from "next/image";
import styles from "../../styles/Dashboard.module.css";
import { useState } from "react";

export default function CarouselSlider({ images }) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const handleNextClick = () => {
    if (currentPhotoIndex < images.length - 1) {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
    }
  };
  const handlePreviousClick = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(currentPhotoIndex - 1);
    }
  };
 console.log("images carousel",images)
  return (
    <div className={styles.carousel_display}>
      <button
        onClick={handlePreviousClick}
        className={styles.carousel_btn}
        id={styles.carousel_prev}
        disabled={currentPhotoIndex === 0}
      >
        <BsArrowLeft />
      </button>
      <div className={styles.carousel_viewport}>
          <Image
            src={images[currentPhotoIndex].url}
            alt={`pic - ${currentPhotoIndex}`}
            fill
          />
      </div>
      <button
        onClick={handleNextClick}
        className={styles.carousel_btn}
        id={styles.carousel_next}
        disabled={currentPhotoIndex === images.length - 1}
      >
        <BsArrowRight />
      </button>
    </div>
  );
}
