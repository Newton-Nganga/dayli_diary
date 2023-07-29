import { IoCloseOutline } from "react-icons/io5";
import {
  HiOutlineLockClosed,
  HiOutlineEnvelope,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineUser,
} from "react-icons/hi2";

import styles from "../../styles/Home.module.css";

export default function Login({setState,login,view,setView,handleLogin,handleSubmit}) {
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
      <p className={styles.form_header}>Welcome back!</p>
      <div className={styles.form_input}>
        <HiOutlineEnvelope />
        <input
          type="email"
          placeholder="your-email@example.com"
          name="email"
          value={login.email}
          onChange={handleLogin}
        />
      </div>
      <div className={styles.form_input}>
        <HiOutlineLockClosed />
        <input
          type={view ? "text" : "password"}
          placeholder="Enter your password"
          name="password"
          value={login.password}
          onChange={handleLogin}
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
        Login
      </button>
    </div>

    <p className={styles.form_signup}>
      Dont have an account ?{" "}
      <button
        onClick={(e) => {
          e.preventDefault();
          setState({ open: true, form: "register" });
        }}
      >
        Register
      </button>
    </p>
  </form>
  )
}
