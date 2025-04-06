import React, { useEffect, useState } from "react";
import styles from "./SideMenu.module.scss";
import { GoArrowRight } from "react-icons/go";
import { RiLogoutBoxRLine } from "react-icons/ri";
import axiosIntance from "../../axiosIntance";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SideMenu = ({ Open, setOpen, openModal, setOpenModal }) => {
  const [fullname, setFullname] = useState("Guest");
  const [userInfo, setUserInfo] = useState("Guest");

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axiosIntance.post("/api/auth/logout");
      localStorage.clear();
      navigate("/auth");
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosIntance.get("/api/user/getuser");

      if (response.data && response.data.user) {
        setFullname(response.data.user.fullName);
      }
    } catch (error) {
      console.log(error.message);
      navigate("/auth");
    }
  };
  if (Open) {
    getUserInfo();
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className={Open ? styles.sideMenuActive : styles.sideMenu}>
      <GoArrowRight
        className={styles.closeButton}
        onClick={() => setOpen(!Open)}
        size={40}
      />
      <div className={styles.profileCard}>
        <img src="" alt="profilePhoto" className={styles.profileImage} />
        <div>
          <p className={styles.profileName}>{fullname}</p>
          <p
            className={styles.profileEdit}
            onClick={() => setOpenModal(!openModal)}
          >
            Edit profile
          </p>
        </div>
      </div>
      <div className={styles.sideOptions}></div>
      <div className={styles.logOutButton} onClick={handleLogout}>
        Log Out
        <RiLogoutBoxRLine fill="red" />
      </div>
    </div>
  );
};

export default SideMenu;
