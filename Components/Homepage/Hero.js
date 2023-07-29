import Image from "next/image";
import hero_image from "../../public/hero_image.png";
import styles from "../../styles/Home.module.css";

export default function Hero() {
  return (
    <section className={styles.home_hero_section} id='Home'>
          <div className={styles.hero_text}>
            <h1>A memorable <br/> <span>Occasion?</span></h1>
            <p>Record your events , occasions , your mood as memories and your daily todo list for the day.  </p>
            <button type="">Get started</button>
          </div>
          <div className={styles.hero_image}>
            <Image
              src={hero_image}
              alt="hero section"
            />
          </div>
        </section>
  )
}
