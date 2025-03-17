import React, { useState } from "react";
import { Link } from "react-router-dom";

import { auth, db } from "../config/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { toast } from "react-toastify";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
        });
      }

      toast.success("Created Account Successfully", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
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

      <Link className="link" onClick="/">
        <button className="sbt_btn" onClick={signUp}>
          Create Account
        </button>
      </Link>

      <h5 className="line">
        Already have an account? &nbsp;{" "}
        <Link className="link" to="/">
          <span className="line-text">Login Here</span>
        </Link>
      </h5>
    </>
  );
};

export default SignUpScreen;
