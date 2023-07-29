import { useRef } from "react";
import styles from "../../styles/Dashboard.module.css";
import LinkBtn from "../LinkBtn";
import Links from "../../Utils/Links/links";

export default function DashSidebarNav({setActiveLink,activeLink}) {
  const handleNavigation = (link) => setActiveLink(link);
  return (
    <nav className={styles.sidebar_nav} id='side_nav'>
      <div className={styles.sidebar_nav_container}>
        {Links.slice(0, 2).map((link, index) => (
          <LinkBtn
            key={link.index}
            link={link.link}
            icon={link.icon}
            activeLink={activeLink}
            handleNavigation={handleNavigation}
          />
        ))}
        <hr className={styles.sidebar_nav_container_hr} />
        {Links.slice(2, 6).map((link, index) => (
          <LinkBtn
            key={link.index}
            link={link.link}
            icon={link.icon}
            activeLink={activeLink}
            handleNavigation={handleNavigation}
          />
        ))}
      </div>
    </nav>
  );
}
