import styles from "./Chat.module.scss";
import userImage from "../../assets/userImage.png";

export const ChatHeader = ({ user }) => {
  return (
    <div className={styles.chatHeader}>
      {user.profilepic ? (
        <img
          src={user.profilepic}
          className={styles.profileImg}
          alt={`${user.fullName} avatar`}
        />
      ) : (
        <div className={styles.profileImg}>
          <img src={userImage} alt="" />
        </div>
      )}

      <p>{user.fullName}</p>
    </div>
  );
};
