import { IoCloseOutline } from "react-icons/io5";
import {
  HiOutlineLockClosed,
  HiOutlineEnvelope,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineUser,
} from "react-icons/hi2";

import styles from "../../styles/Home.module.css";

export default function Signup({setState,setView,view,signup,handleSignup,handleSubmit}) {
  return (
    <form>
    <p className={styles.form_close}>
      <IoCloseOutline
        onClick={(e) => {
          e.preventDefault();
          setState({ open: false, form: "" });
        }}
      />
    </p>
    <div>
      <p className={styles.form_header}>Get started</p>
      <div className={styles.form_input}>
        <HiOutlineUser />
        <input
          type="text"
          placeholder="Enter your username"
          name="uName"
          value={signup.uName}
          onChange={handleSignup}
        />
      </div>
      <div className={styles.form_input}>
        <HiOutlineEnvelope />
        <input
          type="email"
          placeholder="your-email@example.com"
          name="email"
          value={signup.email}
          onChange={handleSignup}
        />
      </div>
      <div className={styles.form_input}>
        <HiOutlineLockClosed />
        <input
          type={view ? "text" : "password"}
          placeholder="Enter your password"
          name="password"
          value={signup.password}
          onChange={handleSignup}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            setView(!view);
          }}
        >
          {!view ? <HiOutlineEyeSlash /> : <HiOutlineEye />}
        </button>
      </div>
      <button type="submit" onClick={handleSubmit}>
        Create account
      </button>
    </div>

    <p className={styles.form_signup}>
      Already have an account ?{" "}
      <button
        onClick={(e) => {
          e.preventDefault();
          setState({ open: true, form: "login" });
        }}
      >
        Login
      </button>
    </p>
  </form>
  )
}
