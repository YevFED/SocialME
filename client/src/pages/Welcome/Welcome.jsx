import React from "react";
import styles from "./Welcome.module.scss";
import { Link, useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>SocialME</h1>

        <div className={styles.circle}></div>
        <div className={styles.circle2}></div>
        <Link to="/auth" className={styles.button}>
          Let's Started
        </Link>
      </div>
    </>
  );
};

export default Welcome;
