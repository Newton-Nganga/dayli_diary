import styles from "../../styles/Dashboard.module.css";
import { useState } from "react";
import { IoAdd, IoRadioButtonOff, IoRadioButtonOn } from "react-icons/io5";
import { FcPlanner } from "react-icons/fc";
import { MdOutlineClose } from "react-icons/md";
import useCalender from "../../Utils/useCalender";
let resData

export default function Tasks({user:{email,uName,id},tasks}) {

  const { day, date, month, year } = useCalender();
  const [state, setstate] = useState({ id: "", open: false, subtask: [] });
  const [show, setshow] = useState(false);
  const [values, setValues] = useState({});
  const [subtask, setSubTask] = useState([]);
  const [data,setData]= useState({})
  const handleChange = ({ target: { name, value } }) => {

    setValues((values) => {
      return { ...values, [name]: value };
    });
  };
  const handleSubtask = (e) => {
    e.preventDefault();
    const subtask = {
      id: (
        year +
        "_" +
        month +
        "_" +
        day +
        "_" +
        new Date().getTime()
      ).toString(),
      title: values.sub_title,
      time: { from: values.time_from, to: values.time_to },
    };
    setSubTask((Prev) => {
      return [...Prev, subtask];
    });
    setValues((prev) => {
      return {
        ...prev,
        sub_title: "",
        time_from: "",
        time_to: "",
      };
    });
    //   console.log("subtasks created")
  };
  const handleTask = async (e) => {
    console.log(values);
    e.preventDefault();
    const title = values.task_title;
    const capTitle = title.charAt(0).toUpperCase() +title.slice(1).toLowerCase()
    setData({id:id,email:email,title:capTitle,subtask:subtask})
    const response = await fetch("/api/tasks/tasks", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    resData = await response.json();
   if(response.ok){
    setSubTask([]);
    setValues({});
    setshow(false);
   }
    return resData
  };
  // console.log(resData)
  return (
    <section className={styles.content_task_section}>
      <div className={styles.content_task_cols1}>
        <div className={styles.content_tasks_today}>
          <p id={styles.month}>{month}</p>
          <p id={styles.date}>{date}</p>
          <span id={styles.day}>{day}</span>
        </div>
      </div>
      <div className={styles.content_task_cols2}>
        {tasks?.map((task) => {
          return (
            <button
              key={task._id}
              className={styles.content_task}
              onClick={() => {
                setstate({ id: task._id, open: true, subtask: task.subtask });
              }}
            >
              <FcPlanner id={styles.task_icon} />
              <p id={styles.task_title}>{task.title}</p>
              {state.open && state.id === task._id ? (
                <IoRadioButtonOn id={styles.task_openicon} />
              ) : (
                <IoRadioButtonOff id={styles.task_openicon} />
              )}
            </button>
          );
        })}
        <button
          className={styles.content_task_add}
          onClick={() => setshow(!show)}
        >
          <IoAdd />
        </button>
      </div>
      <div className={styles.content_task_cols3}>
        {state.subtask?.map((sub,index) => {
            return (
              <div key={index} className={styles.content_task_subtasks}>
                <p id={styles.subtask_title}>{sub.title}</p>
                <p id={styles.subtask_time}>
                  From {sub.time.from} - to - {sub.time.to}
                </p>
              </div>
            );
          })}
      </div>
      {show && (
        <div className={styles.content_task_create}>
          <div className={styles.content_task_create_comp}>
            <div className={styles.content_task_create_cols1}>
              <h4 className={styles.content_task_create_heading}>
                Add a new task
              </h4>
              <input
                type="text"
                placeholder="Enter the task title"
                name="task_title"
                value={values.task_title}
                onChange={handleChange}
              />

              <form className={styles.content_task_create_form}>
                <p id={styles.subtask}>Create a subtask</p>
                <input
                  type="text"
                  placeholder="Enter the subtask title"
                  name="sub_title"
                  value={values.sub_title}
                  onChange={handleChange}
                />
                <p>
                  <span>From</span>{" "}
                  <input
                    type="time"
                    placeholder=""
                    name="time_from"
                    value={values.time_from}
                    onChange={handleChange}
                  />
                  <br />
                  <span>To</span>{" "}
                  <input
                    type="time"
                    placeholder=""
                    name="time_to"
                    value={values.time_to}
                    onChange={handleChange}
                  />
                </p>
                <button id={styles.btn_subtask} onClick={handleSubtask}>
                  Add subtask
                </button>
                <button id={styles.btn_task} onClick={handleTask}>
                  create task
                </button>
              </form>
            </div>
            <div className={styles.content_task_create_cols2}>
              <p id={styles.subtask_header}>Your subtasks</p>
              {!subtask || subtask == undefined
                ? "Yet to create subtasks"
                : subtask.map((sub) => {
                    return (
                      <div
                        key={sub.id}
                        id={styles.subtask_add}
                        className={styles.content_task_cols2_subtask}
                      >
                        <p className={styles.content_task_cols2_subtask_title}>
                          {sub.title}
                        </p>
                        <p className={styles.content_task_cols2_subtask_time}>
                          From {sub.time.from}- to - {sub.time.to}{" "}
                        </p>
                      </div>
                    );
                  })}
            </div>
          </div>
          <div id={styles.close_add} onClick={() => setshow(!show)}>
            <MdOutlineClose />
          </div>
        </div>
      )}
    </section>
  );
}
