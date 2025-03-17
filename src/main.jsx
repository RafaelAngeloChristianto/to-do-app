import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StrictMode } from "react";
import LoginScreen from "./components/LoginScreen.jsx";
import SignUpScreen from "./components/SignUpScreen.jsx";
import ToDoApp from "./components/ToDoAppScreen.jsx";
import { ToastContainer } from "react-toastify";


const rootElement = document.getElementById("root");
createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/signupscreen" element={<SignUpScreen />} />
        <Route path="/todoscreen" element={<ToDoApp />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer/>
  </StrictMode>
);
