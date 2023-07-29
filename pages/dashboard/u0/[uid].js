import styles from "../../../styles/Dashboard.module.css";
import DashTopbar from "../../../Components/DashTopbar";
import DashSidebarNav from "../../../Components/DashSidebarNav";
import DashContent from "../../../Components/DashContent";
import { useState, useRef } from "react";
import { useRouter } from "next/router";

export default function Dashboard(props) {
  const router = useRouter();
  const { uid } = router.query;
  if (!uid) {
    router.push("/");
  }
  const [activeLink, setActiveLink] = useState("Home");
  return (
    <main className={styles.main}>
      <DashTopbar props={props}/>
      <DashSidebarNav setActiveLink={setActiveLink} activeLink={activeLink} />
      <DashContent
        activeLink={activeLink}
        setActiveLink={setActiveLink}
        props={props}
      />
    </main>
  );
}
export async function getServerSideProps(context) {
  //uid is only set when user is authenticated
  const { uid } = context.query;
  if (!uid) {
    return {
      redirect: {
        destination: "/",
        permanent: false, // set to true if the redirect is permanent
      },
    };
  }
  console.log("FETCHING DATA FROM DB");

  //fetch this user's object for later use
  const userFetch = await fetch(`${process.env.BASE_FETCH_URL}/api/users/get`, {
    method: "POST",
    body: JSON.stringify({ uid: uid }),
    headers: { "Content-Type": "application/json" },
  });
  const userObj = await userFetch.json();
  const { user, _id, tasks, moods, journals,events } = userObj.user;

  // console.log(userObj);

  //fetch all users moods
  // const moodFetch = await fetch(`${process.env.BASE_FETCH_URL}/api/mood/get`, {
  //   method: "POST",
  //   body: JSON.stringify({ uid: uid, moods: moods }),
  //   headers: { "Content-Type": "application/json" },
  // });
  // const moody = moodFetch.json();

//  fetch all users tasks
  const taskFetch = await fetch(`${process.env.BASE_FETCH_URL}/api/tasks/get`, {
    method: "POST",
    body: JSON.stringify({ uid: uid, tasks: tasks }),
    headers: { "Content-Type": "application/json" },
  });
  const tasky = await taskFetch.json();
  //fetch all user's journals
  const journalsFetch = await fetch(
    `${process.env.BASE_FETCH_URL}/api/journals/get`,
    {
      method: "POST",
      body: JSON.stringify({ uid: uid, journals: journals }),
      headers: { "Content-Type": "application/json" },
    }
  );
  const journalsy = await journalsFetch.json();
  // fetch all user's events
  const eventsFetch = await fetch(
    `${process.env.BASE_FETCH_URL}/api/event/get`,
    {
      method: "POST",
      body: JSON.stringify({ uid: uid,events:events }),
      headers: { "Content-Type": "application/json" },
    }
  );
  const eventsy = await eventsFetch.json();
  //fetch all the moods
  const response = await fetch(`${process.env.BASE_FETCH_URL}/api/mood/get`, {
    method: "GET",
  });

  if (!response.ok) {
    // throw new Error('Network response was not ok');
    console.log("SOMETHING WENT WRONG");
  }
  const data = await response.json();
  // console.log(data)
  if (!data.mood || data.mood.length === 0 || data.mood === null) {
    // throw new Error("The response data seems to be empty")
    console.log("SOMETHING WENT WRONG");
  }
  console.log("FETCHED DATA FROM");
  return {
    props: {
      mood: data.mood ? data.mood : null,
      user: userObj
        ? {
            id: _id,
            email: user.email,
            uName: user.userName,
          }
        : null,
       tasks:tasky? tasky.today:null,
       events:eventsy?eventsy.thisMonth:null,
       journals:journalsy?journalsy.thisMonth:null
    },
  };
}
