import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoWhatsapp,
} from "react-icons/io5";
import styles from "../../styles/Home.module.css";

export default function Footer() {
  return (
    <section className={styles.home_footer}>
      <div className={styles.home_footer_newsletter}>
        <p className={styles.home_footer_subscribetxt}>
          Subscribe to our Newsletter
        </p>
        <div className={styles.home_footer_newsletter_form_wrapper}>
          <p>Stay up to date with latest news, announcements and articles</p>
          <form className={styles.home_footer_newsletter_form}>
            <input type="text" placeholder="Your Email Address" />
            <button>Subscribe</button>
          </form>
        </div>
        <hr />
        <div className={styles.home_footer_socialicons}>
        <p> 
            <span>
            <IoLogoWhatsapp />
          </span>
          <span>
            <IoLogoTwitter />
          </span>
          <span>
            <IoLogoFacebook />
          </span>
          <span>
            <IoLogoInstagram />
          </span>
          </p>
         <p id={styles.footer_created}> © {new Date().getFullYear()}|Newton Nganga</p>
        </div>
      </div>
    </section>
  );
}
