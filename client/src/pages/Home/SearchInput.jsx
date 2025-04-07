import { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import axiosIntance from "../../axiosIntance";
import useDebounce from "../../hooks/useDebounce";

export const SearchInput = ({ onSuccess, onLoading }) => {
  const [name, setName] = useState("");
  const debouncedSearchTerm = useDebounce(name, 300);

  const fetchUsers = async (name) => {
    try {
      onLoading(true);
      const res = await axiosIntance.post("/api/user/search", {
        name,
      });

      onLoading(false);
      onSuccess(res.data.users);
    } catch (error) {
      onLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers({ name: debouncedSearchTerm });
  }, [debouncedSearchTerm]);

  return (
    <div className={styles.serachBar}>
      <input
        placeholder="Search user..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={styles.input}
      />
    </div>
  );
};
