// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrUGOVh7OUmT3Gixyw1fd7Jk4R1mVYwAA",
  authDomain: "cp4-marvel.firebaseapp.com",
  projectId: "cp4-marvel",
  storageBucket: "cp4-marvel.firebasestorage.app",
  messagingSenderId: "928773065471",
  appId: "1:928773065471:web:301ed4d6a7f79eda4b9aca",
  measurementId: "G-L87J0BFQKE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export { app, auth };
