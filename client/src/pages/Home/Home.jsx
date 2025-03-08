import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosIntance from "../../axiosIntance.js";

const Home = () => {
  // Checking if user is logined
  const tokenCheck = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth");
    }
  };

  // Log out funct
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axiosIntance.post("/api/auth/logout", {
        localStorage: localStorage.clear(),
      });
      return navigate("/auth");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  return <button onClick={handleLogout}>Home</button>;
};

export default Home;
