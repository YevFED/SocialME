import { useEffect, useRef } from "react";
import { useChatStore } from "../../store/useChatStore";
import { ChatHeader } from "./ChatHeader";
import styles from "./ChatContainer.module.scss";
import { useAuthStore } from "../../store/useAuthStore";
import { formatMessageTime } from "../../utils";

const messages = [
  {
    _id: "1",
    senderId: "user1",
    text: "Hey, how are you?",
    image: null,
    createdAt: "2025-04-07T10:30:00Z",
  },
  {
    _id: "2",
    senderId: "user2",
    text: "I'm good, thanks! How about you?",
    image: null,
    createdAt: "2025-04-07T10:32:00Z",
  },
  {
    _id: "3",
    senderId: "user1",
    text: null,
    image: "https://via.placeholder.com/150",
    createdAt: "2025-04-07T10:35:00Z",
  },
  {
    _id: "4",
    senderId: "user2",
    text: "Check out this funny picture!",
    image: "https://via.placeholder.com/150",
    createdAt: "2025-04-07T10:40:00Z",
  },
  {
    _id: "5",
    senderId: "user1",
    text: "What are you up to today?",
    image: null,
    createdAt: "2025-04-07T10:45:00Z",
  },
  {
    _id: "6",
    senderId: "user2",
    text: "Just working on some stuff. How about you?",
    image: null,
    createdAt: "2025-04-07T10:47:00Z",
  },
];

export const ChatContainer = () => {
  const {
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const messageEndRef = useRef(null);
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
    <div className={styles.chatWrapper}>
      <ChatHeader user={selectedUser} />
      {messages.map((message) => (
        <div
          key={message._id}
          className={`${styles.chat} ${
            message.senderId === user._id ? styles.chatEnd : styles.chatStart
          }`}
        >
          <div className={styles.chatImage}>
            <div className={styles.avatar}>
              <img
                src={
                  message.senderId === user._id
                    ? user.profilePic || "/avatar.png"
                    : selectedUser.profilePic || "/avatar.png"
                }
                alt="profile pic"
              />
            </div>
          </div>
          <div className={styles.chatHeader}>
            <time className={styles.chatTime}>
              {formatMessageTime(message.createdAt)}
            </time>
          </div>
          <div className={styles.chatBubble}>
            {message.image && (
              <img
                src={message.image}
                alt="Attachment"
                className={styles.chatImageAttachment}
              />
            )}
            {message.text && <p>{message.text}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};
