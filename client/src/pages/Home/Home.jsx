import { useState } from "react";
import Header from "../../components/Header/Header.jsx";
import styles from "./Home.module.scss";
import SideMenu from "../../components/SideMenu/SideMenu.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import { Chats } from "../../components/Chats/Chats.jsx";
import { useChatStore } from "../../store/useChatStore.jsx";
import { ChatContainer } from "../../components/ChatContainer/ChatContainer.jsx";

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const [Open, setOpen] = useState(false);
  const { selectedUser } = useChatStore();

  return (
    <>
      <Header Open={Open} setOpen={setOpen} />
      <SideMenu
        Open={Open}
        setOpen={setOpen}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
      <Modal openModal={openModal} setOpenModal={setOpenModal} />
      <div className={styles.wrapper}>
        <Chats />

        <div className={styles.chat}>
          {selectedUser ? (
            <ChatContainer />
          ) : (
            <p className={styles.noChatMessage}>No Chat selected</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
