import { useChatStore } from "../../store/useChatStore";
import styles from "./Chat.module.scss";

export const ChatHeader = ({ user }) => {
  const { selectedUser } = useChatStore();
  return (
    <div className={styles.chatHeader}>
      {user.profilepic ? (
        <img
          src={user.profilepic}
          className={styles.profileImg}
          alt={`${user.fullName} avatar`}
        />
      ) : (
        <div className={styles.profileImg} />
      )}

      <p>{user.fullName}</p>
    </div>
  );
};
