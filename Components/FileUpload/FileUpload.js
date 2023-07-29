import styles from "../../styles/FileUpload.module.css";
import { FcAddImage } from "react-icons/fc";
export default function FileUpload({
  images,
  setImages,
  imagePreview,
  setImagePreview,
}) {
  const onImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagePreview([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview([...imagePreview, reader.result]);
          setImages([...images, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  return (
    <div>
      <div for="images" className={styles.dropContainer}>
        <label className={styles.dropTitle}>
          <FcAddImage />
        </label>
        <input
          type="file"
          id={styles.images}
          accept="image/*"
          onChange={onImageUpload}
          multiple
          required
        />
      </div>
    </div>
  );
}
