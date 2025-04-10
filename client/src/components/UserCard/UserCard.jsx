import styles from "../../components/UserCard/UserCard.module.scss";

import userImage from "../../assets/userImage.png";

export const UserCard = ({ name, onClick }) => {
  return (
    <div className={styles.profileWrapper} onClick={() => onClick()}>
      <div className={styles.profileImage}>
        <img src={userImage} alt="" />
      </div>
      <div className={styles.profileName}>{name}</div>
    </div>
  );
};
