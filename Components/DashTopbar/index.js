import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/Dashboard.module.css";
import logo from "../../public/proj_logo.png";
import avatar from "../../public/profile-avatar.png";
import { HiOutlineBell } from "react-icons/hi2";
import { MdOutlineClose } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import Link from "next/link";

const ProfileModal = ({ setIsOpen, isOpen ,user:{id,email,uName}}) => {

  return (
    <div className={styles.topbar_modal_container}>
      <span className={styles.topbar_modal_close}>
        <MdOutlineClose onClick={() => setIsOpen(!isOpen)} />
      </span>
      <div className={styles.topbar_modal_icon}>
        <Image
          src={avatar}
          alt="user avatar"
          className={styles.topbar_modal_avatar}
        />
        <p>{uName}</p>
        <button
          id={styles.topbar_change_icon}
          className={styles.content_btn}
          // label="Open File"
          // primary={false}
          // onClick={() => {
          //   upload.click();
          // }}
        >
          <input
            id="myInput"
            type="file"
            // ref={(ref) => (upload = ref)}
            style={{ display: "none" }}
            // onChange={onChangeFile(event)}
          />{" "}
          change icon
        </button>
      </div>
      <hr className={styles.topbar_modal_hr} />
      <Link href="/" className={styles.topbar_modal_logoutbtn}>
        <CiLogout /> Logout
      </Link>
    </div>
  );
};

export default function DashTopbar({props:{mood,user}}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={styles.topbar_section}>
      <div className={styles.topbar_container}>
        <Image
          src={logo}
          alt="logo"
          className={styles.topbar_container_logo}
          priority
        />
        <div className={styles.topbar_container_rightsection}>
          <span className={styles.topbar_container_notification}>
            <HiOutlineBell />
          </span>
          <span className={styles.topbar_container_avatarborder}>
            <Image
              src={avatar}
              alt="user profile avatar"
              className={styles.topbar_container_avatar}
              onClick={() => setIsOpen(!isOpen)}
            />
          </span>
          {isOpen && <ProfileModal isOpen={isOpen} setIsOpen={setIsOpen} user={user}/>}
        </div>
      </div>
    </section>
  );
}
