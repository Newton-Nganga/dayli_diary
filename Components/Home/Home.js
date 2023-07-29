import Image from "next/image";
import styles from "../../styles/Dashboard.module.css";
import profileImg from "../../public/profile-avatar.png";
import { FcPlanner,FcStackOfPhotos,FcReading ,FcMakeDecision, FcList} from "react-icons/fc";
const navlinks=[{
    link:"Calender",
    icon:<FcPlanner/>
},{
    link:"Events",
    icon:<FcStackOfPhotos/>
},{
    link:"Mood",
    icon:<FcMakeDecision/>
},{
    link:"Tasks",
    icon:<FcList/>
},{
    link:"Journal",
    icon:<FcReading/>
}]
export default function Home({setActiveLink,user:{id,email,uName}}) {
  // console.log(uName)
  return (
    <section id='home'>
      <div className={styles.content_home}>
        <div className={styles.content_home_userdetails} id='home_user_details'>
          <h1 id={styles.user_name}>Welcome back {uName}!</h1>
          <div>
            <Image src={profileImg} alt={"users icon"} id={styles.user_icon} />
          </div>
        </div>
        <div className={styles.content_home_navlinks}>
           {navlinks.map((nav)=>{
            return(
              <div key={nav.link} className={styles.content_home_btnitem} onClick={()=>setActiveLink(nav.link)}>
                {nav.icon}
                <p>{nav.link}</p>
            </div>  
            )
           })} 
        </div>
      </div>
    </section>
  );
}





