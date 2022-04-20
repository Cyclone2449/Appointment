// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0V6pQx9gAsaDMpn9oHH_UfZv-Qme8O8g",
  authDomain: "appointment-b69e0.firebaseapp.com",
  projectId: "appointment-b69e0",
  storageBucket: "appointment-b69e0.appspot.com",
  messagingSenderId: "888249124479",
  appId: "1:888249124479:web:6486d24cccf2365be6e14a",
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore(app);
