import React, { useState } from "react";
import styles from "./Auth.module.scss";
import PasswordInput from "../../components/Inputs/PasswordInput/PasswordInput";
import { emailValidator } from "../../utils/emailvalidator.js";
import axiosIntance from "../../axiosIntance.js";

import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore.jsx";

const Auth = () => {
  // Navigation on pages
  const navigate = useNavigate();
  const [Auth, setAuth] = useState(true);
  const { checkAuth } = useAuthStore();

  // States
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // Errors
  const [errors, setErrors] = useState(null);

  // Form changer
  const changeAuth = () => {
    setAuth(!Auth);
    setEmail("");
    setPassword("");
    setFullName("");
    setErrors("");
  };

  //Function to signup

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!emailValidator(email)) {
      setErrors("Type correct email");
      return;
    }

    if (!fullName) {
      setErrors("Type fullname");
      return;
    }
    if (fullName.length <= 3) {
      setErrors("Fullname may have 4 symbols");
      return;
    }

    if (password.length < 8) {
      setErrors("Password may have 8 symbols");
      return;
    }

    setErrors("");

    try {
      const response = await axiosIntance.post("/api/auth/signup", {
        fullName: fullName,
        email: email,
        password: password,
      });

      if (response.data && response.data.error) {
        console.log(response.data.error);
        return;
      }

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        console.log("Created " + response.data.token);
        await checkAuth();
        navigate("/home");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Log in function

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosIntance.post("/api/auth/login", {
        email: email,
        password: password,
      });
      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        console.log(response.data.token);
        console.log("Logined");
        await checkAuth();
        navigate("/home");
      }
    } catch (error) {
      console.log(error);

      setErrors("Wrong email or password");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.leftSide}>
        {Auth ? (
          <form action="" className={styles.form} onSubmit={handleSignup}>
            <p className={styles.formTitle}>Let's create a new account</p>
            <input
              className={styles.input}
              placeholder="Type your email : "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className={styles.input}
              type="text"
              placeholder="Type your fullname : "
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <PasswordInput
              placehldr={"Type your password :"}
              password={password}
              setPassword={setPassword}
            />
            <p className={styles.error}>{errors}</p>
            <p className={styles.formChanger} onClick={changeAuth}>
              Already have account?
            </p>

            <button className={styles.button} onClick={handleSignup}>
              Sign up
            </button>
          </form>
        ) : (
          <form action="" className={styles.form} onSubmit={handleLogIn}>
            <p className={styles.formTitle}>Log in in your account</p>

            <input
              className={styles.input}
              placeholder="Type your email : "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              placehldr={"Type your password :"}
              password={password}
              setPassword={setPassword}
            />
            <p className={styles.error}>{errors}</p>
            <p className={styles.formChanger} onClick={changeAuth}>
              Don't have account ?
            </p>
            <button
              className={styles.button}
              type="submit"
              onClick={handleLogIn}
            >
              Log in
            </button>
          </form>
        )}
      </div>
      {/* Cube in right side */}
      <div className={styles.rightSide}></div>
    </div>
  );
};

export default Auth;
