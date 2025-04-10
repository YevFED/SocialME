import { useEffect, useRef } from "react";
import { useChatStore } from "../../store/useChatStore";
import { ChatHeader } from "./ChatHeader";
import styles from "./ChatContainer.module.scss";
import { useAuthStore } from "../../store/useAuthStore";
import { formatMessageTime } from "../../utils";
import MessageInput from "./MessageInput";

import userImage from "../../assets/userImage.png";

export const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  // const messageEndRef = useRef(null);
  const { user } = useAuthStore();

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  if (isMessagesLoading) {
    return <div className="">loading...</div>;
  }

  return (
    <>
      <div className={styles.chatWrapper}>
        <ChatHeader user={selectedUser} />
        {messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message._id}
              className={`${styles.chat} ${
                message.senderId === user._id
                  ? styles.chatEnd
                  : styles.chatStart
              }`}
            >
              <div className={styles.chatImage}>
                <div className={styles.avatar}>
                  <img
                    src={
                      message.senderId === user._id
                        ? user.profilePic || userImage
                        : selectedUser.profilePic || userImage
                    }
                    alt="profile pic"
                  />
                </div>
              </div>
              <div className={styles.chatBubble}>
                <time className={styles.chatTime}>
                  {formatMessageTime(message.createdAt)}
                </time>

                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className={styles.chatImageAttachment}
                  />
                )}
                {message.text && (
                  <p style={{ paddingLeft: "55px" }}>{message.text}</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className={styles.emptyDialogText}>Write your message</p>
        )}
        <MessageInput />
      </div>
    </>
  );
};
