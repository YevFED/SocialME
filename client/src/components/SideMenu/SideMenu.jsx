import React from "react";
import styles from "./SideMenu.module.scss";
import { GoArrowRight } from "react-icons/go";
import { RiLogoutBoxRLine } from "react-icons/ri";
import axiosIntance from "../../axiosIntance";
import { useNavigate } from "react-router-dom";

const SideMenu = ({ Open, setOpen }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axiosIntance.post("/api/auth/logout", {
        localStorage: localStorage.clear(),
      });
      return navigate("/auth");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className={Open ? styles.sideMenuActive : styles.sideMenu}>
      <p className={styles.text}>Side Menu</p>
      <GoArrowRight
        className={styles.closeButton}
        onClick={() => setOpen(!Open)}
        size={40}
      />
      <div className={styles.logOutButton} onClick={handleLogout}>
        Log Out
        <RiLogoutBoxRLine />
      </div>
    </div>
  );
};

export default SideMenu;
