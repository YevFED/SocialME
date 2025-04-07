import styles from "../../components/UserCard/UserCard.module.scss";

export const UserCard = ({ name, onClick }) => {
  return (
    <div className={styles.profileWrapper} onClick={() => onClick()}>
      <div className={styles.profileImage} />
      <div className={styles.profileName}>{name}</div>
    </div>
  );
};
