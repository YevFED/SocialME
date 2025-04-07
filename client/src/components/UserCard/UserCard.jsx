import styles from "../../components/UserCard/UserCard.module.scss";

export const UserCard = ({ name }) => {
  return (
    <div className={styles.profileWrapper}>
      <div className={styles.profileImage} />
      <div className={styles.profileName}>{name}</div>
    </div>
  );
};
