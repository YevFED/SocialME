import React, { useRef, useState } from "react";
import styles from "./MessageInput.module.scss";
import { IoSend } from "react-icons/io5";
import { useChatStore } from "../../store/useChatStore";
import { FaImage } from "react-icons/fa";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { sendMessage } = useChatStore();

  const [image, setImage] = useState("");

  const inputRef = useRef();

  const sending = (e) => {
    console.log(image);
    if (e.code === "Enter") {
      sendMessage({ text: message, image: image });
      setMessage("");
      setImage("");
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
      console.log(file);
    }
    // sendMessage({ text: message, image: files[0] });
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        type="text"
        className={styles.input}
        value={message}
        placeholder="Type message here :"
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => sending(e)}
      />

      <input
        type="file"
        style={{ display: "none" }}
        ref={inputRef}
        onInput={(e) => handleImage(e)}
      />
      <FaImage
        size={35}
        fill="orange"
        className={styles.sendImageButton}
        onClick={() => inputRef.current.click()}
      />
      <IoSend
        size={35}
        className={styles.sendButton}
        fill="orange"
        onClick={() => {
          sendMessage({ text: message, image: image });
          setMessage("");
        }}
      />
    </div>
  );
};

export default MessageInput;
