import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Welcome from "./pages/Welcome/Welcome";
import Auth from "./pages/Auth/Auth";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;
