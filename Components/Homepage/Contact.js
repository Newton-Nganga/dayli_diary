import Image from 'next/image'
import contact_us from '../../public/contact-us.png'
import styles from '../../styles/Home.module.css'

export default function Contact() {
  return (
    <section className={styles.home_contactus} id='Contact'>
            <div className={styles.contactus_image}>
              <Image src={contact_us} alt='contact_us' />
            </div>
            <div className={styles.contactus_text}>
              <h3>Reach out to us</h3>
              <hr/>
              <form>
                <input type="text" placeholder="Your Full Name"/>
                <input type="email" placeholder="Your Email"/>
                <textarea rows='6' placeholder="Write a new message ..."/>
                <button>Send Message</button>
              </form>
            </div>
        </section>
  )
}
