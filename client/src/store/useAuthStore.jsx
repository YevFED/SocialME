import { create } from "zustand";
import axiosInstance from "../axiosIntance";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

export const useAuthStore = create((set, get) => ({
  user: null,
  loading: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/api/user/getuser");

      console.log(res.data);

      set({ user: res.data.user });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },

  edit: async (data) => {
    // const response = await axiosInstance.put("/api/user/updateuser", {
    //     newName,
    //     newEmail,
    //   });
    try {
      await axiosInstance.put("/api/user/updateuser", data);

      get().checkAuth();
    } catch (error) {
      console.log("error in update profile:", error);
      console.log(error);
    }
  },

  connectSocket: () => {
    const { user } = get();
    if (!user || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: user._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
