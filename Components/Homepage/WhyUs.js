import Image from "next/image";
import why_us from '../../public/why-us.png'
import styles from '../../styles/Home.module.css'

export default function WhyUs() {
  return (
    <section className={styles.home_whyus} id='Why_us'>
            <div className={styles.whyus_image}>
              <Image src={why_us} alt='' />
            </div>
            <div className={styles.whyus_text}>
              <h3>Why choose us?</h3>
              <hr/>
              <p>Dayli is incredibly user-friendly, with an intuitive interface that makes it easy for you to record your thoughts and feelings.It is highly secure, with robust encryption and advanced security measures in place to protect your data. We also offer a wide range of customization options, allowing you to tailor your diary to your specific needs and preferences</p>
            </div>
        </section>
  )
}
