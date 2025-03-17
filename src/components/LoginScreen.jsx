import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginScreen.css";

import { auth } from "../config/firebase-config";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);

      window.location.href = "/todoscreen";
    } catch (error) {
      console.log(error.message)
      toast.error("Wrong Email or Password", {
        position: "bottom-center",
      });
    }
  };

  return (
    <>
      <img
        className="logo_img"
        src="../src/components/imgs/logo.png"
        alt="Logo"
      />
      <div className="container">
        <h1 className="email_label">Email: </h1>
        <input
          type="text"
          name=""
          id=""
          required
          placeholder="Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <h1 className="pass_label">Password: </h1>
        <input
          type="password"
          required
          placeholder="Your Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button onClick={login} className="sbt_btn">
        Login
      </button>

      <h5 className="line">
        Do not have an account? &nbsp;{" "}
        <Link className="link" to="/signupscreen">
          <span className="line-text">Sign Up Here</span>
        </Link>
      </h5>
    </>
  );
};

export default LoginScreen;
