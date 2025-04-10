import styles from "./Welcome.module.scss";
import { Link, useNavigate } from "react-router-dom";
import background from "../../assets/background.png";
import { useAuthStore } from "../../store/useAuthStore";

const Welcome = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuthStore();

  if (!loading && user) {
    navigate("/home");
  }

  return (
    <>
      <div className={styles.wrapper}>
        <img src={background} alt="" className={styles.background} />
        <h1 className={styles.title}>SocialME</h1>

        <div className={styles.circle}></div>
        <div className={styles.circle2}></div>
        <Link to="/auth" className={styles.button}>
          Let's Started
        </Link>
      </div>
    </>
  );
};

export default Welcome;
