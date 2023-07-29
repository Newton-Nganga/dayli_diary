import styles from "../../styles/Dashboard.module.css";

const LinkBtn = ({ icon, link, handleNavigation, activeLink }) => {
  return (
    <div
      id={link}
      role={"button"}
      className={
        activeLink === link
          ? styles.sidebar_nav_linkcontainer_active
          : styles.sidebar_nav_linkcontainer
      }
      onClick={(e) => {
        e.preventDefault();
        // document.getElementById(link).className('active')
        handleNavigation(link);
      }}
    >
      {icon}
      <p> {link} </p>
    </div>
  );
};

export default LinkBtn;
