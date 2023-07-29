import { PageTransition } from '@steveeeie/react-page-transition';
import styles from "../../styles/Dashboard.module.css";
import Calender from '../Calender/Calender';
import Events from "../Events/Events";
import Home from '../Home/Home';
import Journals from "../Journals/Journals";
import Mood from "../Mood/Mood";
import Tasks from '../Tasks/Tasks';

export default function DashContent({activeLink,setActiveLink,props:{mood,user,tasks,events,journals}} ) {
  // console.log(tasks)
  return (
    <section className={styles.content_section} id='cont_section'>
        {(() => {
        switch (activeLink) {
          case "Home":
            return <Home setActiveLink={setActiveLink} user={user}/>;
            break;
          case "Calender":
            return <Calender mood={mood}/>;
            break;
          case "Journal":
            return <Journals user={user} journals={journals}/>;
            break;
          case "Tasks":
            return <Tasks user={user} tasks={tasks}/>;
            break;
          case "Mood":
            return <Mood setActiveLink={setActiveLink}/>;
            break;
          case "Events":
            return <Events user={user} events={events}/>;
            break;
          default:
            return <Home setActiveLink={setActiveLink}/>;
        }
      })()}
      
    </section>
  );
}
