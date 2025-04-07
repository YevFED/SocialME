import React, { useState } from "react";
import styles from "./MessageInput.module.scss";
import { IoSend } from "react-icons/io5";
import { useChatStore } from "../../store/useChatStore";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { sendMessage } = useChatStore();
  return (
    <div className={styles.inputWrapper}>
      <input
        type="text"
        className={styles.input}
        value={message}
        placeholder="Type message here :"
        onChange={(e) => setMessage(e.target.value)}
      />
      <IoSend
        size={35}
        className={styles.sendButton}
        fill="orange"
        onClick={() => sendMessage({ text: message })}
      />
    </div>
  );
};

export default MessageInput;
