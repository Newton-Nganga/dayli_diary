import styles from "../../styles/Dashboard.module.css";
import { useState } from "react";
import { BsQuestionCircleFill } from "react-icons/bs";
import { IoCloseCircle } from "react-icons/io5";
import emojiEmotion from "../../Utils/emoji/emojiEmotion";
import MoodCarousel from "./MoodCarousel";
import emojiImg from "../../public/Emojis.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Mood({ setActiveLink }) {
  const mood = {};
  const [pick, setPick] = useState(false);
  const [emoji, setEmoji] = useState({ emoji_name: "", emoji: "" });
  const [description, setDescription] = useState("");
  const [state, setstate] = useState({ query: "", list: emojiEmotion });
  const handleChange = (e) => {
    const results = emojiEmotion.filter((emoji) => {
      if (e.target.value === "") return emojiEmotion;
      return emoji.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setstate({
      query: e.target.value,
      list: results,
    });
  };
  function handleKeyDown(keyEvent) {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  }
  const handleCreate = async () => {
    const email = "newton7nganga@gmail.com";
    mood.id = email + "_" + new Date().getTime() + "_" + new Date().getDay();
    (mood.emoji = { emoji: emoji.emoji, name: emoji.emoji_name }),
      (mood.description = description);
    // console.log(mood);
    const response = await fetch("/api/mood/mood", {
      method: "POST",
      body: JSON.stringify(mood),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      toast.success("Mood Created successfully", toast.POSITION.TOP_CENTER);
      setDescription("");
      setEmoji({ emoji: "", emoji_name: "" });
    }
  };
  return (
    <section id="cont_section">
      {/* emojipicker */}
      {pick && (
        <article className={styles.content_mood_pickemoji_modal}>
          <p className={styles.content_mood_modalclose}>
            {" "}
            <IoCloseCircle onClick={() => setPick(false)} />
          </p>
          <form>
            <p>
              <span>
                <span>search</span>
                <input
                  type="search"
                  id="emoSearch"
                  name="emoSearch"
                  autoFocus
                  onKeyDown={handleKeyDown}
                  onChange={handleChange}
                  className={styles.content_mood_mickemoji_modal_searchbar}
                />
              </span>
            </p>
          </form>
          <div className={styles.content_mood_showemojis}>
            {state.list.map((emoji) => (
              <span
                key={emoji.name}
                id={emoji.name}
                onClick={() => {
                  setEmoji({ emoji_name: emoji.name, emoji: emoji.emoji });
                  setPick(false);
                }}
                className={styles.content_mood_emoji}
              >
                {emoji.emoji}
              </span>
            ))}
          </div>
        </article>
      )}
      <ToastContainer autoClose={3000} />
      <p className={styles.content_mood_text}>How are you feeling today?</p>
      <div className={styles.content_mood_emojis_wrapper}>
        <div
          onClick={() => setPick(!pick)}
          className={styles.content_mood_emojitable}
        >
          <div className={styles.content_mood_pickemoji}>
            <button>pick an emoji</button>
          </div>
        </div>
        <div className={styles.content_mood_emojis_cont}>
          <div className={styles.content_mood_emojis}>
            {!emoji.emoji ? <BsQuestionCircleFill /> : emoji.emoji}
          </div>
          <span>{emoji.emoji && emoji.emoji_name}</span>
        </div>
      </div>
      <p className={styles.content_mood_text}>What s on your mind?</p>
      <textarea
        placeholder="Write something interesting"
        rows="12"
        className={styles.content_mood_textarea}
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button className={styles.content_btn} onClick={handleCreate}>
        Add
      </button>
    </section>
  );
}
