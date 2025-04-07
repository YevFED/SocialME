import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header.jsx";
import styles from "./Home.module.scss";
import SideMenu from "../../components/SideMenu/SideMenu.jsx";
import Modal from "../../components/Modal/Modal.jsx";

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const [Open, setOpen] = useState(false);

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
        <p>Will be chat window</p>
      </div>
    </>
  );
};

export default Home;
