import styles from '../../styles/Dashboard.module.css'
import {BsEmojiWink,BsJournals,BsListTask,BsEmojiHeartEyes} from 'react-icons/bs'
import {HiOutlineCamera,HiOutlineCalendarDays,HiOutlineHome} from 'react-icons/hi2'
const Links = [
    {   
        index:"Home",
        link:"Home",
        icon:<HiOutlineHome className={styles.sidebar_nav_container_linkicon}/>
    },
    {   
        index:"Calender",
        link:"Calender",
        icon:<HiOutlineCalendarDays className={styles.sidebar_nav_container_linkicon}/>
    },
    {   
        index:"Journal",
        link:"Journal",
        icon:<BsJournals className={styles.sidebar_nav_container_linkicon}/>
    },
    {   
        index:"Tasks",
        link:"Tasks",
        icon:<BsListTask className={styles.sidebar_nav_container_linkicon}/>
    },
    {   
        index:"Mood",
        link:"Mood",
        icon:<BsEmojiHeartEyes className={styles.sidebar_nav_container_linkicon}/>
    },
    {   
        index:"Events",
        link:"Events",
        icon:<HiOutlineCamera className={styles.sidebar_nav_container_linkicon}/>
    },
    {   
        index:"Emojis",
        link:"Emojis",
        icon:<BsEmojiWink className={styles.sidebar_nav_container_linkicon}/>
    },
]
export default Links