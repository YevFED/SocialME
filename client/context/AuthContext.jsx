import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../src/axiosIntance";

const AuthContext = createContext({
  user: null,
  edit: null,
  loading: null,
});

const fetchUser = async () => {
  try {
    const response = await axiosInstance.get("/api/user/getuser");
    if (response.data && response.data.user) {
      return response.data.user;
    }
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndSetUser = async () => {
      const currentUser = await fetchUser();
      setIsLoading(false);
      setUser(currentUser);
    };

    fetchAndSetUser();
  }, []);

  const edit = async (newName, newEmail) => {
    if (!newName || !newEmail) return;

    try {
      const response = await axiosInstance.put("/api/user/updateuser", {
        newName,
        newEmail,
      });

      if (response.status === 200) {
        const updatedUser = await fetchUser();

        setUser(updatedUser ?? null);
      }
    } catch (error) {
      console.error("Failed to update user info:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, edit, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useSession = () => useContext(AuthContext);
