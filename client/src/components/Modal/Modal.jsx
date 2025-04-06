import React, { useEffect, useState } from "react";
import styles from "./Modal.module.scss";
import { IoMdClose } from "react-icons/io";
import axiosIntance from "../../axiosIntance";
import { useNavigate } from "react-router-dom";
const Modal = ({ openModal, setOpenModal }) => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const getUserInfo = async () => {
    try {
      const response = await axiosIntance.get("/api/user/getuser");

      if (response.data && response.data.user) {
        setFullName(response.data.user.fullName);
        setEmail(response.data.user.email);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateUser = async () => {
    try {
      const response = await axiosIntance.put("/api/user/updateuser", {
        fullName,
        email,
      });

      if (response) {
        console.log("userUpdated");
        setOpenModal(!openModal);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div
      className={openModal ? styles.modalWrapper : styles.modalWrapperHidden}
    >
      <div className={styles.modalWindow}>
        <IoMdClose
          onClick={() => setOpenModal(!openModal)}
          className={styles.closeModal}
          size={45}
        />

        <div className={styles.profileInfo}>
          <img src="" alt="profilePhoto" className={styles.profilePhoto} />

          <div className={styles.inputWrapper}>
            <label htmlFor="">Fullname :</label>
            <input
              type="text"
              className={styles.profileInput}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="">Email :</label>
            <input
              type="text"
              className={styles.profileInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            className={styles.modalButton}
            type="submit"
            onClick={updateUser}
          >
            Update profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
