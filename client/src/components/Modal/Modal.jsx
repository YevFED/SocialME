import React, { useEffect, useRef, useState } from "react";
import styles from "./Modal.module.scss";
import { IoMdClose } from "react-icons/io";
import { useAuthStore } from "../../store/useAuthStore";

import userImage from "../../assets/userImage.png";

const Modal = ({ openModal, setOpenModal }) => {
  const { user, loading, edit } = useAuthStore();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const imageRef = useRef();

  useEffect(() => {
    if (user && !loading) {
      setFullName(user.fullName);
      setEmail(user.email);
    }
  }, [user]);

  return (
    <div
      className={openModal ? styles.modalWrapper : styles.modalWrapperHidden}
    >
      <div className={styles.modalWindow}>
        <IoMdClose
          fill="white"
          onClick={() => setOpenModal(!openModal)}
          className={styles.closeModal}
          size={45}
        />

        <div className={styles.profileInfo}>
          <input type="file" style={{ display: "none" }} ref={imageRef} />
          <div
            className={styles.profilePhoto}
            onClick={() => imageRef.current.click()}
          >
            <img src={userImage} alt="profilePhoto" />
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor="">Fullname :</label>
            <input
              type="text"
              className={styles.profileInput}
              value={fullName}
              maxLength={20}
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
            onClick={() => edit({ newName: fullName, newEmail: email })}
            disabled={loading}
          >
            Update profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
