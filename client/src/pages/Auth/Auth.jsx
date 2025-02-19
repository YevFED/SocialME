import React, { useState } from "react";
import styles from "./Auth.module.scss";
import PasswordInput from "../../components/Inputs/PasswordInput/PasswordInput";

const SignUp = () => {
  const [Auth, setAuth] = useState(true);

  const changeAuth = () => {
    setAuth(!Auth);
  };

  return (
    <div className={styles.wrapper}>
      {/* Changing the Auth state with movement */}
      {Auth ? (
        <form action="" className={styles.signupForm}>
          <p>Create new account</p>
          <input
            className={styles.input}
            type="email"
            placeholder="Type your email : "
          />
          <PasswordInput />
          <PasswordInput />
          <button className={styles.button} onClick={changeAuth}>
            Log in
          </button>
        </form>
      ) : (
        <form action="" className={styles.loginForm}>
          <p>Log in</p>
          <input
            className={styles.input}
            type="email"
            placeholder="Type your email : "
          />
          <PasswordInput />
          <button className={styles.button} onClick={changeAuth}>
            Sign Up
          </button>
        </form>
      )}
    </div>
  );
};

export default SignUp;
