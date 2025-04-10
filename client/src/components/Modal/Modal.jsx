import { useEffect, useRef, useState } from "react";
import styles from "./Modal.module.scss";
import { IoMdClose } from "react-icons/io";
import { useAuthStore } from "../../store/useAuthStore";
import { BiLoaderAlt } from "react-icons/bi";

import userImage from "../../assets/userImage.png";

const Modal = ({ openModal, setOpenModal }) => {
  const { user, loading, edit, uploadPhoto, isLoadingPhoto } = useAuthStore();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");

  const imageRef = useRef();

  const isChanged =
    email !== user.email ||
    fullName !== user.fullName ||
    image !== user.profilepic;

  console.log(
    email !== user.email ||
      fullName !== user.fullName ||
      image !== user.profilepic
  );

  const handleFileSelected = async (file) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const res = await uploadPhoto(reader.result);
      setImage(res.data.url);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (user && !loading) {
      setFullName(user.fullName);
      setEmail(user.email);
      setImage(user.profilepic);
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
          <input
            type="file"
            style={{ display: "none" }}
            ref={imageRef}
            onInput={(e) =>
              handleFileSelected(e.target.files[e.target.files.length - 1])
            }
          />
          <div
            className={styles.profilePhoto}
            onClick={() => imageRef.current.click()}
          >
            {isLoadingPhoto ? (
              <BiLoaderAlt fill="black" size={25} className={styles.loading} />
            ) : (
              <img
                src={!loading && image ? image : userImage}
                alt="profilePhoto"
              />
            )}
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
            disabled={isLoadingPhoto || loading || !isChanged}
          >
            Update profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
