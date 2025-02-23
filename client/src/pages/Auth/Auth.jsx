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
      <div className={styles.leftSide}>
        {/* Changing the Auth state with movement */}
        {Auth ? (
          <form action="" className={styles.form}>
            <p className={styles.formTitle}>Let's create a new account</p>
            <input
              className={styles.input}
              type="email"
              placeholder="Type your email : "
            />
            <PasswordInput placehldr={"Type your password :"} />
            <PasswordInput placehldr={"Confirm your password :"} />
            <p className={styles.formChanger} onClick={changeAuth}>
              Already have account?
            </p>

            <button className={styles.button}>Sign up</button>
          </form>
        ) : (
          <form action="" className={styles.form}>
            <p className={styles.formTitle}>Log in in your account</p>
            <input
              className={styles.input}
              type="email"
              placeholder="Type your email : "
            />
            <PasswordInput placehldr={"Type your password :"} />
            <p className={styles.formChanger} onClick={changeAuth}>
              Don't have account ?
            </p>
            <button className={styles.button}>Log in</button>
          </form>
        )}
      </div>
      <div className={styles.rightSide}></div>
    </div>
  );
};

export default SignUp;
