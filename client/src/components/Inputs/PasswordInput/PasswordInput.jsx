import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import styles from "./PasswordInput.module.scss";

const PasswordInput = ({ placehldr }) => {
  const [Hide, SetHide] = useState(true);

  const checkPass = () => {
    SetHide(!Hide);
  };
  return (
    <div className={styles.place}>
      <input
        type={Hide ? "password" : "text"}
        className={styles.input}
        placeholder={placehldr}
        maxLength={24}
      />
      {Hide ? (
        <FaEyeSlash
          onClick={checkPass}
          fill="#996402"
          className={styles.checkPass}
        />
      ) : (
        <FaEye
          onClick={checkPass}
          fill="#db8e00"
          className={styles.checkPass}
        />
      )}
    </div>
  );
};

export default PasswordInput;
