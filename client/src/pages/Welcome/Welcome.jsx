import React from "react";
import styles from "./Welcome.module.scss";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>SocialME</h1>

        <div className={styles.circle}></div>
        <div className={styles.circle2}></div>
        <button onClick={() => navigate("/auth")} className={styles.button}>
          Let's Started
        </button>
      </div>
    </>
  );
};

export default Welcome;
