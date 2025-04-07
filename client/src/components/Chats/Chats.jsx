import { useState } from "react";
import styles from "./Chats.module.scss";
import { SearchInput } from "./SearchInput";
import { UserCard } from "../UserCard/UserCard";
import { BiLoaderAlt } from "react-icons/bi";

export const Chats = () => {
  const [users, setUsers] = useState([]);
  const [loading, setisLoading] = useState(true);

  console.log(loading);

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: "1" }}>
      <SearchInput
        onSuccess={(data) => {
          setisLoading(false);
          setUsers(data ?? []);
        }}
        onLoading={(isLoading) => {
          setisLoading(isLoading);
        }}
      />

      <div className={styles.chatsWrapper}>
        <div className={styles.chats}>
          {loading && (
            <div className={styles.loading}>
              <BiLoaderAlt
                fill="white"
                className={styles.loadingIco}
                size={25}
              />
            </div>
          )}

          {users.length === 0 && !loading && (
            <div className={styles.dontFound}>
              <p>No Users Found</p>
            </div>
          )}

          {!loading &&
            users.map((user) => {
              return <UserCard name={user.fullName} key={user.fullName} />;
            })}
        </div>
      </div>
    </div>
  );
};
