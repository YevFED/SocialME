import styles from "./SideMenu.module.scss";
import { GoArrowRight } from "react-icons/go";
import { RiLogoutBoxRLine } from "react-icons/ri";
import axiosIntance from "../../axiosIntance";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import userImage from "../../assets/userImage.png";
import { useChatStore } from "../../store/useChatStore";

const SideMenu = ({ Open, setOpen, openModal, setOpenModal }) => {
  const { user, loading } = useAuthStore();
  const { clearAll } = useChatStore();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosIntance.post("/api/auth/logout");
      localStorage.clear();
      clearAll();
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
      <div className={styles.profileWrapper}>
        <div className={styles.profileCard}>
          <div className={styles.profileImage}>
            <img
              src={!loading && user.profilepic ? user.profilepic : userImage}
              alt="profilePhoto"
            />
          </div>

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
    </div>
  );
};

export default SideMenu;
