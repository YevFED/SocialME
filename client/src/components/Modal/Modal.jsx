import React, { useEffect, useState } from "react";
import styles from "./Modal.module.scss";
import { IoMdClose } from "react-icons/io";
import axiosIntance from "../../axiosIntance";
const Modal = ({ openModal, setOpenModal }) => {
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
          <input
            type="text"
            className={styles.profileInput}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            type="text"
            className={styles.profileInput}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
