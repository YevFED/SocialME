import React, { useEffect, useState } from "react";
import styles from "./Modal.module.scss";
import { IoMdClose } from "react-icons/io";
import { useSession } from "../../../context/AuthContext";
const Modal = ({ openModal, setOpenModal }) => {
  const { user, loading, edit } = useSession();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

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
            onClick={() => edit(fullName, email)}
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
