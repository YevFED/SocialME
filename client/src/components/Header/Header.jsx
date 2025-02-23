import React from "react";
import styles from "./Header.module.scss";
import { MdAccountCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <p className={styles.logo}>SocialME</p>
      <MdAccountCircle
        className={styles.icon}
        size={30}
        onClick={() => navigate("/auth")}
      />
    </div>
  );
};

export default Header;
