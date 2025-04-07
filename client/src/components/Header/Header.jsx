import styles from "./Header.module.scss";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = (Open, setOpen) => {
  return (
    <div className={styles.header}>
      <p className={styles.logo}>SocialME</p>
      <GiHamburgerMenu
        className={styles.icon}
        size={40}
        onClick={() => setOpen(!Open)}
      />
    </div>
  );
};

export default Header;
