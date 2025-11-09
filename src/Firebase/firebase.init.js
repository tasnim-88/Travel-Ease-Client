// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAleGjeRAd9_uq5pHrNwz6m4EqLu_Chy4M",
    authDomain: "smart-deals-d61e9.firebaseapp.com",
    projectId: "smart-deals-d61e9",
    storageBucket: "smart-deals-d61e9.firebasestorage.app",
    messagingSenderId: "1029151861749",
    appId: "1:1029151861749:web:3ff16b5db1bc24c899cebc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);