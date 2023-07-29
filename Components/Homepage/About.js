import Image from "next/image";
import about_us from "../../public/about-us.png";
import styles from "../../styles/Home.module.css";

export default function About() {
  return (
    <section className={styles.home_aboutus} id="About">
      <div className={styles.aboutus_text}>
        <h3>Who are we?</h3>
        <hr />
        <p>
          Dayli is incredibly user-friendly, with an intuitive interface that
          makes it easy for you to record your thoughts and feelings.It is
          highly secure, with robust encryption and advanced security measures
          in place to protect your data. We also offer a wide range of
          customization options, allowing you to tailor your diary to your
          specific needs and preferences
        </p>
      </div>
      <div className={styles.aboutus_image}>
        <Image src={about_us} alt="about us section" />
      </div>
    </section>
  );
}
