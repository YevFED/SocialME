import styles from "./SideMenu.module.scss";
import { GoArrowRight } from "react-icons/go";
import { RiLogoutBoxRLine } from "react-icons/ri";
import axiosIntance from "../../axiosIntance";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const SideMenu = ({ Open, setOpen, openModal, setOpenModal }) => {
  const { user, loading } = useAuthStore();

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axiosIntance.post("/api/auth/logout");
      localStorage.clear();
      navigate("/auth");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={Open ? styles.sideMenuActive : styles.sideMenu}>
      <GoArrowRight
        className={styles.closeButton}
        onClick={() => setOpen(!Open)}
        size={40}
      />
      <div className={styles.profileCard}>
        <img src="" alt="profilePhoto" className={styles.profileImage} />
        <div>
          <p className={styles.profileName}>
            {loading ? "Loading...." : user.fullName}
          </p>
          <p
            className={styles.profileEdit}
            onClick={() => setOpenModal(!openModal)}
          >
            Edit profile
          </p>
        </div>
      </div>
      <div className={styles.sideOptions}></div>
      <div className={styles.logOutButton} onClick={handleLogout}>
        Log Out
        <RiLogoutBoxRLine fill="red" />
      </div>
    </div>
  );
};

export default SideMenu;
