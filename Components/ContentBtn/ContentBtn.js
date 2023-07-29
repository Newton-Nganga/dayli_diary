import styles from "../../styles/Dashboard.module.css";
import Link from "next/link";
import { BsArrowRightCircleFill } from "react-icons/bs";

export default function ContentBtn({ btn_txt, link }) {
  return (
    <Link
      href={link}
      className={styles.content_btn}
      id={styles.content_events_btn}
    >
      <span> {btn_txt}</span> <BsArrowRightCircleFill />
    </Link>
  );
}
