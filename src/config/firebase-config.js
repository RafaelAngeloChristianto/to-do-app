import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRP-0vW9zKOnI1QnDtVbw3hcUWUXtwQL8",
  authDomain: "to-do-app-9ee7d.firebaseapp.com",
  projectId: "to-do-app-9ee7d",
  storageBucket: "to-do-app-9ee7d.firebasestorage.app",
  messagingSenderId: "652016645412",
  appId: "1:652016645412:web:d64d61abe6fbb43bf22fb1",
  measurementId: "G-N7N0WR2TXE",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)