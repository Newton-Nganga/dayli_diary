import styles from "../../styles/Dashboard.module.css";
import { useState } from "react";
import useCalenderArray from "../../Utils/useCalenderArray";
import {BsPatchQuestionFill}from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'
export default function Calender(props) {
  const moodsThisMonth = useCalenderArray(props.mood)
  const month = new Date().getMonth()+1;
  const year = new Date().getFullYear();
  const [open, setOpen] = useState(false);
  const [mood, setMood] = useState({
    emoji: "😉",
    emoji_name: "Add some mood",
    day: " This day"+" / "+month+" / "+year,
    description: "Wecome to dayli once more add some mood to view them",
  });
  return (
    <section>
      <div className={styles.content_calender_component}>
        <div className={styles.content_calender_form}>
          <div className={styles.content_calender_button}>
            {new Date().getDate() +
              "/" +
              month +
              "/" +
               year}
          </div>
          <h3>This month</h3>
        </div>
        {open && (
          <div className={styles.content_calender_modalshow}>
            <p className={styles.content_mood_modalclose}><AiFillCloseCircle onClick={()=>setOpen(false)}/></p>
            <p className={styles.content_calender_modalshow_title}>
              How I felt On {mood.day}
              
            </p>
            <div className={styles.content_calender_modalshow_wrapper}>
              <div className={styles.content_calender_modalshow_emoji}>
                {mood.emoji}
                <span>{mood.emoji_name}</span>
              </div>
              <div className={styles.content_calender_modalshow_descr}>
                <p>{mood.description}</p>
              </div>
            </div>
          </div>
        )}
        <div className={styles.content_calender_thismonth}>
          {
             moodsThisMonth.map((mood,index)=> (
              <button
                key={index}
                className={styles.content_calender_thisday}
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(!open);
                  {mood.emoji &&setMood({
                    emoji: mood.emoji.emoji,
                    emoji_name: mood.emojiName,
                    day:mood.day,
                    description:mood.mood,
                  }); }
                  
                }}
              >
                <span>{(mood.emoji) && (mood.emoji.emoji !== undefined) ?mood.emoji.emoji:<BsPatchQuestionFill className={styles.mood_emoji_placeholder}/>}</span>
                <p>{mood.day}</p>
              </button>
            ))
          }
        </div>
      </div>
    </section>
  );
}
