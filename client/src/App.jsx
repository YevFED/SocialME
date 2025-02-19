import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Welcome from "./pages/Welcome/Welcome";
import Auth from "./pages/Auth/Auth";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/auth/signup" element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;
